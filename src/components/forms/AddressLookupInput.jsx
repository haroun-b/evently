import axios from "axios";
import React, { startTransition, useEffect, useState } from "react";
import Input from "./Input";
import "./formStyle.css";

const requestURL = "https://api-adresse.data.gouv.fr/search/";

const AddressLookupInput = ({ setFormData, formData, ...inputConfig }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [controller, setController] = useState(null);

  // Search for addresses proposal
  const searchAddress = (fullAddress) => {
    const newController = new AbortController();
    const signal = newController.signal;

    axios
      .get(requestURL, { signal, params: { q: fullAddress } })
      .then((response) => {
        console.log("response.data", response.data.features);
        setSuggestions(response.data.features);
        setSuggestionsOpen(true);
      })
      .catch((error) => {
        if (signal.aborted) {
          return;
        }
        console.error("Error in address search", error);
      });

    controller?.abort();
    setController(newController);
  };

  useEffect(() => {
    if (selectedSuggestion === formData.fullAddress) {
      return;
    }
    startTransition(() => searchAddress(formData.fullAddress));
  }, [formData.fullAddress]);

  // Handle user click on a suggestion
  const handleSelect = (address) => {
    console.log("address", address);
    setFormData({
      ...formData,
      address: {
        street: address.properties.name,
        postcode: address.properties.postcode,
        city: address.properties.city,
      },
      fullAddress: address.properties.label,
      location: {
        coordinates: address.geometry.coordinates,
      },
    });
    setSelectedSuggestion(address.properties.label);
    setSuggestionsOpen(false);
  };

  return (
    <Input {...inputConfig} {...{ setFormData, formData }} required>
      {suggestionsOpen && (
        <ul className="suggestion-list">
          {suggestions.map((address) => {
            return (
              <li
                key={address.properties.id}
                onClick={() => handleSelect(address)}
              >
                <strong>{address.properties.label}</strong>
              </li>
            );
          })}
        </ul>
      )}
    </Input>
  );
};

export default AddressLookupInput;
