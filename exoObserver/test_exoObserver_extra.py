# exoObserver/test_exoObserver_extra.py
import logging
import pytest
from unittest.mock import MagicMock
from exoObserver.Capteur import Capteur
from exoObserver.IObserverSpeed import IObserverSpeed

# Pour simplifier les tests de logging, on peut utiliser un handler en mémoire si nécessaire.
class DummyObserver(IObserverSpeed):
    def __init__(self, name="Dummy"):
        self.name = name
        self.received = []

    def notifySpeed(self, vitesse: str) -> None:
        self.received.append(vitesse)

    def __repr__(self):
        return f"<DummyObserver {self.name}>"

def test_duplicate_subscribe_handling():
    capteur = Capteur()
    dummy = DummyObserver()
    
    # Abonnement en double
    capteur.subscribe(dummy)
    capteur.subscribe(dummy)
    capteur.changeSpeed("70 km/h")
    
    # Le DummyObserver ne doit recevoir qu'une seule notification malgré l'abonnement en double.
    assert dummy.received == ["70 km/h"]
    # Nombre d'observateurs ne doit pas inclure de doublon.
    assert capteur.observer_count() == 1

def test_unsubscribe_nonexistent_observer():
    capteur = Capteur()
    dummy = DummyObserver()
    
    # Tentative de désabonnement sans abonnement préalable.
    capteur.unsubscribe(dummy)  # Ne devrait pas lever d'exception
    # Aucun observateur n'est enregistré.
    assert capteur.observer_count() == 0

def test_observer_count():
    capteur = Capteur()
    observers = [DummyObserver(f"Obs{i}") for i in range(5)]
    
    for obs in observers:
        capteur.subscribe(obs)
    assert capteur.observer_count() == 5
    
    # Désabonnement de quelques observateurs
    capteur.unsubscribe(observers[0])
    capteur.unsubscribe(observers[2])
    assert capteur.observer_count() == 3

def test_notifyObservers_with_exception():
    capteur = Capteur()
    
    # Création d'un observateur qui lève une exception
    faulty_observer = MagicMock(spec=IObserverSpeed)
    faulty_observer.notifySpeed.side_effect = Exception("Erreur de test")
    
    # Un observateur normal
    normal_observer = DummyObserver("Normal")
    
    capteur.subscribe(faulty_observer)
    capteur.subscribe(normal_observer)
    
    # Tenter une notification, la première notification lèvera une exception qui sera attrapée par notifyObservers
    capteur.changeSpeed("120 km/h")
    
    # Vérification que le normal_observer a bien reçu la notification
    assert normal_observer.received == ["120 km/h"]
    # Vérification que faulty_observer.notifySpeed a été appelé malgré l'exception interne.
    faulty_observer.notifySpeed.assert_called_with("120 km/h")
