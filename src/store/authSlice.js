import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { normalizarCedula } from '../utils/validaciones';

export const USUARIOS_DEMO = [
  {
    id: 'u-1',
    cedula: 'V-12345678',
    clave: 'Inparques2026',
    nombre: 'Ana Rojas',
    rol: 'Administrador',
    correo: 'ana.rojas@inparques.gob.ve',
    telefono: '0414-1234567',
    parque: 'Parque del Este',
  },
  {
    id: 'u-2',
    cedula: 'V-23456789',
    clave: 'Operador2026',
    nombre: 'Carlos Velásquez',
    rol: 'Operador',
    correo: 'carlos.velasquez@inparques.gob.ve',
    telefono: '0412-3456789',
    parque: 'Parque Bararida',
  },
  {
    id: 'u-3',
    cedula: 'V-34567890',
    clave: 'Auditor2026',
    nombre: 'María Pérez',
    rol: 'Auditor',
    correo: 'maria.perez@inparques.gob.ve',
    telefono: '0424-9876543',
    parque: 'Parque Terepaíma',
  },
];


export const iniciarSesion = createAsyncThunk(
  'auth/iniciarSesion',
  async ({ nacionalidad, numero, clave }, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); 

    const cedula = normalizarCedula(nacionalidad, numero);
    const usuario = USUARIOS_DEMO.find((u) => u.cedula === cedula);

    if (!usuario) {
      return rejectWithValue('La cédula no está registrada en el sistema.');
    }
    if (usuario.clave !== clave) {
      return rejectWithValue('La contraseña no coincide con la cédula indicada.');
    }

    const { clave: _omitida, ...sesion } = usuario;
    return sesion;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    usuario: null,
    autenticado: false,
    cargando: false,
    error: null,
  },
  reducers: {
    cerrarSesion: (state) => {
      state.usuario = null;
      state.autenticado = false;
      state.cargando = false;
      state.error = null;
    },
    limpiarError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(iniciarSesion.pending, (state) => {
        state.cargando = true;
        state.error = null;
      })
      .addCase(iniciarSesion.fulfilled, (state, action) => {
        state.cargando = false;
        state.autenticado = true;
        state.usuario = action.payload;
      })
      .addCase(iniciarSesion.rejected, (state, action) => {
        state.cargando = false;
        state.autenticado = false;
        state.usuario = null;
        state.error =
          action.payload || action.error?.message || 'No fue posible iniciar sesión.';
      });
  },
});

export const { cerrarSesion, limpiarError } = authSlice.actions;
export default authSlice.reducer;
