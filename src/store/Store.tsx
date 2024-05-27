import { configureStore } from '@reduxjs/toolkit';
import terrainReducer from '../slices/TerrainSlice';

const store = configureStore({
  reducer: {
    terrain: terrainReducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
