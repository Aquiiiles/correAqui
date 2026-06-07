import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SportKey } from '../types';
import { SPORTS, sportColors, FONT_FAMILY } from '../constants/tokens';

interface SportTagProps {
  sport: SportKey;
  solid?: boolean;
}

export function SportTag({ sport, solid = false }: SportTagProps) {
  const colors = sportColors(sport);
  const label = SPORTS[sport].label;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: solid ? 'rgba(255,255,255,0.88)' : colors.cover,
        },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: colors.ink }]} />
      <Text style={[styles.label, { color: colors.ink }]}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  label: {
    fontFamily: FONT_FAMILY.space.semiBold,
    fontSize: 11,
    letterSpacing: 0.5,
  },
});
