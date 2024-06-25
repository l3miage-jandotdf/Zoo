import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import TerrainService from '../services/TerrainService';
import { Case } from '../type/Case';

interface TerrainState {
  terrainData: Case[][];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TerrainState = {
  terrainData: [],
  loading: false,
  error: null,
};

// Async thunk to fetch terrain data
export const fetchTerrainData = createAsyncThunk(
  'terrain/fetchTerrainData',
  async () => {
    const terrain = await TerrainService.chargerTerrain();
    return terrain;
  }
);

const terrainSlice = createSlice({
  name: 'terrain',
  initialState,
  reducers: {
    setTerrainData(state, action: PayloadAction<Case[][]>) {
      state.terrainData = action.payload;
    },
    ajouterCase(state, action: PayloadAction<{ row: number, col: number, newCase: Case }>) {
      const { row, col, newCase } = action.payload;
      state.terrainData[row][col] = newCase;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTerrainData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTerrainData.fulfilled, (state, action: PayloadAction<Case[][]>) => {
        state.terrainData = action.payload;
        state.loading = false;
      })
      .addCase(fetchTerrainData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load terrain data';
      });
  }
});

export const { setTerrainData, ajouterCase } = terrainSlice.actions;
export default terrainSlice.reducer;
