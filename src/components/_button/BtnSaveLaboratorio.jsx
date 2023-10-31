import Button from 'react-bootstrap/Button'

import { submitSuccess, submitError } from '@libs/alerts'

function FormSave({ idUsuario, setCambio, useHook, ...params }) {
  const { mutate, error, isLoading } = useHook()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setCambio((current) => !current)
    const guardar = true

    mutate(
      { idUsuario, setCambio, guardar, ...params },
      {
        onSuccess: () => {},
        onError: () => {
          submitError()
        }
      }
    )
  }

  return (
    <Button variant='success' onClick={handleSubmit}>
      Guardar valores
    </Button>
  )
}

export default FormSave
