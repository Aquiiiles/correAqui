import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME, FONT_FAMILY, BASE } from '../constants/tokens';

interface AvatarStackProps {
  people: string[];
  count: number;
  size?: number;
  unit?: 'times';
}

export function AvatarStack({ people, count, size = 26, unit }: AvatarStackProps) {
  const shown = people.slice(0, 4);
  const unitLabel = unit === 'times' ? 'times' : '';

  return (
    <View style={styles.container}>
      <View style={styles.avatars}>
        {shown.map((initials, i) => (
          <View
            key={i}
            style={[
              styles.avatar,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                marginLeft: i === 0 ? 0 : -8,
                zIndex: shown.length - i,
              },
            ]}
          >
            <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
              {initials}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.count}>
        {count} {unit === 'times' ? 'times' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatars: {
    flexDirection: 'row',
  },
  avatar: {
    backgroundColor: THEME.tint,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  initials: {
    fontFamily: FONT_FAMILY.hanken.bold,
    color: THEME.tintInk,
  },
  count: {
    fontFamily: FONT_FAMILY.hanken.semiBold,
    fontSize: 12,
    color: BASE.ink2,
  },
});
