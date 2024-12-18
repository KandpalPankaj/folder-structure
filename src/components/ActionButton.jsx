const ActionButton = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`text-white px-2 py-1 rounded-md text-xs transition-colors ${className}`}
  >
    {children}
  </button>
);

export default ActionButton;
