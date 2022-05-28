import axios from "axios";
import { useEffect, useState } from "react";
import { EntryList } from "../Components/EntryList";
import { Header } from "../Components/Header";
import { Country } from "../Types";

export const PageContainer = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState({} as Array<Country>);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setLoading(false);
        setCountries(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {!loading && (
        <div>
          <Header />
          <EntryList countries={countries} />
        </div>
      )}
    </>
  );
};
