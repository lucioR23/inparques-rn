import { createSlice } from '@reduxjs/toolkit';
import { hoyIso } from '../utils/validaciones';

export const REGISTROS_AFORO_INICIALES = [
  {
    id: 'a-demo-1',
    parqueId: 'p-2',
    parque: 'Parque Bararida',
    fecha: hoyIso(),
    adultos: 180,
    ninos: 64,
    discapacitados: 3,
    motos: 12,
    carros: 38,
    buses: 2,
    responsable: 'Carlos Velásquez',
    cedulaResponsable: 'V-23456789',
    telefono: '0412-3456789',
    correo: 'carlos.velasquez@inparques.gob.ve',
    observaciones: 'Jornada recreativa de fin de semana',
    totalPersonas: 247,
    totalVehiculos: 52,
    creadoEn: new Date().toISOString(),
  },
];

const aforoSlice = createSlice({
  name: 'aforo',
  initialState: {
    registros: REGISTROS_AFORO_INICIALES,
  },
  reducers: {
    registrarAforo: (state, action) => {
      state.registros.unshift(action.payload);
    },
    eliminarAforo: (state, action) => {
      state.registros = state.registros.filter((r) => r.id !== action.payload);
    },
  },
});

export const { registrarAforo, eliminarAforo } = aforoSlice.actions;
export default aforoSlice.reducer;
