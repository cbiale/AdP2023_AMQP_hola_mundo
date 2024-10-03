import amqp from 'amqplib';

async function obtener() {
  try {
    // se conecta al broker
    const coneccion = await amqp.connect('amqp://adp:adp@localhost:5672');
    // creamos un canal
    const canal = await coneccion.createChannel();

    // nombre de la cola
    const cola = 'ejemplo_cola';
    // se declara la cola
    // considerar que si la cola ya existe, esta función simplemente verifica su existencia y
    // asegura que los parámetros de configuración sean los mismos. 
    // Si la cola no existe, se crea con los parámetros proporcionados.
    await canal.assertQueue(cola);

    // consumimos los mensajes que llegan a la cola
    canal.consume(cola, (mensaje) => {
      if (mensaje) {
        // pasamos mensaje a String
        const mensajeRecibido = mensaje.content.toString();
        // imprimimos mensaje recibido
        console.log(`[x] Recibido '${mensajeRecibido}' de la cola '${cola}'`);
        // Confirmamos la recepción del mensaje
        // Al llamar a ack, se informa al broker AMQP que el mensaje ha sido 
        // correctamente procesado y puede ser eliminado de la cola
        canal.ack(mensaje); 
      }
    });

    console.log('[consumidor] Esperando mensajes. Presiona CTRL+C para salir.');

  } catch (error) {
    console.error('Error:', error);
  }
}

obtener();
