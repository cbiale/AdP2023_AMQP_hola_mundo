"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rhea_1 = require("rhea");
// Configuración para conectar el emisor directamente al receptor.
const opcionesConeccion = {
    host: 'localhost',
    port: 5673,
    container_id: 'nodo-emisor', // Identificador del nodo fuente
};
// Establece una conexión directa con el nodo receptor.
const coneccion = (0, rhea_1.connect)(opcionesConeccion);
coneccion.on('connection_open', () => {
    console.log('Conexión directa establecida con el nodo receptor.');
    // Crea un enlace emisor directamente al nodo receptor.
    coneccion.open_sender({
        target: { address: 'direct_link' } // Usamos un enlace directo en lugar de un broker.
    });
});
coneccion.on('sendable', (context) => {
    console.log('El nodo fuente está listo para enviar mensajes.');
    // enviar mensaje cada 5 segundos
    let contador = 0;
    setInterval(() => {
        let mensaje = {
            body: 'Mensaje directo de nodo a nodo',
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
