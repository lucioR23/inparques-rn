import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../config/theme';

const TONOS = {
  success: { fondo: colors.successSoft, texto: colors.success },
  warning: { fondo: colors.warningSoft, texto: colors.warning },
  danger: { fondo: colors.dangerSoft, texto: colors.danger },
  info: { fondo: colors.infoSoft, texto: colors.info },
  neutral: { fondo: colors.neutralSoft, texto: colors.textMuted },
};


export default function Badge({ label, tone = 'neutral', style }) {
  const tono = TONOS[tone] || TONOS.neutral;

  return (
    <View style={[styles.badge, { backgroundColor: tono.fondo }, style]}>
      <Text style={[styles.texto, { color: tono.texto }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: radius.pill,
  },
  texto: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3 },
});
