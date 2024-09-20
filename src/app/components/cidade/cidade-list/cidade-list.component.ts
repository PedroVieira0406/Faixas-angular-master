import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cidade } from '../../../models/Cidade.model';
import { CidadeService } from '../../../services/Cidade.service';

@Component({
  selector: 'app-Cidade-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './Cidade-list.component.html',
  styleUrl: './Cidade-list.component.css'
})
export class CidadeListComponent implements OnInit {
  Cidades: Cidade[] = [];

  constructor(private CidadeService: CidadeService){

  }

  ngOnInit(): void {
      this.CidadeService.getCidades().subscribe(
        data => { this.Cidades = data}
      );
  }

}
