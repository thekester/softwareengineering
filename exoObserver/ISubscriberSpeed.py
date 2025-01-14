from abc import ABC, abstractmethod
from typing import List
from .IObserverSpeed import IObserverSpeed

class ISubscriberSpeed(ABC):
    @abstractmethod
    def subscribe(self, observer: IObserverSpeed) -> None:
        pass

    @abstractmethod
    def unsubscribe(self, observer: IObserverSpeed) -> None:
        pass

    @abstractmethod
    def notifyObservers(self, vitesse: str) -> None:
        pass
