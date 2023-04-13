import Button from "react-bootstrap/Button";
import { usePostEnsayoWifiSave } from "../../hooks/telecomunicaciones";
import { submitSuccess, submitError } from "../../libs/alerts"; 

function FormSaveWifi({ idUsuario, elevacion, azimut }) {
  
  const { mutate, error, isLoading } = usePostEnsayoWifiSave();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    mutate(
      {idUsuario, elevacion, azimut },
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

export default FormSaveWifi;
