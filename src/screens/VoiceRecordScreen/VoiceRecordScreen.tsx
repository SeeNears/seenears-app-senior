import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

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

const mockSpeechDetectionDelayMs = 1200;
const silenceTimeoutMs = 5000;
const maxRecordingTimeMs = 120000;

type VoiceRecordScreenProps = {
  mood: WeatherMood;
  onBackToWeather: () => void;
};

function VoiceRecordScreen({ mood, onBackToWeather }: VoiceRecordScreenProps) {
  const [recordingStatus, setRecordingStatus] =
    useState<RecordingStatus>('waitingForSpeech');
  const [elapsedRecordingTime, setElapsedRecordingTime] = useState(0);

  const speechDetectionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxRecordingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const elapsedTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selectedContent = moodContents[mood];
  const isRecording = recordingStatus === 'recording';
  const isSaved = recordingStatus === 'saved';
  const isCancelled = recordingStatus === 'cancelled';

  const statusMessage = useMemo(() => {
    if (isRecording) {
      return '듣고 있어요.\n편하게 말씀해주세요.';
    }

    if (isSaved) {
      return '녹음이 완료되었어요.\n오늘 기록이 저장되었어요.';
    }

    if (isCancelled) {
      return '녹음을 취소했어요.\n오늘 기분은 이미 선택되어 있어요.';
    }

    return '질문을 보고 천천히 말씀해주세요.\n말씀을 시작하면 자동으로 녹음돼요.';
  }, [isCancelled, isRecording, isSaved]);

  useEffect(() => {
    speechDetectionTimerRef.current = setTimeout(() => {
      setRecordingStatus('recording');
    }, mockSpeechDetectionDelayMs);

    return () => {
      clearTimers();
    };
  }, []);

  useEffect(() => {
    if (!isRecording) {
      return;
    }

    silenceTimerRef.current = setTimeout(() => {
      setRecordingStatus('saved');
    }, silenceTimeoutMs);

    maxRecordingTimerRef.current = setTimeout(() => {
      setRecordingStatus('saved');
    }, maxRecordingTimeMs);

    elapsedTimerRef.current = setInterval(() => {
      setElapsedRecordingTime(currentTime => currentTime + 1);
    }, 1000);

    return () => {
      clearRecordingTimers();
    };
  }, [isRecording]);

  const clearTimers = () => {
    if (speechDetectionTimerRef.current) {
      clearTimeout(speechDetectionTimerRef.current);
    }

    clearRecordingTimers();
  };

  const clearRecordingTimers = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }

    if (maxRecordingTimerRef.current) {
      clearTimeout(maxRecordingTimerRef.current);
    }

    if (elapsedTimerRef.current) {
      clearInterval(elapsedTimerRef.current);
    }
  };

  const handleCancelRecording = () => {
    clearTimers();
    setRecordingStatus('cancelled');
  };

  return (
    <SafeAreaView style={voiceRecordScreenStyles.safeArea}>
      <View style={voiceRecordScreenStyles.container}>
        <View
          style={[
            voiceRecordScreenStyles.statusCard,
            isRecording && voiceRecordScreenStyles.recordingCard,
          ]}
        >
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
        </View>

        {isRecording && (
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
