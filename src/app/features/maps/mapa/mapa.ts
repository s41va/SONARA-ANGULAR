import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Importante para detectar el navegador
import { HttpClient } from '@angular/common/http';
import { LocalidadService } from '../../../core/services/localidad.service';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [],
  templateUrl: './mapa.html',
  styleUrl: './mapa.scss',
})
export class Mapa implements AfterViewInit {
  private map: any; // Usamos any porque el tipo L.Map solo existe tras importar Leaflet

  constructor(
    private http: HttpClient,
    private localidadService: LocalidadService,
    @Inject(PLATFORM_ID) private platformId: Object // Inyectamos el ID de la plataforma
  ) { }

  async ngAfterViewInit() { // Usa AfterViewInit
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');
      // Pequeño timeout para asegurar que el DOM procesó el CSS
      setTimeout(() => {
        this.initMap(L);
      }, 400);
    }
  }

  private initMap(L: any): void {

    const container = document.getElementById('map');
    if (!container) return;
    // Inicialización del mapa
    this.map = L.map('map').setView([40.4167, -3.7033], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);

    // Carga del GeoJSON desde assets
    this.http.get('assets/maps/spain-provinces.geojson').subscribe((json: any) => {
      L.geoJSON(json, {
        style: (feature: any) => this.getStyle(feature),
        onEachFeature: (feature: any, layer: any) => {
          layer.on({
            click: (e: any) => this.onProvinceClick(e, feature)
          });
        }
      }).addTo(this.map);
    });
  }

  private getStyle(feature: any) {
    return {
      fillColor: '#3498db',
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  private onProvinceClick(e: any, feature: any) {
    const nombre = feature.properties.name || feature.properties.nombre;
    const id = feature.properties.id || feature.properties.code;

    console.log("Datos de la provincia:", feature.properties);

    if (id) {
      this.localidadService.getLocalidadPorId(id).subscribe({
        next: (res) => {
          console.log("Respuesta de Spring Boot:", res);
        },
        error: (err) => console.error("Error al conectar con el backend", err)
      });
    } else {
      console.warn("La provincia clicada no tiene un ID válido en el GeoJSON");
    }
  }
}