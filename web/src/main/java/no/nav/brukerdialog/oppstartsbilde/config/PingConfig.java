package no.nav.brukerdialog.oppstartsbilde.config;


import no.nav.sbl.dialogarena.types.Pingable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

@Configuration
public class PingConfig {

    @Bean
    public Pingable modiacontextholderPing() throws IOException {
        return () -> {
            String mchUrl = System.getProperty("modiacontextholderPingURL.url");
            Pingable.Ping.PingMetadata metadata = new Pingable.Ping.PingMetadata("Modiacontextholder via " + mchUrl, "Sjekker om is-alive til modiacontextholder svarer", false);

            try {
                HttpURLConnection connection = (HttpURLConnection)(new URL(mchUrl)).openConnection();
                connection.connect();
                int responseCode = connection.getResponseCode();
                return responseCode == 200? Pingable.Ping.lyktes(metadata): Pingable.Ping.feilet(metadata, "Isalive returnerte statuskode: " + responseCode);
            } catch (Throwable var4) {
                return Pingable.Ping.feilet(metadata, var4);
            }
        };
    }

    @Bean
    public Pingable veilederPing() throws IOException {
        return () -> {
            String veilederUrl = System.getProperty("veilarbveilederPingURL.url");
            Pingable.Ping.PingMetadata metadata = new Pingable.Ping.PingMetadata("Veilarbveileder via " + veilederUrl, "Sjekker om is-alive til veilarbveileder svarer", true);

            try {
                HttpURLConnection connection = (HttpURLConnection)(new URL(veilederUrl)).openConnection();
                connection.connect();
                int responseCode = connection.getResponseCode();
                return responseCode == 200? Pingable.Ping.lyktes(metadata): Pingable.Ping.feilet(metadata, "Isalive returnerte statuskode: " + responseCode);
            } catch (Throwable var4) {
                return Pingable.Ping.feilet(metadata, var4);
            }
        };
    }

}
