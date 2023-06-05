import Button from "react-bootstrap/Button";
import { usePostEnsayoPosicionSave } from "../../hooks/hooksControl";
import { submitSuccess, submitError } from "../../libs/alerts"; 

function FormSave({ idUsuario,Rapidez,anguloSalida,Modificacion,RapidezControl,anguloSalidaControl }) {
  
  const { mutate, error, isLoading } = usePostEnsayoPosicionSave();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    mutate(
      { idUsuario,Rapidez,anguloSalida,Modificacion,RapidezControl,anguloSalidaControl },
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
