import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { VotarArtistaComponent } from './votar';
import { ArtistaService } from '../../core/services/artistas.service';

describe('VotarArtistaComponent', () => {
    let component: VotarArtistaComponent;
    let fixture: ComponentFixture<VotarArtistaComponent>;
    let service: ArtistaService;

    const mockArtista = { id: 1, nombre: 'Test Artist', votosRanking: 10, genero: 'Rock' };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [VotarArtistaComponent],
            imports: [HttpClientTestingModule],
            providers: [ArtistaService]
        }).compileComponents();

        fixture = TestBed.createComponent(VotarArtistaComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(ArtistaService);

        component.artista = { ...mockArtista } as any;
        fixture.detectChanges();
    });

    it('debe crear el componente', () => {
        expect(component).toBeTruthy();
    });

    it('debe incrementar votos al llamar a votar()', () => {
        const updatedArtista = { ...mockArtista, votosRanking: 11 };

        // 1. Usamos 'spyOn' directamente (sin el prefijo jest)
        // En la mayoría de setups de Angular + Jest, spyOn es global.
        const spy = spyOn(service, 'updateArtista').and.returnValue(of(updatedArtista as any));
        const emitSpy = spyOn(component.votoRealizado, 'emit');

        component.votar();

        // 2. Verificaciones
        expect(service.updateArtista).toHaveBeenCalledWith(1, { votosRanking: 11 });
        expect(component.artista.votosRanking).toBe(11);
        expect(component.votoRealizado.emit).toHaveBeenCalledWith(updatedArtista as any);
    });
});