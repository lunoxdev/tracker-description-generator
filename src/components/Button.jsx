const Button = ({ onClick, children, customStyles }) => {
  return (
    <div
      className="w-full rounded-xl transition-all duration-200"
      style={{
        padding: "1px",
        background: "linear-gradient(100deg, #7B2FFF 0%, #4B6FFF 55%, #21d2fe 100%)",
      }}
    >
      <button
        onClick={onClick}
        className={`group w-full flex items-center justify-between gap-3 px-5 py-4 rounded-[11px] transition-all duration-200 focus:outline-none hover:brightness-110 ${customStyles}`}
        style={{ background: "#09071a" }}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
