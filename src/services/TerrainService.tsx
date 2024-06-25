import { Case } from "../type/Case";
const TerrainJSON = require('../../data/Terrain.json');


const TerrainService = {

  /**
   * Get le terrain
   * @returns le terrain de type Case[][]
   */
  chargerTerrain: async function(): Promise<Case[][] | null> {
    try {
      const response = await fetch('http://192.168.1.124:3000/terrain');  
      if (!response.ok) {
        throw new Error('Erreur réseau lors de la récupération du fichier JSON');
      }
      
      const terrainJSON = await response.json();
      
      const terrain = terrainJSON.cases.map(ligne => {
        return ligne.map(caseJSON => ({
          id: caseJSON.id,
          image: caseJSON.image,
          sol: caseJSON.sol
        }));
      });

      return terrain;
    } catch (err) {
      console.error('Erreur de lecture du fichier:', err);
      return null;
    }
  },

  /**
   * Put le terrain modifié
   * @param terrain 
   */
  enregistrerTerrain: async (terrain: Case[][]): Promise<void> => {
    try {
      
      const terrainData = {
        id: 1, // Assurez-vous que l'ID correspond à celui utilisé dans votre db.json
        cases: terrain
      };

      const response = await fetch('http://192.168.1.124:3000/terrain', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(terrainData),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement du terrain');
      }
      console.log('Terrain enregistré avec succès !');
    } catch (err) {
      console.error('Erreur lors de l\'enregistrement du terrain:', err);
      throw err; 
    }
  },

};

export default TerrainService;
