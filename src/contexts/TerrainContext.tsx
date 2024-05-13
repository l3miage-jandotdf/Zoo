import React, { createContext, useState } from 'react';
import TerrainService from '../services/TerrainService';
import { Case } from '../type/Case';

interface TerrainContextType {
  terrainData: Case[][];
  setTerrainData: React.Dispatch<React.SetStateAction<Case[][]>>;
}

const TerrainContext = createContext<TerrainContextType>({
  terrainData: [],
  setTerrainData: () => {},
});

interface Props {
    children?: React.ReactNode;
}

export const DataProvider: React.FC<Props> = ({ children }) => {
  const [terrainData, setTerrainData] = useState<Case[][]>(TerrainService.chargerTerrain());
  return (
    <TerrainContext.Provider value={{ terrainData, setTerrainData }}>
      {children}
    </TerrainContext.Provider>
  );
};

export default TerrainContext;
