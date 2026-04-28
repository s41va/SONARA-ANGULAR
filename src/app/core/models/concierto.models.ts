export interface Concierto {
  id: number;
  artista: {
    id: number;
    nombre: string;
    foto?: string;
    biografia?: string;
  };
  localidad: {
    id: number;
    nombreCiudad: string;
    pais: string;
    codigoPostal: string;
  };
  fechaHora: string; // ISO string from backend
  local: string;
  descripcion: string;
}