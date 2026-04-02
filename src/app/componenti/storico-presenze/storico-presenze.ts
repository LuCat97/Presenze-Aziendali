import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PresenzeService } from '../../servizi/presenze';

@Component({
  selector: 'app-storico-presenze',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './storico-presenze.html',
  styleUrl: './storico-presenze.css',
})
export class StoricoPresenze implements OnInit {
  private presenze = inject(PresenzeService);
  private cdr = inject(ChangeDetectorRef);

  storico: any[] = [];

  ngOnInit(): void {
    this.caricaStorico();
  }

  async caricaStorico() {
    this.storico = await this.presenze.getStoricoPresenze();
    this.cdr.detectChanges();
  }
  // Group by date
  get presenzeByData() {
    const presenzeByData = new Map<string, any[]>();
    this.storico.forEach((p) => {
      presenzeByData.set(p.data, (presenzeByData.get(p.data) || []).concat(p));
    });
    return Array.from(presenzeByData.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }
}
