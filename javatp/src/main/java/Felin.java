public abstract class Felin {

    public void boire() {
        System.out.println("lap");
    }

    public abstract void cri();

    public static void main(String[] args) {
        Felin chat = new Chat();
        chat.boire();
        chat.cri();

        Felin tigre = new Tigre();
        tigre.boire();
        tigre.cri();
    }
}