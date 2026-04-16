export interface Concierto {
  id: number;
  artistaId: string;
  nombre: string;
  localidad?: any; // O la interfaz Localidad si la tienes
  fechaHora: Date | string;
  local: string;
  descripcion: string;
}