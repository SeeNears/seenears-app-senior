import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import VoiceRecorder from '../../native/VoiceRecorder';
import { voiceRecordScreenStyles } from '../../style/voiceRecordScreen';
import { type WeatherMood } from '../WeatherScreen/WeatherScreen';

type RecordingStatus =
  | 'idle'
  | 'waitingForSpeech'
  | 'recording'
  | 'saved'
  | 'cancelled';

const moodContents: Record<
  WeatherMood,
  {
    label: string;
    question: string;
  }
> = {
  sunny: {
    label: '☀️ 맑음',
    question: '오늘 기분이 좋았던 순간이 있었나요?',
  },
  cloudy: {
    label: '☁️ 흐림',
    question: '오늘 가장 신경 쓰였던 일은 무엇이었나요?',
  },
  rainy: {
    label: '🌧️ 비',
    question: '오늘 마음이 무거웠던 이유가 있었나요?',
  },
};

const speechThreshold = 1500;
const silenceThreshold = 800;
const silenceDurationMs = 5000;
const maxRecordingTimeMs = 120000;
const amplitudePollingMs = 300;

type VoiceLevel = 'quiet' | 'normal' | 'loud';

type VoiceRecordScreenProps = {
  mood: WeatherMood;
  onBackToWeather: () => void;
};

