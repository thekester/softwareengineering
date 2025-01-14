import pytest
import sys
import os

# Résoudre dynamiquement le chemin d'accès au répertoire contenant les modules
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(current_dir, '..'))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from Capteur import Capteur
from IObserverSpeed import IObserverSpeed
from TableauDeBord import TableauDeBord


# Observateur fictif pour les tests
class DummyObserver(IObserverSpeed):
    def __init__(self):
        self.received = []

    def notifySpeed(self, vitesse: str) -> None:
        self.received.append(vitesse)

def test_subscribe_notification():
    capteur = Capteur()
    dummy = DummyObserver()
    capteur.subscribe(dummy)
    capteur.changeSpeed("100 km/h")
    assert dummy.received == ["100 km/h"]

def test_unsubscribe():
    capteur = Capteur()
    dummy = DummyObserver()
    capteur.subscribe(dummy)
    capteur.unsubscribe(dummy)
    capteur.changeSpeed("120 km/h")
    assert dummy.received == []

def test_multiple_observers():
    capteur = Capteur()
    dummy1 = DummyObserver()
    dummy2 = DummyObserver()
    capteur.subscribe(dummy1)
    capteur.subscribe(dummy2)
    capteur.changeSpeed("80 km/h")
    assert dummy1.received == ["80 km/h"]
    assert dummy2.received == ["80 km/h"]

def test_tableau_de_bord_history():
    tableau = TableauDeBord()
    tableau.notifySpeed("50 km/h")
    tableau.notifySpeed("60 km/h")
    assert tableau.history == ["50 km/h", "60 km/h"]

def test_duplicate_subscribe():
    capteur = Capteur()
    dummy = DummyObserver()
    capteur.subscribe(dummy)
    capteur.subscribe(dummy)  # Tentative d'abonnement en double
    capteur.changeSpeed("70 km/h")
    # Le DummyObserver ne doit recevoir la notification qu'une seule fois
    assert dummy.received == ["70 km/h"]
