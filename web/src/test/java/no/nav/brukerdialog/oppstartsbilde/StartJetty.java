package no.nav.brukerdialog.oppstartsbilde;


import no.nav.dialogarena.config.DevelopmentSecurity;
import no.nav.sbl.dialogarena.common.jetty.Jetty;

import static no.nav.dialogarena.config.DevelopmentSecurity.setupISSO;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.*;

public class StartJetty {

    public static final String CONTEXT_NAME = "modiaoppstartsbilde";
    public static final int PORT = 8930;


    public static void main(String[] args) throws Exception {
        Jetty jetty = setupISSO(usingWar()
                        .at(CONTEXT_NAME)
                        .loadProperties("/test.properties")
                        .port(PORT)
                , new DevelopmentSecurity.ISSOSecurityConfig(CONTEXT_NAME,"t6")).buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }

}