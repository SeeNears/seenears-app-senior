import { StyleSheet } from 'react-native';

import { commonColors, commonStyles } from './common';

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
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
  form: {
    gap: 16,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: commonColors.inputBorder,
    borderRadius: 8,
    backgroundColor: commonColors.white,
    color: commonColors.text,
    fontSize: 16,
    paddingHorizontal: 16,
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
