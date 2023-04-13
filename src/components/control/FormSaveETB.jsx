import Button from "react-bootstrap/Button";
import { usePostEnsayoEstroboscopicaSave } from "../../hooks/control";
import { submitSuccess, submitError } from "../../libs/alerts"; 

function FormSave({ idUsuario,FrecuenciaAgua,FrecuenciaLuz, caidaAgua }) {
  
  const { mutate, error, isLoading } = usePostEnsayoEstroboscopicaSave();
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
