import { lsGetDades } from "../bd/usuaris";
import { cargarRegistro } from "../main";
import { panel } from "./panel";
import { nuevoTicket } from "./nuevoTicket";

export const login = {
    template: //html
    `
    <div class="container">
                <h1 class="mt-5 text-center">Inicia sesión</h1>
                <div class="m-5 mx-auto" style="max-width: 400px">
                    <form action="" class="form border shadow-sm p-3 formInicio" novalidate>
                        <label for="email" class="form-label">Email:</label>
                        <input required id="email" type="email" class="form-control" />
                        <div class="invalid-feedback">
      Este campo no puede estar vacío o no es un correo!
    </div>
                        <label for="pass" class="form-label mt-3">Contraseña:</label>
                        <input required id="pass" type="password" class="form-control" />
                        <div class="invalid-feedback">
      Este campo no puede estar vacío!
    </div>
                        <div class="form-check mt-3">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckChecked"
                                checked
                            />
                            <label class="form-check-label" for="flexCheckChecked">
                                Recordar sesión
                            </label>
                        </div>
                        <a class="d-block text-end" href="#">¿Has olvidado tu contraseña?</a>
                        <button type="submit" class="btn btn-primary w-100 mt-3" id="botonIniciar" href="#">Iniciar sesión</button>
                    </form>
                    
                    <button class="d-block mt-5 btn btn-secondary mx-auto botonRegistro col-12 ">¿Eres nuevo? Regístrate</button>
                </div>
            </div>
    `,
    script: () => {
        console.log('Inyectamos login')
        const formulario = document.querySelector(".formInicio")
        //Detectamos su evento submit (enviar)
        formulario.addEventListener("submit", (event) => {
            event.preventDefault()
          //Comprobamos si el formulario no valida 
          if (!formulario.checkValidity()) {
            //Detenemos el evento enviar (submit)
            event.preventDefault()
            event.stopPropagation()
            //Y añadimos la clase 'was-validate' para que se muestren los mensajes
          formulario.classList.add('was-validated')
          }else{
            iniciarSesion()
          }
        })

        const botonRegistro = document.querySelector('.botonRegistro')
        botonRegistro.addEventListener('click', llamaRegistro)
        
        function iniciarSesion () {
            console.log('iniciando sesion')
            const inputEmail = document.querySelector("#email");
            const email= inputEmail.value
            const inputPass = document.querySelector("#pass");
            const pass=inputPass.value
            let html=''
            let error=1
            let rol = ''
            lsGetDades().forEach(element => {
                if(email == element.email){
                    if(pass == element.password){
                        error=0
                        rol=element.rol
                    }
                }
            });
            if(error==1){
                alert("Correo o contraseña erronea!")
                
            }
            else{
                alert("Bienvenido " + email)

                    
                    html+=email
                    document.querySelector("#correo").innerHTML=html
                    event.preventDefault();

                    if(rol=='alumno'){
                        document.querySelector('main').innerHTML = nuevoTicket.template
                        nuevoTicket.script(rol) 
                        document.querySelector(".botonVolver").className = "d-none"
                    }else{
                        document.querySelector('main').innerHTML = panel.template
                        panel.script(rol)
                    }
                    document.getElementById("botonLogin").className = " btn btn-secondary ms-2";
                    document.getElementById("botonRegistro").className = "btn btn-secondary ms-2";
                    document.getElementById("botonPanel").className = "d-none";
                    document.getElementById("botonCerrarSesion").className =  "btn btn-secondary ms-2";
                    
                  
            }
        }
        
        function llamaRegistro(){
            quitarEventoRegistro
            cargarRegistro()
        }

        function quitarEventoRegistro(){
            botonRegistro.removeEventListener('click', llamaRegistro)
        }
       
       
        
            
        
    }
}