const fs = require('fs');

// Datos que deseas guardar en el nuevo archivo JSON
const nuevosDatos = [
  { titulo: 'Dato 1', url: 'https://ejemplo1.com' },
  { titulo: 'Dato 2', url: 'https://ejemplo2.com' },
  // Agrega más datos según sea necesario
];

// Escribe los datos en un nuevo archivo JSON
fs.writeFileSync('nuevo-datos.json', JSON.stringify(nuevosDatos, null, 2), 'utf8');

console.log('Datos guardados en el nuevo archivo JSON.');