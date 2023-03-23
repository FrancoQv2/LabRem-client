import Button from "react-bootstrap/Button";
import { usePostEnsayoConvergentesSave } from "../../hooks/fisica";
import { submitSuccess, submitError } from "../../libs/alerts"; 

function FormSave({ idUsuario, distanciaLente, distanciaPantalla, diafragma }) {
  
  const { mutate, error, isLoading } = usePostEnsayoConvergentesSave();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    mutate(
      { idUsuario, distanciaLente, distanciaPantalla, diafragma },
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
