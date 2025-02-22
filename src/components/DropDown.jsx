const DropDown = ({ label, options, value, onChange }) => {
  return (
    <div className="flex flex-col items-center space-y-1 md:space-y-3">
      <span className="font-semibold text-base md:text-lg uppercase">
        {label}
      </span>
      <select
        value={value}
        onChange={onChange}
        className="country-select text-center bg-[#141B2E] rounded-md p-1 shrink-0 w-full"
      >
        {options.map((option) => (
          <option
            key={option.code || option.name}
            value={option.code || option.name}
          >
            {option.name} {option.code && `(${option.code})`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
