from abc import ABC, abstractmethod

class IObserverSpeed(ABC):
    @abstractmethod
    def notifySpeed(self, vitesse: str) -> None:
        pass
