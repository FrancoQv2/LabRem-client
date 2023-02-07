import Button from "react-bootstrap/Button";

import { exportComponentAsPNG } from "react-component-export-image";

import {
  downloadPngSuccess,
  downloadPngInfo,
  downloadPngError,
} from "../../libs/alerts";


/**
 * Devuelve un componente Button con la funcionalidad de descargar una imagen png
 * @param componentRef objeto Ref hacia el componente tabla, utilizado como base para exportar
 * @param filename nombre del archivo a generar con el formato "string-YY-MM-DD"
 */
function BtnDownloadPng({ componentRef, filename }) {
  

  return (
    <Button
      variant="success"
      className="mx-2"
      onClick={() => {
        try {
          downloadPngInfo();
          exportComponentAsPNG(componentRef, { fileName: filename });
        } catch (error) {
          downloadPngError();
        }
      }}
    >
      png
    </Button>
  );
}

export default BtnDownloadPng;
