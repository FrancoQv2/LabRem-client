import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';

import Table from "react-bootstrap/Table";

import { useEnsayosUsuario } from '../../hooks/telecomunicaciones';

/**
 * -----------------------------------------------------
 * Component - TableQuery
 * -----------------------------------------------------
 */
const TableQuery = ({ idLaboratorio, idUsuario }) => {
  const [tableData, setTableData] = useState(null);

  const { data, isLoading } = useEnsayosUsuario({idLaboratorio: idLaboratorio, idUsuario: idUsuario})

  useEffect(() => {
    setTableData(data);
  }, [data])

  if (isLoading || !tableData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <TableInstance tableData={tableData}/>
    </>
  );
}


/**
 * -----------------------------------------------------
 * Function - TableInstance
 * -----------------------------------------------------
 */
const TableInstance = ({ tableData }) => {
  const [columns, data] = useMemo(
    () => {
      const columns = [
        {
          Header: '#',
          accessor: 'index'
        },
        {
          Header: 'Fecha',
          accessor: 'Fecha'
        },
        {
          Header: 'Hora',
          accessor: 'Hora'
        },
        {
          Header: 'Elevación',
          accessor: 'Elevacion'
        },
        {
          Header: 'Azimut',
          accessor: 'Azimut'
        }
      ];
      return [columns, tableData];
    },
    [tableData]
  );

  const tableInstance = useTable({ 
    columns, 
    data
  });

  return (
    <TableLayout {...tableInstance} />
  );
}


/**
 * -----------------------------------------------------
 * Component - TableLayout
 * -----------------------------------------------------
 */
const TableLayout = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  prepareRow,
  rows,
}) => {
  return (
    <Table striped responsive bordered hover size="sm" className="text-center" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>

            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}

          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>

              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}

            </tr>
          )
        })}
      </tbody>
    </Table>
  );
}

// /**
//  * -----------------------------------------------------
//  * Component - ReactQueryWithTable
//  * -----------------------------------------------------
//  */
// const ReactQueryWithTable = () => {
//   return (
//     <>
//       <TableQuery />
//     </>
//   );
// }

export default TableQuery;
