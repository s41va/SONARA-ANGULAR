// Importas la interfaz de Usuario si ya la tienes definida
import { Usuario } from './usuario.model';

export interface UsuarioPerfil {
  id: number; // En TypeScript usamos 'number' para Long
  usuario?: Usuario; // El signo '?' indica que es opcional (Lazy en Java)
  firstName: string;
  phoneNumber?: string;
  profileImage?: string;
  bio?: string;
  locale?: string;
  createdAt: Date | string; // Date si lo conviertes en el pipe, string si viene directo de JSON
  updatedAt: Date | string;
}