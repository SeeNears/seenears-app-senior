import React, { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { letterBoxScreenStyles } from '../../style/letterBoxScreen';
import { type WeatherMood } from '../WeatherScreen/WeatherScreen';

export type LetterRecord = {
  date: string;
  mood: WeatherMood;
  question: string;
  letterContent?: string;
  letterTitle?: string;
  letterCreatedAt?: string;
  hasLetter: boolean;
  isLetterRead: boolean;
};

type LetterBoxScreenProps = {
  onBackToWeather: () => void;
  onNavigateToLetterDetail: (record: LetterRecord) => void;
};

const mockRecords: LetterRecord[] = [
  {
    date: '2026-07-01',
    mood: 'sunny',
    question: '오늘 기분이 좋았던 순간이 있었나요?',
    letterTitle: '맑은 마음에게 도착한 편지',
    letterContent:
      '어제의 밝은 마음이 오늘에도 작은 힘이 되길 바라요. 좋은 순간을 기억한 것만으로도 충분히 잘 지내고 계신 거예요.',
    letterCreatedAt: '2026-07-02',
    hasLetter: true,
    isLetterRead: false,
  },
  {
    date: '2026-07-02',
    mood: 'cloudy',
    question: '오늘 가장 신경 쓰였던 일은 무엇이었나요?',
    hasLetter: false,
    isLetterRead: false,
  },
  {
    date: '2026-07-03',
    mood: 'rainy',
    question: '오늘 마음이 무거웠던 이유가 있었나요?',
    letterTitle: '비 오는 마음에게 도착한 편지',
    letterContent:
      '무거운 마음을 말로 꺼낸 것만으로도 잘 견뎌내신 거예요. 오늘은 따뜻한 차 한 잔으로 마음을 쉬게 해보세요.',
    letterCreatedAt: '2026-07-04',
    hasLetter: true,
    isLetterRead: true,
  },
];

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

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getMonthLabel(date: Date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

function getCalendarDays(currentMonth: Date) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Array<Date | null> = [];

  for (let index = 0; index < firstDay.getDay(); index += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day));
  }

  return days;
}

function LetterBoxScreen({
  onBackToWeather,
  onNavigateToLetterDetail,
}: LetterBoxScreenProps) {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [records, setRecords] = useState(mockRecords);

  const recordsByDate = useMemo(() => {
    return records.reduce<Record<string, LetterRecord>>((acc, record) => {
      acc[record.date] = record;
      return acc;
    }, {});
  }, [records]);

  const calendarDays = getCalendarDays(currentMonth);
  const isCurrentMonth =
    currentMonth.getFullYear() === today.getFullYear() &&
    currentMonth.getMonth() === today.getMonth();

  const handlePreviousMonth = () => {
    setCurrentMonth(
      month => new Date(month.getFullYear(), month.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    if (isCurrentMonth) {
      return;
    }

    setCurrentMonth(
      month => new Date(month.getFullYear(), month.getMonth() + 1, 1),
    );
  };

  const handleSelectDate = (dateKey: string) => {
    const record = recordsByDate[dateKey];
    const detailRecord =
      record ??
      ({
        date: dateKey,
        mood: 'sunny',
        question: '',
        hasLetter: false,
        isLetterRead: false,
      } satisfies LetterRecord);

    if (record?.hasLetter) {
      setRecords(currentRecords =>
        currentRecords.map(currentRecord =>
          currentRecord.date === record.date
            ? { ...currentRecord, isLetterRead: true }
            : currentRecord,
        ),
      );
    }

    onNavigateToLetterDetail(detailRecord);
  };

  return (
    <SafeAreaView style={letterBoxScreenStyles.safeArea}>
      <ScrollView
        style={letterBoxScreenStyles.scrollView}
        contentContainerStyle={letterBoxScreenStyles.scrollContent}
      >
        <Text style={letterBoxScreenStyles.title}>우편함</Text>
        <Text style={letterBoxScreenStyles.description}>
          지난 마음과 도착한 편지를 확인해보세요.
        </Text>

        <View style={letterBoxScreenStyles.monthHeader}>
          <Pressable
            style={({ pressed }) => [
              letterBoxScreenStyles.monthButton,
              pressed && letterBoxScreenStyles.buttonPressed,
            ]}
            onPress={handlePreviousMonth}
            accessibilityRole="button"
            accessibilityLabel="이전 달 보기"
          >
            <Text style={letterBoxScreenStyles.monthButtonText}>이전</Text>
          </Pressable>

          <Text style={letterBoxScreenStyles.monthText}>
            {getMonthLabel(currentMonth)}
          </Text>

          <Pressable
            style={({ pressed }) => [
              letterBoxScreenStyles.monthButton,
              isCurrentMonth && letterBoxScreenStyles.disabledButton,
              pressed && !isCurrentMonth && letterBoxScreenStyles.buttonPressed,
            ]}
            onPress={handleNextMonth}
            disabled={isCurrentMonth}
            accessibilityRole="button"
            accessibilityLabel="다음 달 보기"
          >
            <Text style={letterBoxScreenStyles.monthButtonText}>다음</Text>
          </Pressable>
        </View>

        <View style={letterBoxScreenStyles.calendarGrid}>
          {weekDays.map(day => (
            <Text key={day} style={letterBoxScreenStyles.weekDayText}>
              {day}
            </Text>
          ))}

          {calendarDays.map((day, index) => {
            if (!day) {
              return (
                <View
                  key={`empty-${index}`}
                  style={letterBoxScreenStyles.emptyDay}
                />
              );
            }

            const dateKey = getDateKey(day);
            const record = recordsByDate[dateKey];
            const isFutureDate = day > today;

            return (
              <Pressable
                key={dateKey}
                style={({ pressed }) => [
                  letterBoxScreenStyles.dayCell,
                  isFutureDate && letterBoxScreenStyles.disabledDayCell,
                  pressed && !isFutureDate && letterBoxScreenStyles.buttonPressed,
                ]}
                onPress={() => handleSelectDate(dateKey)}
                disabled={isFutureDate}
                accessibilityRole="button"
                accessibilityLabel={`${dateKey} 날짜${
                  record
                    ? `, 기분 ${moodLabels[record.mood]}${
                        record.hasLetter ? ', 편지 있음' : ', 편지 없음'
                      }${record.hasLetter && !record.isLetterRead ? ', 읽지 않음' : ''}`
                    : ', 기록 없음'
                }`}
              >
                <Text style={letterBoxScreenStyles.dayText}>
                  {day.getDate()}
                </Text>
                {record && (
                  <Text style={letterBoxScreenStyles.dayIconText}>
                    {moodIcons[record.mood]}
                    {record.hasLetter ? ' 💌' : ''}
                  </Text>
                )}
                {record?.hasLetter && !record.isLetterRead && (
                  <View style={letterBoxScreenStyles.unreadBadge} />
                )}
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={({ pressed }) => [
            letterBoxScreenStyles.backButton,
            pressed && letterBoxScreenStyles.buttonPressed,
          ]}
          onPress={onBackToWeather}
          accessibilityRole="button"
          accessibilityLabel="오늘 화면으로 돌아가기"
        >
          <Text style={letterBoxScreenStyles.backButtonText}>
            오늘 화면으로 돌아가기
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LetterBoxScreen;
