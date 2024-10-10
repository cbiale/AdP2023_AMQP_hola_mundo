"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rhea_1 = require("rhea");
// Configuración para conectar el emisor directamente al receptor.
const opcionesConeccion = {
    host: 'localhost',
    port: 5672,
    username: 'adp',
    password: 'adp',
};
// Establece una conexión con el broker
const coneccion = (0, rhea_1.connect)(opcionesConeccion);
coneccion.on('connection_open', () => {
    console.log('Conexión establecida con RabbitMQ.');
    // Crea un enlace (sender) y adjunta la cola 'prueba'.
    coneccion.open_sender({
        target: { address: 'prueba' }
    });
});
coneccion.on('sendable', (context) => {
    console.log('El nodo fuente está listo para enviar mensajes.');
    // enviar mensaje cada 5 segundos
    let contador = 0;
    setInterval(() => {
        let mensaje = {
            body: 'Mensaje por broker',
            application_properties: { contador: contador++ }
        };
        context.sender.send(mensaje);
        console.log('Mensaje enviado:', mensaje);
    }, 5000);
});
coneccion.on('disconnected', () => {
    console.log('Conexión cerrada.');
    // salir del programa
    process.exit(0);
});
