import amqp from 'amqplib';

async function obtener() {
  try {
    // se conecta al broker
    const coneccion = await amqp.connect('amqp://adp:adp@localhost:5672');
    // creamos un canal
    const canal = await coneccion.createChannel();

    const nombreExchange = 'direct_exchange';
    const nombreCola = 'ejemplo_cola_a_direct';
    const bindingKey = 'sensores.temperatura';

    // declaramos exchange
    await canal.assertExchange(nombreExchange, 'direct', { durable: true });
    // declaramos una cola
    const q = await canal.assertQueue(nombreCola, { exclusive: false });

    // asociamos una cola a un exchange por una bindingKey (patrón de enrutamiento)
    await canal.bindQueue(nombreCola, nombreExchange, bindingKey);

    // consumimos los mensajes que llegan a la cola
    canal.consume(nombreCola, (mensaje) => {
      if (mensaje) {
        // pasamos mensaje a String
        const mensajeRecibido = mensaje.content.toString();
        // imprimimos mensaje recibido
        console.log(`[x] Recibido '${mensajeRecibido}' de la cola '${q.queue}'`);
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
