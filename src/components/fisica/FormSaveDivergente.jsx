import Button from "react-bootstrap/Button";
import { usePostEnsayoDivergentes } from "../../hooks/fisica";
import { submitSuccess, submitError } from "../../libs/alerts"; 

function FormSaveDivergente({ idUsuario, distanciaFL, distanciaLL, distanciaLP, diafragma, setcambio}) {
  
  const { mutate, error, isLoading } = usePostEnsayoDivergentes();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setcambio(current =>!current)
    const guardar = true
    mutate(
      { idUsuario, distanciaFL, distanciaLL, distanciaLP, diafragma, setcambio, guardar },
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
