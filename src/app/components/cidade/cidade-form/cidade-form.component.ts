import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CidadeService } from '../../../services/Cidade.service';


@Component({
  selector: 'app-Cidade-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, NgIf, MatInputModule],
  templateUrl: './Cidade-form.component.html',
  styleUrl: './Cidade-form.component.css'
})
export class CidadeFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private CidadeService: CidadeService,
    private router: Router) {
      this.formGroup = this.formBuilder.group({
        nome:['', Validators.required],
        estado:['', Validators.required]
      }) 
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const novoCidade = this.formGroup.value;
      this.CidadeService.salvar(novoCidade).subscribe({
        next: (CidadeCadastrado) => {
          this.router.navigateByUrl('/Cidades');
        },
        error: (err) => {
          console.log('Erro ao salvar', + JSON.stringify(err));
        }
      })
    }
  }

}