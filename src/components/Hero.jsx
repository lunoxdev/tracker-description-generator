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
    { code: "AR", name: "Argentina" },
    { code: "AU", name: "Australia" },
    { code: "BR", name: "Brazil" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "GR", name: "Greece" },
    { code: "IN", name: "India" },
    { code: "IT", name: "Italy" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "NZ", name: "New Zealand" },
    { code: "PL", name: "Poland" },
    { code: "PT", name: "Portugal" },
    { code: "RU", name: "Russia" },
    { code: "SE", name: "Sweden" },
    { code: "TZ", name: "Tanzania" },
    { code: "TH", name: "Thailand" },
    { code: "TR", name: "Turkey" },
  ];
  const verticals = [
    { name: "CAS" },
    { name: "CAS+SPB" },
    { name: "FWC26" },
    { name: "SPB" },
  ];
  const trafficSources = [
    { name: "ASO" },
    { name: "ASO-Android" },
    { name: "ASO-iOS" },
    { name: "Blogger" },
    { name: "Content Marketing" },
    { name: "Display Ads" },
    { name: "Email" },
    { name: "Facebook (Organic)" },
    { name: "FB Ads" },
    { name: "In-App" },
    { name: "Influencer" },
    { name: "Instagram (Organic)" },
    { name: "Multi-Source" },
    { name: "Native Ads" },
    { name: "PPC" },
    { name: "Push-Notifications" },
    { name: "Retargeting" },
    { name: "SEO" },
    { name: "SMS" },
    { name: "Social-Organic" },
    { name: "Streamer" },
    { name: "Streamer (Kick)" },
    { name: "Streamer (Twitch)" },
    { name: "Telegram" },
    { name: "TG+WA" },
    { name: "Tik Tok Ads" },
    { name: "Tik Tok (Organic)" },
    { name: "Tipster" },
    { name: "UAC" },
    { name: "WhatsApp" },
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

    navigator.clipboard.writeText(fullText).then(() => {
      toast.success("Copied to clipboard!", {
        style: {
          background: "#0e1628",
          color: "#ffffff",
          border: "1px solid rgba(33,210,254,0.35)",
          borderRadius: "10px",
          fontSize: "14px",
        },
        iconTheme: { primary: "#21d2fe", secondary: "#0e1628" },
      });
    });
  };

  return (
    <div className="main-container">
      <img
        className="background opacity-80"
        src={background.src}
        alt="Background"
        fetchpriority="high"
      />

      <div className="card-wrapper">
      <main className="hero-container">
        <div className="hero-header">
          <h1 className="hero-title">Tracker Description Generator</h1>
        </div>

        <section className="form-section">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <DropDown
              label="Brand"
              options={brands}
              value={brand}
              onChange={handleBrandChange}
            />
            <DropDown
              label="Country"
              options={countries}
              value={country}
              onChange={handleCountryChange}
            />
            <DropDown
              label="Vertical"
              options={verticals}
              value={vertical}
              onChange={handleVerticalChange}
            />
            <DropDown
              label="Traffic Source"
              options={trafficSources}
              value={trafficSource}
              onChange={handleTrafficSourceChange}
            />
          </div>

          <div className="mt-3 md:mt-4">
            <InputField
              label="Extra Info"
              value={extraInfo}
              onChange={handleExtraInfoChange}
              placeholder="Optional — e.g. campaign name"
            />
          </div>
        </section>

        <section className="copy-section">
          <p className="copy-label">Generated string</p>
          <Button onClick={copyToClipboard}>
            <TrackerDescription
              brand={brand}
              country={country}
              vertical={vertical}
              trafficSource={trafficSource}
              trackerDescription={trackerDescription}
            />
            <span className="copy-action">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 15 15"
                className="shrink-0"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M1 9.5A1.5 1.5 0 0 0 2.5 11H4v-1H2.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V4H5.5A1.5 1.5 0 0 0 4 5.5v7A1.5 1.5 0 0 0 5.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 4H11V2.5A1.5 1.5 0 0 0 9.5 1h-7A1.5 1.5 0 0 0 1 2.5zm4-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-bold uppercase tracking-wider">Copy</span>
            </span>
          </Button>
        </section>

        <Toaster position="top-center" />
      </main>
      </div>
    </div>
  );
};

export default Hero;
