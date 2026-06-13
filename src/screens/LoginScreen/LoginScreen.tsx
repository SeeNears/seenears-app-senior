import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  loginPlaceholderColor,
  loginScreenStyles,
} from '../../style/loginScreen';

type LoginScreenProps = {
  onLogin: () => void;
};

function LoginScreen({ onLogin }: LoginScreenProps) {
  const [id, setId] = useState('');

  const handleLogin = () => {
    onLogin();
  };

  return (
    <SafeAreaView style={loginScreenStyles.safeArea}>
      <View style={loginScreenStyles.container}>
        <View style={loginScreenStyles.logoContainer}>
          <Image
            source={require('../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')}
            style={loginScreenStyles.logo}
            resizeMode="contain"
            accessibilityLabel="Seenears logo"
          />
          <Text style={loginScreenStyles.title}>Seenears</Text>
        </View>

        <View style={loginScreenStyles.form}>
          <TextInput
            style={loginScreenStyles.input}
            value={id}
            onChangeText={setId}
            placeholder="ID"
            placeholderTextColor={loginPlaceholderColor}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="done"
            accessibilityLabel="ID input"
          />

          <Pressable
            style={({ pressed }) => [
              loginScreenStyles.button,
              pressed && loginScreenStyles.buttonPressed,
            ]}
            onPress={handleLogin}
            accessibilityRole="button"
            accessibilityLabel="Login button"
          >
            <Text style={loginScreenStyles.buttonText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
