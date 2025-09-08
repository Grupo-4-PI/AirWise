import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class FormatarDataTeste {
    public static void main(String[] args) {

        LocalDate hoje = LocalDate.now();
        System.out.println("LocalDate antes de formatar: " + hoje);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String hojeFormatado = hoje.format(formatter);
        System.out.println("LocalDate depois de formatar: " + hojeFormatado);

        LocalDateTime agora = LocalDateTime.now();
        System.out.println("LocalDateTime antes de formatar: " + agora);
        formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        String formatado = agora.format(formatter);
        System.out.println("Último registro: " + formatado);
    }
}
