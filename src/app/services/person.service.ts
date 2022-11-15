import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends GenericService<Person>{


  private personCambio: Subject<Person[]> = new Subject<Person[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor( protected override http: HttpClient ) {
    super(
      http,
      `${environment.HOST}/persons`
      );
   }

  getPersonCambio() {
    return this.personCambio.asObservable();
  }

  setPersoncambio(lista: Person[]) {
    this.personCambio.next(lista);
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }


}
