package log;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.TimeUnit;

public class Main {

    public static void main(String[] args) throws InterruptedException {
        String severidade = "INFO";

        DateTimeFormatter formatador = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");

        String data_hora_atual_formatada = LocalDateTime.now().format(formatador);
        System.out.println("%s [%s] - Iniciando tratamento de dados - Arquivo XPTO.".formatted(data_hora_atual_formatada, severidade));

        int totalLinhas = 600;

        for (int linhaAtual = 1; linhaAtual <= totalLinhas; linhaAtual += 10) {
            TimeUnit.MILLISECONDS.sleep(150);

            data_hora_atual_formatada = LocalDateTime.now().format(formatador);
            System.out.println("%s [%s] - Processando linha %d...".formatted(data_hora_atual_formatada, severidade, linhaAtual));
        }

        data_hora_atual_formatada = LocalDateTime.now().format(formatador);
        System.out.println("%s [%s] - Tratamento de dados concluído.".formatted(data_hora_atual_formatada, severidade));
    }
}