import React, { useEffect } from 'react';

const MusiqueComponent = () => {
  /*
  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();

        const ost = {
          url: require('../assets/musique/OST.mp3'), // Charger le média depuis le bundle de l'application
          title: 'Coelacanth I',
          artist: 'deadmau5',
          artwork: require('./cover.jpg'), // Load artwork from the app bundle
          duration: 300
        };

        // Ajouter les pistes à la file d'attente
        await TrackPlayer.add([ost]);

        // Commencer la lecture
        await TrackPlayer.play();
      } catch (e) {
        console.log('Erreur lors de la configuration du lecteur de pistes :', e);
      }
    };

    setupPlayer();
    
  }, []);
  */
  return null;
};

export default MusiqueComponent;
