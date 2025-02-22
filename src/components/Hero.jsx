import { useState, useEffect } from "react";
import background from "../assets/background.svg";
import "./Hero.css";

import toast, { Toaster } from 'react-hot-toast';

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
    // Check if the "EXTRA INFO" is empty or contains only spaces
    if (!extraInfo.trim()) { 
      
      const notify = () => toast.error('The field "EXTRA INFO" cannot be empty.', {
        style: {
          background: "#285a9e",
          color: "#ffffff",
        },
      });
      notify();
      return; // Don't proceed with copying if the field is invalid
    }

    // Concatenate the brand, country, vertical, and traffic source with the extra info
    const fullText = `Leon_${country}_CAS_PPC_${trackerDescription}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
      const notify = () => toast.success('Tracker description copied.', {
         style: {
          background: "#285a9e",
          color: "#ffffff",
          },
      });
      notify();
    });
  };

  // Function to clear the "EXTRA INFO" input field
  const clearExtraInfo = () => {
      const notify = () => toast('The field "EXTRA INFO" has been cleared.', {
        style: {
          background: "#285a9e",
          color: "#ffffff",
          },
        icon: '⚠️',
        });
      notify();
    setExtraInfo(""); // Clear the extra info field
    setTrackerDescription(""); // Optionally, clear the tracker description as well
  };

  return (
    <div className="main-container">
      <img className="background" src={background.src} alt="Background" fetchpriority="high" />
      <main className="hero-container space-y-5">
        <h1 className="hero-title">Tracker Description Generator</h1>

        {/* DESCRIPTION FORM */}
        <section className="grid grid-cols-5 w-[90%] h-1/4 items-center text-center px-5 rounded-xl bg-gradient-to-r from-[#11697f] via-[#3b4f84] to-[#26395f]">
          {/* BRAND */}
          <div>
            <input
              type="text"
              value="BRAND"
              disabled
              className="input-label text-center font-semibold"
              />
              <span>Leon</span>
          </div>

          {/* COUNTRY */}
          <div>
            <span className="font-semibold">COUNTRY</span>
            <select
              value={country}
              onChange={handleCountryChange}
              className="country-select text-center border bg-[#141B2E] rounded-xl p-1"
            >
              {countries.map((countryObj) => (
                <option key={countryObj.code} value={countryObj.code}>
                  {countryObj.name} ({countryObj.code})
                </option>
              ))}
            </select>
          </div>

          {/* VERTICAL */}
          <div>
            <span className="font-semibold">VERTICAL</span>
            <input
              type="text"
              value="CAS"
              disabled
              className="input-label text-center"
            />
          </div>

          {/* TRAFFIC SOURCE */}
          <div>
            <span className="font-semibold">TRAFFIC SOURCE</span>
            <input
              type="text"
              value="PPC"
              disabled
              className="input-label text-center"
            />
          </div>

          {/* EXTRA INFO */}
          <div>
            <span className="font-semibold">EXTRA INFO</span>
            <input
              type="text"
              value={extraInfo}
              onChange={handleExtraInfoChange}
              placeholder="Required"
              className="extra-info-input text-center py-1 border bg-[#141B2E]"
            />
          </div>
        </section>

        {/* TRACKER DESCRIPTION */}
        <section className="flex flex-col justify-center items-center w-[90%] space-y-5">
          {/* COPY BUTTON */}
         <button onClick={copyToClipboard} className="w-1/2 p-3 rounded-xl text-center bg-[#141B2E] flex items-center justify-start">
          {/* SVG Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15" className="mr-2">
            <path fill="#ffffff" fill-rule="evenodd" d="M1 9.5A1.5 1.5 0 0 0 2.5 11H4v-1H2.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V4H5.5A1.5 1.5 0 0 0 4 5.5v7A1.5 1.5 0 0 0 5.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 4H11V2.5A1.5 1.5 0 0 0 9.5 1h-7A1.5 1.5 0 0 0 1 2.5zm4-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z" clip-rule="evenodd"/>
          </svg>
          {/* Text */}
          Leon_{country}_CAS_PPC_{trackerDescription}
        </button>

          
          {/* DELETE BUTTON */}
          <button onClick={clearExtraInfo} className="text-black hover:underline">CLEAR</button>
          <Toaster />
        </section>
      </main>
    </div>
  );
};

export default Hero;
