export type ShortContinent = {
  __typename?: "continents";
  name: string;
  code: string;
};

export type ShortContinents = {
  continents: Array<ShortContinent>;
};

export type Country = {
  __typename?: "countries";
  name: string;
  code: string;
  emoji: string;
  capital: string;
  currency: string;
};

export type Countries = {
  countries: Array<Country>;
};
