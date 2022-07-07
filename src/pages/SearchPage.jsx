import { useState } from "react";
import SearchBar from "../components/SearchBar";

import './styles/SearchPage.css'

const SearchPage = () => {
  const [events, setEvents] = useState(<></>);
  
  
  return (
    <div className="search-page">
      <SearchBar {...{setEvents}} />
      {events}
    </div>
  );
};

export default SearchPage;
