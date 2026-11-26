import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, radius, spacing } from '../config/theme';


export default function CustomButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primario',
  style,
}) {
  const inactivo = loading || disabled;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled: inactivo, busy: loading }}
      style={[
        styles.boton,
        styles[variant] || styles.primario,
        inactivo && styles.botonInactivo,
        style,
      ]}
      onPress={onPress}
      disabled={inactivo}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.white} />
      ) : (
        <Text style={[styles.texto, variant === 'outline' && styles.textoOutline]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    width: '100%',
    minHeight: 48,
  },
  primario: { backgroundColor: colors.primary },
  secundario: { backgroundColor: colors.accent },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  peligro: { backgroundColor: colors.danger },
  botonInactivo: { opacity: 0.55 },
  texto: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  textoOutline: { color: colors.primary },
});
