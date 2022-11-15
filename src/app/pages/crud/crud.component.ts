import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { EliminarPersonComponent } from '../eliminar-person/eliminar-person.component';



@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})

export class CrudComponent implements OnInit {

  dataSource!: MatTableDataSource<Person>;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'phone_number','email','address','actions'];

  constructor(
    private personService: PersonService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.personService.listar().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
    });

    this.personService.getPersonCambio().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
    });

  }

  crear(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CrearUsuarioComponent,dialogConfig)
  }

  eliminar(person:Person){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data =person;
    this.dialog.open(EliminarPersonComponent,dialogConfig)
  }

  editar(person:Person){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data =person;
    this.dialog.open(CrearUsuarioComponent,dialogConfig)
  }

}
