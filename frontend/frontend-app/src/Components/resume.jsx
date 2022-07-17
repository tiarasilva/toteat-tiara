import React from "react";

import { Card, Box, CardContent, Typography } from "@mui/material";

export default function Resume() {
  return (
    <Box>
      <Card sx={{ width: "80%", margin: "auto", marginTop: "3vh" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Grandes Conclusiones
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Como se pudo ver en el análisis, la categoría más pedida por el
            local son las “Bebidas”, particularmente el “Café”. Indicando que el
            vendedor podría potenciar el área de la cafetería, ofreciendo
            distintos tipos de cafés y posibles acompañamientos para este. Sin
            embargo, mirando a mayor profundidad, se mantiene relativamente
            parecido las ventas de cada ítem del local. Incluso aquellos con
            mayor valor, tales como la Parrilla con un precio de venta de
            $15.000. Por otro lado, podemos ver que la gran mayoría de las
            personas deciden pagar con efectivo, correspondiente al 27% de las
            cuentas totales. Esto resulta extraño, ya que hoy en día el dinero
            físico es más escaso. Sin embargo, podemos es beneficioso para
            Antonio, dado que no tiene que pagar el cobro por el uso de
            Transbank, valores de 0,19 al 1,14 UF mensual más IVA. En suma,
            Antonio debe potenciar la venta de sus productos de mayor valor,
            como la Parilla y el Bistec, agregando un Bebestible de alto
            consumo.
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: "80%", margin: "auto", marginTop: "3vh" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            Supuestos
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            - Todos los pedidos se pagan con algún medio disponible.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
