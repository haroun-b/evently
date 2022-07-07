import * as React from "react";
import axios from "axios";
// import React, { startTransition, useEffect, useState } from "react";
import Input from "./Input";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./formStyle.css";

const requestURL = "https://api-adresse.data.gouv.fr/search/";

const AddressLookupInput = ({ setFormData, formData, ...inputConfig }) => {
  const [suggestions, setSuggestions] = React.useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = React.useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = React.useState("");
  const [controller, setController] = React.useState(null);

  console.log("formData.fullAddress", formData.fullAddress);
  console.log("suggestions", suggestions);
  // Search for addresses proposal
  const searchAddress = (fullAddress) => {
    const newController = new AbortController();
    const signal = newController.signal;

    axios
      .get(requestURL, { signal, params: { q: fullAddress } })
      .then((response) => {
        console.log("response.data", response.data.features);
        setSuggestions(response.data.features);
        console.log("fullAddress", fullAddress);
        console.log("fullAddress.length", fullAddress.length);
        console.log("suggestions.length", suggestions.length);
        if (suggestions.length === 0) {
          setSuggestionsOpen(false);
        } else {
          setSuggestionsOpen(true);
        }
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

  React.useEffect(() => {
    if (formData.fullAddress.length === 0) {
      setSuggestionsOpen(false);
    }
    if (selectedSuggestion === formData.fullAddress) {
      return;
    }
    React.startTransition(() => searchAddress(formData.fullAddress));
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
        <List dense={true} className="suggestion-list">
          {suggestions.map((address) => {
            return (
              <ListItem
                key={address.properties.id}
                onClick={() => handleSelect(address)}
              >
                <ListItemText
                  primary={address.properties.name}
                  secondary={`${address.properties.postcode} ${address.properties.city}`}
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Input>
  );
};

export default AddressLookupInput;

{
  /* <Demo>
            <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
          </Demo> */
}
