import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TerrainService from '../services/TerrainService';
import { Case } from '../type/Case';

interface TerrainState {
  terrainData: Case[][];
}

const initialState: TerrainState = {
  terrainData: TerrainService.chargerTerrain(),
};

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
  }
});

export const { setTerrainData, ajouterCase } = terrainSlice.actions;
export default terrainSlice.reducer;
