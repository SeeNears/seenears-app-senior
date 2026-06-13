import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { voiceRecordScreenStyles } from '../../style/voiceRecordScreen';

type VoiceRecordScreenProps = {
  onBackToWeather: () => void;
};

function VoiceRecordScreen({ onBackToWeather }: VoiceRecordScreenProps) {
  return (
    <SafeAreaView style={voiceRecordScreenStyles.safeArea}>
      <View style={voiceRecordScreenStyles.container}>
        <Text style={voiceRecordScreenStyles.title}>Voice Record</Text>
        <Text style={voiceRecordScreenStyles.description}>음성 녹음 ㄴㅇㅇ화면입니다.</Text>

        <Pressable
          style={({ pressed }) => [
            voiceRecordScreenStyles.button,
            pressed && voiceRecordScreenStyles.buttonPressed,
          ]}
          onPress={onBackToWeather}
          accessibilityRole="button"
          accessibilityLabel="Back to weather screen"
        >
          <Text style={voiceRecordScreenStyles.buttonText}>Back to Weather</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default VoiceRecordScreen;
