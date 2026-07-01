import { StyleSheet } from 'react-native';

import { commonStyles } from './common';

const styles = StyleSheet.create({
  statusCard: {
    borderWidth: 1,
    borderColor: '#E8B391',
    borderRadius: 22,
    backgroundColor: '#FFF7F1',
    paddingHorizontal: 24,
    paddingVertical: 30,
    marginBottom: 24,
  },
  recordingCard: {
    borderColor: '#F5BB96',
    backgroundColor: '#FCE3D2',
  },
  moodText: {
    color: '#735446',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 18,
    textAlign: 'center',
  },
  questionText: {
    color: '#4A342A',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 44,
    marginBottom: 28,
    textAlign: 'center',
  },
  statusText: {
    color: '#735446',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
  },
  timerText: {
    color: '#4A342A',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 18,
    textAlign: 'center',
  },
  cancelButton: {
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#B85C4A',
    marginBottom: 16,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  backButton: {
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#F5BB96',
  },
  backButtonText: {
    color: '#4A342A',
    fontSize: 24,
    fontWeight: '700',
  },
});

export const voiceRecordScreenStyles = {
  safeArea: commonStyles.safeArea,
  container: commonStyles.centerContainer,
  buttonPressed: commonStyles.buttonPressed,
  ...styles,
};
