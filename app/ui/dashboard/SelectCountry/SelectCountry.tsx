import React, { useEffect, useState } from 'react';
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';

const SelectCountry = ({ setCountry, setRegion, setCity, initialCountry, initialRegion, initialCity }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries.map(({ isoCode, name }) => ({ label: name, value: isoCode })));
    if (initialCountry) {
      const country = allCountries.find(c => c.name === initialCountry);
      if (country) {
        setSelectedCountry({ label: country.name, value: country.isoCode });
      }
    }
  }, [initialCountry]);

  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.value);
      setStates(states.map(({ isoCode, name }) => ({ label: name, value: isoCode })));
      setCities([]);
      setSelectedState(null);
      if (initialRegion && states.length > 0) {
        const state = states.find(s => s.name === initialRegion);
        if (state) {
          setSelectedState({ label: state.name, value: state.isoCode });
        }
      }
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry, initialRegion]);

  useEffect(() => {
    if (selectedState) {
      const cities = City.getCitiesOfState(selectedCountry.value, selectedState.value);
      setCities(cities.map(({ name }) => ({ label: name, value: name })));
      if (initialCity && cities.length > 0) {
        const city = cities.find(c => c.name === initialCity);
        if (city) {
          setCity(city.name);
        }
      }
    } else {
      setCities([]);
    }
  }, [selectedState, selectedCountry, initialCity, setCity]);

  return (
    <div>
      <Select
        options={countries}
        value={selectedCountry}
        onChange={(country) => {
          setSelectedCountry(country);
          setCountry(country ? country.value : '');
        }}
        placeholder="Выберите страну"
        isClearable
      />
      <Select
        options={states}
        value={selectedState}
        onChange={(state) => {
          setSelectedState(state);
          setRegion(state ? state.value : '');
        }}
        placeholder="Выберите область"
        isClearable
        isDisabled={!selectedCountry}
      />
      <Select
        options={cities}
        value={cities.find(c => c.value === initialCity) || null}
        onChange={(city) => {
          setCity(city ? city.value : '');
        }}
        placeholder="Выберите город"
        isDisabled={!selectedState}
        isClearable
      />
    </div>
  );
};

export default SelectCountry;
