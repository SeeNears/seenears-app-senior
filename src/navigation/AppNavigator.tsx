import React, { useState } from 'react';

import CalendarScreen from '../screens/CalendarScreen';
import LoginScreen from '../screens/LoginScreen';
import VoiceRecordScreen from '../screens/VoiceRecordScreen';
import WeatherScreen from '../screens/WeatherScreen';

type ScreenName = 'Login' | 'Weather' | 'VoiceRecord' | 'Calendar';

function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Login');

  if (currentScreen === 'Weather') {
    return (
      <WeatherScreen
        onNavigateToVoiceRecord={() => setCurrentScreen('VoiceRecord')}
        onNavigateToCalendar={() => setCurrentScreen('Calendar')}
      />
    );
  }

  if (currentScreen === 'VoiceRecord') {
    return <VoiceRecordScreen onBackToWeather={() => setCurrentScreen('Weather')} />;
  }

  if (currentScreen === 'Calendar') {
    return <CalendarScreen onBackToWeather={() => setCurrentScreen('Weather')} />;
  }

  return <LoginScreen onLogin={() => setCurrentScreen('Weather')} />;
}

export default AppNavigator;
