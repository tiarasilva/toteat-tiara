import React, { useState, useEffect, Fragment } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardContent, Paper, Typography } from "@mui/material";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import axios from "axios";

const URL_CATEGORY = process.env.REACT_APP_CATEGORY;
console.log(process.env.REACT_APP_CATEGORY);

const columnsProducts = [
  {
    field: "product",
    headerName: "Producto",
    width: 150,
    editable: true,
  },
  {
    field: "sales",
    headerName: "Ventas",
    width: 150,
    editable: true,
  },
  {
    field: "price",
    headerName: "Precio",
    width: 150,
    editable: true,
  },
];

export default function Statistics() {
  const [data, setData] = useState([]); // { 'category1': {'sales': '1000', 'producto1': {'sales': 1, 'price': 1200 }, 'producto2': {'sales': 3, 'price': 890 }}}
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(URL_CATEGORY)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError({ errorMessage: err.toString() });
        console.log(error);
      });
  });

  return (
    <Box>
      <Card sx={{ width: "80%", margin: "auto", marginTop: "3vh" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Categorias más vendidas
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Se encuentran ordenados de manera ascendente
          </Typography>

          <TableContainer component={Paper}>
            <Table
              sx={{ width: "100%" }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell align="right">Ventas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(data).map((key, index) => (
                  <TableRow
                    key={(index, key.toString())}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {key.toString()}
                    </TableCell>
                    <TableCell align="right">{data[key].sales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Card sx={{ width: "80%", margin: "auto", marginTop: "3vh" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Los productos más vendidos de cada categorías
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Se encuentran ordenados de manera ascendente
          </Typography>

          <TableContainer component={Paper}>
            <Table
              sx={{ width: "100%" }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Producto</TableCell>
                  <TableCell>Precio ($)</TableCell>
                  <TableCell>Ventas</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {Object.keys(data)?.map((key, index) => (
                  <Fragment>
                    <TableRow key={(key, index)}>
                      <TableCell rowSpan={Object.keys(data[key]).length}>
                        {key}
                      </TableCell>
                    </TableRow>

                    {Object.keys(data[key]).map(
                      (a, b) =>
                        a.toString() !== "sales" && (
                          <TableRow key={(a, b)}>
                            <TableCell>{a}</TableCell>
                            <TableCell>{data[key][a].price}</TableCell>
                            <TableCell>{data[key][a].sales}</TableCell>
                          </TableRow>
                        )
                    )}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
