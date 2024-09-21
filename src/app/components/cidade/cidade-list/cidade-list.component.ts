import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Cidade } from '../../../models/cidade.model';
import { CidadeService } from '../../../services/cidade.service';

@Component({
  selector: 'app-cidade-list',
  standalone: true,
  imports: [NgFor, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './cidade-list.component.html',
  styleUrl: './cidade-list.component.css'
})
export class CidadeListComponent implements OnInit {
  cidades: Cidade[] = [];
  displayedColumns: string[] = ['id', 'nome','estado', 'acao'];

  constructor(private cidadeService: CidadeService) {

  }

  ngOnInit(): void {
    this.cidadeService.findAll().subscribe(
      data => { this.cidades = data }
    );
  }

  excluir(cidade: Cidade): void {
    this.cidadeService.delete(cidade).subscribe({
      next: () => {
        this.cidades = this.cidades.filter(e => e.id !== cidade.id);
      },
      error: (err) => {
        console.error("Erro ao tentar excluir o cidade", err);
      }

    });
  }
}