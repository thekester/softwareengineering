from IObserverSpeed import IObserverSpeed

class Subscriber(IObserverSpeed):
    def __init__(self, name: str) -> None:
        self.name = name

    def notifySpeed(self, vitesse: str) -> None:
        print(f"{self.name} a reçu la vitesse : {vitesse}")
