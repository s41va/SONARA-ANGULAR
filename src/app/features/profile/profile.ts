import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../core/models/usuario.model'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports:[CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {

  // Inicializamos el objeto para evitar errores de "undefined" en la vista
  public usuario: Usuario = {
    usuario_id: 0,
    nombre: '',
    email: '',
    fecha_registro: new Date()
  };

  constructor() { }

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  /**
   * Simula la carga de datos del usuario logueado.
   * En una app real, aquí llamarías a tu AuthService o a un LocalStorage.
   */
  cargarDatosUsuario(): void {
    // Ejemplo de cómo recuperarías el usuario de la sesión (puedes adaptarlo)
    const datosSesion = localStorage.getItem('usuario_logueado');

    if (datosSesion) {
      this.usuario = JSON.parse(datosSesion);
    };
  }

}