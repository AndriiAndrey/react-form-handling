import { memo } from "react";
import { StyledWrapper } from "./styles";

const CustomSelect = ({ name, onChange, options, error }) => {
  return (
    <StyledWrapper>
      <select name={name} onChange={onChange}>
        <option value="" disabled selected>
          Select unit
        </option>
        {options.map((option, index) => (
          <option key={index + option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {!!error && <p className="error">{error}</p>}
    </StyledWrapper>
  );
};

export default memo(CustomSelect);
