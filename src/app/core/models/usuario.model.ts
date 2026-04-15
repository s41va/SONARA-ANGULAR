export interface Usuario {
  usuario_id: number;
  nombre: string;
  email: string;
  contrasena_hash?: string; // El signo ? indica que es opcional (no lo solemos traer en listas)
  fecha_nacimiento?: Date | string;
  localidad_id?: number;
  fecha_registro: Date | string;
}