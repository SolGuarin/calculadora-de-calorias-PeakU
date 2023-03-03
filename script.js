const formularioCalculadora = document.getElementById('formulario-calculadora');
const resultado = document.getElementById('resultado');

formularioCalculadora.addEventListener('submit', (evento) => {
    evento.preventDefault();

    calcularCalorias();
})

function calcularCalorias() {
    //console.log('entreeeee');
    aparecerResultado();

    
    const nombre = document.querySelector('#nombre');
    const tipoDocumento = document.querySelector('#tipo-documento');
    const numeroDocumento = document.querySelector('#n-documento');
    const edad = document.querySelector('#edad');
    const peso = document.querySelector('#peso');
    const altura = document.querySelector('#altura');
    const genero = document.querySelector('input[name="genero"]:checked');
    const actividad = document.querySelector('#actividad');
    // const totalCalorias = document.querySelector('#total-calorias');

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }
    //console.log(edad.value, Boolean(edad.value));
    //console.log(peso.value, Boolean(peso.value));
    //console.log(altura.value, Boolean(altura.value));
    //console.log("se refrescoooooooo")
    if(peso.value < 35){
        mostrarMensajeDeError('Por favor ingrese un peso válido');
        return; 
    }else if ( !(Boolean(nombre.value) && Boolean(tipoDocumento.value) && Boolean(numeroDocumento.value) && Boolean (edad.value) && Boolean (peso.value) && Boolean (altura.value) && Boolean(actividad.value)) ) {
        mostrarMensajeDeError('Por favor asegúrese de llenar todos los campos');
        return;  
    } else if (edad.value < 15 || edad.value > 80) {
        mostrarMensajeDeError('La edad ingresada no es permitida');
        return;
    } else if (altura.value < 100 || altura.value >250){
        mostrarMensajeDeError('La altura ingresada no es permitida');
        return;
    }
    
    
    let calculoCalorias;
    if (genero.id === 'hombre') {
        //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
        calculoCalorias = actividad.value * ((multiplicadorTMB.peso * peso.value) +
                                             (multiplicadorTMB.altura * altura.value) -
                                             (multiplicadorTMB.edad * edad.value)) + 5;
    } else {
        //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
        calculoCalorias = actividad.value * ((multiplicadorTMB.peso * peso.value) +
                                             (multiplicadorTMB.altura * altura.value) -
                                             (multiplicadorTMB.edad * edad.value)) -161
    }
    
    // totalCalorias.value = `${Math.floor(calculoCalorias)} kcal`;
    
    resultado.innerHTML = ` 
        <div class=" d-flex flex-column justify-content-center align-items-center h-100" id="calculo" >
             <div>
                <p class="text-center" style="font-size: 1.5rem"> El paciente ${nombre.value} identificado con ${tipoDocumento.value} No.${numeroDocumento.value}
                requiere un total de ${Math.floor(calculoCalorias)} kcal para el sostenimiento de su TBM</p>
             </div>
             <div>
                <h5 class="card-title h2">Calorías requeridas</h5>
             </div>
            <div class="mb-3">
                <input class="form-control text-center" value="${Math.floor(calculoCalorias)} kcal" style="font-size: 2rem" disabled>
            </div>
            <div>
                <h7 class="card-title h2">Grupo poblacional</h7>
             </div>
            <div class="mb-3">
            <p class="text-center" style="font-size: 1.5rem;"> ${grupoPoblacional(edad.value)}</p>
            </div>
        </div>
    `
    /*
    nombre.value = null;
    tipoDocumento.value = null,
    numeroDocumento.value = null;
    peso.value = null;
    altura.value = null;
    edad.value = null;
    actividad.value = null;
    */
}

//grupo poblacional
function grupoPoblacional(edad){
    console.log('entreeee a poblacion')
    console.log(edad);
    var mensaje = '';
    if (edad >= 15 && edad <= 29){
        mensaje = "Según su edad, usted pertenece a la población joven"
        return mensaje;
    }else if(edad >= 30 && edad <= 59){
        mensaje = "Según su edad, usted pertenece a la población adulta"
        return mensaje;
    }else if (edad >= 60){
        mensaje = "Según su edad, usted pertenece a la población de adultos mayores"
        return mensaje;
    }

}
 //mensajes de error
function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}