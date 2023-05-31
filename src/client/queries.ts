import { gql } from "@apollo/client";

// Continents for autocomplete
export const LIST_CONTINENTS = gql`
  {
    continents {
      name
      code
    }
  }
`;

// Countries for searchType 1
export const LIST_COUNTRIES_1 = gql`
  query Countries($continent: String!, $currency: String!) {
    countries(
      filter: { currency: { regex: $currency }, continent: { eq: $continent } }
    ) {
      code
      name
      capital
      emoji
      currency
    }
  }
`;

// Countries for searchType 2
export const LIST_COUNTRIES_2 = gql`
  query Countries($code: String!) {
    countries(filter: { code: { regex: $code } }) {
      code
      name
      capital
      emoji
      currency
    }
  }
`;
