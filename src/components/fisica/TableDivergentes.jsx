import Table from "react-bootstrap/Table";

import { useEnsayosUsuario } from "../../hooks/fisica";

//  @param {Array.<{Fecha:string, Hora:string, Azimut:number, Elevacion:number}>} arrayEnsayos

/**
 * @param {number} idUsuarioActual
 */
function TableDivergentes({ idLaboratorio, idUsuario }) {
  const { data, error, isLoading } = useEnsayosUsuario({
    idLaboratorio: idLaboratorio,
    idUsuario: idUsuario,
  });

  const headers = [
    "Fecha",
    "Hora",
    "Distancia Lente",
    "Distancia 1°Lente 2°Lente",
    "Distancia Pantalla",
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
                  <td>{record.distanciaLente}</td>
                  <td>{record.distanciaLenteLente}</td>
                  <td>{record.distanciaPantalla}</td>
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

export default TableDivergentes;
