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
    overflow: 'hidden',
  },
  recordingCard: {
    borderColor: '#F5BB96',
    backgroundColor: '#FCE3D2',
  },
  recordingCardNormal: {
    borderColor: '#F1A977',
    backgroundColor: '#FAD1B8',
  },
  recordingCardLoud: {
    borderColor: '#E89161',
    backgroundColor: '#F7BE9C',
  },
  silenceCard: {
    borderColor: '#D7C1B2',
    backgroundColor: '#F7EFE9',
  },
  voiceLevelBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: '#F5BB96',
  },
  voiceLevelBarQuiet: {
    backgroundColor: '#D7C1B2',
  },
  voiceLevelBarNormal: {
    backgroundColor: '#F1A977',
  },
  voiceLevelBarLoud: {
    backgroundColor: '#E89161',
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
  filePathText: {
    color: '#735446',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 16,
    textAlign: 'center',
  },
  errorText: {
    color: '#B85C4A',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    marginTop: 16,
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
