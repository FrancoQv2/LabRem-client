import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export function submitSuccess() {
    Toast.fire({
        icon: 'success',
        title: 'Ensayo realizado exitosamente.'
    })
}

export function submitError() {
    Toast.fire({
        icon: 'error',
        title: 'Parámetros incorrectos.'
    })
}

export function downloadPngSuccess() {
    Toast.fire({
        icon: 'success',
        title: 'Imagen PNG descargada exitosamente.'
    })
}

export function downloadPngInfo() {
    Toast.fire({
        icon: 'info',
        title: 'Se va a descargar la imagen PNG.'
    })
}

export function downloadPngError() {
    Toast.fire({
        icon: 'error',
        title: 'Hubo un error al generar la imagen PNG!',
        text: 'Por favor primero cargue la pestaña con los Resultados'
    })
}

export function downloadCsvSuccess() {
    Toast.fire({
        icon: 'success',
        title: 'Archivo csv descargado exitosamente.'
    })
}

export function downloadCsvInfo() {
    Toast.fire({
        icon: 'info',
        title: 'Se va a descargar el archivo csv.'
    })
}

export function downloadCsvError() {
    Toast.fire({
        icon: 'error',
        title: 'Hubo un error al generar el archivo csv!'
    })
}
