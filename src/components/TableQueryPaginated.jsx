import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination, useSortBy } from "react-table";

import Table from "react-bootstrap/Table";

import { useEnsayosUsuario } from "../hooks/telecomunicaciones";
import { Button, ButtonGroup, Col, Form, Row } from "react-bootstrap";


/**
 * -----------------------------------------------------
 * Component - TableQueryPaginated
 * -----------------------------------------------------
 */
const TableQueryPaginated = ({ idLaboratorio, idUsuario, tableHeaders }) => {
  const [tableData, setTableData] = useState(null);

  const { data, isLoading } = useEnsayosUsuario({
    idLaboratorio: idLaboratorio,
    idUsuario: idUsuario,
  });

  useEffect(() => {
    setTableData(data);
  }, [data]);

  if (isLoading || !tableData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TableInstance 
        tableData={tableData} 
        tableHeaders={tableHeaders}
      />
    </>
  );
};

/**
 * -----------------------------------------------------
 * Function - TableInstance
 * -----------------------------------------------------
 */
const TableInstance = ({ tableData, tableHeaders }) => {
  const [columns, data] = useMemo(() => {
    const columns = tableHeaders;
    return [columns, tableData];
  }, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    usePagination
  );

  return <TableLayout {...tableInstance} />;
};

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
  page,
  nextPage,
  previousPage,
  canPreviousPage,
  canNextPage,
  pageOptions,
  gotoPage,
  pageCount,
  setPageSize,
  state: { pageIndex, pageSize }
}) => {
  return (
    <>
      <Table
        striped
        responsive
        bordered
        hover
        size="sm"
        className="text-center"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Row className="my-2 text-center align-items-center justify-content-between">
        <Col sm={4} lg={6}>
          <ButtonGroup size="sm">
            <Button variant="secondary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</Button>
            <Button variant="secondary" className="mx-1" onClick={() => previousPage()} disabled={!canPreviousPage}>Previo</Button>
            <Button variant="secondary" className="mx-1" onClick={() => nextPage()} disabled={!canNextPage}>Siguiente</Button>
            <Button variant="secondary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</Button>
          </ButtonGroup>
        </Col>
        <Col sm={4} lg={3}>
          <span>
            <b>|</b> Página{" "}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{" "}
            <b>|</b>
          </span>
        </Col>
        <Col sm={4} lg={3}>
          <Form.Select 
            size="sm"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 15, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </>
  );
};

export default TableQueryPaginated;
