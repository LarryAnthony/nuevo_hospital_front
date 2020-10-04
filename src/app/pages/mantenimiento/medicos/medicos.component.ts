import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public imgSubs: Subscription;

  constructor(private medicoService: MedicoService, private modalImagenService: ModalImagenService, private busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarMedicos());
  }
  cargarMedicos() {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.cargando = false;
        this.medicos = medicos;
        this.medicosTemp = medicos;
      });
  }
  abrirModal(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }
  buscar(termino: string) {
    if (termino.length === 0) {
      return this.medicos = this.medicosTemp;
    }
    this.busquedasService.buscar('medicos', termino)
      .subscribe(resp => {
        this.medicos = resp;
      });
  }
  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id)
          .subscribe(resp => {
            this.cargarMedicos();
            Swal.fire(
              'Usuario borrado',
              `${medico.nombre} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }

}
