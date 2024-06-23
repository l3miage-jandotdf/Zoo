import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Cell } from 'react-native-table-component';


interface CaseProps {
    caseData: {
        id: number;
        image: string;
        sol: string;
    },
    cellIndex : number, 
    length: number,
    placementOk : boolean
}

const CaseComponent: React.FC<CaseProps> = ({ caseData, cellIndex, length, placementOk }) => {
    let img = require('../assets/sols/Default.png')
    switch(caseData.image) { 
        case "Herbe": { 
            img = require('../assets/sols/Herbe.png')
           break; 
        } 
        case "Herbe-bas": { 
            img = require('../assets/sols/Herbe-bas.png')
           break; 
        } 
        case "Herbe-haut": { 
            img = require('../assets/sols/Herbe-haut.png')
           break; 
        } 
        case "Herbe-droite": { 
            img = require('../assets/sols/Herbe-droite.png')
           break; 
        } 
        case "Herbe-gauche": { 
            img = require('../assets/sols/Herbe-gauche.png')
           break; 
        } 
        case "Herbe-bas-droite": { 
            img = require('../assets/sols/Herbe-bas-droite.png')
           break; 
        } 
        case "Herbe-bas-gauche": { 
            img = require('../assets/sols/Herbe-bas-gauche.png')
           break; 
        } 
        case "Herbe-haut-droite": { 
            img = require('../assets/sols/Herbe-haut-droite.png')
           break; 
        } 
        case "Herbe-haut-gauche": { 
            img = require('../assets/sols/Herbe-haut-gauche.png')
           break; 
        } 
        case "Enclos": { 
            img = require('../assets/sols/Enclos.png')
           break; 
        } 
        case "Enclos-haut": { 
            img = require('../assets/sols/Enclos-haut.png')
           break; 
        }
        case "Enclos-haut2": { 
            img = require('../assets/sols/Enclos-haut2.gif')
           break; 
        }
        case "Enclos-haut-gauche": { 
            img = require('../assets/sols/Enclos-haut-gauche.png')
           break; 
        }
        case "Enclos-haut-droite": { 
            img = require('../assets/sols/Enclos-haut-droite.png')
           break; 
        }
        case "Enclos-gauche": { 
            img = require('../assets/sols/Enclos-gauche.png')
           break; 
        }
        case "Enclos-bas-gauche": { 
            img = require('../assets/sols/Enclos-bas-gauche.png')
           break; 
        }
        case "Enclos-bas-droite": { 
            img = require('../assets/sols/Enclos-bas-droite.png')
           break; 
        }
        case "Enclos-bas": { 
            img = require('../assets/sols/Enclos-bas.png')
           break; 
        }
        case "Enclos-droite": { 
            img = require('../assets/sols/Enclos-droite.png')
           break; 
        }
        case "Chemin": { 
            img = require('../assets/sols/Chemin.png')
           break; 
        }
        case "Zebre": { 
            img = require('../assets/sols/Zebre.gif')
           break; 
        }
        case "Autruche": { 
            img = require('../assets/sols/Autruche.gif')
           break; 
        }
     } 

    return (
        <ImageBackground 
            key={cellIndex}
            resizeMode="cover"
            source={img}
        >
            <View style={[styles.case, !placementOk && styles.invalidPlacement]}>
                <Cell   
                    textStyle={styles.text}
                    style={{  width: length, height: length }}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    text: { margin: 6 },
    case: {
    },
    invalidPlacement: {
        backgroundColor: 'rgba(255, 0, 0, 0.3)', // rouge avec opacité
    }
});

export default CaseComponent;
