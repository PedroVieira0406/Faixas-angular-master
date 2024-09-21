import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cidade } from '../../../models/cidade.model';
import { CidadeService } from '../../../services/cidade.service';

@Component({
  selector: 'app-cidade-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatButtonModule, NgIf, MatInputModule, RouterModule, MatTableModule, MatToolbarModule],
  templateUrl: './cidade-form.component.html',
  styleUrl: './cidade-form.component.css'
})

export class CidadeFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private cidadeService: CidadeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      const cidade: Cidade = this.activatedRoute.snapshot.data['cidade'];

      this.formGroup = this.formBuilder.group({
        id: [(cidade && cidade.id) ? cidade.id : null],
        nome: [(cidade && cidade.nome) ? cidade.nome : '', Validators.required],
        estado: [(cidade && cidade.estado) ? cidade.estado: '', Validators.required]
    })
  }

  /*
  onSubmit() {
    if (this.formGroup.valid) {
      const novoCidade = this.formGroup.value;
      this.cidadeService.insert(novoCidade).subscribe({
        next: (cidadeCadastrado) => {
          this.router.navigateByUrl('/cidades');
        },
        error: (err) => {
          console.log('Erro ao salvar', + JSON.stringify(err));
        }
      })
    }
  }
*/

salvar() {
  if (this.formGroup.valid) {
    const cidade = this.formGroup.value;

    if (cidade.id == null) {
      // Criando nova cidade
      this.cidadeService.insert(cidade).subscribe({
        next: () => {
          this.router.navigateByUrl('/cidades');
        },
        error: (errorResponse) => {
          console.error('Erro ao salvar: ', errorResponse);
        }
      });
    } else {
      // Atualizando cidade existente
      this.cidadeService.update(cidade).subscribe({
        next: () => {
          this.router.navigateByUrl('/cidades');
        },
        error: (err) => {
          console.error('Erro ao alterar: ', err);
        }
      });
    }
  }
}

excluir() {
  if(this.formGroup.valid){
  const cidade = this.formGroup.value;

  if (cidade.id != null) {
    // Excluindo cidade por id
    this.cidadeService.delete(cidade.id).subscribe({
      next: () => {
        this.router.navigateByUrl('/cidades');
      },
      error: (err) => {
        console.error('Erro ao excluir: ', err);
      }
    });
  }}
}}