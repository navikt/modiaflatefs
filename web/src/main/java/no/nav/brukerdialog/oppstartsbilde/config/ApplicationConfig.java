package no.nav.brukerdialog.oppstartsbilde.config;

import no.nav.apiapp.ApiApplication;
import no.nav.brukerdialog.oppstartsbilde.api.TeksterController;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import static no.nav.apiapp.ApiApplication.Sone.FSS;

@Configuration
@Import({
        TeksterServiceConfig.class,
        PingConfig.class,
        TeksterController.class
})
public class ApplicationConfig implements ApiApplication{

    @Override
    public Sone getSone() {
        return FSS;
    }

    @Override
    public boolean brukSTSHelsesjekk() {
        return false;
    }
}
