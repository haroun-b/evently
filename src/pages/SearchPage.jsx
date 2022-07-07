import { useState } from "react";
import NavbarBottom from "../components/NavbarBottom";
import SearchBar from "../components/SearchBar";

import './styles/SearchPage.css'

const SearchPage = () => {
  const [events, setEvents] = useState(<></>);
  
  
  return (
    <div className="search-page">
      <SearchBar {...{setEvents}} />
      {events}
      <NavbarBottom />
    </div>
  );
};

export default SearchPage;
