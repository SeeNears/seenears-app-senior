import { StyleSheet } from 'react-native';

import { commonStyles } from './common';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#4A342A',
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 36,
    textAlign: 'center',
  },
  moodButtonGroup: {
    gap: 18,
  },
  moodButton: {
    minHeight: 96,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E8B391',
    borderRadius: 18,
    backgroundColor: '#FFF7F1',
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  moodButtonText: {
    color: '#4A342A',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 6,
  },
  moodDescription: {
    color: '#735446',
    fontSize: 20,
    fontWeight: '600',
  },
  selectedMoodCard: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8B391',
    borderRadius: 22,
    backgroundColor: '#FFF7F1',
    paddingHorizontal: 24,
    paddingVertical: 34,
  },
  selectedMoodLabel: {
    color: '#735446',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 18,
  },
  selectedMoodText: {
    color: '#4A342A',
    fontSize: 44,
    fontWeight: '700',
    marginBottom: 18,
  },
  selectedMoodDescription: {
    color: '#735446',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 34,
    textAlign: 'center',
  },
  mailboxButton: {
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#F5BB96',
    marginTop: 24,
  },
  mailboxButtonText: {
    color: '#4A342A',
    fontSize: 24,
    fontWeight: '700',
  },
});

export const weatherScreenStyles = {
  safeArea: commonStyles.safeArea,
  container: commonStyles.centerContainer,
  buttonPressed: commonStyles.buttonPressed,
  ...styles,
};
