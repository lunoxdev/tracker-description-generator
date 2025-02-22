const InputField = ({ label, value, onChange, placeholder, disabled }) => {
  return (
    <div className="flex flex-col items-center space-y-1 md:space-y-3">
      <span className="font-semibold text-base md:text-lg">{label}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="text-center py-1 border-2 border-gray-500 rounded-md bg-[#141B2E]"
      />
    </div>
  );
};

export default InputField;
