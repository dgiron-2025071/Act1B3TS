// definicion de tipos union
type Prioridad = 'Baja' | 'Media' | 'Alta' | 'Inmediata';

type EstadoTicket = 'Abierto' | 'En progreso' | 'Resuelto';

// interfaz del ticket
interface Ticket {
  readonly id: number;
  titulo: string;
  descripcion: string;
  reportadoPor: string;
  prioridad: Prioridad;
  estado: EstadoTicket;
  fechaCreacion: Date;
}

// almacenamiento de datos
let tickets: Ticket[] = [];
let siguienteId: number = 1;

// configuracion de prompt
import promptSync from 'prompt-sync';
const prompt = promptSync();

function leerEntrada(mensaje: string): string {
  return prompt(mensaje);
}

// funciones de validacion
function generarId(): number {
  return siguienteId++;
}

function validarPrioridad(valor: string): valor is Prioridad {
  return valor === 'Baja' || valor === 'Media' || valor === 'Alta' || valor === 'Inmediata';
}

// funciones principales
function crearTicket(): void {
  console.log('\nCREAR NUEVO REPORTE\n');

  const titulo = leerEntrada('Titulo: ');
  
  if (!titulo.trim()) {
    console.log('El titulo no puede estar vacio.\n');
    return;
  }
  
  const descripcion = leerEntrada('Descripcion: ');
  const reportadoPor = leerEntrada('Reportado por: ');
  
  let prioridad: Prioridad;
  while (true) {
    const prioridadInput = leerEntrada('Prioridad (Baja/Media/Alta/Inmediata): ');
    if (validarPrioridad(prioridadInput)) {
      prioridad = prioridadInput;
      break;
    }
    console.log('Prioridad invalida. Intente nuevamente.');
  }

  const nuevoTicket: Ticket = {
    id: generarId(),
    titulo,
    descripcion,
    reportadoPor,
    prioridad,
    estado: 'Abierto',
    fechaCreacion: new Date()
  };

  tickets.push(nuevoTicket);
  console.log(`\nReporte #${nuevoTicket.id} creado exitosamente.\n`);
}

function listarTickets(): void {
  console.log('\nLISTA DE REPORTES\n');
  
  if (tickets.length === 0) {
    console.log('No hay reportes registrados.\n');
    return;
  }

  tickets.forEach(ticket => {
    const fechaFormateada = ticket.fechaCreacion.toLocaleDateString('es-ES');
    console.log(
      `${ticket.id} | ${ticket.titulo.substring(0, 20)} | ${ticket.prioridad} | ${ticket.estado} | ${ticket.reportadoPor} | ${fechaFormateada}`
    );
  });
  console.log('');
}

// menu principal
function mostrarMenu(): void {
  console.log('\nSISTEMA DE GESTION DE REPORTES\n');
  console.log('1. Crear reporte');
  console.log('2. Listar reportes');
  console.log('3. Salir');
}

function main(): void {
  console.log('\nIniciando gestion de reportes');
  
  let opcion: string;
  
  while (true) {
    mostrarMenu();
    opcion = leerEntrada('\nSeleccione una opcion (1-3): ');
    
    switch (opcion) {
      case '1':
        crearTicket();
        break;
      case '2':
        listarTickets();
        break;
      case '3':
        console.log('\nSaliendo del sistema... ¡te veo luego!\n');
        return;
      default:
        console.log('\nOpcion invalida. Intente nuevamente.\n');
    }
  }
}

// wjecucion
main();