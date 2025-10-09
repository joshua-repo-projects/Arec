import Swal from 'sweetalert2'
import { ZodError } from 'zod'

export function showError(error: unknown) {
    let message: string = 'Oops, something went wrong!'
    if (error instanceof ZodError) {
        message = error.issues.map(el => `${el.path.join('.')}: ${el.message}`).join(', ')
    } else if (error instanceof Error) {
        message = error.message
    } else if (typeof error === 'string') {
        message = error
    }
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK'
    })
}