export const validations = {
  name: {
    required: {
      value: true,
      message: "Please enter your name",
    },
    pattern: {
      value: "^[A-Za-z]*$",
      message:
        "You're not allowed to use special characters or numbers in your name.",
    },
  },
  details: {
    required: {
      value: true,
      message: "Input can't be empty",
    },
  },
};

export const options = [
  { value: "Bank", label: "Bank" },
  { value: "Tank", label: "Tank" },
  { value: "Sank", label: "Sank" },
];

export const timeOptions = [
  { value: "Year", label: "Year" },
  { value: "Month", label: "Month" },
];

export const initialValues = {
  name: "",
  projects: [options[0], options[1]],
  details: [],
};
