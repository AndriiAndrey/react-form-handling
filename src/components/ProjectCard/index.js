import { memo } from "react";

import CustomSelect from "../Select";
import Input from "../Input";

import { timeOptions } from "../forms/ProjectsForm/helpers";

import { StyledWrapper } from "./styles";

const ProjectCard = ({
  handleDelete,
  handleDetailsChange,
  details,
  projects,
  index,
  errors,
}) => {
  return (
    <StyledWrapper>
      <button className="delete-button" type={"button"} onClick={handleDelete}>
        X
      </button>
      <div className="card-row">
        <p>Project: </p>
        <CustomSelect
          name="project"
          options={projects.map((proj) => ({
            value: proj.value,
            label: proj.label,
          }))}
          onChange={(e) => {
            handleDetailsChange(index, e);
          }}
          error={errors?.[index]?.project}
        />
      </div>
      <div className="card-row">
        <p>Details</p>
        <Input
          name="details"
          placeholder={"Details"}
          value={details[index].details}
          onChange={(e) => {
            handleDetailsChange(index, e);
          }}
          error={errors?.[index]?.details}
        />
      </div>
      <div className="card-row">
        <p>Duration</p>
        <Input
          name={"duration"}
          type="number"
          value={details[index].duration}
          onChange={(e) => {
            handleDetailsChange(index, e);
          }}
          error={errors?.[index]?.duration}
        />
        <CustomSelect
          name="unit"
          options={timeOptions}
          onChange={(e) => {
            handleDetailsChange(index, e);
          }}
          error={errors?.[index]?.unit}
        />
      </div>
    </StyledWrapper>
  );
};

export default memo(ProjectCard);
