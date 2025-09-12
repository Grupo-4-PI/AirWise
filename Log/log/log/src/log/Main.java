package log;

import java.time.LocalDateTime; // Importa a classe correta
import java.time.format.DateTimeFormatter;
import java.util.concurrent.TimeUnit;

public class Main {

    public static void main(String[] args) throws InterruptedException {
        DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss.SSS");

        String dataHoraAtualFormatada = LocalDateTime.now().format(formatador);
        System.out.println("[INFO] %s - Iniciando tratamento de dados - Arquivo XPTO.".formatted(dataHoraAtualFormatada));

        int totalLinhas = 100;

        for (int linhaAtual = 1; linhaAtual <= totalLinhas; linhaAtual += 10) {
            TimeUnit.MILLISECONDS.sleep(150);

            dataHoraAtualFormatada = LocalDateTime.now().format(formatador);
            System.out.println("[INFO] " + dataHoraAtualFormatada + " - Processando linha " + linhaAtual + "...");
        }

        dataHoraAtualFormatada = LocalDateTime.now().format(formatador);
        System.out.println("[INFO] " + dataHoraAtualFormatada + " - Tratamento de dados concluído.");
    }
}