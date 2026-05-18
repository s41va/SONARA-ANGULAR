import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Importante para detectar el navegador
import { HttpClient } from '@angular/common/http';
import { LocalidadService } from '../../../core/services/localidad.service';
import { ChangeDetectorRef } from '@angular/core';
import { RankingService } from '../../../core/services/ranking.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateCompiler, TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './mapa.html',
  styleUrl: './mapa.scss',
})
export class Mapa implements OnInit, AfterViewInit {
  private map: any; // Usamos any porque el tipo L.Map solo existe tras importar Leaflet
  public topArtistasGlobal: any[] = [];

  constructor(
    private http: HttpClient,
    private localidadService: LocalidadService,
    private cdr: ChangeDetectorRef,
    private rankingService: RankingService,
    private zone: NgZone,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inyectamos el ID de la plataforma
  ) { }

  ngOnInit(){
      if (isPlatformBrowser(this.platformId)) {
      this.obtenerRankingGlobal();
    }
  }

  async ngAfterViewInit() { // Usa AfterViewInit
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');
      // Pequeño timeout para asegurar que el DOM procesó el CSS
      setTimeout(() => {
        this.initMap(L);
      }, 200);
    }
  }

  private initMap(L: any): void {

    const container = document.getElementById('map');
    if (!container) return;
    // Inicialización del mapa
    this.map = L.map('map').setView([40.4167, -3.7033], 6);

    setTimeout(()=>{
      this.map.invalidateSize();
    },500);

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
            mouseover: (e: any) => this.highlightFeature(e), // Al pasar el ratón
            mouseout: (e: any) => this.resetHighlight(e, layer), // Al quitar el ratón
            click: (e: any) => this.onProvinceClick(e, feature) // Al hacer clic
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

  public topArtistas: any[] = [];
  public provinciaSeleccionada: string = '';

  private onProvinceClick(e: any, feature: any) {
    console.log('Propiedades del GeoJSON:', feature.properties);
    // Extraemos el ID y el Nombre del GeoJSON (ajusta según tus propiedades)
    const idProvincia = feature.properties?.id || feature.properties?.code || feature.properties?.cod_prov;
    this.provinciaSeleccionada = feature.properties?.name || feature.properties?.nombre || 'Provincia';

    if (idProvincia) {
      console.log(idProvincia);
      // Llamada al servicio que conectará con tu endpoint de Spring Boot
      this.rankingService.getTopArtistasPorProvincia(this.provinciaSeleccionada).subscribe({
        next: (artistas: any[]) => {
          console.log(artistas)
          // Guardamos los 5 artistas que vienen del backend
          this.zone.run(()=>{
            this.topArtistas = artistas;
            console.log(`Top 5 artistas de ${this.provinciaSeleccionada}:`, artistas);
          });
          

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("Error al obtener artistas:", err);
          this.topArtistas = [];
          this.cdr.detectChanges();
        }
      });
    }
  }

  // Cambia el estilo cuando el ratón entra
  private highlightFeature(e: any) {
    const layer = e.target;

    layer.setStyle({
      weight: 3,
      color: '#2c3e50',
      dashArray: '',
      fillOpacity: 0.9,
      fillColor: '#2980b9' // Un azul más oscuro al seleccionar
    });

    layer.bringToFront(); // Coloca la provincia encima de las demás para resaltar el borde
  }

  private obtenerRankingGlobal() {
    this.rankingService.getTopArtistasGlobal().subscribe({
      next: (artistas) => {
       setTimeout(() => {
        console.log("Datos recibidos:", artistas);
        this.topArtistasGlobal = artistas;
        this.cdr.detectChanges(); // Ahora esto sí será efectivo
      }, 0);
      },
      error: (err) => console.error("Error al obtener ranking global:", err)
    });
  }

  // Restaura el estilo original cuando el ratón sale
  private resetHighlight(e: any, layer: any) {
    const originalStyle = this.getStyle(null); // Obtiene el estilo base
    e.target.setStyle(originalStyle);
  }

  SolicitarArtista(){
    this.router.navigate(['/peticiones/artista']);
  }

  VotarArtista(){
    this.router.navigate(['/votar/artista']);
  }
}