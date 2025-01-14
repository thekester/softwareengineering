from Capteur import Capteur
from Subscriber import Subscriber
from TableauDeBord import TableauDeBord

def main():
    capteur = Capteur()

    abonne1 = Subscriber("Abonné 1")
    abonne2 = Subscriber("Abonné 2")
    tableau = TableauDeBord()

    capteur.subscribe(abonne1)
    capteur.subscribe(abonne2)
    capteur.subscribe(tableau)

    capteur.changeSpeed("50 km/h")
    capteur.changeSpeed("80 km/h")

if __name__ == "__main__":
    main()
