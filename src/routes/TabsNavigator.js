import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ParksScreen from '../screens/ParksScreen';
import ParksDetailScreen from '../screens/ParksDetailScreen';
import AforoScreen from '../screens/AforoScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ReservasScreen from '../screens/ReservasScreen';
import NuevaReservaScreen from '../screens/NuevaReservaScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { colors } from '../config/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const opcionesStack = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.white,
  headerTitleStyle: { fontWeight: '700' },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.background },
};

function InicioStack() {
  return (
    <Stack.Navigator screenOptions={opcionesStack}>
      <Stack.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ParquesStack() {
  return (
    <Stack.Navigator screenOptions={opcionesStack}>
      <Stack.Screen
        name="ParquesLista"
        component={ParksScreen}
        options={{ title: 'Parques' }}
      />
      <Stack.Screen
        name="ParqueDetalle"
        component={ParksDetailScreen}
        options={{ title: 'Detalle del parque' }}
      />
      <Stack.Screen
        name="Aforo"
        component={AforoScreen}
        options={{ title: 'Registro de aforo' }}
      />
      <Stack.Screen
        name="Servicios"
        component={ServicesScreen}
        options={{ title: 'Servicios' }}
      />
    </Stack.Navigator>
  );
}

function ReservasStack() {
  return (
    <Stack.Navigator screenOptions={opcionesStack}>
      <Stack.Screen
        name="ReservasLista"
        component={ReservasScreen}
        options={{ title: 'Prestaciones de servicio' }}
      />
      <Stack.Screen
        name="NuevaReserva"
        component={NuevaReservaScreen}
        options={{ title: 'Nueva solicitud' }}
      />
    </Stack.Navigator>
  );
}

function MapaStack() {
  return (
    <Stack.Navigator screenOptions={opcionesStack}>
      <Stack.Screen name="Mapa" component={MapScreen} options={{ title: 'Mapa' }} />
    </Stack.Navigator>
  );
}

function PerfilStack() {
  return (
    <Stack.Navigator screenOptions={opcionesStack}>
      <Stack.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ title: 'Mi perfil' }}
      />
    </Stack.Navigator>
  );
}

const ICONOS = {
  InicioTab: ['home', 'home-outline'],
  ParquesTab: ['leaf', 'leaf-outline'],
  ReservasTab: ['calendar', 'calendar-outline'],
  MapaTab: ['map', 'map-outline'],
  PerfilTab: ['person', 'person-outline'],
};

/** Navegación principal por pestañas (Parte B). */
export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primaryLight,
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
        tabBarIcon: ({ focused, color, size }) => {
          const [activo, inactivo] = ICONOS[route.name];
          return (
            <Ionicons
              name={focused ? activo : inactivo}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="InicioTab" component={InicioStack} options={{ title: 'Inicio' }} />
      <Tab.Screen name="ParquesTab" component={ParquesStack} options={{ title: 'Parques' }} />
      <Tab.Screen
        name="ReservasTab"
        component={ReservasStack}
        options={{ title: 'Reservas' }}
      />
      <Tab.Screen name="MapaTab" component={MapaStack} options={{ title: 'Mapa' }} />
      <Tab.Screen name="PerfilTab" component={PerfilStack} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
