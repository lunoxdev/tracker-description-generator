import { useState } from "react";

const InputField = ({ label, value, onChange, placeholder, disabled }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="field-label">{label}</label>
      <div
        className="rounded-lg transition-all duration-200"
        style={{
          padding: "1px",
          background: focused
            ? "linear-gradient(100deg, #7B2FFF, #21d2fe)"
            : "rgba(255,255,255,0.1)",
        }}
      >
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-3 py-2.5 rounded-[7px] text-white text-sm font-medium placeholder-white/20 outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
          style={{ background: "#0f0c25" }}
        />
      </div>
    </div>
  );
};

export default InputField;
