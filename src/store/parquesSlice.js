import { createSlice } from '@reduxjs/toolkit';

export const PARQUES_INICIALES = [
  {
    id: 'p-1',
    nombre: 'Parque del Este',
    tipo: 'Recreacional',
    ciudad: 'Barquisimeto',
    hectareas: 42,
    clima: 'Cálido',
    riesgoIncendio: 'Bajo',
    estadoOperativo: 'Abierto',
    maxPersonas: 1200,
    maxVehiculos: 220,
    coordenadas: { lat: 10.0678, lng: -69.3187 },
    areas: ['Kioscos', 'Churuatas', 'Senderos', 'Estacionamiento'],
    descripcion:
      'Área recreacional con kioscos familiares, caminerías y zonas verdes para actividades al aire libre.',
  },
  {
    id: 'p-2',
    nombre: 'Parque Bararida',
    tipo: 'Recreacional',
    ciudad: 'Barquisimeto',
    hectareas: 32,
    clima: 'Cálido',
    riesgoIncendio: 'Medio',
    estadoOperativo: 'Abierto',
    maxPersonas: 2500,
    maxVehiculos: 350,
    coordenadas: { lat: 10.0741, lng: -69.3345 },
    areas: ['Zoológico', 'Laguna', 'Kioscos', 'Estacionamiento'],
    descripcion:
      'Parque zoológico y recreacional de referencia en el estado Lara, con laguna y exhibiciones de fauna.',
  },
  {
    id: 'p-3',
    nombre: 'Parque Terepaíma',
    tipo: 'Recreacional',
    ciudad: 'Barquisimeto',
    hectareas: 18,
    clima: 'Cálido',
    riesgoIncendio: 'Bajo',
    estadoOperativo: 'Abierto',
    maxPersonas: 800,
    maxVehiculos: 120,
    coordenadas: { lat: 10.0612, lng: -69.3054 },
    areas: ['Canchas', 'Kioscos', 'Área de camping'],
    descripcion:
      'Espacio recreativo con canchas deportivas y áreas de camping para grupos familiares y escolares.',
  },
  {
    id: 'p-4',
    nombre: 'Parque La Represa',
    tipo: 'Recreacional',
    ciudad: 'Barquisimeto',
    hectareas: 25,
    clima: 'Cálido',
    riesgoIncendio: 'Alto',
    estadoOperativo: 'Cerrado',
    maxPersonas: 600,
    maxVehiculos: 90,
    coordenadas: { lat: 10.0455, lng: -69.2871 },
    areas: ['Embalse', 'Senderos', 'Mirador'],
    descripcion:
      'Parque con embalse y mirador panorámico. Permanecerá cerrado hasta culminar el mantenimiento.',
  },
  {
    id: 'p-5',
    nombre: 'Parque Los Palmares',
    tipo: 'Recreacional',
    ciudad: 'Barquisimeto',
    hectareas: 12,
    clima: 'Cálido',
    riesgoIncendio: 'Bajo',
    estadoOperativo: 'Abierto',
    maxPersonas: 500,
    maxVehiculos: 70,
    coordenadas: { lat: 10.0834, lng: -69.3521 },
    areas: ['Juegos infantiles', 'Kioscos', 'Estacionamiento'],
    descripcion:
      'Parque urbano con juegos infantiles y áreas de descanso, ideal para visitas cortas en familia.',
  },
  {
    id: 'p-6',
    nombre: 'Monumento Natural Loma de León',
    tipo: 'Nacional',
    ciudad: 'Iribarren',
    hectareas: 7200,
    clima: 'Templado',
    riesgoIncendio: 'Medio',
    estadoOperativo: 'Abierto',
    maxPersonas: 300,
    maxVehiculos: 40,
    coordenadas: { lat: 10.1203, lng: -69.3768 },
    areas: ['Senderos de montaña', 'Miradores', 'Zona de conservación'],
    descripcion:
      'Área protegida de interés nacional con senderos de montaña y zonas de conservación de flora y fauna.',
  },
];

const parquesSlice = createSlice({
  name: 'parques',
  initialState: {
    listaDeParques: PARQUES_INICIALES,
    cargando: false,
    error: null,
  },
  reducers: {
    cargarParques: (state) => {
      state.cargando = false;
      state.error = null;
      if (!state.listaDeParques.length) {
        state.listaDeParques = PARQUES_INICIALES;
      }
    },
    alternarEstadoParque: (state, action) => {
      const parque = state.listaDeParques.find((p) => p.id === action.payload);
      if (parque) {
        parque.estadoOperativo =
          parque.estadoOperativo === 'Abierto' ? 'Cerrado' : 'Abierto';
      }
    },
    actualizarParque: (state, action) => {
      const { id, cambios } = action.payload;
      state.listaDeParques = state.listaDeParques.map((p) =>
        p.id === id ? { ...p, ...cambios } : p,
      );
    },
    reiniciarParques: (state) => {
      state.listaDeParques = PARQUES_INICIALES;
    },
  },
});

export const {
  cargarParques,
  alternarEstadoParque,
  actualizarParque,
  reiniciarParques,
} = parquesSlice.actions;

export default parquesSlice.reducer;
