import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BASE, THEME, FONT_FAMILY, SPACING } from '../constants/tokens';

interface ChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export function Chip({ label, active, onPress }: ChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.chip,
        active
          ? { backgroundColor: THEME.accent }
          : { backgroundColor: BASE.soft },
      ]}
    >
      <Text
        style={[
          styles.label,
          { color: active ? THEME.onAccent : BASE.ink2 },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: SPACING.chipRadius,
  },
  label: {
    fontFamily: FONT_FAMILY.hanken.semiBold,
    fontSize: 14,
  },
});
