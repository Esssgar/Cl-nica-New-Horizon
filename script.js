
/* =====================================
   1. CONFIGURACIÓN DE NAVEGACIÓN
===================================== */

const paginaActual = document.body.dataset.page;

const botonesMenu = document.querySelectorAll(".boton-menu");


/* =====================================
   2. NAVEGACIÓN ENTRE PÁGINAS
===================================== */

botonesMenu.forEach(boton => {

    const destino = boton.dataset.view;

    // Identificar la página actual.

    if (destino === paginaActual) {

        if (destino !== "inicio") {
            boton.classList.add("oculto");
        }

        boton.classList.add("activo");

    }

});


/* =====================================
   3. REGISTROS
===================================== */

const opcionesRegistros = document.getElementById("opcionesRegistros");

const formularioPacientes = document.getElementById("formularioPacientes");

const formularioDonaciones = document.getElementById("formularioDonaciones");


/* MOSTRAR FORMULARIOS */

document.querySelectorAll("[data-formulario]").forEach(boton => {

    boton.addEventListener("click", function() {

        const tipo = this.dataset.formulario;

        opcionesRegistros?.classList.add("oculto");

        formularioPacientes?.classList.add("oculto");

        formularioDonaciones?.classList.add("oculto");

        if (tipo === "pacientes") {
            formularioPacientes?.classList.remove("oculto");
        }

        if (tipo === "donaciones") {
            formularioDonaciones?.classList.remove("oculto");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


/* REGRESAR A REGISTROS */

document.querySelectorAll("[data-volver]").forEach(boton => {

    boton.addEventListener("click", function() {

        opcionesRegistros?.classList.remove("oculto");

        formularioPacientes?.classList.add("oculto");

        formularioDonaciones?.classList.add("oculto");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});


/* =====================================
   4. CONFIGURACIÓN DE FORMULARIOS
===================================== */

function configurarFormulario(idFormulario, idRespuesta) {

    const formulario = document.getElementById(idFormulario);

    if (!formulario) return;

    const respuesta = document.getElementById(idRespuesta);

    if (!respuesta) return;

    const boton = formulario.querySelector("button[type='submit']");

    const campos = formulario.querySelectorAll(
        "input:not([type='checkbox']), textarea, select"
    );

    const aceptacion = formulario.querySelector(
        "input[type='checkbox'][required]"
    );


    /* VALIDACIÓN VISUAL */

    function validarCampo(campo) {

        const vacio = campo.value.trim() === "";

        if (vacio && !campo.required) {

            campo.classList.remove("valido");
            campo.classList.remove("invalido");

            return true;
        }

        const correcto = !vacio && campo.checkValidity();

        campo.classList.toggle("valido", correcto);

        campo.classList.toggle("invalido", !correcto);

        return correcto;
    }


    /* EVENTOS DE LOS CAMPOS */

    campos.forEach(campo => {

        campo.addEventListener("input", function() {

            validarCampo(campo);

            respuesta.className = "respuesta-formulario";

            respuesta.textContent = "";

        });

        campo.addEventListener("change", function() {

            validarCampo(campo);

        });

        campo.addEventListener("blur", function() {

            if (campo.value.trim() !== "") {
                validarCampo(campo);
            }

        });

        campo.addEventListener("invalid", function() {

            campo.classList.add("invalido");

            campo.classList.remove("valido");

        });

    });


    /* VALIDAR CASILLA DE ACEPTACIÓN */

    if (aceptacion) {

        aceptacion.addEventListener("change", function() {

            aceptacion.classList.toggle(
                "invalido",
                !aceptacion.checked
            );

        });

        aceptacion.addEventListener("invalid", function() {

            aceptacion.classList.add("invalido");

        });

    }


    /* ENVÍO DEL FORMULARIO */

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        respuesta.className = "respuesta-formulario";

        respuesta.textContent = "";

        let formularioValido = true;


        campos.forEach(campo => {

            if (!validarCampo(campo)) {
                formularioValido = false;
            }

        });


        if (aceptacion && !aceptacion.checked) {

            aceptacion.classList.add("invalido");

            formularioValido = false;

        }


        if (!formularioValido) {

            respuesta.textContent =
                "Error: revisa los campos marcados en rojo y completa la información obligatoria.";

            respuesta.classList.add("error");

            formulario.reportValidity();

            return;

        }


        /* ANIMACIÓN DE CARGA */

        if (boton) {
            boton.classList.add("cargando");
            boton.disabled = true;
        }


        setTimeout(function() {

            if (boton) {
                boton.classList.remove("cargando");
                boton.disabled = false;
            }

            respuesta.textContent =
                "¡Gracias! Tu información fue validada correctamente. Para guardar los datos permanentemente, es necesario conectar el formulario con la base de datos.";

            respuesta.classList.add("exito");


            /* LIMPIAR FORMULARIO */

            formulario.reset();


            campos.forEach(campo => {

                campo.classList.remove("valido");

                campo.classList.remove("invalido");

            });

            if (aceptacion) {
                aceptacion.classList.remove("invalido");
            }

        }, 1000);

    });

}


/* =====================================
   5. FORMULARIO DE PACIENTES
===================================== */

configurarFormulario(
    "formRegistro",
    "respuestaRegistro"
);


/* =====================================
   6. FORMULARIO DE DONACIONES
===================================== */

configurarFormulario(
    "formDonaciones",
    "respuestaDonacion"
);
