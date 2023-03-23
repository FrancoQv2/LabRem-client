import Button from "react-bootstrap/Button";
import { usePostEnsayoDivergentesSave } from "../../hooks/fisica";
import { submitSuccess, submitError } from "../../libs/alerts"; 

function FormSaveDivergente({ idUsuario, distanciaLente, distanciaLenteLente, distanciaPantalla, diafragma }) {
  
  const { mutate, error, isLoading } = usePostEnsayoDivergentesSave();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    mutate(
      { idUsuario, distanciaLente, distanciaLenteLente, distanciaPantalla, diafragma },
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

export default FormSaveDivergente;
