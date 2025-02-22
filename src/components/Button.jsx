const Button = ({ onClick, children, customStyles }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full max-w-[500px] p-3 rounded-xl text-center flex items-center justify-between bg-black border-2 border-[#21d2fe] transition-all duration-300 hover:opacity-90 hover:ring-2 hover:ring-[#21d2fe] hover:ring-offset-2 ${customStyles}`}
    >
      {children}
    </button>
  );
};

export default Button;
