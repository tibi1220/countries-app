import React from "react";
import { TableCell, TableRow } from "@mui/material";

import type { Country } from "../../types";

const MyRow: React.FC<Partial<Country>> = country => {
  return (
    <TableRow sx={{ height: 56 }}>
      <TableCell align="left">{country.code}</TableCell>
      <TableCell>
        {country.name} {country.emoji}
      </TableCell>
      <TableCell align="right">{country.capital}</TableCell>
      <TableCell align="right">{country.currency}</TableCell>
    </TableRow>
  );
};

export default MyRow;
