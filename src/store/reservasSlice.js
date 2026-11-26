import { createSlice } from '@reduxjs/toolkit';
import { aIso } from '../utils/validaciones';

const enDias = (dias) => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  return aIso(fecha);
};

export const RESERVAS_INICIALES = [
  {
    id: 'r-demo-1',
    parqueId: 'p-1',
    parque: 'Parque del Este',
    fecha: enDias(3),
    personas: 4,
    telefono: '0414-1234567',
    correo: 'ana.rojas@inparques.gob.ve',
    motivo: 'Cumpleaños familiar en los kioscos del parque',
    estado: 'Aprobada',
    creadaEn: new Date().toISOString(),
  },
  {
    id: 'r-demo-2',
    parqueId: 'p-2',
    parque: 'Parque Bararida',
    fecha: enDias(7),
    personas: 12,
    telefono: '0424-7654321',
    correo: 'carlos.velasquez@inparques.gob.ve',
    motivo: 'Visita escolar del Liceo Bolívar',
    estado: 'Pendiente',
    creadaEn: new Date().toISOString(),
  },
];

const reservasSlice = createSlice({
  name: 'reservas',
  initialState: {
    listaDeReservas: RESERVAS_INICIALES,
  },
  reducers: {
    cargarReservas: (state) => {
      if (!state.listaDeReservas.length) {
        state.listaDeReservas = RESERVAS_INICIALES;
      }
    },
    crearReserva: (state, action) => {
      state.listaDeReservas.unshift(action.payload);
    },
    cancelarReserva: (state, action) => {
      const reserva = state.listaDeReservas.find((r) => r.id === action.payload);
      if (reserva) {
        reserva.estado = 'Cancelada';
      }
    },
  },
});

export const { cargarReservas, crearReserva, cancelarReserva } = reservasSlice.actions;
export default reservasSlice.reducer;
