import {memo, useState} from "react";
import Select from "react-select";

import useForm from "../../../lib/useForm";

import Input from "../../Input";
import ProjectCard from "../../ProjectCard";
import JsonBlock from "../../JsonBlock";

import {initialValues, validations, options} from "./helpers";

import {StyledWrapper} from "./styles";

const ProjectsForm = () => {
  const [isForm, setIsForm] = useState(true);
  const { handleSubmit, handleChange, setFieldValue, resetForm, data, errors } = useForm({
    validations,
    onSubmit: (formData) => alert(`User submitted!, ${JSON.stringify(formData)}`,),
    initialValues,
  });

  const handleDetailsChange = (index, e) => {
    const updatedValue = data.details
    updatedValue[index][e.target.name] = e.target.value
    setFieldValue('details', updatedValue)
  }

  const deleteProjectCard = (index) => {
    data.details.splice(index, 1)
    setFieldValue('details', data.details)
  }

  return (
    <StyledWrapper>
      <form className="registration-wrapper" onSubmit={handleSubmit}>
        {isForm ? (
          <>
            <Input
              name='name'
              placeholder="Name*"
              value={data.name || ''}
              onChange={handleChange('name')}
              error={errors.name}
              className={'name-input'}
             />
            <Select
              value={data.projects}
              isMulti
              name="projects"
              options={options}
              onChange={(value) => setFieldValue('projects', value)}
            />
            <div>
              <div className='add-project'>
                <span>Projects Details</span>
                <button type={'button'} onClick={() => {
                  const updatedDetails = [...data.details, {
                    project: '',
                    details: '',
                    duration: '',
                    unit: ''
                  }]
                  setFieldValue('details', updatedDetails)
                }}>+</button>
              </div>
              {data.details.map((project, index) => (
                <ProjectCard
                  key={index}
                  index={index}
                  details={data.details}
                  projects={data.projects}
                  handleDetailsChange={handleDetailsChange}
                  errors={errors?.details}
                  handleDelete={() => deleteProjectCard(index)}
                />)
              )}
            </div>
          </>
          ) : (
          <JsonBlock data={data} />
          )
        }
        <div className='buttons-container'>
          <div className='switch-button'>
            <button type='button' onClick={() => setIsForm(prev => !prev)}>
              {isForm ? 'TO JSON' : 'TO FORM'}
            </button>
          </div>
          <div className='submit-buttons'>
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </StyledWrapper>
  )}

export default memo(ProjectsForm);