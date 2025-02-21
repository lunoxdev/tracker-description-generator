import { useState, useEffect } from "react";
import background from "../assets/background.svg";
import "./Hero.css";

const Hero = () => {
  const [extraInfo, setExtraInfo] = useState(""); // State to handle the value of "EXTRA INFO"
  const [country, setCountry] = useState("AU"); // Default country set to "AU"
  const [trackerDescription, setTrackerDescription] = useState(""); // State to handle the description of the tracker

  // List of country abbreviations
  const countries = [
    { code: "AU", name: "Australia" },
    { code: "BR", name: "Brazil" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "GR", name: "Greece" },
    { code: "IN", name: "India" },
    { code: "IT", name: "Italy" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "NZ", name: "New Zealand" },
    { code: "PT", name: "Portugal" },
    { code: "RU", name: "Russia" },
    { code: "SE", name: "Sweden" },
    { code: "TH", name: "Thailand" },
    { code: "TR", name: "Turkey" },
    { code: "TZ", name: "Tanzania" },
  ];

  // Load the saved values from localStorage when the component mounts
  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    const savedExtraInfo = localStorage.getItem("extraInfo");

    if (savedCountry) {
      setCountry(savedCountry);
    }

    if (savedExtraInfo) {
      setExtraInfo(savedExtraInfo);
      setTrackerDescription(savedExtraInfo); // Update tracker description with the saved extra info
    }
  }, []);

  // Save the values to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("selectedCountry", country);
    localStorage.setItem("extraInfo", extraInfo);
  }, [country, extraInfo]);

  // Function to handle the change in the input of "EXTRA INFO"
  const handleExtraInfoChange = (e) => {
    const newExtraInfo = e.target.value;
    setExtraInfo(newExtraInfo);

    // Update the tracker description with the new extra info
    setTrackerDescription(newExtraInfo);
  };

  // Function to handle the change in the country selection
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
  };

  // Function to copy the tracker description to the clipboard
  const copyToClipboard = () => {
    // Concatenate the brand, country, vertical, and traffic source with the extra info
    const fullText = `Leon_${country}_CAS_PPC_${trackerDescription}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
      alert("Texto copiado al portapapeles");
    });
  };

  return (
    <div className="main-container">
      <img className="background" src={background.src} alt="" fetchpriority="high" />
      <main className="hero-container">
        <h1 className="hero-title">Tracker Description Generator</h1>

        {/* DESCRIPTION FORM */}
        <section className="grid grid-cols-5 w-[90%] gap-2 text-center border">
          {/* Titles of every column */}
          <div>
            <input
              type="text"
              value="BRAND"
              disabled
              className="input-label text-center"
              />
              <span>Leon</span>
          </div>
          <div>
            <span>COUNTRY</span>
            <select
              value={country}
              onChange={handleCountryChange}
              className="country-select text-center"
            >
              {countries.map((countryObj) => (
                <option key={countryObj.code} value={countryObj.code}>
                  {countryObj.name} ({countryObj.code})
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>VERTICAL</span>
            <input
              type="text"
              value="CAS"
              disabled
              className="input-label text-center"
            />
          </div>
          <div>
            <span>TRAFFIC SOURCE</span>
            <input
              type="text"
              value="PPC"
              disabled
              className="input-label text-center"
            />
          </div>
          <div>
            <span>EXTRA INFO</span>
            <input
              type="text"
              value={extraInfo}
              onChange={handleExtraInfoChange}
              placeholder="Required"
              className="extra-info-input text-center"
            />
          </div>
        </section>
        <section className="flex flex-col w-[90%]">
          <h2>TRACKER DESCRIPTION:</h2>
          <code>Leon_{country}_CAS_PPC_{trackerDescription}</code>
          <button onClick={copyToClipboard} disabled={!trackerDescription}>
            COPY
          </button>
        </section>
      </main>
    </div>
  );
};

export default Hero;
