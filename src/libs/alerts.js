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

  
