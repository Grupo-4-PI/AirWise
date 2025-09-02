package log;

public class Main {
    public static void main(String[] args) {

        System.out.print("Iniciando tratamento de dados - Arquivo XPTO.\n");

        String data = "2025/09/16";
        Integer contador_linha = 1;

        Integer hora = 0;
        Integer minuto = 0;
        Integer segundo = 0;
        Integer milissegundo = 0;

        while (contador_linha <= 1000) {

            milissegundo += 26;
            segundo += 15;
            minuto += 1;

            if (milissegundo >= 60) {
                milissegundo -= 60;
                segundo += 1;
            }

            if (segundo >= 60) {
                segundo -= 60;
                minuto += 1;
            }

            if (minuto >= 60) {
                minuto -= 60;
                hora += 1;
            }

            System.out.print("Linha %d %s - %02d:%02d:%02d:%02d;\n".formatted(contador_linha, data, hora, minuto, segundo, milissegundo));

            contador_linha += 10;
        }

        minuto += 1;
        segundo += 15;

        System.out.print("Linha 1000 %s - %02d:%02d:%02d:%02d;\n".formatted(data, hora, minuto, segundo, milissegundo));

        System.out.print("\nTratamento de dados concluído.");
    }
}