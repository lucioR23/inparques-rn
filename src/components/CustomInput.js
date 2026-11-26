import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing } from '../config/theme';

export default function CustomInput({
  label,
  help,
  error,
  value,
  onChange,
  onBlur,
  placeholder,
  secureTextEntry = false,
  keyboardType,
  maxLength,
  autoFocus = false,
  multiline = false,
  numberOfLines = 4,
  autoCapitalize = 'sentences',
  editable = true,
  returnKeyType,
}) {
  return (
    <View style={styles.contenedor}>
      {label && <Text style={styles.etiqueta}>{label}</Text>}
      {help && <Text style={styles.ayuda}>{help}</Text>}
      <TextInput
        style={[
          styles.entrada,
          multiline && styles.entradaMultiline,
          error && styles.entradaError,
          !editable && styles.entradaDeshabilitada,
        ]}
        value={value ?? ''}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoFocus={autoFocus}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : undefined}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        editable={editable}
        returnKeyType={returnKeyType}
      />
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
  entrada: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.surface,
    minHeight: 48,
  },
  entradaMultiline: { minHeight: 96, textAlignVertical: 'top' },
  entradaError: { borderColor: colors.danger },
  entradaDeshabilitada: { backgroundColor: colors.neutralSoft, color: colors.textMuted },
  mensajeError: { color: colors.danger, fontSize: 12, marginTop: spacing.xs },
});
