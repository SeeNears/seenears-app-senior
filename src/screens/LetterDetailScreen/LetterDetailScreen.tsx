import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { commonStyles } from '../../style/common';
import { type LetterRecord } from '../LetterBoxScreen/LetterBoxScreen';
import { type WeatherMood } from '../WeatherScreen/WeatherScreen';

type LetterDetailScreenProps = {
  record: LetterRecord;
  onBackToLetterBox: () => void;
};

const moodIcons: Record<WeatherMood, string> = {
  sunny: '☀️',
  cloudy: '☁️',
  rainy: '🌧️',
};

const moodLabels: Record<WeatherMood, string> = {
  sunny: '맑음',
  cloudy: '흐림',
  rainy: '비',
};

function LetterDetailScreen({
  record,
  onBackToLetterBox,
}: LetterDetailScreenProps) {
  const hasRecord = record.question.length > 0;

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>기록 상세</Text>
        <Text style={styles.dateText}>{record.date}</Text>

        {hasRecord ? (
          <View style={styles.detailBox}>
            <Text style={styles.sectionText}>
              기분: {moodIcons[record.mood]} {moodLabels[record.mood]}
            </Text>
            <Text style={styles.sectionText}>질문: {record.question}</Text>
            <Text style={styles.sectionText}>
              편지:{' '}
              {record.hasLetter
                ? record.letterContent ?? '편지 내용을 불러오지 못했어요.'
                : '아직 도착한 편지가 없어요.'}
            </Text>
          </View>
        ) : (
          <Text style={styles.contentText}>이 날짜에는 기록이 없어요.</Text>
        )}

        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && commonStyles.buttonPressed,
          ]}
          onPress={onBackToLetterBox}
          accessibilityRole="button"
          accessibilityLabel="우편함으로 돌아가기"
        >
          <Text style={styles.backButtonText}>우편함으로 돌아가기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#4A342A',
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  dateText: {
    color: '#735446',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
  },
  contentText: {
    color: '#4A342A',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 34,
    marginBottom: 32,
    textAlign: 'center',
  },
  detailBox: {
    borderWidth: 1,
    borderColor: '#E8B391',
    borderRadius: 18,
    backgroundColor: '#FFF7F1',
    padding: 20,
    marginBottom: 32,
  },
  sectionText: {
    color: '#4A342A',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 34,
    marginBottom: 16,
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

export default LetterDetailScreen;
