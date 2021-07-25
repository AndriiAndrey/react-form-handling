import { render, screen, fireEvent } from "@testing-library/react";

import Input from "./";


describe("Input component should render according to props", () => {
  const mockFn = jest.fn();
  const setup = () => {
    const props = {
      type: "text",
      value: "testValue",
      placeholder: "testPlaceholder",
      required: false,
      onChange: mockFn,
      error: "error",
      name: "test",
      className: "test",
    }
    const utils = render(<Input {...props} />);
    const input = utils.getByTestId('custom-input');
    return {
      input,
      ...utils,
    }
  }

  it('smoke test', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
  });

  it('Should render input value, according to props', () => {
    const { input } = setup();
    expect(input).toHaveAttribute("value", "testValue");
  });

  it('Should trigger onchange method', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockFn).toBeCalled();
  });

  it('Should render input type according to props', () => {
    const { input } = setup();
    expect(input).toHaveAttribute("type", "text");
  })

  it('Should render error message', () => {
    const { getByTestId } = setup();
    const error = getByTestId("input-error");
    expect(error.textContent).toBe("error");
  });
});
