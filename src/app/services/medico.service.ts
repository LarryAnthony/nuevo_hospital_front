import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  constructor(private http: HttpClient) { }
  cargarMedicos() {
    const url = `${base_url}/medicos`;
    return this.http.get(url, this.headers)
      .pipe(map((resp: { ok: boolean, medicos: Medico[] }) => resp.medicos));
  }
  obtenerMedidoPorId(id: string) {
    const url = `${base_url}/medicos/${id}`;
    return this.http.get(url, this.headers)
      .pipe(map((resp: { ok: boolean, medico: Medico }) => resp.medico));
  }
  crearMedico(medico: Medico) {
    const url = `${base_url}/medicos`;
    return this.http.post(url, medico, this.headers);
  }
  actualizarMedico(medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }
  borrarMedico(_id: string) {
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
