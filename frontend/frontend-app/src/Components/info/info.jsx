import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Row from "./rowProducts";

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);

// {'date_closed': '2019-01-02 17:13:19',
// 'zone': 'Terraza',
// 'waiter': 'María José Perez',
// 'cashier': 'Michael Orletto',
// 'products': [{'category': 'Tragos', 'price': 3000, 'name': 'Copa Vino Tinto', 'quantity': 1}, {'category': 'Bebidas', 'price': 1500, 'name': 'Coca Cola', 'quantity': 1}, {'category': 'Acompañamiento', 'price': 3500, 'name': 'Ración papa fritas', 'quantity': 1}],
// 'diners': 1,
// 'date_opened': '2019-01-02 16:13:08',
// 'table': 28,
// 'total': 8000,
// 'id': '26657d5ff9020d2abefe558796b99584',
// 'payments': [{'amount': 800, 'type': 'Tarjeta débito'}, {'amount': 1512, 'type': 'Efectivo'}, {'amount': 5688, 'type': 'Efectivo'}]}

export default function Information() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError({ errorMessage: err.toString() });
        console.log(error);
      });
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ width: "90%", margin: "auto", marginTop: "3vh" }}
    >
      <Table aria-label="collapsible table" size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Zona</TableCell>
            <TableCell align="right">Mesero</TableCell>
            <TableCell align="right">Cajero</TableCell>
            <TableCell align="right">Comensales</TableCell>
            <TableCell align="right">Inicio</TableCell>
            <TableCell align="right">Termino</TableCell>
            <TableCell align="right">Mesa</TableCell>
            <TableCell align="right">Total ($)</TableCell>
          </TableRow>
        </TableHead>

        {/* <TableBody>
          {data.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody> */}

        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              console.log(row);
              return <Row key={row.id} row={row} />;
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
