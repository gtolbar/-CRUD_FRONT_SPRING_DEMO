import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-eliminar-person',
  templateUrl: './eliminar-person.component.html',
  styleUrls: ['./eliminar-person.component.css']
})
export class EliminarPersonComponent implements OnInit {


  constructor(
    private dialogRef: MatDialogRef<EliminarPersonComponent>,
    private personService: PersonService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: Person,

  ) { }

  ngOnInit(): void {

  }

  confirmar(){
    this.personService.eliminar(this.data.id).subscribe(()=>{
      this.personService.listar().subscribe(data=>{
        this,this.personService.setPersoncambio(data);
        this._snackBar.open("Se elimino exitosamente","❎")
        this.dialogRef.close();
      });
    });
  }

  cancelar(){
    this.dialogRef.close();
  }
}
