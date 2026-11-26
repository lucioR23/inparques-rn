import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import OptionChips from '../components/OptionChips';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import useParques from '../hooks/useParques';
import useAforo from '../hooks/useAforo';
import { colors, radius, sombra, spacing } from '../config/theme';
import {
  REGEX,
  esEnteroEnRango,
  fechaAIso,
  fechaValida,
  formatearFechaInput,
  hoyIso,
  isoAFecha,
  soloNumeros,
} from '../utils/validaciones';

const MAXIMOS = {
  adultos: 5000,
  ninos: 5000,
  discapacitados: 500,
  motos: 500,
  carros: 500,
  buses: 100,
};

const reglaCantidad = (campo) => ({
  required: 'Indica una cantidad (puede ser 0)',
  validate: (valor) =>
    esEnteroEnRango(valor, 0, MAXIMOS[campo]) ||
    `Ingresa un número entero entre 0 y ${MAXIMOS[campo]}`,
});

export default function AforoScreen({ route }) {
  const parqueIdParam = route.params?.parqueId;
  const { parques } = useParques();
  const { registrosDeHoy, registrar } = useAforo();

  const valoresIniciales = {
    parqueId: parqueIdParam || parques[0]?.id || '',
    fecha: isoAFecha(hoyIso()),
    adultos: '0',
    ninos: '0',
    discapacitados: '0',
    motos: '0',
    carros: '0',
    buses: '0',
    responsable: '',
    cedulaResponsable: '',
    telefono: '',
    correo: '',
    observaciones: '',
  };

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onTouched', defaultValues: valoresIniciales });

  const valores = watch();
  const totalPersonas =
    (Number(valores.adultos) || 0) +
    (Number(valores.ninos) || 0) +
    (Number(valores.discapacitados) || 0);
  const totalVehiculos =
    (Number(valores.motos) || 0) +
    (Number(valores.carros) || 0) +
    (Number(valores.buses) || 0);

  const onSubmit = (datos) => {
    const parque = parques.find((p) => p.id === datos.parqueId);
    const adultos = Number(datos.adultos);
    const ninos = Number(datos.ninos);
    const discapacitados = Number(datos.discapacitados);
    const motos = Number(datos.motos);
    const carros = Number(datos.carros);
    const buses = Number(datos.buses);

    const personas = adultos + ninos + discapacitados;
    const vehiculos = motos + carros + buses;

    registrar({
      id: `a-${Date.now()}`,
      parqueId: datos.parqueId,
      parque: parque?.nombre || 'Parque',
      fecha: fechaAIso(datos.fecha),
      adultos,
      ninos,
      discapacitados,
      motos,
      carros,
      buses,
      responsable: datos.responsable.trim(),
      cedulaResponsable: `V-${datos.cedulaResponsable}`,
      telefono: datos.telefono.trim(),
      correo: datos.correo.trim(),
      observaciones: datos.observaciones.trim(),
      totalPersonas: personas,
      totalVehiculos: vehiculos,
      creadoEn: new Date().toISOString(),
    });

    Alert.alert(
      'Aforo registrado',
      `${personas} personas y ${vehiculos} vehículos en ${parque?.nombre || 'el parque'}.`,
    );

    reset({ ...valoresIniciales, parqueId: datos.parqueId, fecha: datos.fecha });
  };

  return (
    <ScrollView
      style={styles.contenedor}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.intro}>
        Registra el conteo de visitantes y vehículos del día. La información se
        almacena en el estado global y se refleja en el panel principal.
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

      <Controller
        control={control}
        name="fecha"
        rules={{
          required: 'La fecha es obligatoria',
          validate: (valor) =>
            fechaValida(valor, { permitirFutura: false }) ||
            'Usa el formato DD/MM/AAAA con una fecha no futura',
        }}
        render={({ field }) => (
          <CustomInput
            label="Fecha del registro"
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

      <Text style={styles.subtitulo}>Visitantes</Text>
      <View style={styles.filaCampos}>
        <View style={styles.columna}>
          <Controller
            control={control}
            name="adultos"
            rules={{
              ...reglaCantidad('adultos'),
              validate: (valor) => {
                if (!esEnteroEnRango(valor, 0, MAXIMOS.adultos)) {
                  return `Ingresa un número entre 0 y ${MAXIMOS.adultos}`;
                }
                const total =
                  Number(valor) +
                  Number(getValues('ninos') || 0) +
                  Number(getValues('discapacitados') || 0);
                return total > 0 || 'Registra al menos una persona';
              },
            }}
            render={({ field }) => (
              <CustomInput
                label="Adultos"
                keyboardType="number-pad"
                maxLength={4}
                value={field.value}
                onChange={(texto) => field.onChange(soloNumeros(texto))}
                onBlur={field.onBlur}
                error={errors.adultos?.message}
              />
            )}
          />
        </View>

        <View style={styles.columna}>
          <Controller
            control={control}
            name="ninos"
            rules={reglaCantidad('ninos')}
            render={({ field }) => (
              <CustomInput
                label="Niños"
                keyboardType="number-pad"
                maxLength={4}
                value={field.value}
                onChange={(texto) => field.onChange(soloNumeros(texto))}
                onBlur={field.onBlur}
                error={errors.ninos?.message}
              />
            )}
          />
        </View>

        <View style={styles.columna}>
          <Controller
            control={control}
            name="discapacitados"
            rules={reglaCantidad('discapacitados')}
            render={({ field }) => (
              <CustomInput
                label="Discap."
                keyboardType="number-pad"
                maxLength={3}
                value={field.value}
                onChange={(texto) => field.onChange(soloNumeros(texto))}
                onBlur={field.onBlur}
                error={errors.discapacitados?.message}
              />
            )}
          />
        </View>
      </View>

      <Text style={styles.subtitulo}>Vehículos</Text>
      <View style={styles.filaCampos}>
        <View style={styles.columna}>
          <Controller
            control={control}
            name="motos"
            rules={reglaCantidad('motos')}
            render={({ field }) => (
              <CustomInput
                label="Motos"
                keyboardType="number-pad"
                maxLength={3}
                value={field.value}
                onChange={(texto) => field.onChange(soloNumeros(texto))}
                onBlur={field.onBlur}
                error={errors.motos?.message}
              />
            )}
          />
        </View>

        <View style={styles.columna}>
          <Controller
            control={control}
            name="carros"
            rules={reglaCantidad('carros')}
            render={({ field }) => (
              <CustomInput
                label="Carros"
                keyboardType="number-pad"
                maxLength={3}
                value={field.value}
                onChange={(texto) => field.onChange(soloNumeros(texto))}
                onBlur={field.onBlur}
                error={errors.carros?.message}
              />
            )}
          />
        </View>

        <View style={styles.columna}>
          <Controller
            control={control}
            name="buses"
            rules={reglaCantidad('buses')}
            render={({ field }) => (
              <CustomInput
                label="Buses"
                keyboardType="number-pad"
                maxLength={2}
                value={field.value}
                onChange={(texto) => field.onChange(soloNumeros(texto))}
                onBlur={field.onBlur}
                error={errors.buses?.message}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.resumen}>
        <View style={styles.resumenDato}>
          <Ionicons name="people" size={20} color={colors.primary} />
          <Text style={styles.resumenNum}>{totalPersonas}</Text>
          <Text style={styles.resumenLabel}>personas</Text>
        </View>
        <View style={styles.divisor} />
        <View style={styles.resumenDato}>
          <Ionicons name="car" size={20} color={colors.primary} />
          <Text style={styles.resumenNum}>{totalVehiculos}</Text>
          <Text style={styles.resumenLabel}>vehículos</Text>
        </View>
      </View>

      <Text style={styles.subtitulo}>Datos del responsable</Text>

      <Controller
        control={control}
        name="responsable"
        rules={{
          required: 'El nombre del responsable es obligatorio',
          minLength: { value: 5, message: 'Debe tener al menos 5 caracteres' },
          maxLength: { value: 60, message: 'Debe tener como máximo 60 caracteres' },
          pattern: {
            value: REGEX.nombre,
            message: 'Solo se permiten letras y espacios',
          },
        }}
        render={({ field }) => (
          <CustomInput
            label="Nombre y apellido"
            placeholder="Ej: Luis Mendoza"
            maxLength={60}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.responsable?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cedulaResponsable"
        rules={{
          required: 'La cédula del responsable es obligatoria',
          minLength: { value: 5, message: 'Debe tener al menos 5 dígitos' },
          maxLength: { value: 9, message: 'Debe tener como máximo 9 dígitos' },
          validate: (valor) =>
            REGEX.soloDigitos.test(valor) || 'Solo se permiten números',
        }}
        render={({ field }) => (
          <CustomInput
            label="Cédula del responsable"
            placeholder="Ej: 12345678"
            keyboardType="number-pad"
            maxLength={9}
            value={field.value}
            onChange={(texto) => field.onChange(soloNumeros(texto))}
            onBlur={field.onBlur}
            error={errors.cedulaResponsable?.message}
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
          validate: (valor) =>
            !valor || REGEX.correo.test(valor) || 'Formato de correo no válido',
        }}
        render={({ field }) => (
          <CustomInput
            label="Correo electrónico (opcional)"
            placeholder="responsable@correo.com"
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
        name="observaciones"
        rules={{
          maxLength: { value: 200, message: 'Máximo 200 caracteres' },
        }}
        render={({ field }) => (
          <CustomInput
            label="Observaciones (opcional)"
            placeholder="Novedades del registro"
            multiline
            numberOfLines={3}
            maxLength={200}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={errors.observaciones?.message}
          />
        )}
      />

      <CustomButton
        title="Procesar registro de aforo"
        onPress={handleSubmit(onSubmit)}
      />

      <View style={styles.seccionRegistros}>
        <View style={styles.filaTitulo}>
          <Text style={styles.tituloSeccion}>Registros de hoy</Text>
          <Badge label={`${registrosDeHoy.length} registros`} tone="info" />
        </View>

        {registrosDeHoy.length === 0 ? (
          <EmptyState
            icono="clipboard-outline"
            titulo="Aún no hay registros hoy"
            mensaje="Completa el formulario para registrar el primer aforo del día."
          />
        ) : (
          registrosDeHoy.map((registro) => (
            <View key={registro.id} style={styles.registro}>
              <View style={styles.registroEncabezado}>
                <Text style={styles.registroParque}>{registro.parque}</Text>
                <Text style={styles.registroFecha}>{isoAFecha(registro.fecha)}</Text>
              </View>
              <Text style={styles.registroDetalle}>
                {registro.totalPersonas} personas · {registro.totalVehiculos} vehículos
              </Text>
              <Text style={styles.registroResponsable}>
                Responsable: {registro.responsable} ({registro.cedulaResponsable})
              </Text>
            </View>
          ))
        )}
      </View>
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
  subtitulo: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  filaCampos: { flexDirection: 'row', gap: spacing.sm },
  columna: { flex: 1 },
  resumen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  resumenDato: { flex: 1, alignItems: 'center' },
  resumenNum: { fontSize: 22, fontWeight: '800', color: colors.primary },
  resumenLabel: { fontSize: 10, color: colors.primaryLight },
  divisor: { width: 1, height: 34, backgroundColor: '#B7E4C7' },
  seccionRegistros: { marginTop: spacing.xl },
  filaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  tituloSeccion: { fontSize: 16, fontWeight: '800', color: colors.primary },
  registro: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...sombra.tarjeta,
  },
  registroEncabezado: { flexDirection: 'row', justifyContent: 'space-between' },
  registroParque: { fontSize: 13, fontWeight: '700', color: colors.text },
  registroFecha: { fontSize: 11, color: colors.textMuted },
  registroDetalle: { fontSize: 12, color: colors.primaryLight, fontWeight: '600', marginTop: 3 },
  registroResponsable: { fontSize: 11, color: colors.textMuted, marginTop: 3 },
});
