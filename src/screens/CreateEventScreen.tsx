import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { SportKey } from '../types';
import { BASE, THEME, FONT_FAMILY, SPACING, SHADOWS, SPORTS } from '../constants/tokens';
import { Check, Plus } from '../components/Icons';

interface CreateEventScreenProps {
  onCancel: () => void;
  onPublish: (data: CreateEventData) => void;
}

export interface CreateEventData {
  sport: SportKey;
  title: string;
  date: string;
  time: string;
  local: string;
  meta: string;
  level: string;
  free: boolean;
  price: string;
  spots: string;
  blurb: string;
}

const SPORT_OPTIONS = Object.entries(SPORTS) as [SportKey, { label: string; hue: number }][];
const LEVELS = ['Iniciante', 'Todos', 'Competitivo'];

export function CreateEventScreen({ onCancel, onPublish }: CreateEventScreenProps) {
  const [sport, setSport] = useState<SportKey | null>(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [local, setLocal] = useState('');
  const [meta, setMeta] = useState('');
  const [level, setLevel] = useState('Todos');
  const [free, setFree] = useState(false);
  const [price, setPrice] = useState('');
  const [spots, setSpots] = useState('');
  const [blurb, setBlurb] = useState('');

  const canPublish = sport && title.trim() && local.trim();

  const handlePublish = () => {
    if (!canPublish || !sport) return;
    onPublish({
      sport,
      title: title.trim(),
      date,
      time,
      local: local.trim(),
      meta,
      level,
      free,
      price: free ? 'Grátis' : price,
      spots,
      blurb,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} activeOpacity={0.7}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Criar evento</Text>
        <View style={{ width: 56 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>
          Tira a sua pelada ou corrida do grupo de WhatsApp e coloca no mapa. Leva 1 minuto.
        </Text>

        {/* Sport */}
        <FieldWrapper label="Esporte" required>
          <View style={styles.sportGrid}>
            {SPORT_OPTIONS.map(([key, val]) => (
              <TouchableOpacity
                key={key}
                onPress={() => setSport(key)}
                activeOpacity={0.7}
                style={[
                  styles.sportBtn,
                  sport === key
                    ? { borderColor: THEME.accent, borderWidth: 1.5, backgroundColor: THEME.tint }
                    : { borderColor: BASE.line, borderWidth: 1, backgroundColor: BASE.surface },
                ]}
              >
                <Text
                  style={[
                    styles.sportBtnText,
                    { color: sport === key ? THEME.tintInk : BASE.ink2 },
                  ]}
                >
                  {val.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </FieldWrapper>

        {/* Title */}
        <FieldWrapper label="Título" required>
          <TextInput
            style={styles.input}
            placeholder="Ex: Pelada de quinta no Society"
            placeholderTextColor={BASE.ink3}
            value={title}
            onChangeText={setTitle}
          />
        </FieldWrapper>

        {/* Date + Time */}
        <View style={styles.dateTimeRow}>
          <View style={{ flex: 1.3 }}>
            <FieldWrapper label="Data">
              <TextInput
                style={[styles.input, styles.monoInput]}
                placeholder="13 jun"
                placeholderTextColor={BASE.ink3}
                value={date}
                onChangeText={setDate}
              />
            </FieldWrapper>
          </View>
          <View style={{ flex: 1 }}>
            <FieldWrapper label="Hora">
              <TextInput
                style={[styles.input, styles.monoInput]}
                placeholder="20:00"
                placeholderTextColor={BASE.ink3}
                value={time}
                onChangeText={setTime}
              />
            </FieldWrapper>
          </View>
        </View>

        {/* Local */}
        <FieldWrapper label="Local" required>
          <TextInput
            style={styles.input}
            placeholder="Bairro, quadra ou ponto de encontro"
            placeholderTextColor={BASE.ink3}
            value={local}
            onChangeText={setLocal}
          />
        </FieldWrapper>

        {/* Meta */}
        <FieldWrapper label="Formato / distância" hint="opcional">
          <TextInput
            style={styles.input}
            placeholder="Ex: Society 7v7 · 5K · 10K · 40 km"
            placeholderTextColor={BASE.ink3}
            value={meta}
            onChangeText={setMeta}
          />
        </FieldWrapper>

        {/* Level */}
        <FieldWrapper label="Nível">
          <View style={styles.segmentedContainer}>
            {LEVELS.map((l) => (
              <TouchableOpacity
                key={l}
                onPress={() => setLevel(l)}
                activeOpacity={0.7}
                style={[
                  styles.segmentedOption,
                  level === l && styles.segmentedActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentedText,
                    level === l && styles.segmentedTextActive,
                  ]}
                >
                  {l}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </FieldWrapper>

        {/* Price */}
        <FieldWrapper label="Valor">
          <View style={styles.priceRow}>
            <TouchableOpacity
              onPress={() => setFree(!free)}
              activeOpacity={0.7}
              style={[
                styles.freeToggle,
                free
                  ? { borderColor: THEME.accent, backgroundColor: THEME.tint }
                  : { borderColor: BASE.line, backgroundColor: BASE.surface },
              ]}
            >
              {free && <Check size={16} color={THEME.accent} />}
              <Text
                style={[
                  styles.freeToggleText,
                  { color: free ? THEME.tintInk : BASE.ink2 },
                ]}
              >
                Grátis
              </Text>
            </TouchableOpacity>
            <TextInput
              style={[
                styles.input,
                styles.monoInput,
                { flex: 1, opacity: free ? 0.4 : 1 },
              ]}
              placeholder="valor em R$"
              placeholderTextColor={BASE.ink3}
              value={price}
              onChangeText={setPrice}
              editable={!free}
              keyboardType="numeric"
            />
          </View>
        </FieldWrapper>

        {/* Spots */}
        <FieldWrapper label="Vagas" hint="opcional">
          <TextInput
            style={[styles.input, styles.monoInput]}
            placeholder="deixe em branco se for ilimitado"
            placeholderTextColor={BASE.ink3}
            value={spots}
            onChangeText={setSpots}
            keyboardType="numeric"
          />
        </FieldWrapper>

        {/* Blurb */}
        <FieldWrapper label="Sobre o evento" hint="opcional">
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Como funciona, o que levar, regras…"
            placeholderTextColor={BASE.ink3}
            value={blurb}
            onChangeText={setBlurb}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </FieldWrapper>
      </ScrollView>

      {/* Publish CTA */}
      <View style={styles.ctaBar}>
        <TouchableOpacity
          style={[
            styles.publishBtn,
            canPublish ? styles.publishBtnEnabled : styles.publishBtnDisabled,
          ]}
          activeOpacity={canPublish ? 0.8 : 1}
          onPress={handlePublish}
        >
          {canPublish && <Plus size={16} color={THEME.onAccent} />}
          <Text
            style={[
              styles.publishBtnText,
              { color: canPublish ? THEME.onAccent : BASE.ink3 },
            ]}
          >
            {canPublish ? 'Publicar evento' : 'Escolha esporte, título e local'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function FieldWrapper({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <View style={styles.fieldHeader}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {hint && <Text style={styles.fieldHint}>{hint}</Text>}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BASE.bg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 58 : 42,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: 'rgba(250,249,246,0.92)',
  },
  cancelText: {
    fontFamily: FONT_FAMILY.hanken.semiBold,
    fontSize: 15,
    color: BASE.ink2,
  },
  headerTitle: {
    fontFamily: FONT_FAMILY.hanken.extraBold,
    fontSize: 16,
    color: BASE.ink,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.screenPadding,
    paddingBottom: 100,
  },
  intro: {
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 14,
    color: BASE.ink2,
    lineHeight: 21,
    marginBottom: 20,
  },
  field: {
    marginBottom: 18,
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fieldLabel: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 14,
    color: BASE.ink,
  },
  fieldHint: {
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 12,
    color: BASE.ink3,
  },
  sportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sportBtn: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 11,
  },
  sportBtnText: {
    fontFamily: FONT_FAMILY.hanken.semiBold,
    fontSize: 13.5,
  },
  input: {
    borderWidth: 1,
    borderColor: BASE.line,
    backgroundColor: BASE.surface,
    borderRadius: SPACING.inputRadius,
    height: SPACING.inputHeight,
    paddingHorizontal: 14,
    fontFamily: FONT_FAMILY.hanken.regular,
    fontSize: 15,
    color: BASE.ink,
  },
  monoInput: {
    fontFamily: FONT_FAMILY.space.regular,
  },
  textArea: {
    height: 100,
    paddingTop: 14,
    paddingBottom: 14,
    lineHeight: 22,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: BASE.soft,
    borderRadius: 13,
    padding: 4,
    gap: 6,
  },
  segmentedOption: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 10,
  },
  segmentedActive: {
    backgroundColor: BASE.surface,
    ...SHADOWS.glass,
  },
  segmentedText: {
    fontFamily: FONT_FAMILY.hanken.medium,
    fontSize: 13,
    color: BASE.ink2,
  },
  segmentedTextActive: {
    fontFamily: FONT_FAMILY.hanken.bold,
    color: BASE.ink,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 10,
  },
  freeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: SPACING.inputRadius,
    height: SPACING.inputHeight,
    paddingHorizontal: 16,
  },
  freeToggleText: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 14,
  },
  ctaBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderTopWidth: 1,
    borderTopColor: BASE.line2,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 26 : 16,
  },
  publishBtn: {
    height: SPACING.ctaHeight,
    borderRadius: SPACING.buttonRadius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  publishBtnEnabled: {
    backgroundColor: THEME.accent,
    ...SHADOWS.cta,
  },
  publishBtnDisabled: {
    backgroundColor: BASE.soft,
  },
  publishBtnText: {
    fontFamily: FONT_FAMILY.hanken.bold,
    fontSize: 16,
  },
});
