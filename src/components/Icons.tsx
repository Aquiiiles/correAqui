import React from 'react';
import Svg, { Path, Circle, Line, Polyline } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
}

const d = { strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };

export function ChevronDown({ size = 16, color = '#000', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...d} stroke={color} strokeWidth={strokeWidth}>
      <Polyline points="6 9 12 15 18 9" />
    </Svg>
  );
}

export function Search({ size = 18, color = '#000', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...d} stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="11" cy="11" r="8" />
      <Line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Svg>
  );
}

export function Plus({ size = 20, color = '#fff', strokeWidth = 2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...d} stroke={color} strokeWidth={strokeWidth}>
      <Line x1="12" y1="5" x2="12" y2="19" />
      <Line x1="5" y1="12" x2="19" y2="12" />
    </Svg>
  );
}

export function Check({ size = 18, color = '#fff', strokeWidth = 2.2 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...d} stroke={color} strokeWidth={strokeWidth}>
      <Polyline points="20 6 9 17 4 12" />
    </Svg>
  );
}

export function Pin({ size = 14, color = '#000', strokeWidth = 1.5, fill: fillColor }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill={fillColor || 'none'}>
      <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <Circle cx="12" cy="10" r="3" fill={fillColor ? color : 'none'} />
    </Svg>
  );
}

export function Clock({ size = 14, color = '#000', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...d} stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="12" cy="12" r="10" />
      <Polyline points="12 6 12 12 16 14" />
    </Svg>
  );
}

export function Bookmark({ size = 22, color = '#000', strokeWidth = 1.5, fill: fillColor }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill={fillColor || 'none'}>
      <Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </Svg>
  );
}

export function Share({ size = 22, color = '#000', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...d} stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="18" cy="5" r="3" />
      <Circle cx="6" cy="12" r="3" />
      <Circle cx="18" cy="19" r="3" />
      <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </Svg>
  );
}

export function Back({ size = 22, color = '#000', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...d} stroke={color} strokeWidth={strokeWidth}>
      <Polyline points="15 18 9 12 15 6" />
    </Svg>
  );
}

export function Compass({ size = 24, color = '#000', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...d} stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="12" cy="12" r="10" />
      <Path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    </Svg>
  );
}

export function MapIcon({ size = 24, color = '#000', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...d} stroke={color} strokeWidth={strokeWidth}>
      <Path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
      <Line x1="8" y1="2" x2="8" y2="18" />
      <Line x1="16" y1="6" x2="16" y2="22" />
    </Svg>
  );
}

export function User({ size = 24, color = '#000', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...d} stroke={color} strokeWidth={strokeWidth}>
      <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <Circle cx="12" cy="7" r="4" />
    </Svg>
  );
}
