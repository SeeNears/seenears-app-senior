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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationRequested, setIsVerificationRequested] = useState(false);

  const isVerificationButtonEnabled = phoneNumber.length > 0;
  const isLoginButtonEnabled =
    isVerificationRequested && phoneNumber.length > 0 && verificationCode.length === 6;

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text.replace(/[^0-9]/g, ''));
  };

  const handleVerificationCodeChange = (text: string) => {
    setVerificationCode(text.replace(/[^0-9]/g, '').slice(0, 6));
  };

  const handleVerificationRequest = () => {
    if (!isVerificationButtonEnabled) {
      return;
    }

    setIsVerificationRequested(true);
  };

  const handleLogin = () => {
    if (!isLoginButtonEnabled) {
      return;
    }

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
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            placeholder="전화번호를 입력해주세요"
            placeholderTextColor={loginPlaceholderColor}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            returnKeyType="done"
            accessibilityLabel="전화번호 입력"
          />

          <Pressable
            style={({ pressed }) => [
              loginScreenStyles.button,
              !isVerificationButtonEnabled && loginScreenStyles.disabledButton,
              pressed &&
                isVerificationButtonEnabled &&
                loginScreenStyles.buttonPressed,
            ]}
            onPress={handleVerificationRequest}
            disabled={!isVerificationButtonEnabled}
            accessibilityRole="button"
            accessibilityLabel="인증번호 요청 버튼"
          >
            <Text style={loginScreenStyles.buttonText}>인증번호 받기</Text>
          </Pressable>

          {isVerificationRequested && (
            <TextInput
              style={loginScreenStyles.input}
              value={verificationCode}
              onChangeText={handleVerificationCodeChange}
              placeholder="인증번호 6자리를 입력해주세요"
              placeholderTextColor={loginPlaceholderColor}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={6}
              returnKeyType="done"
              accessibilityLabel="인증번호 입력"
            />
          )}

          <Pressable
            style={({ pressed }) => [
              loginScreenStyles.button,
              !isLoginButtonEnabled && loginScreenStyles.disabledButton,
              pressed && isLoginButtonEnabled && loginScreenStyles.buttonPressed,
            ]}
            onPress={handleLogin}
            disabled={!isLoginButtonEnabled}
            accessibilityRole="button"
            accessibilityLabel="로그인 버튼"
          >
            <Text style={loginScreenStyles.buttonText}>로그인</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
