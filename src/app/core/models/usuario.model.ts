export interface Usuario {
  id: number;
  nombreCompleto: string;
  nombre: string;
  email: string;
  contrasena_hash?: string; // El signo ? indica que es opcional (no lo solemos traer en listas)
  fechaNacimiento: Date | string;
  localidad_id?: number;
  localidadNombre: string;
  fechaRegistro: Date | string;
  bio: String;
  phoneNumber: Int16Array;
  profileImage: string;
  locale: string;
  roles: Int16Array;
}