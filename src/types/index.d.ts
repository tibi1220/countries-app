export interface ShortContinent {
  __typename?: "continents";
  name: string;
  code: string;
}

export interface ShortContinents {
  continents: Array<ShortContinent>;
}

export interface Country {
  __typename?: "countries";
  name: string;
  code: string;
  emoji: string;
  capital: string;
  currency: string;
}

export interface Countries {
  countries: Array<Country>;
}
