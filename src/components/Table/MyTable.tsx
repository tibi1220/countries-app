import React, { useState, useLayoutEffect, useMemo } from "react";
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

import type { StateProps } from "../../App";

interface Props {
  rowCount: number;
  data: StateProps;
}

const MyTable: React.FC<Props> = ({
  rowCount,
  data: { error, data, display },
}) => {
  const [page, setPage] = useState(1);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useLayoutEffect(() => {
    setPage(1);
  }, [data]);

  const rows = useMemo(() => {
    const arr: Array<JSX.Element> = [];

    for (let i = (page - 1) * rowCount; i < page * rowCount; i++) {
      arr.push(
        i < data.length ? (
          <MyRow key={i} country={data[i]} />
        ) : (
          <DummyRow key={i} />
        )
      );
    }

    return arr;
  }, [rowCount, page, data]);

  const pageCount = useMemo(() => {
    return Math.ceil(data.length / rowCount);
  }, [data.length, rowCount]);

  if (error) return null;

  return (
    <>
      <TableContainer sx={{ opacity: display ? 1 : 0.5 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell align="right">Code</TableCell>
              <TableCell align="right">Capital</TableCell>
              <TableCell align="right">Flag</TableCell>
              <TableCell align="right">Currency</TableCell>
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
