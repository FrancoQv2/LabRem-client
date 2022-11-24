import Table from "react-bootstrap/Table";

import { useEnsayosUsuario } from "../../hooks/telecomunicaciones";

//  @param {Array.<{Fecha:string, Hora:string, Azimut:number, Elevacion:number}>} arrayEnsayos

/**
 * @param {number} idUsuario
 */
function TableRadio({ idLaboratorio, idUsuario }) {
  const { data, error, isLoading } = useEnsayosUsuario({
    idLaboratorio: idLaboratorio,
    idUsuario: idUsuario,
  });

  const headers = [
    "Fecha",
    "Hora",
    "Modulación",
    "Codificación",
    "Intensidad Mínima",
    "Intensidad Máxima",
  ];

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
                  <td>{record.Modulacion}</td>
                  <td>{record.Codificacion}</td>
                  <td>{record.IntensidadMin}</td>
                  <td>{record.IntensidadMax}</td>
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

export default TableRadio;
