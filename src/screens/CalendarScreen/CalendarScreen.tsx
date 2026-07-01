import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { calendarScreenStyles } from '../../style/calendarScreen';

type CalendarScreenProps = {
  onBackToWeather: () => void;
};

function CalendarScreen({ onBackToWeather }: CalendarScreenProps) {
  return (
    <SafeAreaView style={calendarScreenStyles.safeArea}>
      <View style={calendarScreenStyles.container}>
        <Text style={calendarScreenStyles.title}>Calendar</Text>
        <Text style={calendarScreenStyles.description}>캘린더 화면입니다.</Text>

        <Pressable
          style={({ pressed }) => [
            calendarScreenStyles.button,
            pressed && calendarScreenStyles.buttonPressed,
          ]}
          onPress={onBackToWeather}
          accessibilityRole="button"
          accessibilityLabel="Back to weather screen"
        >
          <Text style={calendarScreenStyles.buttonText}>Back to Weather</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default CalendarScreen;
