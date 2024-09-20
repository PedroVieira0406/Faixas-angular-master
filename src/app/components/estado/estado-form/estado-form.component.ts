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
import { Estado } from '../../../models/estado.model';
import { EstadoService } from '../../../services/estado.service';

@Component({
  selector: 'app-estado-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatButtonModule, NgIf, MatInputModule, RouterModule, MatTableModule, MatToolbarModule],
  templateUrl: './estado-form.component.html',
  styleUrl: './estado-form.component.css'
})

export class EstadoFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private estadoService: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

      const estado: Estado = this.activatedRoute.snapshot.data['estado'];

      this.formGroup = this.formBuilder.group({
        id: [(estado && estado.id) ? estado.id : null],
        nome: [(estado && estado.nome) ? estado.nome : '', Validators.required],
        sigla: [(estado && estado.sigla) ? estado.sigla : '', Validators.required]
    })
  }

  /*
  onSubmit() {
    if (this.formGroup.valid) {
      const novoEstado = this.formGroup.value;
      this.estadoService.insert(novoEstado).subscribe({
        next: (estadoCadastrado) => {
          this.router.navigateByUrl('/estados');
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
      const estado = this.formGroup.value;
      if (estado.id == null) {
        this.estadoService.insert(estado).subscribe({
          next: (estadoCadastrado) => {
            this.router.navigateByUrl('/estados')
          },
          error: (errorResponse) => {
            console.log('Erro ao salvar' + JSON.stringify(errorResponse));
          }
        });
      } else {
        this.estadoService.update(estado).subscribe({
          next: (estadoAlterado) => {
            this.router.navigateByUrl('/estados');
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const estado = this.formGroup.value;
      if (estado.id != null) {
        this.estadoService.delete(estado).subscribe({
          next: () => {
            this.router.navigateByUrl('/estados');
          },
          error: (err) => {
            console.log('Erro ao excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
}