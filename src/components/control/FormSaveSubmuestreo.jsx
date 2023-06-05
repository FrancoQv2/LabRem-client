import Button from "react-bootstrap/Button";
import { usePostEnsayoSubmuestreoSave } from "../../hooks/hooksControl";
import { submitSuccess, submitError } from "../../libs/alerts"; 

function FormSave({ idUsuario,FrecuenciaAgua,FrecuenciaLuz, caidaAgua }) {
  
  const { mutate, error, isLoading } = usePostEnsayoSubmuestreoSave();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    mutate(
      { idUsuario,FrecuenciaAgua,FrecuenciaLuz, caidaAgua },
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
