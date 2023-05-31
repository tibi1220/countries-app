import React from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import {
  LIST_CONTINENTS,
  LIST_COUNTRIES_1,
  LIST_COUNTRIES_2,
} from "../../client/queries";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";

import type { FormikErrors } from "formik";
import type { Countries, ShortContinents } from "../../types";
import type { StateProps } from "../../App";

const QUERIES = {
  1: LIST_COUNTRIES_1,
  2: LIST_COUNTRIES_2,
};

interface FormValues {
  searchType: "1" | "2";
  continentCode: string | null;
  currency: string;
  countryCode: string;
}

const initialValues: FormValues = {
  searchType: "1",
  continentCode: null,
  currency: "",
  countryCode: "",
};

interface Props {
  setData: React.Dispatch<React.SetStateAction<StateProps>>;
}

const MyForm: React.FC<Props> = ({ setData }) => {
  const client = useApolloClient();
  const { data, loading, error } = useQuery<ShortContinents>(LIST_CONTINENTS);

  if (error) return null;

  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const errors: FormikErrors<FormValues> = {};

        // Only Check continent and currency fields
        if (values.searchType === "1") {
          if (!values.continentCode) {
            errors.continentCode = "Required";
          }
          if (!values.currency) {
            errors.currency = "Required";
          }
        }
        // Only check country code field
        else if (values.searchType === "2") {
          if (!values.countryCode) {
            errors.countryCode = "Required";
          }
        } else {
          errors.searchType = "Invalid Search Type";
        }

        return errors;
      }}
      onSubmit={(
        { searchType, currency, countryCode, continentCode },
        { setSubmitting }
      ) => {
        client
          .query<Countries>({
            query: QUERIES[searchType],
            variables: {
              currency: currency.toUpperCase(),
              continent: continentCode,
              code: countryCode.toUpperCase(),
            },
          })
          .then(data => {
            setData({
              error: false,
              display: true,
              data: data.data.countries,
            });
            setSubmitting(false);
          })
          .catch(err => {
            console.error(err);
            setData({
              error: true,
              display: false,
              data: [],
            });
            setSubmitting(false);
          });
      }}
    >
      {({ setFieldValue, isSubmitting, isValid, values, dirty }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Field name="searchType" as={RadioGroup}>
                <FormLabel>Select Search Type</FormLabel>
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Search by Continent and Currency"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Search by Country Code"
                />
              </Field>
            </Box>

            <Box display="flex" justifyContent="space-around" gap={1}>
              <Autocomplete
                onChange={(_e, value) => {
                  setFieldValue("continentCode", value && value.code);
                }}
                disabled={loading || values.searchType !== "1"}
                options={data ? data.continents : []}
                getOptionLabel={option => option.name}
                sx={{ width: 1 }}
                renderInput={params => {
                  return (
                    <>
                      <TextField
                        {...params}
                        label="Choose a Continent"
                        placeholder="Europe"
                        autoComplete="new-password"
                      />
                    </>
                  );
                }}
              />

              <Field
                name="currency"
                label="Currency"
                placeholder="HUF"
                as={TextField}
                variant="outlined"
                disabled={values.searchType !== "1"}
              />
            </Box>

            <Box>
              <Field
                name="countryCode"
                label="Country Code"
                placeholder="HU"
                as={TextField}
                variant="outlined"
                disabled={values.searchType !== "2"}
                sx={{ width: 1 }}
              />
            </Box>

            <Box>
              <Button
                type="submit"
                disabled={isSubmitting || !isValid || !dirty}
                size="large"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
