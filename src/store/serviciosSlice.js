import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const SERVICIOS_INICIALES = [
  {
    id: 's-1',
    nombre: 'Alquiler de kioscos',
    descripcion:
      'Espacios techados con mesas y parrilleras para reuniones familiares y cumpleaños.',
    precio: 150,
    clasificacion: 'Grupal',
    tipoCobro: 'Fijo',
  },
  {
    id: 's-2',
    nombre: 'Visitas guiadas',
    descripcion:
      'Recorridos educativos con guías especializados para conocer la flora y fauna local.',
    precio: 25,
    clasificacion: 'Individual',
    tipoCobro: 'Unitario',
  },
  {
    id: 's-3',
    nombre: 'Alquiler de churuatas',
    descripcion:
      'Churuatas equipadas para grupos escolares y actividades de integración.',
    precio: 90,
    clasificacion: 'Grupal',
    tipoCobro: 'Fijo',
  },
  {
    id: 's-4',
    nombre: 'Estacionamiento preferencial',
    descripcion:
      'Puesto reservado para visitantes con movilidad reducida o transporte escolar.',
    precio: 0,
    clasificacion: 'Individual',
    tipoCobro: 'Gratis',
  },
  {
    id: 's-5',
    nombre: 'Permisos para filmaciones',
    descripcion:
      'Autorización para fotografía profesional, filmaciones y eventos especiales.',
    precio: 400,
    clasificacion: 'Grupal',
    tipoCobro: 'Fijo',
  },
];

export const registrarServicio = createAsyncThunk(
  'servicios/registrarServicio',
  async (nuevoServicio, { getState, rejectWithValue }) => {
    const { listaDeServicios } = getState().servicios;
    const nombre = nuevoServicio.nombre.trim();

    const duplicado = listaDeServicios.some(
      (s) => s.nombre.toLowerCase() === nombre.toLowerCase(),
    );
    if (duplicado) {
      return rejectWithValue('Ya existe un servicio registrado con ese nombre.');
    }
    if (!(Number(nuevoServicio.precio) >= 0)) {
      return rejectWithValue('El precio debe ser un número mayor o igual a cero.');
    }

    return { ...nuevoServicio, nombre };
  },
);

const serviciosSlice = createSlice({
  name: 'servicios',
  initialState: {
    listaDeServicios: SERVICIOS_INICIALES,
    registrando: false,
    error: null,
  },
  reducers: {
    cargarServicios: (state) => {
      if (!state.listaDeServicios.length) {
        state.listaDeServicios = SERVICIOS_INICIALES;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registrarServicio.pending, (state) => {
        state.registrando = true;
        state.error = null;
      })
      .addCase(registrarServicio.fulfilled, (state, action) => {
        state.registrando = false;
        state.listaDeServicios.unshift(action.payload);
      })
      .addCase(registrarServicio.rejected, (state, action) => {
        state.registrando = false;
        state.error = action.payload || action.error?.message || 'Error al registrar.';
      });
  },
});

export const { cargarServicios } = serviciosSlice.actions;
export default serviciosSlice.reducer;
