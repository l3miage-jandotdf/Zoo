import { useContext, useState } from "react";
import { Case } from "../type/Case";

const TerrainJSON = require('../../data/Terrain.json');
import TerrainContext from '../contexts/TerrainContext';



const TerrainService = { 

  chargerTerrain: function() : Case[][] {
    try {
      const terrain = TerrainJSON.map(ligne => {
        return ligne.map(caseJSON => ({
          id: caseJSON.id,
          couleur: caseJSON.couleur,
          image: caseJSON.image
        }));
      });

      return terrain;
    } catch (err) {
      console.error('Erreur de lecture du fichier:', err);
      return null;
    }
  },

  placeSpecialCase : function(x : number, y : number, terrainData: Case[][], setTerrainData: React.Dispatch<React.SetStateAction<Case[][]>>){
    const updatedTerrainData = [...terrainData];

    if (updatedTerrainData.length > 0 && updatedTerrainData[0].length > 0) {
      const caseAjoutee = new Case();
      caseAjoutee.id=1;
      caseAjoutee.couleur="#808080";
      caseAjoutee.image="";
      updatedTerrainData[x][y] = caseAjoutee;
    }
    setTerrainData(updatedTerrainData);
  }

};

export default TerrainService;
