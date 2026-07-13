import { Component, signal, inject } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { FormControl,FormArray,FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DataServices } from './Services/data-services';
import { FieldsetModule } from 'primeng/fieldset';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


import { AUTH_URL,COOKIE,API,PUBLIC } from '../app/Core/Constants/api.constants';

interface pec {
    label: string;
    value: string;
    code: string;
}


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule,FormsModule,CardModule,SelectButtonModule,InputTextModule,SelectModule,CheckboxModule,ButtonModule,InputMaskModule,KeyFilterModule,RadioButtonModule,FieldsetModule,ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('biblioteca-portal-web');
  public dataService = inject(DataServices);
  private fb = inject(FormBuilder);
  messageService = inject(MessageService);
  registroForm!: FormGroup;

  divAsistentes:boolean=true;
  divPonentes:boolean=false;
  divPressLibro:boolean=false;
  divPressRevista:boolean=false;

  selectEstado:boolean=false;
  selectCiudad:boolean=false;
  txtEstado:boolean=false;
  txtCiudad:boolean=false;

  valoresDelFormulario:any;

  value: string = '1';

  stateOptions: any[] = [
    { label: 'Asistente', value: '1' },
    { label: 'Ponente', value: '2' },
    { label: 'Pres. Libro', value: '3' },
    { label: 'Pres. Revista', value: '4' }
  ];
  selectedState: string = '1';

  paises: pec[] = this.dataService.getPaises();
  estados: pec[] = this.dataService.getEstadosMexico();
  ciudades: pec[] = this.dataService.getCiudadesSinaloa(); 


  libroPublicacion: any[] = [
        { label: '2025', value: '2025' },
        { label: '2026', value: '2026' },
  ];


  revistaPeridiocidad: any[] = [
        { label: 'Bimestral', value: '1' },
        { label: 'Trimestral', value: '2' },
        { label: 'Cuatrimestral', value: '3' },
        { label: 'Semestral', value: '4' },
        { label: 'Anual', value: '5' },
        { label: 'Continua', value: '6' }
  ];

  revistaFormato: any[] = [
        { label: 'Impreso', value: '1' },
        { label: 'Electrónico', value: '2' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.http.get(`${COOKIE}/sanctum/csrf-cookie`, { withCredentials: true })
      .subscribe({
        next: () => {

              const body = {};
              this.http.post(`${AUTH_URL}/web`, body,{ withCredentials: true })
                .subscribe({
                  next: ($respuesta: any) => {
                    console.log($respuesta.message);

                    /*const url = `${AUTH_URL}/me`;
                    this.http.get(url, { withCredentials: true }).subscribe({
                    next: (respuesta) => {
                        console.log('Datos recibidos:', respuesta);
                    },
                    error: (err) => {
                        console.error('Error al obtener los datos:', err);
                    }
                    });*/

                  },
                  error: (err) =>  { 
                    console.log(err.error["message"]);
                  }
                });
        },
        error: (err) => {
          console.log(err);
        } 
    })

    this.registroForm = this.fb.group({
        tipoRegistro: ['1'],
        genero: ['',Validators.required],
        gradoAcademico: ['',Validators.required],
        nombre: ['',Validators.required],
        primerApellido: [''],
        segundoApellido: [''],
        email: ['', [Validators.required, Validators.email]],
        confirmarEmail: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
        pais: ['',Validators.required],
        estado: ['',Validators.required],
        ciudad: ['',Validators.required],
        estadoCodigo: ['',Validators.required],
        ciudadCodigo: ['',Validators.required],
        instiadscripcion: ['',Validators.required],
        profeIndependiente: [''],
        cargo: ['',Validators.required],



        area: ['',Validators.required],
        relacionRevista: ['',Validators.required],

        tituloPonencia: ['',Validators.required],
        autoresPonencia: this.fb.array([this.fb.control('')]),
        //nombrePonenteResponsable: ['',Validators.required],
        //ORCIDResponsable: ['',Validators.required],
        aceptoPublicarconISBN : ['',Validators.required],
        aceptoTrabajoOriginal : ['',Validators.required],
        aceptoPropuestaRevision : ['',Validators.required],


        tituloLibro : ['',Validators.required],
        //autores : ['',Validators.required],
        autores: this.fb.array([this.fb.control('')]),
        aniopublicacion: ['',Validators.required],
        editorial: ['',Validators.required],
        paisPublicacionLibro: ['',Validators.required],
        ISBN: ['',Validators.required],

        tituloRevista: ['',Validators.required],
        nombreEditorJefe: ['',Validators.required],
        entidadEditora: ['',Validators.required],
        revistaAccesoAbierto: ['',Validators.required],
        areaCienciasSociales: ['',Validators.required],
        peridiocidad: ['',Validators.required],
        paisPublicacionRevista: ['',Validators.required],
        ISSNImpreso: ['',Validators.required],
        ISSNElectronico: ['',Validators.required],
        formatoRevista: ['',Validators.required],
        urlRevista: [''],
        NombreCompletoPresentador: ['',Validators.required],
        editorIndependiente: [''],


        ejeTematico : ['',Validators.required],
        numeroAutores : ['',Validators.required],
        AceptoRecibirNotificacion : ['',Validators.required],
        AceptoTratamiento : ['',Validators.required],
        comoEntero : ['',Validators.required]
    }, { validators: this.emailCoincideValidator('email', 'confirmarEmail') });

    this.registroForm.get('urlRevista')?.disable(); 

    this.registroForm.get('tipoRegistro')?.valueChanges.subscribe(valor => {

      this.divAsistentes = false;
      this.divPonentes = false
      this.divPressLibro = false;
      this.divPressRevista = false;

      if(valor == 1)
        this.divAsistentes = true;
      else if(valor == 2)
        this.divPonentes = true
      else if(valor == 3)
        this.divPressLibro = true;
      else if(valor == 4)
        this.divPressRevista = true;
        
    });


    this.registroForm.get('pais')?.valueChanges.subscribe(valor => {
      this.selectEstado = false;
      this.txtEstado = false; 
      this.selectCiudad = false;
      this.txtCiudad = false; 

      this.registroForm.get('estado')?.clearValidators();
      this.registroForm.get('ciudad')?.clearValidators();
      this.registroForm.get('estadoCodigo')?.clearValidators();
      this.registroForm.get('ciudadCodigo')?.clearValidators();
      


      if(valor == 42){
        this.selectEstado = true;
        this.registroForm.get('estadoCodigo')?.setValidators([Validators.required]);
        this.registroForm.get('ciudadCodigo')?.setValidators([Validators.required]);
      }
      else{  
        this.registroForm.get('estadoCodigo')?.setValue(null);
        this.registroForm.get('estado')?.setValidators([Validators.required]);
        this.registroForm.get('ciudad')?.setValidators([Validators.required]);
        this.txtEstado = true;
        this.txtCiudad = true;
      }

      this.registroForm.get('estado')?.updateValueAndValidity();
      this.registroForm.get('ciudad')?.updateValueAndValidity();
      this.registroForm.get('estadoCodigo')?.updateValueAndValidity();
      this.registroForm.get('ciudadCodigo')?.updateValueAndValidity();
      
    });

    this.registroForm.get('estadoCodigo')?.valueChanges.subscribe(valor => {
      this.selectCiudad = false;
      this.txtCiudad = false; 

      if(valor == 25){
        this.selectCiudad = true;
      }else{  
        this.registroForm.get('ciudadCodigo')?.setValue(null);
        this.txtCiudad = true;
      }

    });


    this.registroForm.get('profeIndependiente')?.valueChanges.subscribe(valor => {
        this.registroForm.get('instiadscripcion')?.reset();
        if(valor){
          this.registroForm.get('instiadscripcion')?.disable(); 
          this.registroForm.get('instiadscripcion')?.setValue('Soy profesional independiente');
        }else
        {
          this.registroForm.get('instiadscripcion')?.enable(); 
        }
    });

    this.registroForm.get('editorIndependiente')?.valueChanges.subscribe(valor => {
        this.registroForm.get('entidadEditora')?.reset();
        if(valor){
          this.registroForm.get('entidadEditora')?.disable(); 
          this.registroForm.get('instiadscripcion')?.setValue('Es edición independiente');
          this.registroForm.get('entidadEditora')?.clearValidators();
          this.registroForm.get('entidadEditora')?.updateValueAndValidity();
        }else{
          this.registroForm.get('entidadEditora')?.enable();
          this.registroForm.get('entidadEditora')?.setValidators([Validators.required]);
          this.registroForm.get('entidadEditora')?.updateValueAndValidity();
        }
          
    });
    


    this.registroForm.get('formatoRevista')?.valueChanges.subscribe(valor => {
         this.registroForm.get('urlRevista')?.reset();
        if(valor == 2){
            this.registroForm.get('urlRevista')?.enable();
            this.registroForm.get('urlRevista')?.setValidators([Validators.required]);
            this.registroForm.get('urlRevista')?.updateValueAndValidity();
        }else{
          this.registroForm.get('urlRevista')?.disable();
          this.registroForm.get('urlRevista')?.clearValidators();
          this.registroForm.get('urlRevista')?.updateValueAndValidity();
        }
          
    });
  }



  emailCoincideValidator(emailKey: string, confirmarEmailKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const email = group.get(emailKey)?.value;
      const confirmarEmail = group.get(confirmarEmailKey)?.value;

      return email === confirmarEmail ? null : { emailNoCoincide: true };
    };
  }


  onSubmit() {

    this.registroForm.get('area')?.clearValidators();
    this.registroForm.get('relacionRevista')?.clearValidators();
    this.registroForm.get('tituloPonencia')?.clearValidators();
    //this.registroForm.get('nombrePonenteResponsable')?.clearValidators();
    //this.registroForm.get('ORCIDResponsable')?.clearValidators();
    this.registroForm.get('aceptoPublicarconISBN')?.clearValidators();
    this.registroForm.get('aceptoTrabajoOriginal')?.clearValidators();
    this.registroForm.get('aceptoPropuestaRevision')?.clearValidators();


    this.registroForm.get('tituloLibro')?.clearValidators();
    this.registroForm.get('autores')?.clearValidators();
    this.registroForm.get('aniopublicacion')?.clearValidators();
    this.registroForm.get('editorial')?.clearValidators();
    this.registroForm.get('paisPublicacionLibro')?.clearValidators();
    this.registroForm.get('ISBN')?.clearValidators();

    this.registroForm.get('tituloRevista')?.clearValidators();
    this.registroForm.get('nombreEditorJefe')?.clearValidators();
    this.registroForm.get('entidadEditora')?.clearValidators();
    this.registroForm.get('revistaAccesoAbierto')?.clearValidators();
    this.registroForm.get('areaCienciasSociales')?.clearValidators();
    this.registroForm.get('peridiocidad')?.clearValidators();
    this.registroForm.get('paisPublicacionRevista')?.clearValidators();
    this.registroForm.get('ISSNImpreso')?.clearValidators();
    this.registroForm.get('ISSNElectronico')?.clearValidators();
    this.registroForm.get('formatoRevista')?.clearValidators();
    this.registroForm.get('NombreCompletoPresentador')?.clearValidators();

    this.registroForm.get('numeroAutores')?.clearValidators();

    if(this.registroForm.get('tipoRegistro')?.value == 1)
    {
      this.registroForm.get('area')?.setValidators([Validators.required]);

    }else if(this.registroForm.get('tipoRegistro')?.value == 2)
    {
      this.registroForm.get('tituloPonencia')?.setValidators([Validators.required]);
      //this.registroForm.get('nombrePonenteResponsable')?.setValidators([Validators.required]);
      //this.registroForm.get('ORCIDResponsable')?.setValidators([Validators.required]);
      this.registroForm.get('aceptoPublicarconISBN')?.setValidators([Validators.required]);
      this.registroForm.get('aceptoTrabajoOriginal')?.setValidators([Validators.required]);
      this.registroForm.get('aceptoPropuestaRevision')?.setValidators([Validators.required]);

      this.registroForm.get('numeroAutores')?.setValidators([Validators.required]);

    }else if(this.registroForm.get('tipoRegistro')?.value == 3) {
      this.registroForm.get('tituloLibro')?.setValidators([Validators.required]);
      this.registroForm.get('autores')?.setValidators([Validators.required]);
      this.registroForm.get('aniopublicacion')?.setValidators([Validators.required]);
      this.registroForm.get('editorial')?.setValidators([Validators.required]);
      this.registroForm.get('paisPublicacionLibro')?.setValidators([Validators.required]);
      this.registroForm.get('ISBN')?.setValidators([Validators.required]);

      this.registroForm.get('numeroAutores')?.setValidators([Validators.required]);

    }else if(this.registroForm.get('tipoRegistro')?.value == 4) {
      this.registroForm.get('relacionRevista')?.setValidators([Validators.required]);
      this.registroForm.get('tituloRevista')?.setValidators([Validators.required]);
      this.registroForm.get('nombreEditorJefe')?.setValidators([Validators.required]);
      this.registroForm.get('entidadEditora')?.setValidators([Validators.required]);
      this.registroForm.get('revistaAccesoAbierto')?.setValidators([Validators.required]);
      this.registroForm.get('areaCienciasSociales')?.setValidators([Validators.required]);
      this.registroForm.get('peridiocidad')?.setValidators([Validators.required]);
      this.registroForm.get('paisPublicacionRevista')?.setValidators([Validators.required]);
      this.registroForm.get('ISSNImpreso')?.setValidators([Validators.required]);
      this.registroForm.get('ISSNElectronico')?.setValidators([Validators.required]);
      this.registroForm.get('formatoRevista')?.setValidators([Validators.required]);
      this.registroForm.get('NombreCompletoPresentador')?.setValidators([Validators.required]);

      this.registroForm.get('ejeTematico')?.setValue('7');

    }

      
    this.registroForm.get('area')?.updateValueAndValidity();
    this.registroForm.get('relacionRevista')?.updateValueAndValidity();


    this.registroForm.get('tituloPonencia')?.updateValueAndValidity();
    //this.registroForm.get('nombrePonenteResponsable')?.updateValueAndValidity();
    //this.registroForm.get('ORCIDResponsable')?.updateValueAndValidity();
    this.registroForm.get('aceptoPublicarconISBN')?.updateValueAndValidity();
    this.registroForm.get('aceptoTrabajoOriginal')?.updateValueAndValidity();
    this.registroForm.get('aceptoPropuestaRevision')?.updateValueAndValidity();

    this.registroForm.get('tituloLibro')?.updateValueAndValidity();
    this.registroForm.get('autores')?.updateValueAndValidity();
    this.registroForm.get('aniopublicacion')?.updateValueAndValidity();
    this.registroForm.get('editorial')?.updateValueAndValidity();
    this.registroForm.get('paisPublicacionLibro')?.updateValueAndValidity();
    this.registroForm.get('ISBN')?.updateValueAndValidity();


    this.registroForm.get('tituloRevista')?.updateValueAndValidity();
    this.registroForm.get('nombreEditorJefe')?.updateValueAndValidity();
    this.registroForm.get('entidadEditora')?.updateValueAndValidity();
    this.registroForm.get('revistaAccesoAbierto')?.updateValueAndValidity();
    this.registroForm.get('areaCienciasSociales')?.updateValueAndValidity();
    this.registroForm.get('peridiocidad')?.updateValueAndValidity();
    this.registroForm.get('paisPublicacionRevista')?.updateValueAndValidity();
    this.registroForm.get('ISSNImpreso')?.updateValueAndValidity();
    this.registroForm.get('ISSNElectronico')?.updateValueAndValidity();
    this.registroForm.get('formatoRevista')?.updateValueAndValidity();
    this.registroForm.get('NombreCompletoPresentador')?.updateValueAndValidity();

    this.registroForm.get('numeroAutores')?.updateValueAndValidity();
  
    if (this.registroForm.valid) {



      this.valoresDelFormulario = this.registroForm.value;

      const body = this.registroForm.value;
      this.http.post(`${PUBLIC}/registrar-m`, body,{ withCredentials: true })
      .subscribe({
        next: ($respuesta: any) => {
          this.messageService.add({ severity: 'success', summary: 'Registro guardado' , detail: $respuesta.message, life: 3000 });
        },
        error: (err) =>  { 

          this.messageService.add({ severity: 'warn', summary: 'Algo salió mal' , detail: err.error["message"], life: 3000  });
        }
      });

      //this.registroForm.reset();
    } else {
      this.registroForm.markAllAsTouched();
      const campos = this.getCamposInvalidos();
      console.log('Campos faltantes o inválidos:', campos);
    }
  } 


  getCamposInvalidos(): string[] {
    const invalidos: string[] = [];
    const controles = this.registroForm.controls;

    for (const nombre in controles) {
      if (controles[nombre].invalid) {
        invalidos.push(nombre);
      }
    }
    return invalidos;
  }


  get autoresPonencia(): FormArray {
      return this.registroForm.get('autoresPonencia') as FormArray;
  }

  agregarAutorPonencia() {
      this.autoresPonencia.push(
          new FormControl('', Validators.required)
      );
  }

  eliminarAutorPonencia(index: number) {
      if (this.autoresPonencia.length > 1) {
          this.autoresPonencia.removeAt(index);
      }
  }


  get autores(): FormArray {
      return this.registroForm.get('autores') as FormArray;
  }

  agregarAutor() {
      this.autores.push(
          new FormControl('', Validators.required)
      );
  }

  eliminarAutor(index: number) {
      if (this.autores.length > 1) {
          this.autores.removeAt(index);
      }
  }

}
