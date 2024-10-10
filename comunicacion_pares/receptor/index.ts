import {create_container}  from 'rhea';

// Configuración del nodo destino para recibir mensajes de forma directa.
const opcionesReceptor = {
  host: '0.0.0.0',  // Escuchar en todas las interfaces de red.
  port: 5673,  // Puerto para escuchar la conexión directa.
  container_id: 'nodo-receptor'  // Identificador del nodo receptor.
};

// Crear un contenedor
const container = create_container({ id: opcionesReceptor.container_id });

// Escuchar en el host y puerto especificados.
container.listen(opcionesReceptor);
console.log(`Receptor escuchando en ${opcionesReceptor.host}:${opcionesReceptor.port}`);

// Escuchar mensajes entrantes.
container.on('message', (context) => {
  // cuerpo del mensaje
  console.log('Mensaje recibido:', context.message.body);
  // propiedades recibidas
  console.log('Propiedades:', context.message.application_properties);
});

// Notificar cuando el receptor está listo para recibir mensajes.
container.on('receiver_open', (context) => {
  console.log('Receptor listo para recibir mensajes.');
});

// Notificar cuando se pierde las conexiones.
container.on('disconnected', () => {
  console.log('Se han desconectado.');
});