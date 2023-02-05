import Table from "react-bootstrap/Table";

import { useEnsayosUsuario } from "../../hooks/telecomunicaciones";

//  @param {Array.<{Fecha:string, Hora:string, Azimut:number, Elevacion:number}>} arrayEnsayos

/**
 * @param {number} idUsuarioActual
 */
function TableWifi({ idLaboratorio, idUsuario }) {
  const { data, error, isLoading } = useEnsayosUsuario({
    idLaboratorio: idLaboratorio,
    idUsuario: idUsuario,
  });

  const headers = ["Fecha", "Hora", "Azimut", "Elevacion"];

  return (
    <>
      {!isLoading ? (
        <Table striped responsive bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>#</th>
              {headers.map((header, indexHeader) => (
                <th key={indexHeader}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((record, indexRecord) => (
                <tr className="text-center" key={indexRecord}>
                  <td>{indexRecord + 1}</td>
                  <td>{record.Fecha}</td>
                  <td>{record.Hora}</td>
                  <td>{record.Azimut}</td>
                  <td>{record.Elevacion}</td>
                </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <span className="spinner-border"></span>Cargando ensayos...
        </div>
      )}
    </>
  );
}

export default TableWifi;
