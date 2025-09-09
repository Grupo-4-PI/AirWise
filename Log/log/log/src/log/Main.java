package log;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.TimeUnit;

public class Main {

    public static void main(String[] args) throws InterruptedException {

        DateTimeFormatter formatadorDeTempo = DateTimeFormatter.ofPattern("HH:mm:ss.SSS");

        String horaAtualFormatada = LocalTime.now().format(formatadorDeTempo);
        System.out.println("[INFO] %s - Iniciando tratamento de dados - Arquivo XPTO.".formatted(horaAtualFormatada));

        int totalLinhas = 100;

        for (int linhaAtual = 1; linhaAtual <= totalLinhas; linhaAtual += 10) {
            TimeUnit.MILLISECONDS.sleep(150);
            horaAtualFormatada = LocalTime.now().format(formatadorDeTempo);
            System.out.println("[INFO] " + horaAtualFormatada + " - Processando linha " + linhaAtual + "...");
        }

        horaAtualFormatada = LocalTime.now().format(formatadorDeTempo);
        System.out.println("[INFO] " + horaAtualFormatada + " - Tratamento de dados concluído.");
    }
}