import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: []
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;
  public hospitalesTemp: Hospital[] = [];

  constructor(private hospitalService: HospitalService, private modalImagenService: ModalImagenService, private busquedasService: BusquedasService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.cargarHospitales());
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.hospitales = this.hospitalesTemp;
    }
    this.busquedasService.buscar('hospitales', termino)
      .subscribe(resp => {
        this.hospitales = resp;
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
      });
  }
  guardarcambios(hospital: Hospital) {
    console.log(hospital);
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }
  eliminarHospital(hospital: Hospital) {
    console.log(hospital);
    this.hospitalService.borrarHospital(hospital._id)
      .subscribe(resp => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success');
      });
  }
  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    });
    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value)
        .subscribe((resp: any) => {
          this.cargarHospitales();
        });
    }
  }
  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

}
