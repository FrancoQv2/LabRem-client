import Button from "react-bootstrap/Button";
import { usePostEnsayoUARTSave } from "../../hooks/digital";
import { submitSuccess, submitError } from "../../libs/alerts"; 

function FormSave({ idUsuario,velocidad,pulsador1,pulsador2,pulsador3,pulsador4,mensaje }) {
  
  const { mutate, error, isLoading } = usePostEnsayoUARTSave();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    mutate(
      { idUsuario,velocidad,pulsador1,pulsador2,pulsador3,pulsador4,mensaje },
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