function VoiceRecordScreen({ mood, onBackToWeather }: VoiceRecordScreenProps) {
  const [recordingStatus, setRecordingStatus] =
    useState<RecordingStatus>('waitingForSpeech');
  const [elapsedRecordingTime, setElapsedRecordingTime] = useState(0);
  const [recordingFilePath, setRecordingFilePath] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSilenceDetected, setIsSilenceDetected] = useState(false);
  const [voiceLevel, setVoiceLevel] = useState<VoiceLevel>('quiet');

  const maxRecordingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const elapsedTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const amplitudeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const silenceStartedAtRef = useRef<number | null>(null);
  const isStoppingRef = useRef(false);

  const selectedContent = moodContents[mood];
  const isRecording = recordingStatus === 'recording';
  const isSaved = recordingStatus === 'saved';
  const isCancelled = recordingStatus === 'cancelled';
  const canCancelRecording =
    recordingStatus === 'waitingForSpeech' || recordingStatus === 'recording';

  const statusMessage = useMemo(() => {
    if (isRecording) {
      if (isSilenceDetected) {
        return '말씀이 잠시 멈췄어요.\n5초 후 자동으로 저장돼요.';
      }

      return '듣고 있어요.\n편하게 말씀해주세요.';
    }

    if (isSaved) {
      return '녹음이 완료되었어요.\n오늘 기록이 저장되었어요.';
    }

    if (isCancelled) {
      return '녹음을 취소했어요.\n오늘 기분은 이미 선택되어 있어요.';
    }

    return '질문을 보고 천천히 말씀해주세요.\n말씀을 시작하면 자동으로 녹음돼요.';
  }, [isCancelled, isRecording, isSaved, isSilenceDetected]);

  useEffect(() => {
    startRealRecording();

    return () => {
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (!isRecording) {
      return;
    }

    maxRecordingTimerRef.current = setTimeout(() => {
      stopRealRecording();
    }, maxRecordingTimeMs);

    elapsedTimerRef.current = setInterval(() => {
      setElapsedRecordingTime(currentTime => currentTime + 1);
    }, 1000);

    return () => {
      clearRecordingTimers();
    };
  }, [isRecording]);

  useEffect(() => {
    if (recordingStatus !== 'waitingForSpeech' && !isRecording) {
      return;
    }

    amplitudeTimerRef.current = setInterval(() => {
      checkAmplitude();
    }, amplitudePollingMs);

    return () => {
      if (amplitudeTimerRef.current) {
        clearInterval(amplitudeTimerRef.current);
      }
    };
  }, [isRecording, recordingStatus]);

  const requestMicrophonePermission = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: '마이크 권한이 필요해요',
        message: '오늘의 이야기를 녹음하기 위해 마이크 권한이 필요합니다.',
        buttonPositive: '허용',
        buttonNegative: '거부',
      },
    );

    return result === PermissionsAndroid.RESULTS.GRANTED;
  };

  const startRealRecording = async () => {
    try {
      setErrorMessage('');

      if (!VoiceRecorder) {
        setErrorMessage('Android 녹음 모듈을 찾을 수 없어요.');
        setRecordingStatus('cancelled');
        return;
      }

      const hasPermission = await requestMicrophonePermission();

      if (!hasPermission) {
        setErrorMessage('마이크 권한이 거부되었어요.');
        setRecordingStatus('cancelled');
        return;
      }

      const filePath = await VoiceRecorder.startRecording();
      setRecordingFilePath(filePath);
      setElapsedRecordingTime(0);
      setIsSilenceDetected(false);
      setVoiceLevel('quiet');
      setRecordingStatus('waitingForSpeech');
    } catch (error) {
      setErrorMessage('녹음을 시작하지 못했어요.');
      setRecordingStatus('cancelled');
    }
  };

  const stopRealRecording = async () => {
    try {
      if (isStoppingRef.current) {
        return;
      }

      isStoppingRef.current = true;
      clearRecordingTimers();

      if (!VoiceRecorder) {
        setErrorMessage('Android 녹음 모듈을 찾을 수 없어요.');
        setRecordingStatus('cancelled');
        return;
      }

      const filePath = await VoiceRecorder.stopRecording();
      setRecordingFilePath(filePath);
      setIsSilenceDetected(false);
      setRecordingStatus('saved');
    } catch (error) {
      setErrorMessage('녹음을 저장하지 못했어요.');
      setRecordingStatus('cancelled');
    } finally {
      isStoppingRef.current = false;
    }
  };

  const clearTimers = () => {
    clearRecordingTimers();
  };

  const clearRecordingTimers = () => {
    if (maxRecordingTimerRef.current) {
      clearTimeout(maxRecordingTimerRef.current);
    }

    if (elapsedTimerRef.current) {
      clearInterval(elapsedTimerRef.current);
    }

    if (amplitudeTimerRef.current) {
      clearInterval(amplitudeTimerRef.current);
    }
  };

  const checkAmplitude = async () => {
    try {
      const currentAmplitude = (await VoiceRecorder?.getMaxAmplitude()) ?? 0;
      const now = Date.now();

      if (recordingStatus === 'waitingForSpeech') {
        if (currentAmplitude >= speechThreshold) {
          setVoiceLevel(getVoiceLevel(currentAmplitude));
          setRecordingStatus('recording');
        }
        return;
      }

      if (!isRecording) {
        return;
      }

      if (currentAmplitude <= silenceThreshold) {
        if (!silenceStartedAtRef.current) {
          silenceStartedAtRef.current = now;
          setIsSilenceDetected(true);
          setVoiceLevel('quiet');
          return;
        }

        if (now - silenceStartedAtRef.current >= silenceDurationMs) {
          stopRealRecording();
        }
        return;
      }

      silenceStartedAtRef.current = null;
      setIsSilenceDetected(false);
      setVoiceLevel(getVoiceLevel(currentAmplitude));
    } catch (error) {
      // Keep listening on transient amplitude read failures.
    }
  };

  const getVoiceLevel = (currentAmplitude: number): VoiceLevel => {
    if (currentAmplitude >= 8000) {
      return 'loud';
    }

    if (currentAmplitude >= speechThreshold) {
      return 'normal';
    }

    return 'quiet';
  };

  const handleCancelRecording = async () => {
    clearTimers();
    await VoiceRecorder?.cancelRecording().catch(() => undefined);
    setIsSilenceDetected(false);
    setRecordingStatus('cancelled');
  };

  return (
    <SafeAreaView style={voiceRecordScreenStyles.safeArea}>
      <View style={voiceRecordScreenStyles.container}>
        <View
          style={[
            voiceRecordScreenStyles.statusCard,
            isRecording && voiceRecordScreenStyles.recordingCard,
            isRecording &&
              voiceLevel === 'normal' &&
              voiceRecordScreenStyles.recordingCardNormal,
            isRecording &&
              voiceLevel === 'loud' &&
              voiceRecordScreenStyles.recordingCardLoud,
            isRecording &&
              isSilenceDetected &&
              voiceRecordScreenStyles.silenceCard,
          ]}
        >
          {isRecording && (
            <View
              style={[
                voiceRecordScreenStyles.voiceLevelBar,
                voiceLevel === 'normal' &&
                  voiceRecordScreenStyles.voiceLevelBarNormal,
                voiceLevel === 'loud' &&
                  voiceRecordScreenStyles.voiceLevelBarLoud,
                isSilenceDetected &&
                  voiceRecordScreenStyles.voiceLevelBarQuiet,
              ]}
            />
          )}

          <Text style={voiceRecordScreenStyles.moodText}>
            {selectedContent.label}
          </Text>
          <Text style={voiceRecordScreenStyles.questionText}>
            {selectedContent.question}
          </Text>
          <Text style={voiceRecordScreenStyles.statusText}>{statusMessage}</Text>

          {isRecording && (
            <Text style={voiceRecordScreenStyles.timerText}>
              녹음 시간 {elapsedRecordingTime}초
            </Text>
          )}

          {isSaved && recordingFilePath.length > 0 && (
            <Text style={voiceRecordScreenStyles.filePathText}>
              기록 파일이 저장되었어요.
            </Text>
          )}

          {errorMessage.length > 0 && (
            <Text style={voiceRecordScreenStyles.errorText}>{errorMessage}</Text>
          )}
        </View>

        {canCancelRecording && (
          <Pressable
            style={({ pressed }) => [
              voiceRecordScreenStyles.cancelButton,
              pressed && voiceRecordScreenStyles.buttonPressed,
            ]}
            onPress={handleCancelRecording}
            accessibilityRole="button"
            accessibilityLabel="녹음 취소 버튼"
          >
            <Text style={voiceRecordScreenStyles.cancelButtonText}>녹음 취소</Text>
          </Pressable>
        )}

        <Pressable
          style={({ pressed }) => [
            voiceRecordScreenStyles.backButton,
            pressed && voiceRecordScreenStyles.buttonPressed,
          ]}
          onPress={onBackToWeather}
          accessibilityRole="button"
          accessibilityLabel="이전 화면으로 돌아가기 버튼"
        >
          <Text style={voiceRecordScreenStyles.backButtonText}>
            이전 화면으로 돌아가기
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default VoiceRecordScreen;
