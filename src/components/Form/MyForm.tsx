import React from "react";
import { QueryResult, OperationVariables } from "@apollo/client";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Autocomplete,
  TextField,
} from "@mui/material";

import type { FormikProps } from "formik";
import type { ShortContinents } from "../../types";
import type { FormValues } from "../../App";

interface Props {
  formik: FormikProps<FormValues>;
  continents: QueryResult<ShortContinents, OperationVariables>;
}

const MyForm: React.FC<Props> = ({ formik, continents }) => {
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <RadioGroup {...formik.getFieldProps("searchType")}>
              <FormLabel>Select Search Type</FormLabel>
              <FormControlLabel
                value="currency"
                control={<Radio />}
                label="Search by Continent and Currency"
              />
              <FormControlLabel
                value="country"
                control={<Radio />}
                label="Search by Country Code"
              />
            </RadioGroup>
          </Box>

          <Box display="flex" justifyContent="space-around" gap={1}>
            <Autocomplete
              options={continents.data ? continents.data.continents : []}
              loading={continents.loading}
              disabled={formik.values.searchType !== "currency"}
              getOptionLabel={option => option.name}
              onChange={(_e, value) => {
                formik.setFieldValue("continentCode", value && value.code);
              }}
              sx={{ width: 1 }}
              renderInput={params => (
                <TextField label="Continent" {...params} />
              )}
            />

            <TextField
              label="Currency"
              variant="outlined"
              placeholder="HUF"
              disabled={formik.values.searchType !== "currency"}
              {...formik.getFieldProps("currency")}
            />
          </Box>

          <Box>
            <TextField
              label="Country Code"
              variant="outlined"
              placeholder="HU"
              sx={{ width: 1 }}
              disabled={formik.values.searchType !== "country"}
              {...formik.getFieldProps("countryCode")}
            />
          </Box>
        </Box>
      </form>
    </>
  );
};

export default MyForm;
