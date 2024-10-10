import {connect}  from 'rhea';

// Configuración de la conexión a RabbitMQ
const opcionesConeccion = {
  host: 'localhost', 
  port: 5672,  
  username: 'adp',
  password: 'adp',
};

const coneccion = connect(opcionesConeccion);

coneccion.on('connection_open', () => {
  console.log('Conexión establecida con RabbitMQ como broker AMQP 1.0');

  // Crear un receiver y adjuntar a la cola 'prueba'
  coneccion.open_receiver({ source: { address: 'prueba' } });
});

coneccion.on('message', (context) => {
  const mensaje = context.message;
  console.log('Mensaje recibido en la cola prueba: ', mensaje);
  // console.log(`- body: ${mensaje.body}`);
  // console.log(`- application_properties: ${mensaje.application_properties.contador}`);
});

coneccion.on('disconnected', (context) => {
  console.error('Conexión cerrada', context.error);
});

