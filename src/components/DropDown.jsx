import { useState, useRef, useEffect } from "react";

const DropDown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find(
    (opt) => (opt.code || opt.name) === value
  );
  const displayLabel = selectedOption
    ? `${selectedOption.name}${selectedOption.code ? ` (${selectedOption.code})` : ""}`
    : value;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optValue) => {
    onChange({ target: { value: optValue } });
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full" ref={containerRef}>
      <label className="field-label">{label}</label>
      <div className="relative">
        {/* Gradient border wrapper */}
        <div
          className="rounded-lg transition-all duration-200"
          style={{
            padding: "1px",
            background: isOpen
              ? "linear-gradient(100deg, #7B2FFF, #21d2fe)"
              : "rgba(255,255,255,0.1)",
          }}
        >
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-[7px] text-sm font-medium transition-all duration-200 focus:outline-none"
            style={{ background: "#0f0c25" }}
            onMouseEnter={(e) => {
              if (!isOpen)
                e.currentTarget.parentElement.style.background =
                  "linear-gradient(100deg, rgba(123,47,255,0.6), rgba(33,210,254,0.6))";
            }}
            onMouseLeave={(e) => {
              if (!isOpen)
                e.currentTarget.parentElement.style.background =
                  "rgba(255,255,255,0.1)";
            }}
          >
            <span className="truncate text-left text-white/85">{displayLabel}</span>
            <svg
              className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              style={{
                color: isOpen ? "#9B7FFF" : "rgba(255,255,255,0.3)",
              }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div
            className="dropdown-panel absolute z-50 mt-1.5 w-full max-h-56 overflow-y-auto rounded-lg border shadow-2xl shadow-black/70 py-1"
            style={{
              background: "#0b091e",
              borderColor: "rgba(123,47,255,0.25)",
            }}
          >
            {options.map((option) => {
              const optValue = option.code || option.name;
              const optLabel = `${option.name}${option.code ? ` (${option.code})` : ""}`;
              const isSelected = optValue === value;
              return (
                <button
                  key={optValue}
                  type="button"
                  onClick={() => handleSelect(optValue)}
                  className="w-full text-left px-3 py-2 text-sm transition-colors duration-100"
                  style={
                    isSelected
                      ? {
                          background: "rgba(123,47,255,0.18)",
                          backgroundImage:
                            "linear-gradient(100deg,rgba(123,47,255,0.18),rgba(33,210,254,0.08))",
                          color: "#a07fff",
                          fontWeight: 600,
                        }
                      : { color: "rgba(255,255,255,0.55)" }
                  }
                  onMouseEnter={(e) => {
                    if (!isSelected)
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    if (!isSelected) e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = "";
                      e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                    }
                  }}
                >
                  {optLabel}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
