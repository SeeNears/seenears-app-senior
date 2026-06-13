import { StyleSheet } from 'react-native';

import { commonStyles } from './common';

const styles = StyleSheet.create({});

export const voiceRecordScreenStyles = {
  safeArea: commonStyles.safeArea,
  container: commonStyles.centerContainer,
  title: commonStyles.screenTitle,
  description: commonStyles.screenDescription,
  button: commonStyles.primaryButton,
  buttonPressed: commonStyles.buttonPressed,
  buttonText: commonStyles.buttonText,
  ...styles,
};
