import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import parquesReducer from './parquesSlice';
import serviciosReducer from './serviciosSlice';
import reservasReducer from './reservasSlice';
import aforoReducer from './aforoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    parques: parquesReducer,
    servicios: serviciosReducer,
    reservas: reservasReducer,
    aforo: aforoReducer,
  },
});
