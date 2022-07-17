import * as React from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// 'products': [{'category': 'Tragos', 'price': 3000, 'name': 'Copa Vino Tinto', 'quantity': 1}, {'category': 'Bebidas', 'price': 1500, 'name': 'Coca Cola', 'quantity': 1}, {'category': 'Acompañamiento', 'price': 3500, 'name': 'Ración papa fritas', 'quantity': 1}],

export default function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.zone}</TableCell>
        <TableCell align="right">{row.waiter}</TableCell>
        <TableCell align="right">{row.cashier}</TableCell>
        <TableCell align="right">{row.diners}</TableCell>
        <TableCell align="right">{row.date_opened}</TableCell>
        <TableCell align="right">{row.date_closed}</TableCell>
        <TableCell align="right">{row.table}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Productos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={row.id - product.name}>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">$ {product.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
