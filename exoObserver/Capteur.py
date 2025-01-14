# exoObserver/Capteur.py
import logging
from typing import List
from .ISubscriberSpeed import ISubscriberSpeed
from .IObserverSpeed import IObserverSpeed

logger = logging.getLogger(__name__)

class Capteur(ISubscriberSpeed):
    def __init__(self) -> None:
        self.observers: List[IObserverSpeed] = []

    def subscribe(self, observer: IObserverSpeed) -> None:
        if observer not in self.observers:
            self.observers.append(observer)
            logger.debug(f"Abonné ajouté : {observer}")
        else:
            logger.debug(f"Tentative d'abonnement en double ignorée pour : {observer}")

    def unsubscribe(self, observer: IObserverSpeed) -> None:
        if observer in self.observers:
            self.observers.remove(observer)
            logger.debug(f"Abonné retiré : {observer}")
        else:
            logger.debug(f"Tentative de désabonnement sur un observateur non abonné : {observer}")

    def notifyObservers(self, vitesse: str) -> None:
        logger.debug(f"Notification des observateurs pour la vitesse : {vitesse}")
        for observer in self.observers:
            try:
                observer.notifySpeed(vitesse)
            except Exception as e:
                logger.error(f"Erreur lors de la notification de {observer}: {e}")

    def changeSpeed(self, vitesse: str) -> None:
        logger.info(f"Capteur: Vitesse changée à {vitesse}")
        self.notifyObservers(vitesse)
    
    def observer_count(self) -> int:
        """Retourne le nombre actuel d'observateurs abonnés."""
        return len(self.observers)
