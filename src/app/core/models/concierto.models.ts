export interface Concierto {
  id: number;
  artista: {
    id: string; // Cambiado a string para soportar IDs como '111239' o 'LOC_...'
    nombre: string;
    foto?: string;
    biografia?: string;
    genero?: string;
  };
  localidad: {
    id: number;
    nombreCiudad: string;
    pais: string;
    codigoPostal: string;
  };
  fechaHora: string; // ISO string para usar con el pipe | date
  local: string;
  descripcion: string;
  
  // Nuevos campos necesarios para la tienda y el stock
  precio: number;
  stock: number;
}