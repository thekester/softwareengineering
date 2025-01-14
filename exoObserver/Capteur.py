from typing import List
from ISubscriberSpeed import ISubscriberSpeed
from IObserverSpeed import IObserverSpeed

class Capteur(ISubscriberSpeed):
    def __init__(self) -> None:
        self.observers: List[IObserverSpeed] = []

    def subscribe(self, observer: IObserverSpeed) -> None:
        if observer not in self.observers:
            self.observers.append(observer)

    def unsubscribe(self, observer: IObserverSpeed) -> None:
        if observer in self.observers:
            self.observers.remove(observer)

    def notifyObservers(self, vitesse: str) -> None:
        for observer in self.observers:
            observer.notifySpeed(vitesse)

    def changeSpeed(self, vitesse: str) -> None:
        print(f"Capteur: Vitesse changée à {vitesse}")
        self.notifyObservers(vitesse)
