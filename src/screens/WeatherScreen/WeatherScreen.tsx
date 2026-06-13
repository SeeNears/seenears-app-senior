import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { weatherScreenStyles } from '../../style/weatherScreen';

type WeatherScreenProps = {
  onNavigateToVoiceRecord: () => void;
  onNavigateToCalendar: () => void;
};

function WeatherScreen({
  onNavigateToVoiceRecord,
  onNavigateToCalendar,
}: WeatherScreenProps) {
  return (
    <SafeAreaView style={weatherScreenStyles.safeArea}>
      <View style={weatherScreenStyles.container}>
        <Text style={weatherScreenStyles.title}>Weather</Text>
        <Text style={weatherScreenStyles.description}>오늘의 날씨 화면입니다.</Text>

        <View style={weatherScreenStyles.buttonGroup}>
          <Pressable
            style={({ pressed }) => [
              weatherScreenStyles.button,
              pressed && weatherScreenStyles.buttonPressed,
            ]}
            onPress={onNavigateToVoiceRecord}
            accessibilityRole="button"
            accessibilityLabel="Go to voice record screen"
          >
            <Text style={weatherScreenStyles.buttonText}>Voice Record</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              weatherScreenStyles.button,
              weatherScreenStyles.secondaryButton,
              pressed && weatherScreenStyles.buttonPressed,
            ]}
            onPress={onNavigateToCalendar}
            accessibilityRole="button"
            accessibilityLabel="Go to calendar screen"
          >
            <Text style={weatherScreenStyles.buttonText}>Calendar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default WeatherScreen;
