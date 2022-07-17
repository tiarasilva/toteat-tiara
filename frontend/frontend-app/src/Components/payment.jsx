import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

import { Card, Box, Fab, CardContent, Typography, Grid } from "@mui/material";

import { PieChart } from "react-minimal-pie-chart";

const URL_PAYMENT = process.env.REACT_APP_PAYMENT;

export default function Payment() {
  const [data, setData] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(URL_PAYMENT)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError({ errorMessage: err.toString() });
        console.log(error);
      });
  });

  const lineWidth = 60;
  // { Credito & Debito: 306, Credito & Efectivo: 311, Debito & Efectivo: 311, Efectivo: 1361, Tarjeta credito: 1057, Tarjeta debito: 676, Todos: 338}

  return (
    <Box>
      <Card sx={{ width: "50%", margin: "auto", marginTop: "3vh" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Métodos de pagos más usados
          </Typography>

          <PieChart
            label={({ dataEntry }) => (
              dataEntry.title, Math.round(dataEntry.percentage) + "%"
            )}
            labelStyle={{ fontSize: "2px", fontFamily: "Montserrat" }}
            data={data}
            style={{
              height: "400px",
              margin: "auto",
              fontSize: "5px",
              fontFamily: "Montserrat",
            }}
            segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
            animate
            labelPosition={100 - lineWidth / 2}
            labelStyle={{
              opacity: 0.75,
              pointerEvents: "none",
            }}
          />
          {data.map((key, index) => (
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {/* <Box sx={{ bgcolor: key.color, width: "20px" }}>
                  <Typography sx={{ width: "20px" }}> {index}.- </Typography>
                </Box> */}
                <Box sx={{ bgcolor: key.color, width: "20px" }}>
                  <Fab
                    size="small"
                    disableFocusRipple="true"
                    sx={{ bgcolor: key.color }}
                    aria-label="add"
                  ></Fab>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ margin: "auto" }}
                >
                  {key.title}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}
