import { StyleSheet } from 'react-native';

export const commonColors = {
  background: '#F6F8FB',
  primary: '#2563EB',
  text: '#17202A',
  description: '#5A6573',
  white: '#FFFFFF',
  inputBorder: '#D7DDE5',
  placeholder: '#7C8794',
};

export const commonStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: commonColors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  screenTitle: {
    color: commonColors.text,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  screenDescription: {
    color: commonColors.description,
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  primaryButton: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: commonColors.primary,
  },
  buttonPressed: {
    opacity: 0.82,
  },
  buttonText: {
    color: commonColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
