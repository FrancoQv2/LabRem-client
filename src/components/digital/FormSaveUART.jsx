import Button from "react-bootstrap/Button";
import { usePostEnsayoUARTSave } from "../../hooks/digital";
import { submitSuccess, submitError } from "../../libs/alerts"; 

function FormSave({ idUsuario,velocidad,cantidadBitDato,paridad,cantidadBitParada,mensaje }) {
  
  const { mutate, error, isLoading } = usePostEnsayoUARTSave();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    mutate(
      { idUsuario,velocidad,cantidadBitDato,paridad,cantidadBitParada,mensaje },
      {
        onSuccess: () => {
         
        },
        onError: () => {
          submitError();
        },
      }
    );
  };

  return (
        <Button variant="success" onClick={handleSubmit}>
          Guardar valores
        </Button>
  );
}

export default FormSave;
