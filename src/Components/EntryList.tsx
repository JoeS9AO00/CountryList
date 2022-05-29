import styled from "@emotion/styled";
import { Entry } from "./Entry";
import { Country, StyledProps } from "../Types";
import { ChangeEvent, useState } from "react";

interface Props {
  countries: Array<Country>;
}

export const EntryList = (props: Props) => {
  const { countries } = props;

  const [nameFilterWord, setNameFilterWord] = useState("");
  const [capitalFilterWord, setCapitalFilterWord] = useState("");
  const [currencyFilterWord, setCurrencyFilterWord] = useState("");
  const [languageFilterWord, setLanguageFilterWord] = useState("");
  const [ascOrDesc, setAscOrDesc] = useState(1);
  const [activeFilter, setActiveFilter] = useState("name");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    switch (name) {
      case "nameFilter":
        setNameFilterWord(value);
        break;
      case "capitalFilter":
        setCapitalFilterWord(value);
        break;
      case "currencyFilter":
        setCurrencyFilterWord(value);
        break;
      case "languageFilter":
        setLanguageFilterWord(value);
        break;
      default:
        break;
    }
  };

  const handleFilterButtonClick = (column: string) => {
    activeFilter === column ? setAscOrDesc(ascOrDesc * -1) : setAscOrDesc(1);
    setActiveFilter(column);
  };

  const Entries = () => {
    return (
      <>
        {countries
          .filter(
            (country) =>
              country.name.common
                .toLowerCase()
                .includes(nameFilterWord.toLowerCase()) &&
              (country.capital ?? "")
                .toString()
                .toLowerCase()
                .includes(capitalFilterWord.toLowerCase()) &&
              Object.entries(country.currencies ?? "")
                .map((currency) => currency[1].name)
                .toString()
                .toLowerCase()
                .includes(currencyFilterWord.toLowerCase()) &&
              Object.entries(country.languages ?? "")
                .map((language) => language[1])
                .toString()
                .toLowerCase()
                .includes(languageFilterWord.toLowerCase())
          )
          .sort((country1, country2) => {
            switch (activeFilter) {
              case "name":
                if (
                  country1.name.common.toLowerCase() >
                  country2.name.common.toLowerCase()
                )
                  return ascOrDesc;
                if (
                  country1.name.common.toLowerCase() <
                  country2.name.common.toLowerCase()
                )
                  return -ascOrDesc;

                return 0;
              case "population":
                if (country1.population > country2.population) return ascOrDesc;
                if (country1.population < country2.population)
                  return -ascOrDesc;
                return 0;
              case "capital":
                if (
                  (country1.capital ?? "").toString().toLowerCase() >
                  (country2.capital ?? "").toString().toLowerCase()
                )
                  return ascOrDesc;
                if (
                  (country1.capital ?? "").toString().toLowerCase() <
                  (country2.capital ?? "").toString().toLowerCase()
                )
                  return -ascOrDesc;
                return 0;
              case "currency":
                if (
                  Object.entries(country1.currencies ?? "")
                    .map((currency) => currency[1].name)
                    .toString()
                    .toLowerCase() >
                  Object.entries(country2.currencies ?? "")
                    .map((currency) => currency[1].name)
                    .toString()
                    .toLowerCase()
                )
                  return ascOrDesc;
                if (
                  Object.entries(country1.currencies ?? "")
                    .map((currency) => currency[1].name)
                    .toString()
                    .toLowerCase() <
                  Object.entries(country2.currencies ?? "")
                    .map((currency) => currency[1].name)
                    .toString()
                    .toLowerCase()
                )
                  return -ascOrDesc;
                return 0;

              case "language":
                if (
                  Object.entries(country1.languages ?? "")
                    .map((currency) => currency[1])
                    .toString()
                    .toLowerCase() >
                  Object.entries(country2.languages ?? "")
                    .map((currency) => currency[1])
                    .toString()
                    .toLowerCase()
                )
                  return ascOrDesc;
                if (
                  Object.entries(country1.languages ?? "")
                    .map((currency) => currency[1])
                    .toString()
                    .toLowerCase() <
                  Object.entries(country2.languages ?? "")
                    .map((currency) => currency[1])
                    .toString()
                    .toLowerCase()
                )
                  return -ascOrDesc;
                return 0;

              default:
                return 0;
            }
          })
          .map((country) => {
            return <Entry key={country.name.common} country={country} />;
          })}
      </>
    );
  };

  return (
    <ListContainer>
      <thead>
        <ListHeader>
          <FlagCell>Flag</FlagCell>
          <TitleCell3>
            <ColTitle>Name</ColTitle>
            <FilterInput
              placeholder="filter.."
              type="text"
              name="nameFilter"
              value={nameFilterWord}
              onChange={handleInputChange}
            />
            <FilterIcon
              primary={activeFilter === "name"}
              onClick={() => handleFilterButtonClick("name")}
            >
              {activeFilter === "name" && ascOrDesc === 1 ? "A-Z" : "Z-A"}
            </FilterIcon>
          </TitleCell3>
          <PopCell>
            <ColTitle>Population</ColTitle>

            <FilterIcon
              primary={activeFilter === "population"}
              onClick={() => handleFilterButtonClick("population")}
            >
              {activeFilter === "population" && ascOrDesc === 1 ? "0-9" : "9-0"}
            </FilterIcon>
          </PopCell>
          <StyledCell>
            <ColTitle>Capital</ColTitle>
            <FilterInput
              placeholder="filter.."
              type="text"
              name="capitalFilter"
              value={capitalFilterWord}
              onChange={handleInputChange}
            />

            <FilterIcon
              primary={activeFilter === "capital"}
              onClick={() => handleFilterButtonClick("capital")}
            >
              {activeFilter === "capital" && ascOrDesc === 1 ? "A-Z" : "Z-A"}
            </FilterIcon>
          </StyledCell>
          <TitleCell3>
            <ColTitle>Currency</ColTitle>
            <FilterInput
              placeholder="filter.."
              type="text"
              name="currencyFilter"
              value={currencyFilterWord}
              onChange={handleInputChange}
            />

            <FilterIcon
              primary={activeFilter === "currency"}
              onClick={() => handleFilterButtonClick("currency")}
            >
              {activeFilter === "currency" && ascOrDesc === 1 ? "A-Z" : "Z-A"}
            </FilterIcon>
          </TitleCell3>
          <LangCell>
            <ColTitle>Official languages</ColTitle>
            <FilterInput
              placeholder="filter.."
              type="text"
              name="languageFilter"
              value={languageFilterWord}
              onChange={handleInputChange}
            />
            <FilterIcon
              primary={activeFilter === "language"}
              onClick={() => handleFilterButtonClick("language")}
            >
              {activeFilter === "language" && ascOrDesc === 1 ? "A-Z" : "Z-A"}
            </FilterIcon>
          </LangCell>
        </ListHeader>
      </thead>
      <tbody>
        <Entries />
      </tbody>
    </ListContainer>
  );
};

const FilterInput = styled.input`
  height: 2vh;
  margin: 5px 1vw;
`;

const FilterIcon = styled.div<StyledProps>`
  text-align: center;
  display: inline;
  background-color: ${(props) => (props.primary ? "gray" : "lightgray")};
  padding: 0 3px;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background-color: #dddddd;
  }
`;

const ColTitle = styled.div`
  display: inline-block;
  margin-right: 1vw;
`;

const StyledCell = styled.th`
  border-right: solid 1px #dddddd;
  padding: 0 20px;
  position: relative;
`;

const FlagCell = styled(StyledCell)`
  width: 6.5vw;
`;

const TitleCell3 = styled(StyledCell)`
  width: 16vw;
`;

const LangCell = styled(StyledCell)`
  width: 23vw;
`;

const PopCell = styled(StyledCell)`
  width: 10vw;
`;

const ListHeader = styled.tr`
  height: 60px;
  background-color: #f0f0f0;
`;

const ListContainer = styled.table`
  margin-top: 10vh;
  border-collapse: collapse;
  display: inline-table;
  width: 99vw;
  text-align: left;
`;
