import { StyleSheet } from 'react-native';

import { commonStyles } from './common';

const styles = StyleSheet.create({
  buttonGroup: {
    gap: 14,
  },
  secondaryButton: {
    backgroundColor: '#0F766E',
  },
});

export const weatherScreenStyles = {
  safeArea: commonStyles.safeArea,
  container: commonStyles.centerContainer,
  title: commonStyles.screenTitle,
  description: commonStyles.screenDescription,
  button: commonStyles.primaryButton,
  buttonPressed: commonStyles.buttonPressed,
  buttonText: commonStyles.buttonText,
  ...styles,
};
