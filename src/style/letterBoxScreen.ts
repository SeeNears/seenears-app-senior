import { StyleSheet } from 'react-native';

import { commonStyles } from './common';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  title: {
    color: '#4A342A',
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    color: '#735446',
    fontSize: 21,
    fontWeight: '600',
    lineHeight: 30,
    marginBottom: 18,
    textAlign: 'center',
  },
  monthHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  monthButton: {
    minHeight: 48,
    minWidth: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#F5BB96',
  },
  monthButtonText: {
    color: '#4A342A',
    fontSize: 18,
    fontWeight: '700',
  },
  monthText: {
    color: '#4A342A',
    fontSize: 24,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.4,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 22,
  },
  weekDayText: {
    width: '14.285%',
    color: '#735446',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyDay: {
    width: '14.285%',
    height: 74,
  },
  dayCell: {
    width: '14.285%',
    minHeight: 74,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0D0BD',
    backgroundColor: '#FFF7F1',
    position: 'relative',
  },
  selectedDayCell: {
    borderColor: '#B85C4A',
    backgroundColor: '#FCE3D2',
  },
  disabledDayCell: {
    opacity: 0.35,
  },
  dayText: {
    color: '#4A342A',
    fontSize: 25,
    fontWeight: '700',
  },
  dayIconText: {
    color: '#4A342A',
    fontSize: 22,
    marginTop: 6,
  },
  unreadBadge: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#B85C4A',
  },
  detailSection: {
    borderWidth: 1,
    borderColor: '#E8B391',
    borderRadius: 18,
    backgroundColor: '#FFF7F1',
    padding: 20,
    marginBottom: 18,
  },
  detailTitle: {
    color: '#4A342A',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
  },
  selectedDateText: {
    color: '#735446',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  recordBox: {
    gap: 12,
  },
  recordText: {
    color: '#4A342A',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
  },
  emptyRecordText: {
    color: '#735446',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
  },
  letterButton: {
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: '#F5BB96',
    marginTop: 8,
  },
  letterButtonText: {
    color: '#4A342A',
    fontSize: 23,
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

export const letterBoxScreenStyles = {
  safeArea: commonStyles.safeArea,
  buttonPressed: commonStyles.buttonPressed,
  ...styles,
};
