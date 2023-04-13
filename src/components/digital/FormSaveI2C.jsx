import Button from "react-bootstrap/Button";
import { usePostEnsayoI2CSave } from "../../hooks/digital";
import { submitSuccess, submitError } from "../../libs/alerts"; 

function FormSave({ idUsuario, frecuencia, memoria, accion, datos }) {
  
  const { mutate, error, isLoading } = usePostEnsayoI2CSave();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    mutate(
      { idUsuario, frecuencia, memoria, accion, datos },
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
