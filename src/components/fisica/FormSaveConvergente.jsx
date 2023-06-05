import Button from "react-bootstrap/Button";
import { usePostEnsayoConvergentes } from "../../hooks/hooksFisica";
import { submitSuccess, submitError } from "../../libs/alerts"; 

function FormSave({ idUsuario, distanciaFL, distanciaLP, diafragma,setcambio }) {
  
  const { mutate, error, isLoading } = usePostEnsayoConvergentes();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setcambio(current =>!current)
    const guardar = true
    mutate(
      { idUsuario, distanciaFL, distanciaLP, diafragma, setcambio, guardar },
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
