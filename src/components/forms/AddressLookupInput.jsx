import axios from "axios";
import React, { startTransition, useEffect, useState } from "react";
import Field from "./Field";

const AddressLookupInput = ({ setFormData, formData }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [controller, setController] = useState(null);

  // Search for addresses proposal
  const searchAddress = (fullAddress) => {
    const requestURL = "https://api-adresse.data.gouv.fr/search/?q=";
    const requestAPI = requestURL + fullAddress + "?type=lable&autocomplete=1";
    console.log(requestAPI);

    const newController = new AbortController();
    const signal = newController.signal;

    axios.get(requestAPI, { signal }).then((response) => {
      console.log("response.data", response.data.features);
      setSuggestions(response.data.features);
      setSuggestionsOpen(true);
    });

    controller?.abort();
    setController(newController);
  };

  useEffect(() => {
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
    });
    setSuggestionsOpen(false);
  };

  return (
    <Field
      name="fullAddress"
      label="Address"
      {...{ setFormData, formData }}
      required
    >
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
    </Field>
  );
};

export default AddressLookupInput;
