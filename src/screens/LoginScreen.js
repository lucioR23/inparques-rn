import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import OptionChips from '../components/OptionChips';
import useAuth from '../hooks/useAuth';
import { USUARIOS_DEMO } from '../store/authSlice';
import { colors, radius, sombra, spacing } from '../config/theme';
import { REGEX, soloNumeros } from '../utils/validaciones';

const NACIONALIDADES = ['V', 'E', 'J', 'G'];


export default function LoginScreen() {
  const { iniciarSesion, cargando } = useAuth();

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: { nacionalidad: 'V', numero: '', clave: '' },
  });

  const onSubmit = async (datos) => {
    const resultado = await iniciarSesion(datos);
    if (!resultado.ok) {
      setError('clave', { type: 'manual', message: resultado.mensaje });
    }
  };

  const usarCredencial = (usuario) => {
    setValue('nacionalidad', usuario.cedula.split('-')[0]);
    setValue('numero', usuario.cedula.split('-')[1], { shouldValidate: true });
    setValue('clave', usuario.clave, { shouldValidate: true });
    clearErrors();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contenido}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.hero}>
            <View style={styles.logoContenedor}>
              <Image
                source={require('../../assets/inparques-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.heroTitulo}>Sistema Inparques Lara</Text>
            <Text style={styles.heroTexto}>
              Gestión de parques nacionales y recreacionales del estado Lara
            </Text>
          </View>

          <View style={styles.tarjeta}>
            <Text style={styles.titulo}>Iniciar sesión</Text>
            <Text style={styles.subtitulo}>
              Ingresa con tu cédula y contraseña institucional
            </Text>

            <Controller
              control={control}
              name="nacionalidad"
              rules={{ required: 'Seleccione la nacionalidad' }}
              render={({ field }) => (
                <OptionChips
                  label="Nacionalidad"
                  options={NACIONALIDADES}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.nacionalidad?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="numero"
              rules={{
                required: 'La cédula es obligatoria',
                minLength: { value: 5, message: 'Debe tener al menos 5 dígitos' },
                maxLength: { value: 9, message: 'Debe tener como máximo 9 dígitos' },
                validate: (valor) =>
                  REGEX.soloDigitos.test(valor) || 'Solo se permiten números',
              }}
              render={({ field }) => (
                <CustomInput
                  label="Cédula de identidad"
                  help="Escribe solo el número, sin puntos ni guiones"
                  placeholder="Ej: 12345678"
                  keyboardType="number-pad"
                  maxLength={9}
                  value={field.value}
                  onChange={(texto) => field.onChange(soloNumeros(texto))}
                  onBlur={field.onBlur}
                  error={errors.numero?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="clave"
              rules={{
                required: 'La contraseña es obligatoria',
                minLength: { value: 6, message: 'Debe tener al menos 6 caracteres' },
                maxLength: { value: 32, message: 'Debe tener como máximo 32 caracteres' },
              }}
              render={({ field }) => (
                <CustomInput
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  secureTextEntry
                  maxLength={32}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.clave?.message}
                />
              )}
            />

            <CustomButton
              title="Iniciar sesión"
              onPress={handleSubmit(onSubmit)}
              loading={cargando}
              disabled={cargando}
            />
          </View>

          <View style={styles.demo}>
            <View style={styles.demoEncabezado}>
              <Ionicons name="information-circle-outline" size={16} color={colors.info} />
              <Text style={styles.demoTitulo}>Credenciales de demostración</Text>
            </View>
            <Text style={styles.demoAyuda}>
              Toca una credencial para completar el formulario.
            </Text>

            {USUARIOS_DEMO.map((usuario) => (
              <TouchableOpacity
                key={usuario.id}
                style={styles.demoFila}
                onPress={() => usarCredencial(usuario)}
                accessibilityRole="button"
              >
                <View style={styles.demoDatos}>
                  <Text style={styles.demoCedula}>
                    {usuario.cedula} · {usuario.clave}
                  </Text>
                  <Text style={styles.demoRol}>
                    {usuario.rol} — {usuario.nombre}
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={16} color={colors.primaryLight} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  scroll: { flex: 1 },
  contenido: { paddingBottom: spacing.xxl },
  hero: {
    backgroundColor: colors.primary,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl + spacing.lg,
    paddingHorizontal: spacing.xl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  logoContenedor: {
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  logo: { width: 150, height: 44 },
  heroTitulo: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '800',
    marginTop: spacing.lg,
  },
  heroTexto: {
    color: colors.accentSoft,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.xs,
    maxWidth: 300,
  },
  tarjeta: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginTop: -spacing.xl,
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...sombra.flotante,
  },
  titulo: { fontSize: 20, fontWeight: '800', color: colors.primary },
  subtitulo: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  demo: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    backgroundColor: colors.infoSoft,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  demoEncabezado: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  demoTitulo: { fontSize: 12, fontWeight: '800', color: colors.info },
  demoAyuda: { fontSize: 11, color: colors.textMuted, marginTop: 2, marginBottom: spacing.sm },
  demoFila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
  },
  demoDatos: { flex: 1 },
  demoCedula: { fontSize: 12, fontWeight: '700', color: colors.text },
  demoRol: { fontSize: 10, color: colors.textMuted, marginTop: 1 },
});
