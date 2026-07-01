import React, { useState } from 'react';

import CalendarScreen from '../screens/CalendarScreen';
import LetterBoxScreen, {
  type LetterRecord,
} from '../screens/LetterBoxScreen/LetterBoxScreen';
import LetterDetailScreen from '../screens/LetterDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import VoiceRecordScreen from '../screens/VoiceRecordScreen';
import WeatherScreen, {
  type WeatherMood,
} from '../screens/WeatherScreen/WeatherScreen';

type ScreenName =
  | 'Login'
  | 'Weather'
  | 'VoiceRecord'
  | 'Calendar'
  | 'LetterBox'
  | 'LetterDetail';

function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Login');
  const [selectedMood, setSelectedMood] = useState<WeatherMood>('sunny');
  const [selectedLetterRecord, setSelectedLetterRecord] =
    useState<LetterRecord | null>(null);

  const openLetterDetail = (record: LetterRecord) => {
    setSelectedLetterRecord(record);
    setCurrentScreen('LetterDetail');
  };

  if (currentScreen === 'Weather') {
    return (
      <WeatherScreen
        onNavigateToVoiceRecord={(mood: WeatherMood) => {
          setSelectedMood(mood);
          setCurrentScreen('VoiceRecord');
        }}
        onNavigateToLetterBox={() => setCurrentScreen('LetterBox')}
      />
    );
  }

  if (currentScreen === 'VoiceRecord') {
    return (
      <VoiceRecordScreen
        mood={selectedMood}
        onBackToWeather={() => setCurrentScreen('Weather')}
      />
    );
  }

  if (currentScreen === 'Calendar') {
    return <CalendarScreen onBackToWeather={() => setCurrentScreen('Weather')} />;
  }

  if (currentScreen === 'LetterBox') {
    return (
      <LetterBoxScreen
        onBackToWeather={() => setCurrentScreen('Weather')}
        onNavigateToLetterDetail={openLetterDetail}
      />
    );
  }

  if (currentScreen === 'LetterDetail') {
    if (!selectedLetterRecord) {
      return (
        <LetterBoxScreen
          onBackToWeather={() => setCurrentScreen('Weather')}
          onNavigateToLetterDetail={openLetterDetail}
        />
      );
    }

    return (
      <LetterDetailScreen
        record={selectedLetterRecord}
        onBackToLetterBox={() => setCurrentScreen('LetterBox')}
      />
    );
  }

  return <LoginScreen onLogin={() => setCurrentScreen('Weather')} />;
}

export default AppNavigator;
