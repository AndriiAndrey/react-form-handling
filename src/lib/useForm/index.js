import { useState } from "react";

const useForm = (options) => {
  const [data, setData] = useState((options?.initialValues || {}));
  const [errors, setErrors] = useState({});

  const handleChange = (key, sanitizeFn) => (
    e,
  ) => {
    const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  }

  const setFieldValue = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  }

  const resetForm = () => {
    setData(options?.initialValues || {});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        if (Array.isArray(value)) {
          let errorsArray = [];
          value.forEach((item, index) => {
            const loopErrors = {};
            for (const objKey in item) {
              if (validation?.required?.value && !item[objKey]) {
                valid = false;
                loopErrors[objKey] = validation?.required?.message;
              }

              const pattern = validation?.pattern;
              if (pattern?.value && !RegExp(pattern.value).test(item[objKey])) {
                valid = false;
                loopErrors[objKey] = pattern.message;
              }

              const custom = validation?.custom;
              if (custom?.isValid && !custom.isValid(item[objKey])) {
                valid = false;
                loopErrors[objKey] = custom.message;
              }
            }

            if (!!Object.keys(loopErrors).length) errorsArray[index] = loopErrors;
          });

          if (errorsArray.length) {
            newErrors[key] = errorsArray;
          }

        } else {
          if (validation?.required?.value && !value) {
            valid = false;
            newErrors[key] = validation?.required?.message;
          }

          const pattern = validation?.pattern;
          if (pattern?.value && !RegExp(pattern.value).test(value)) {
            valid = false;
            newErrors[key] = pattern.message;
          }

          const custom = validation?.custom;
          if (custom?.isValid && !custom.isValid(value)) {
            valid = false;
            newErrors[key] = custom.message;
          }
        }

      }

      if (!valid) {
        return setErrors(newErrors);
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit(data);
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    errors,
  };
};

export default useForm;