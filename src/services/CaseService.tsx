import { Case } from "../type/Case";

const CaseService = { 

 /**
  * Retourne la ou les cases qui correspondent à une structure à poser
  * @param terrainType le type de structure
  * @returns la ou les cases à poser
  */
  renderCases: function(terrainType: string) : Case[][] {
    let cases: Case[][];
    switch(terrainType){
        case "Enclos": {
            cases = [
                [    
                    { id: 1, image: 'Enclos-haut-gauche', sol: 'Enclos-occupe' },
                    { id: 1, image: 'Enclos-haut', sol: 'Enclos-occupe' },
                    { id: 1, image: 'Enclos-haut', sol: 'Enclos-occupe' },
                    { id: 1, image: 'Enclos-haut2', sol: 'Enclos-occupe' },
                    { id: 1, image: 'Enclos-haut-droite', sol: 'Enclos-occupe' },
                ],
                [    
                    { id: 1, image: 'Enclos-gauche', sol: 'Enclos-occupe' },
                    { id: 1, image: 'Enclos', sol: 'Enclos-herbe' },
                    { id: 1, image: 'Enclos', sol: 'Enclos-herbe' },
                    { id: 1, image: 'Enclos', sol: 'Enclos-herbe' },
                    { id: 1, image: 'Enclos-droite', sol: 'Enclos-occupe' },
                ],
                [    
                    { id: 1, image: 'Enclos-bas-gauche', sol: 'Enclos-occupe' },
                    { id: 1, image: 'Enclos-bas', sol: 'Enclos-occupe' },
                    { id: 1, image: 'Enclos-bas', sol: 'Enclos-occupe' },
                    { id: 1, image: 'Enclos-bas', sol: 'Enclos-occupe' },
                    { id: 1, image: 'Enclos-bas-droite', sol: 'Enclos-occupe' },
                ]
            ]
            break;
        }
        case "Cafe": {
            cases = [
                [    
                    { id: 1, image: 'Cafe-haut-gauche', sol: 'Cafe-occupe' },
                    { id: 1, image: 'Cafe-haut-droite', sol: 'Cafe-occupe' },
                    
                ],
                [    
                    { id: 1, image: 'Cafe-bas-gauche', sol: 'Cafe-occupe' },
                    { id: 1, image: 'Cafe-bas-droite', sol: 'Cafe-occupe' },
                    
                ]
            ]
            break;
        }
        case "Zebre":{
            cases = [[{ id: 1, image: 'Zebre', sol: 'Animal' }]];
            break;
        }
        case "Autruche":{
            cases = [[{ id: 1, image: 'Autruche', sol: 'Animal' }]];
            break;
        }
        case "Panda":{
            cases = [[{ id: 1, image: 'Panda', sol: 'Animal' }]];
            break;
        }
    }
    return cases;
  },

};

export default CaseService;
