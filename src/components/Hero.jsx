import { useState, useEffect } from "react";
import background from "../assets/background.svg";
import toast, { Toaster } from "react-hot-toast";
import InputField from "./InputField";
import DropDown from "./DropDown";
import TrackerDescription from "./TrackerDescription";
import Button from "./Button";
import "./Hero.css";

const Hero = () => {
  const [extraInfo, setExtraInfo] = useState("");
  const [country, setCountry] = useState("BR");
  const [brand, setBrand] = useState("Leon");
  const [trackerDescription, setTrackerDescription] = useState("");
  const [vertical, setVertical] = useState("CAS");
  const [trafficSource, setTrafficSource] = useState("PPC");

  const brands = [{ name: "Leon" }, { name: "Slott" }, { name: "Twin" }];
  const countries = [
    { code: "BR", name: "Brazil" },
    { code: "AU", name: "Australia" },
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
  const verticals = [{ name: "CAS" }, { name: "SPB" }, { name: "CAS+SPB" }];
  const trafficSources = [
    { name: "ASO" },
    { name: "ASO-Android" },
    { name: "ASO-iOS" },
    { name: "Blogger" },
    { name: "Content Marketing" },
    { name: "Email" },
    { name: "In-App" },
    { name: "Influencer" },
    { name: "Multi-Source" },
    { name: "PPC" },
    { name: "PPC-Meta" },
    { name: "PPC-GA" },
    { name: "Push-Notifications" },
    { name: "Retargeting" },
    { name: "SEO" },
    { name: "SMS" },
    { name: "Social-Organic" },
    { name: "Streamer" },
    { name: "Telegram" },
    { name: "WhatsApp" },
    { name: "TG+WA" },
    { name: "Youtuber" },
  ];

  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    const savedExtraInfo = localStorage.getItem("extraInfo");
    const savedBrand = localStorage.getItem("brand");
    const savedVertical = localStorage.getItem("vertical");
    const savedTrafficSource = localStorage.getItem("trafficSource");

    if (savedCountry) setCountry(savedCountry);
    if (savedExtraInfo) {
      setExtraInfo(savedExtraInfo);
      setTrackerDescription(savedExtraInfo);
    }
    if (savedBrand) setBrand(savedBrand);
    if (savedVertical) setVertical(savedVertical);
    if (savedTrafficSource) setTrafficSource(savedTrafficSource);
  }, []);

  useEffect(() => {
    // Guardar valores en localStorage cuando cambian
    localStorage.setItem("selectedCountry", country);
    localStorage.setItem("extraInfo", extraInfo);
    localStorage.setItem("brand", brand);
    localStorage.setItem("vertical", vertical);
    localStorage.setItem("trafficSource", trafficSource);
  }, [country, extraInfo, brand, vertical, trafficSource]);

  const handleExtraInfoChange = (e) => {
    const newExtraInfo = e.target.value;
    setExtraInfo(newExtraInfo);
    setTrackerDescription(newExtraInfo);
  };

  const handleCountryChange = (e) => setCountry(e.target.value);

  const handleBrandChange = (e) => setBrand(e.target.value);

  const handleVerticalChange = (e) => setVertical(e.target.value);

  const handleTrafficSourceChange = (e) => setTrafficSource(e.target.value);

  const copyToClipboard = () => {
    const fullText = `${brand}_${country}_${vertical}_${trafficSource}${
      extraInfo.trim() ? `_${trackerDescription}` : ""
    }`;

    if (!fullText.includes("_")) {
      toast.error('The field "EXTRA INFO" cannot be empty.', {
        style: { background: "#285a9e", color: "#ffffff" },
      });
      return;
    }

    navigator.clipboard.writeText(fullText).then(() => {
      toast.success("Tracker description copied.", {
        style: { background: "#285a9e", color: "#ffffff" },
      });
    });
  };

  return (
    <div className="main-container">
      <img
        className="background"
        src={background.src}
        alt="Background"
        fetchpriority="high"
      />
      <main className="hero-container">
        <h1 className="hero-title">Tracker Description Generator</h1>

        <section className="grid grid-cols-1 md:grid-cols-5 w-[95%] items-center text-center p-6 gap-2 rounded-md bg-gradient-to-r from-[#11697f] via-[#3b4f84] to-[#26395f]">
          <DropDown
            label={"BRAND"}
            options={brands}
            value={brand}
            onChange={handleBrandChange}
          />

          <DropDown
            label={"COUNTRY"}
            options={countries}
            value={country}
            onChange={handleCountryChange}
          />

          <DropDown
            label={"VERTICAL"}
            options={verticals}
            value={vertical}
            onChange={handleVerticalChange}
          />

          <DropDown
            label={"TRAFFIC SOURCE"}
            options={trafficSources}
            value={trafficSource}
            onChange={handleTrafficSourceChange}
          />

          <div className="flex flex-col items-center space-y-1 md:space-y-3">
            <InputField
              label="EXTRA INFO"
              value={extraInfo}
              onChange={handleExtraInfoChange}
              placeholder="Optional"
            />
          </div>
        </section>

        <section className="flex flex-col justify-center items-center w-full space-y-5">
          <Button onClick={copyToClipboard}>
            <TrackerDescription
              brand={brand}
              country={country}
              vertical={vertical}
              trafficSource={trafficSource}
              trackerDescription={trackerDescription}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 15 15"
              className="ml-3"
            >
              <path
                fill="#ffffff"
                fillRule="evenodd"
                d="M1 9.5A1.5 1.5 0 0 0 2.5 11H4v-1H2.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V4H5.5A1.5 1.5 0 0 0 4 5.5v7A1.5 1.5 0 0 0 5.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 4H11V2.5A1.5 1.5 0 0 0 9.5 1h-7A1.5 1.5 0 0 0 1 2.5zm4-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"
                clipRule="evenodd"
              />
            </svg>
          </Button>

          <Toaster />
        </section>
      </main>
    </div>
  );
};

export default Hero;
