package javatp;

import java.util.ArrayList;
import java.util.List;

public class Gardien {
    private List<Felin> felins;

    public Gardien() {
        this.felins = new ArrayList<>();
    }

    // Ajouter un félin à la liste
    public void ajouterFelin(Felin felin) {
        if (felin != null) {
            felins.add(felin);
            System.out.println("Félin ajouté : " + felin.getClass().getSimpleName());
        }
    }

    // Supprimer un félin de la liste
    public void retirerFelin(Felin felin) {
        if (felin != null && felins.remove(felin)) {
            System.out.println("Félin retiré : " + felin.getClass().getSimpleName());
        } else {
            System.out.println("Félin introuvable.");
        }
    }

    // Notifier tous les félins pour qu'ils fassent leur cri
    public void notifierFelins() {
        System.out.println("Le gardien demande à tous les félins de faire leur cri !");
        for (Felin felin : felins) {
            felin.cri();
        }
    }

    // Afficher la liste des félins surveillés
    public void afficherFelins() {
        System.out.println("Liste des félins surveillés :");
        if (felins.isEmpty()) {
            System.out.println("Aucun félin sous surveillance.");
        } else {
            for (Felin felin : felins) {
                System.out.println("- " + felin.getClass().getSimpleName());
            }
        }
    }
}
