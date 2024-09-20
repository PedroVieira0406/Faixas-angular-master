import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Estado } from '../../../models/estado.model';
import { EstadoService } from '../../../services/estado.service';

@Component({
  selector: 'app-estado-list',
  standalone: true,
  imports: [NgFor, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './estado-list.component.html',
  styleUrl: './estado-list.component.css'
})
export class EstadoListComponent implements OnInit {
  estados: Estado[] = [];
  displayedColumns: string[] = ['id', 'nome', 'sigla', 'acao'];

  constructor(private estadoService: EstadoService) {

  }

  ngOnInit(): void {
    this.estadoService.findAll().subscribe(
      data => { this.estados = data }
    );
  }

  excluir(estado: Estado): void {
    this.estadoService.delete(estado).subscribe({
      next: () => {
        this.estados = this.estados.filter(e => e.id !== estado.id);
      },
      error: (err) => {
        console.error("Erro ao tentar ecluir o estado", err);
      }

    });
  }

}
