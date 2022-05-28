import styled from "@emotion/styled";
import { Country } from "../Types";

interface Props {
  country: Country;
}

export const Entry = (props: Props) => {
  const { country } = props;
  const currencyEntries = Object.entries(country.currencies ?? {});
  const languageEntries = Object.entries(country.languages ?? {});

  const currencies = currencyEntries
    .map((currency) => " " + currency[1].name)
    .toString();

  const languages = languageEntries
    .map((language) => " " + language[1])
    .toString();

  return (
    <EntryContainer>
      <FlagCell>
        <FlagImage
          src={country.flags.svg}
          alt={"Flag of " + country.name.common}
        />
      </FlagCell>
      <StyledCell>
        <span>{country.name.common}</span>
      </StyledCell>
      <PopCell>{country.population}</PopCell>
      <StyledCell>{country.capital ?? ""}</StyledCell>
      <StyledCell>{currencies}</StyledCell>
      <LanguageCell>{languages}</LanguageCell>
    </EntryContainer>
  );
};

const StyledCell = styled.td`
  padding: 0 20px;
  border-right: solid 1px #dddddd;
`;

const PopCell = styled(StyledCell)`
  text-align: center;
`;

const FlagCell = styled(StyledCell)`
  margin: 4px 0;
  padding: 0px;
`;

const LanguageCell = styled.td`
  padding: 10px 10px;
  max-width: 12vw;
`;

const FlagImage = styled.img`
  margin: 3px;
  border: solid 1px;
  height: 40px;
  display: table-cell;
`;

const EntryContainer = styled.tr`
  border-bottom: solid 1px #909090;
  display: table-row;
  margin-right: auto;
  height: 40px;
  width: 100vw;
  &:hover {
    background-color: #f4f4f4;
  }
`;
