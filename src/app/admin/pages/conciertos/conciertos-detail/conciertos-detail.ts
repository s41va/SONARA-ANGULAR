import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConciertoService } from '../../../../core/services/concierto.service';
import { Concierto } from '../../../../core/models/concierto.models';

@Component({
  selector: 'app-concierto-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './conciertos-detail.html',
  styleUrl: './conciertos-detail.scss' 
})
export class ConciertoDetail implements OnInit {
  concierto: Concierto | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private conciertoService: ConciertoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadConcierto(+id);
    }
  }

 loadConcierto(id: number): void {
  this.loading = true;
  this.conciertoService.fetchConciertosById(id).subscribe({
    next: (response: any) => {
      // Your existing unwrapping logic
      if (response && response.content) {
        this.concierto = response.content[0];
      } else {
        this.concierto = response;
      }

      this.loading = false;
      this.cdr.detectChanges(); // 3. Force the UI to update!
    },
    error: (err) => {
      this.error = 'Error';
      this.loading = false;
      this.cdr.detectChanges(); 
    }
  });
}
}