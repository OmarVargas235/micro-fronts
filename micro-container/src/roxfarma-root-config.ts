import { registerApplication, start, LifeCycles } from "single-spa";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

registerApplication({
    name: "@roxfarma/admin",
    app: () => System.import<LifeCycles>("@roxfarma/admin"),
    activeWhen: ["/admin"],
});

registerApplication({
    name: "@roxfarma/seguridad",
    app: () => System.import<LifeCycles>("@roxfarma/seguridad"),
    activeWhen: ["/"],
});

registerApplication({
    name: "@roxfarma/servicios",
    app: () => System.import<LifeCycles>("@roxfarma/servicios"),
    activeWhen: ['/home', '/productos', '/detalle-producto', '/clientes', '/detalle-cliente', '/mis-pedidos', '/nuevos-pedidos', '/detalles-producto', '/caja-pedidos', '/configuracion', '/detalle-mis-pedidos'],
});

start({
    urlRerouteOnly: true,
});

if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition((data) => {

    window.localStorage.setItem('location', JSON.stringify([data.coords.latitude, data.coords.longitude]));

    }, (err) => console.error(err));
}

serviceWorkerRegistration.register();