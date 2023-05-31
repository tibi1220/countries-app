import React, { useState } from "react";

import { Paper, Typography, Box, Divider } from "@mui/material";

import MyForm from "./components/Form/MyForm";
import MyTable from "./components/Table/MyTable";

import type { Country } from "./types";

export type StateProps = {
  data: Array<Country>;
  error: boolean;
  display: boolean;
};

const App: React.FC = () => {
  const [data, setData] = useState<StateProps>({
    data: [],
    error: false,
    display: false,
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Paper
        elevation={3}
        sx={{
          width: "1024px",
          maxWidth: 1,
          padding: 4,
          margin: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h3" component="h1">
          Country Finder
        </Typography>

        <Divider />

        <MyForm setData={setData} />

        <Divider />

        <MyTable rowCount={20} data={data} />
      </Paper>
    </Box>
  );
};

export default App;
