import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing } from '../config/theme';

export default function OptionChips({
  label,
  help,
  error,
  options = [],
  value,
  onChange,
}) {
  return (
    <View style={styles.contenedor}>
      {label && <Text style={styles.etiqueta}>{label}</Text>}
      {help && <Text style={styles.ayuda}>{help}</Text>}

      <View style={styles.fila}>
        {options.map((opcion) => {
          const item =
            typeof opcion === 'string'
              ? { label: opcion, value: opcion }
              : opcion;
          const activo = value === item.value;

          return (
            <TouchableOpacity
              key={item.value}
              accessibilityRole="button"
              accessibilityState={{ selected: activo }}
              style={[styles.chip, activo && styles.chipActivo]}
              onPress={() => onChange?.(item.value)}
              activeOpacity={0.8}
            >
              <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {error ? <Text style={styles.mensajeError}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { marginBottom: spacing.lg, width: '100%' },
  etiqueta: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  ayuda: { fontSize: 11, color: colors.textMuted, marginBottom: spacing.xs },
  fila: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md + 2,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActivo: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipTexto: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  chipTextoActivo: { color: colors.white },
  mensajeError: { color: colors.danger, fontSize: 12, marginTop: spacing.xs },
});
