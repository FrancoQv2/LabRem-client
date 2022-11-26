import Table from "react-bootstrap/Table";

import { useEnsayosUsuario } from "../../hooks/digital";

//  @param {Array.<{Fecha:string, Hora:string, Azimut:number, Elevacion:number}>} arrayEnsayos

/**
 * @param {number} idUsuario
 */
function TableI2C({ idLaboratorio, idUsuario }) {
  const { data, error, isLoading } = useEnsayosUsuario({
    idLaboratorio: idLaboratorio,
    idUsuario: idUsuario,
  });

  const headers = [
    "Fecha",
    "Hora",
    "Velocidad",
    "Memoria",
    "Bit read/write",
    "Mensaje",
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
                  <td>{`${record.velocidad / 1000} kbps`}</td>
                  <td>{record.memoria}</td>
                  <td>
                    {record.readWrite
                      ? `${record.readWrite} - Escritura`
                      : `${record.readWrite} - Lectura`}
                  </td>
                  <td>{record.mensaje}</td>
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

export default TableI2C;
