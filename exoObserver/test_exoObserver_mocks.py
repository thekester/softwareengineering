import pytest
from unittest.mock import MagicMock
from exoObserver.Capteur import Capteur
from exoObserver.IObserverSpeed import IObserverSpeed

class DummyObserver(IObserverSpeed):
    def notifySpeed(self, vitesse: str) -> None:
        pass  # Méthode vide puisque nous utiliserons un mock

def test_notifyObservers_appelle_notifySpeed_sur_observateurs():
    capteur = Capteur()
    
    # Créer des mocks pour les observateurs
    observer1 = MagicMock(spec=IObserverSpeed)
    observer2 = MagicMock(spec=IObserverSpeed)
    
    # S’abonner aux observateurs
    capteur.subscribe(observer1)
    capteur.subscribe(observer2)
    
    # Déclencher un changement de vitesse
    test_vitesse = "90 km/h"
    capteur.changeSpeed(test_vitesse)
    
    # Vérifier que notifySpeed a été appelé sur chaque observateur avec la bonne vitesse
    observer1.notifySpeed.assert_called_with(test_vitesse)
    observer2.notifySpeed.assert_called_with(test_vitesse)

def test_unsubscribe_ne_notifie_pas_apres_desabonnement():
    capteur = Capteur()
    
    # Créer un mock pour un observateur
    observer = MagicMock(spec=IObserverSpeed)
    
    # Abonnement puis désabonnement
    capteur.subscribe(observer)
    capteur.unsubscribe(observer)
    
    # Changer la vitesse
    capteur.changeSpeed("100 km/h")
    
    # Vérifier que notifySpeed n’a pas été appelé
    observer.notifySpeed.assert_not_called()
