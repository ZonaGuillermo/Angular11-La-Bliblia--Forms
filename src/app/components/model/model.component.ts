import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  formRegister: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    surname: new FormControl('', [
      Validators.maxLength(10)
    ]),
    age: new FormControl('', [
      this.ageValidator         // validador personalizado
    ]),
    email: new FormControl('', [
      Validators.pattern(/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/)
    ]),
    dni: new FormControl('', [
      this.dniValidator
    ]),
    password: new FormControl(''),
    repeat_password: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.formRegister.value);
  }

  ageValidator(formControl: any) {
    const value = formControl.value;
    const max = 65;
    const min = 18;

    if (min < value && value < max) {
      return null   // Si todo es correcto, devolvemos null
    } else {
      return { ageValidator: { min, max } }  // Si incorrecto devolvemos cualquier cosa
    }
  }

  dniValidator(formControl: any) {
    const value = formControl.value;
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKET';

    if (/^\d{8}[a-zA-Z]$/.test(value)) {
      const numero = value.substr(0, value.length - 1);
      const letra = value.charAt(value.length - 1);

      const calculo = numero % 23;

      const letraSeleccionada = letras.charAt(calculo);

      if (letra.toUppperCase() == letraSeleccionada) {
        return null;
      } else {
        return { dniValidator: 'La letra no coindice con el número' };
      }
    } else {
      return { dniValidator: ' El dni no tiene formato correcto' }
    }
  }
}
