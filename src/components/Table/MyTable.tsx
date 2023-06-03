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

  useEffect(() => {
    setPage(1);
  }, [data]);

  const pageCount = data ? Math.ceil(data.countries.length / rowCount) : 0;

  const countries = loading ? previousData?.countries : data?.countries;

  const rows = useMemo(() => {
    return countries?.length
      ? [
          ...countries
            .slice((page - 1) * rowCount, page * rowCount)
            .map(country => <MyRow key={country.code} {...country} />),
          ...(page === pageCount
            ? Array.from(
                Array(rowCount - (countries.length % rowCount)),
                (_e, i) => <DummyRow key={`filler-${i}`} />
              )
            : []),
        ]
      : Array.from(Array(rowCount), (_e, i) => <DummyRow key={`empty-${i}`} />);
  }, [countries, page]);

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
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center">
        <Pagination count={pageCount} page={page} onChange={handleChange} />
      </Box>
    </>
  );
};

export default MyTable;
