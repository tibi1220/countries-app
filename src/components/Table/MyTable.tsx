import React, { useState, useEffect, useMemo } from "react";
import MyRow from "./MyRow";
import DummyRow from "./DummyRow";
import {
  Pagination,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { OperationVariables, QueryResult } from "@apollo/client";
import { Countries } from "../../types";

interface Props {
  rowCount: number;
  countries: QueryResult<Countries, OperationVariables>;
}

const MyTable: React.FC<Props> = ({
  rowCount,
  countries: { error, data, loading, previousData },
}) => {
  const [page, setPage] = useState(1);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const pageCount = data ? Math.ceil(data.countries.length / rowCount) : 0;

  const countriesToUse = loading ? previousData?.countries : data?.countries;

  const rows = useMemo(() => {
    const countries = countriesToUse || [];

    return [
      ...countries.map(country => <MyRow key={country.code} {...country} />),
      ...Array.from(
        Array(rowCount - (countries.length % rowCount)),
        (_e, i) => <DummyRow key={`filler-${i}`} />
      ),
    ];
  }, [rowCount, countriesToUse]);

  useEffect(() => {
    setPage(1);
  }, [rows]);

  const displayRows = rows.slice((page - 1) * rowCount, page * rowCount);

  if (error) return null;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="15%" align="left">
                Code
              </TableCell>
              <TableCell width="40%" align="left">
                Country
              </TableCell>
              <TableCell width="30%" align="right">
                Capital
              </TableCell>
              <TableCell width="15%" align="right">
                Currency
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{displayRows}</TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center">
        <Pagination count={pageCount} page={page} onChange={handleChange} />
      </Box>
    </>
  );
};

export default MyTable;
