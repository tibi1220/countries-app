import React from "react";
import { TableCell, TableRow } from "@mui/material";

import type { Country } from "../../types";

interface Props {
  country: Country;
}

const MyRow: React.FC<Props> = ({ country }) => {
  return (
    <TableRow sx={{ height: 56 }}>
      <TableCell>{country.name}</TableCell>
      <TableCell align="right">{country.code}</TableCell>
      <TableCell align="right">{country.capital}</TableCell>
      <TableCell align="right">{country.emoji}</TableCell>
      <TableCell align="right">{country.currency}</TableCell>
    </TableRow>
  );
};

export default MyRow;
