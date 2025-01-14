from typing import List
from IObserverSpeed import IObserverSpeed

class TableauDeBord(IObserverSpeed):
    def __init__(self) -> None:
        self.history: List[str] = []

    def notifySpeed(self, vitesse: str) -> None:
        self.history.append(vitesse)
        print(f"TableauDeBord: Vitesse mise à jour à {vitesse}. Historique : {self.history}")
