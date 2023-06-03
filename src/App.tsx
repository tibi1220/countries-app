import React from "react";

import { useFormik } from "formik";
import { useQuery } from "@apollo/client";
import { Paper, Typography, Box, Divider } from "@mui/material";

import MyForm from "./components/Form/MyForm";
import MyTable from "./components/Table/MyTable";

import { LIST_CONTINENTS, LIST_COUNTRIES } from "./client/queries";

import type { Countries, ShortContinents } from "./types";

export type FormValues = {
  searchType: "country" | "currency";
  continentCode: string | null;
  currency: string;
  countryCode: string;
};

const initialValues: FormValues = {
  searchType: "currency",
  continentCode: null,
  currency: "",
  countryCode: "",
};

const App: React.FC = () => {
  const formik = useFormik<FormValues>({ initialValues, onSubmit: () => {} });

  const { searchType, countryCode, currency, continentCode } = formik.values;

  const continents = useQuery<ShortContinents>(LIST_CONTINENTS);
  const countries = useQuery<Countries>(LIST_COUNTRIES, {
    variables: {
      filter:
        searchType === "country"
          ? {
              code: countryCode //
                ? { regex: "^" + countryCode.toUpperCase() }
                : { ne: "" },
            }
          : {
              currency: currency //
                ? { regex: "^" + currency.toUpperCase() }
                : { ne: "" },
              continent: continentCode //
                ? { eq: continentCode }
                : { ne: "" },
            },
    },
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

        <MyForm formik={formik} continents={continents} />

        <Divider />

        <MyTable rowCount={20} countries={countries} />

        <Divider />
      </Paper>
    </Box>
  );
};

export default App;
