import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import OptionChips from '../components/OptionChips';
import Badge from '../components/Badge';
import useParques from '../hooks/useParques';
import useReservas from '../hooks/useReservas';
import { colors, radius, spacing } from '../config/theme';
import {
  REGEX,
  esEnteroEnRango,
  fechaAIso,
  fechaValida,
  formatearFechaInput,
  soloNumeros,
} from '../utils/validaciones';

export default function NuevaReservaScreen({ route, navigation }) {
  const parqueIdParam = route.params?.parqueId;
  const { parques } = useParques();
  const { crear } = useReservas();

  const valoresIniciales = {
    parqueId: parqueIdParam || parques[0]?.id || '',
    fecha: '',
    personas: '2',
    telefono: '',
    correo: '',
    motivo: '',
  };

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onTouched', defaultValues: valoresIniciales });

  const parqueSeleccionado = parques.find((p) => p.id === watch('parqueId'));

  const onSubmit = (datos) => {
    const parque = parques.find((p) => p.id === datos.parqueId);

    crear({
      id: `r-${Date.now()}`,
      parqueId: datos.parqueId,
      parque: parque?.nombre || 'Parque',
      fecha: fechaAIso(datos.fecha),
      personas: Number(datos.personas),
      telefono: datos.telefono.trim(),
      correo: datos.correo.trim(),
      motivo: datos.motivo.trim(),
      estado: 'Pendiente',
      creadaEn: new Date().toISOString(),
    });

    reset(valoresIniciales);
    Alert.alert(
      'Solicitud registrada',
      'La prestación quedó guardada en el estado global con estado Pendiente.',
      [{ text: 'Aceptar', onPress: () => navigation.goBack() }],
    );
  };

  return (
    <ScrollView
      style={styles.contenedor}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.intro}>
        Completa los datos para solicitar un espacio o prestación de servicio.
        La solicitud se guarda en Redux y aparece en el historial.
      </Text>

      <Controller
        control={control}
        name="parqueId"
        rules={{ required: 'Selecciona el parque' }}
        render={({ field }) => (
          <OptionChips
            label="Parque"
            options={parques.map((p) => ({ label: p.nombre, value: p.id }))}
            value={field.value}
            onChange={field.onChange}
            error={errors.parqueId?.message}
          />
        )}
      />

      {parqueSeleccionado ? (
        <View style={styles.infoParque}>
          <Badge
            label={parqueSeleccionado.estadoOperativo}
            tone={parqueSeleccionado.estadoOperativo === 'Abierto' ? 'success' : 'danger'}
          />
          <Text style={styles.infoTexto}>
            Capacidad: {parqueSeleccionado.maxPersonas} personas ·{' '}
            {parqueSeleccionado.maxVehiculos} vehículos
          </Text>
        </View>
      ) : null}

      <Controller
        control={control}
        name="fecha"
        rules={{
          required: 'La fecha es obligatoria',
          validate: (valor) =>
            fechaValida(valor, { permitirPasada: false }) ||
            'Usa el formato DD/MM/AAAA con una fecha de hoy o posterior',
        }}
        render={({ field }) => (
          <CustomInput
            label="Fecha de la actividad"
            help="Formato DD/MM/AAAA"
            placeholder="DD/MM/AAAA"
            keyboardType="number-pad"
            maxLength={10}
            value={field.value}
            onChange={(texto) => field.onChange(formatearFechaInput(texto))}
            onBlur={field.onBlur}
            error={errors.fecha?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="personas"
        rules={{
          required: 'Indica la cantidad de personas',
          validate: (valor) =>
            esEnteroEnRango(valor, 1, 50) ||
            'La cantidad debe ser un número entero entre 1 y 50',
        }}
        render={({ field }) => (
          <CustomInput
            label="Cantidad de personas"
            help="Entre 1 y 50"
            keyboardType="number-pad"
            maxLength={2}
            value={field.value}
            onChange={(texto) => field.onChange(soloNumeros(texto))}
            onBlur={field.onBlur}
            error={errors.personas?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="telefono"
        rules={{
          required: 'El teléfono es obligatorio',
          pattern: {
            value: REGEX.telefono,
            message: 'Formato válido: 0414-1234567 o 0212-1234567',
          },
        }}
        render={({ field }) => (
          <CustomInput
            label="Teléfono de contacto"
            placeholder="0414-1234567"
            keyboardType="phone-pad"
            maxLength={12}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.telefono?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="correo"
        rules={{
          required: 'El correo electrónico es obligatorio',
          pattern: {
            value: REGEX.correo,
            message: 'Ingresa un correo electrónico válido',
          },
        }}
        render={({ field }) => (
          <CustomInput
            label="Correo electrónico"
            placeholder="nombre@correo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.correo?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="motivo"
        rules={{
          required: 'Describe el motivo de la solicitud',
          minLength: { value: 10, message: 'Debe tener al menos 10 caracteres' },
          maxLength: { value: 200, message: 'Máximo 200 caracteres' },
        }}
        render={({ field }) => (
          <CustomInput
            label="Motivo de la solicitud"
            help="Entre 10 y 200 caracteres"
            placeholder="Ej: Celebración familiar en los kioscos"
            multiline
            numberOfLines={4}
            maxLength={200}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.motivo?.message}
          />
        )}
      />

      <CustomButton
        title="Enviar solicitud"
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.background },
  contenido: { padding: spacing.lg, paddingBottom: spacing.xxl },
  intro: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: spacing.lg,
  },
  infoParque: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
    gap: spacing.xs,
  },
  infoTexto: { fontSize: 11, color: colors.textMuted },
});
