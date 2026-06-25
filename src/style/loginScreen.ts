import { StyleSheet } from 'react-native';

import { commonColors, commonStyles } from './common';

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logo: {
    width: 112,
    height: 112,
    marginBottom: 16,
  },
  title: {
    color: commonColors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  messageContainer: {
    marginBottom: 32,
  },
  greeting: {
    color: commonColors.text,
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  guideText: {
    color: commonColors.description,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  form: {
    gap: 18,
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderColor: commonColors.inputBorder,
    borderRadius: 14,
    backgroundColor: commonColors.white,
    color: commonColors.text,
    fontSize: 20,
    paddingHorizontal: 18,
  },
  disabledButton: {
    opacity: 0.45,
  },
});

export const loginPlaceholderColor = commonColors.placeholder;

export const loginScreenStyles = {
  safeArea: commonStyles.safeArea,
  container: commonStyles.centerContainer,
  button: commonStyles.primaryButton,
  buttonPressed: commonStyles.buttonPressed,
  buttonText: commonStyles.buttonText,
  ...styles,
};
