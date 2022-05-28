export interface Country {
  name: { common: string; official: string; nativeName: string };
  flags: { png: string; svg: string };
  population: number;
  capital: [string];
  currencies: { [key: string]: { name: string } };
  languages: { [key: string]: string };
}
