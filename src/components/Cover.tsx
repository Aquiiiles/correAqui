import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SportKey } from '../types';
import { SPORTS, sportColors, FONT_FAMILY } from '../constants/tokens';

interface CoverProps {
  sport: SportKey;
  height?: number;
  rounded?: boolean;
  big?: boolean;
}

export function Cover({ sport, height = 116, rounded = true, big = false }: CoverProps) {
  const colors = sportColors(sport);
  const label = SPORTS[sport].label;

  return (
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor: colors.cover,
          borderRadius: rounded ? 16 : 0,
        },
      ]}
    >
      <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.cover2, opacity: 0.4 }]} />
      <Text
        style={[
          styles.watermark,
          {
            color: colors.ink,
            fontSize: big ? 64 : 34,
            opacity: 0.16,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  watermark: {
    fontFamily: FONT_FAMILY.hanken.extraBold,
    position: 'absolute',
    bottom: 8,
    right: 12,
    textTransform: 'uppercase',
  },
});
