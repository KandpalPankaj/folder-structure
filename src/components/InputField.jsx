import { useState } from "react";

const InputField = ({
  defaultValue = "",
  onSubmit,
  onCancel,
  placeholder,
  isFolder,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit(value);
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div className="flex items-center space-x-2 my-1">
      <span>{isFolder ? "📁" : "📄"}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={onCancel}
        className="border-b-2 border-blue-500 outline-none flex-grow px-1"
        autoFocus
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
