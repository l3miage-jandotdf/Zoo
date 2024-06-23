import { Case } from "../type/Case";

const TerrainJSON = require('../../data/Terrain.json');


const TerrainService = { 

  chargerTerrain: function() : Case[][] {
    try {
      const terrain = TerrainJSON.map(ligne => {
        return ligne.map(caseJSON => ({
          id: caseJSON.id,
          image: caseJSON.image,
          sol : caseJSON.sol
        }));
      });

      return terrain;
    } catch (err) {
      console.error('Erreur de lecture du fichier:', err);
      return null;
    }
  },

};

export default TerrainService;
