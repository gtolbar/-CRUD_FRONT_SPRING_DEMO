import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CrearUsuarioComponent>,
    private personService: PersonService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: Person,

  ) { }

  ngOnInit(): void {

    if (this.data===null) {
      this.form = new FormGroup({
        'id': new FormControl(0),
        'first_name': new FormControl(''),
        'last_name': new FormControl(''),
        'phone_number': new FormControl(''),
        'email': new FormControl(''),
        'address': new FormControl(''),
      });
    } else {
      this.form = new FormGroup({
        'id': new FormControl(this.data.id),
        'first_name': new FormControl(this.data.first_name),
        'last_name': new FormControl(this.data.last_name),
        'phone_number': new FormControl(this.data.phone_number),
        'email': new FormControl(this.data.email),
        'address': new FormControl(this.data.address),
      })
    }

  }

  operar(){

    let person = new Person();
    person.first_name = this.form.value['first_name'];
    person.last_name = this.form.value['last_name'];
    person.email = this.form.value['email'];
    person.address = this.form.value['address'];
    person.phone_number = this.form.value['phone_number'];
    if (this.data===null) {
      console.log("aca")
          this.personService.registrar(person).subscribe(()=>{
                this.personService.listar().subscribe(data=>{
                  this,this.personService.setPersoncambio(data);
                  this._snackBar.open("Se creo exitosamente","❎")
                  this.dialogRef.close();
                })

          });

    } else {
      person.id=this.data.id;
      this.personService.modificar(person).subscribe(()=>{
        this.personService.listar().subscribe(data=>{
          this,this.personService.setPersoncambio(data);
          this._snackBar.open("Se creo actualizo","❎")
          this.dialogRef.close();
        })

  });

    }

  }

  close(){
    this.dialogRef.close();
  }

}
