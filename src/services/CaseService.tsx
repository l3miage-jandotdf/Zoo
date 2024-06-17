import { Case } from "../type/Case";

const CaseService = { 

  renderCases: function(terrainType: string) : Case[][] {
    let cases: Case[][];
    switch(terrainType){
        case "Enclos": {
            cases = [
                [    
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos-haut-gauche' },
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos-haut' },
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos-haut' },
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos-haut2' },
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos-haut-droite' },
                ],
                [    
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos-gauche' },
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos' },
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos' },
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos' },
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos-droite' },
                ],
                [    
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos-bas-gauche' },
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos-bas' },
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos-bas' },
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos-bas' },
                    { id: 1, couleur: '#FFFFFF', image: 'Enclos-bas-droite' },
                ]
            ]
            console.log("pouet")
            break;
        }
        case "Zebre":{
            cases = [[{ id: 1, couleur: '#FFFFFF', image: 'Zebre' }]];
            break;
        }
    }
    return cases;
  },

};

export default CaseService;
