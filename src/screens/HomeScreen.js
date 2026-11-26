import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import ParkCard from '../components/ParkCard';
import ServiceCard from '../components/ServiceCard';
import QuickActionCard from '../components/QuickActionCard';
import useAuth from '../hooks/useAuth';
import useParques from '../hooks/useParques';
import useAforo from '../hooks/useAforo';
import useReservas from '../hooks/useReservas';
import { cargarParques } from '../store/parquesSlice';
import { cargarServicios } from '../store/serviciosSlice';
import { colors, radius, spacing } from '../config/theme';
import { hoyLegible, iniciales } from '../utils/validaciones';

export default function HomeScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { usuario } = useAuth();
  const { parques } = useParques();
  const { totalPersonasHoy, totalVehiculosHoy } = useAforo();
  const { pendientes } = useReservas();
  const servicios = useSelector((state) => state.servicios.listaDeServicios);

  useEffect(() => {
    dispatch(cargarParques());
    dispatch(cargarServicios());
  }, [dispatch]);

  const nombreCorto = usuario?.nombre?.split(' ')[0] || 'visitante';

  const acciones = [
    {
      titulo: 'Registrar aforo',
      detalle: 'Visitantes y vehículos',
      icono: 'people',
      color: colors.primaryLight,
      onPress: () => navigation.navigate('ParquesTab', { screen: 'Aforo' }),
    },
    {
      titulo: 'Nueva reserva',
      detalle: 'Prestaciones de servicio',
      icono: 'calendar',
      color: colors.info,
      onPress: () => navigation.navigate('ReservasTab', { screen: 'NuevaReserva' }),
    },
    {
      titulo: 'Servicios',
      detalle: 'Catálogo y precios',
      icono: 'grid',
      color: colors.warning,
      onPress: () => navigation.navigate('ParquesTab', { screen: 'Servicios' }),
    },
    {
      titulo: 'Mapa',
      detalle: 'Ubicaciones de parques',
      icono: 'map',
      color: '#6B46C1',
      onPress: () => navigation.navigate('MapaTab'),
    },
  ];

  return (
    <ScrollView
      style={styles.contenedor}
      contentContainerStyle={[styles.contenido, { paddingBottom: spacing.xxl }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.hero, { paddingTop: insets.top + spacing.lg }]}>
        <View style={styles.heroFila}>
          <View style={styles.heroTextos}>
            <Text style={styles.saludo}>Hola, {nombreCorto}</Text>
            <Text style={styles.heroTitulo}>Panel de Inparques Lara</Text>
            <Text style={styles.heroFecha}>{hoyLegible()}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>{iniciales(usuario?.nombre)}</Text>
          </View>
        </View>

        <View style={styles.estadisticas}>
          <View style={styles.estadistica}>
            <Text style={styles.estadisticaNum}>{parques.length}</Text>
            <Text style={styles.estadisticaLabel}>Parques</Text>
          </View>
          <View style={styles.divisor} />
          <View style={styles.estadistica}>
            <Text style={styles.estadisticaNum}>{totalPersonasHoy}</Text>
            <Text style={styles.estadisticaLabel}>Visitantes hoy</Text>
          </View>
          <View style={styles.divisor} />
          <View style={styles.estadistica}>
            <Text style={styles.estadisticaNum}>{totalVehiculosHoy}</Text>
            <Text style={styles.estadisticaLabel}>Vehículos hoy</Text>
          </View>
        </View>
      </View>

      <View style={styles.seccion}>
        <View style={styles.filaTitulo}>
          <Text style={styles.tituloSeccion}>Accesos rápidos</Text>
          <Text style={styles.contador}>{pendientes.length} reservas pendientes</Text>
        </View>
        <View style={styles.grid}>
          {acciones.map((accion) => (
            <View key={accion.titulo} style={styles.gridItem}>
              <QuickActionCard {...accion} />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.seccion}>
        <View style={styles.filaTitulo}>
          <Text style={styles.tituloSeccion}>Parques destacados</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ParquesTab', { screen: 'ParquesLista' })}
          >
            <Text style={styles.enlace}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {parques.slice(0, 3).map((parque) => (
          <ParkCard
            key={parque.id}
            item={parque}
            onPress={() =>
              navigation.navigate('ParquesTab', {
                screen: 'ParqueDetalle',
                params: { parqueId: parque.id },
              })
            }
          />
        ))}
      </View>

      <View style={styles.seccion}>
        <View style={styles.filaTitulo}>
          <Text style={styles.tituloSeccion}>Servicios disponibles</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ParquesTab', { screen: 'Servicios' })}
          >
            <Text style={styles.enlace}>Gestionar</Text>
          </TouchableOpacity>
        </View>

        {servicios.slice(0, 2).map((servicio) => (
          <ServiceCard key={servicio.id} item={servicio} />
        ))}
      </View>

      <View style={styles.nota}>
        <Ionicons name="shield-checkmark-outline" size={18} color={colors.primaryLight} />
        <Text style={styles.notaTexto}>
          Información almacenada en el estado global (Redux Toolkit) durante esta sesión.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: colors.background },
  contenido: { paddingBottom: spacing.xxl },
  hero: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  heroFila: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  heroTextos: { flex: 1 },
  saludo: { color: colors.accentSoft, fontSize: 13, fontWeight: '600' },
  heroTitulo: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 2,
  },
  heroFecha: { color: '#B7E4C7', fontSize: 11, marginTop: spacing.xs, textTransform: 'capitalize' },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTexto: { color: colors.primaryDark, fontWeight: '800', fontSize: 16 },
  estadisticas: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  estadistica: { flex: 1, alignItems: 'center' },
  estadisticaNum: { color: colors.white, fontSize: 22, fontWeight: '800' },
  estadisticaLabel: { color: '#B7E4C7', fontSize: 10, marginTop: 2 },
  divisor: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.18)' },
  seccion: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  filaTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  tituloSeccion: { fontSize: 17, fontWeight: '800', color: colors.primary },
  enlace: { fontSize: 12, fontWeight: '700', color: colors.primaryLight },
  contador: { fontSize: 11, color: colors.textMuted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  gridItem: { width: '47.5%' },
  nota: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    backgroundColor: colors.accentSoft,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  notaTexto: { flex: 1, fontSize: 11, color: colors.primary, lineHeight: 16 },
});
