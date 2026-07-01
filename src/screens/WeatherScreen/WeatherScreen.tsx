import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { weatherScreenStyles } from '../../style/weatherScreen';

export type WeatherMood = 'sunny' | 'cloudy' | 'rainy';

type WeatherScreenProps = {
  selectedMood: WeatherMood | null;
  onNavigateToVoiceRecord: (mood: WeatherMood) => void;
  onNavigateToLetterBox: () => void;
};

const moodOptions: Array<{
  mood: WeatherMood;
  label: string;
  description: string;
  accessibilityLabel: string;
}> = [
  {
    mood: 'sunny',
    label: '☀️ 맑음',
    description: '기분이 좋거나 편안해요',
    accessibilityLabel: '오늘 기분 맑음 선택',
  },
  {
    mood: 'cloudy',
    label: '☁️ 흐림',
    description: '조금 신경 쓰이는 일이 있어요',
    accessibilityLabel: '오늘 기분 흐림 선택',
  },
  {
    mood: 'rainy',
    label: '🌧️ 비',
    description: '마음이 무겁거나 슬퍼요',
    accessibilityLabel: '오늘 기분 비 선택',
  },
];

function WeatherScreen({
  selectedMood,
  onNavigateToVoiceRecord,
  onNavigateToLetterBox,
}: WeatherScreenProps) {
  const selectedMoodOption = moodOptions.find(
    option => option.mood === selectedMood,
  );

  return (
    <SafeAreaView style={weatherScreenStyles.safeArea}>
      <View style={weatherScreenStyles.container}>
        <View style={weatherScreenStyles.content}>
          {selectedMoodOption ? (
            <View style={weatherScreenStyles.selectedMoodCard}>
              <Text style={weatherScreenStyles.selectedMoodLabel}>
                오늘 선택한 기분
              </Text>
              <Text style={weatherScreenStyles.selectedMoodText}>
                {selectedMoodOption.label}
              </Text>
              <Text style={weatherScreenStyles.selectedMoodDescription}>
                오늘의 기록은 완료되었어요.
              </Text>
            </View>
          ) : (
            <>
              <Text style={weatherScreenStyles.title}>
                오늘 기분은 어떠신가요?
              </Text>

              <View style={weatherScreenStyles.moodButtonGroup}>
                {moodOptions.map(option => (
                  <Pressable
                    key={option.mood}
                    style={({ pressed }) => [
                      weatherScreenStyles.moodButton,
                      pressed && weatherScreenStyles.buttonPressed,
                    ]}
                    onPress={() => onNavigateToVoiceRecord(option.mood)}
                    accessibilityRole="button"
                    accessibilityLabel={option.accessibilityLabel}
                  >
                    <Text style={weatherScreenStyles.moodButtonText}>
                      {option.label}
                    </Text>
                    <Text style={weatherScreenStyles.moodDescription}>
                      {option.description}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </View>

        <Pressable
          style={({ pressed }) => [
            weatherScreenStyles.mailboxButton,
            pressed && weatherScreenStyles.buttonPressed,
          ]}
          onPress={onNavigateToLetterBox}
          accessibilityRole="button"
          accessibilityLabel="우편함 보기 버튼"
        >
          <Text style={weatherScreenStyles.mailboxButtonText}>우편함 보기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default WeatherScreen;
