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

// Countries for searchType 2
export const LIST_COUNTRIES = gql`
  query Countries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
      capital
      emoji
      currency
    }
  }
`;
