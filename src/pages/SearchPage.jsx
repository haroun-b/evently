import { useState } from "react";
import NavbarBottom from "../components/NavbarBottom";
import SearchBar from "../components/SearchBar";

const SearchPage = () => {
  const [events, setEvents] = useState(<></>);
  
  
  return (
    <div>
      <h1>Search page</h1>
      <SearchBar {...{setEvents}} />
      {events}
      <NavbarBottom />
    </div>
  );
};

export default SearchPage;
