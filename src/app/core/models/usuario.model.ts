export interface Usuario {
  id: number;
  nombreCompleto: string;
  email: string;
  contrasena_hash?: string; // El signo ? indica que es opcional (no lo solemos traer en listas)
  fecha_nacimiento?: Date | string;
  localidad_id?: number;
  fechaRegistro: Date | string;
  bio: String;
  phoneNumber: Int16Array;
  profileImage: string;
  locale: string;
}