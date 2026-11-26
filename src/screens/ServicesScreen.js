import React, { useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import ServiceCard from '../components/ServiceCard';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import OptionChips from '../components/OptionChips';
import { cargarServicios, registrarServicio } from '../store/serviciosSlice';
import { colors, spacing } from '../config/theme';
import { esEnteroEnRango, soloNumeros } from '../utils/validaciones';

const CLASIFICACIONES = ['Individual', 'Grupal'];

export default function ServicesScreen() {
  const dispatch = useDispatch();
  const servicios = useSelector((state) => state.servicios.listaDeServicios);
  const registrando = useSelector((state) => state.servicios.registrando);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: { nombre: '', precio: '', clasificacion: 'Individual', descripcion: '' },
  });

  useEffect(() => {
    dispatch(cargarServicios());
  }, [dispatch]);

  const onSubmit = async (datos) => {
    const resultado = await dispatch(
      registrarServicio({
        id: `s-${Date.now()}`,
        nombre: datos.nombre.trim(),
        precio: Number(datos.precio),
        clasificacion: datos.clasificacion,
        tipoCobro: Number(datos.precio) === 0 ? 'Gratis' : 'Fijo',
        descripcion: datos.descripcion.trim(),
      }),
    );

    if (resultado.meta.requestStatus === 'rejected') {
      Alert.alert('No se pudo registrar', resultado.payload || 'Intenta nuevamente.');
      return;
    }

    reset();
    Alert.alert('Servicio registrado', 'El servicio se agregó al estado global.');
  };

  return (
    <ScrollView
      style={styles.contenedor}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.tituloSeccion}>Catálogo de servicios</Text>
      <Text style={styles.intro}>
        Prestaciones disponibles en los parques. Los precios son de referencia
        para la demostración académica.
      </Text>

      {servicios.map((servicio) => (
        <ServiceCard key={servicio.id} item={servicio} />
      ))}

      <View style={styles.formulario}>
        <Text style={styles.tituloSeccion}>Registrar nuevo servicio</Text>
        <Text style={styles.intro}>
          Los campos se validan con React Hook Form antes de guardar en Redux.
        </Text>

        <Controller
          control={control}
          name="nombre"
          rules={{
            required: 'El nombre es obligatorio',
            minLength: { value: 3, message: 'Debe tener al menos 3 caracteres' },
            maxLength: { value: 40, message: 'Debe tener como máximo 40 caracteres' },
          }}
          render={({ field }) => (
            <CustomInput
              label="Nombre del servicio"
              placeholder="Ej: Alquiler de sillas"
              maxLength={40}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.nombre?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="precio"
          rules={{
            required: 'El precio es obligatorio',
            validate: (valor) =>
              esEnteroEnRango(valor, 0, 100000) ||
              'Ingresa un monto entero entre 0 y 100000',
          }}
          render={({ field }) => (
            <CustomInput
              label="Precio (Bs.)"
              help="Usa 0 si el servicio es gratuito"
              placeholder="Ej: 150"
              keyboardType="number-pad"
              maxLength={6}
              value={field.value}
              onChange={(texto) => field.onChange(soloNumeros(texto))}
              onBlur={field.onBlur}
              error={errors.precio?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="clasificacion"
          rules={{ required: 'Selecciona la clasificación' }}
          render={({ field }) => (
            <OptionChips
              label="Clasificación"
              help="Individual (por persona) o grupal"
              options={CLASIFICACIONES}
              value={field.value}
              onChange={field.onChange}
              error={errors.clasificacion?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="descripcion"
          rules={{
            required: 'La descripción es obligatoria',
            minLength: { value: 10, message: 'Debe tener al menos 10 caracteres' },
            maxLength: { value: 200, message: 'Máximo 200 caracteres' },
          }}
          render={({ field }) => (
            <CustomInput
              label="Descripción"
              help="Entre 10 y 200 caracteres"
              placeholder="Describe el servicio ofrecido"
              multiline
              numberOfLines={4}
              maxLength={200}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.descripcion?.message}
            />
          )}
        />

        <CustomButton
          title="Registrar servicio"
          onPress={handleSubmit(onSubmit)}
          loading={registrando}
          disabled={registrando}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.background },
  contenido: { padding: spacing.lg, paddingBottom: spacing.xxl },
  tituloSeccion: { fontSize: 17, fontWeight: '800', color: colors.primary },
  intro: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  formulario: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
