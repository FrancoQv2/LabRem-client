import Button from "react-bootstrap/Button";

import { exportComponentAsPNG } from "react-component-export-image";

import {
  downloadPngSuccess,
  downloadPngInfo,
  downloadPngError,
} from "../../libs/alerts";

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
