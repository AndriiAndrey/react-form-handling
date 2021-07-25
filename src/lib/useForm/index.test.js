import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react-hooks';

import useForm from './';

describe('testing useForm hook', () => {
  const getFakeTestEvent = (value = '') => ({
      preventDefault: jest.fn(),
      target: { value },
    });

  describe('smoke test', () => {
    it('should be a function', () => {
      expect(typeof useForm).toBe('function');
    });
  });

  describe('updating', () => {
    it('should change the data', () => {
      const { result } = renderHook(useForm);
      expect(result.current.data.name).toBeUndefined();
      act(() => {
        result.current.handleChange('name')(getFakeTestEvent('test'));
      });

      expect(result.current.data.name).toBe('test');
    });

    it('should initialize the data', () => {
      const { result } = renderHook(() => useForm({
          initialValues: {
            name: 'John',
          },
        })
      );

      expect(result.current.data.name).toBe('John');
      expect(result.current.data.test).toBeUndefined();
    });
  });

  describe('validation', () => {
    it('should call onSubmit fn() when if there is no errors', () => {
      const onSubmit = jest.fn();
      const { result } = renderHook(() => useForm({
          onSubmit,
        })
      );
      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should validate required values', () => {
      const requiredMessage = 'Name is required';
      const onSubmit = jest.fn();
      const { result } = renderHook(() => useForm({
          validations: {
            name: {
              required: {
                value: true,
                message: requiredMessage,
              },
            },
          },
          onSubmit,
        })
      );

      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(0);
      expect(result.current.errors.name).toBe(requiredMessage);
    });

    it('should validate RegExp patterns', () => {
      const validationMessage = "This field isn't formatted correctly";
      const onSubmit = jest.fn();
      const { result } = renderHook(() =>
        useForm({
          validations: {
            name: {
              pattern: {
                value: '/[A-Za-z]*/',
                message: validationMessage,
              },
            },
          },
          onSubmit,
        })
      );

      act(() => {
        result.current.handleChange('name')(getFakeTestEvent('John123'));
      });

      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(0);
      expect(result.current.errors.name).toBe(validationMessage);
    });

    it('should validate custom validations', () => {
      const validationMessage = 'The minimum length is 7 characters';
      const onSubmit = jest.fn();
      const { result } = renderHook(() =>
        useForm({
          validations: {
            name: {
              custom: {
                isValid: (value) => value?.length > 6,
                message: validationMessage,
              },
            },
          },
          onSubmit,
        })
      );

      act(() => {
        result.current.handleChange('name')(getFakeTestEvent('John123'));
      });

      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(result.current.errors.name).toBeUndefined();

      onSubmit.mockReset();
      act(() => {
        result.current.handleChange('name')(getFakeTestEvent('123'));
      });

      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(0);
      expect(result.current.errors.name).toBe(validationMessage);
    });

    it('should validate multiple validations', () => {
      const validationMessage = "This field isn't formatted correctly";
      const onSubmit = jest.fn();
      const { result } = renderHook(() => useForm({
          validations: {
            name: {
              pattern: {
                value: '/[A-Za-z]*/',
                message: validationMessage,
              },
              custom: {
                isValid: (value) => value?.length > 6,
                message: validationMessage,
              },
            },
          },
          onSubmit,
        })
      );

      act(() => {
        result.current.handleChange('name')(getFakeTestEvent('123'));
      });

      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(0);
    });

    it('should reset errors on submit', () => {
      const validationMessage = 'The minimum length is 7 characters';
      const onSubmit = jest.fn();
      const { result } = renderHook(() => useForm({
          validations: {
            name: {
              custom: {
                isValid: (value) => value?.length > 6,
                message: validationMessage,
              },
            },
          },
          onSubmit,
        })
      );

      onSubmit.mockReset();
      act(() => {
        result.current.handleChange('name')(getFakeTestEvent('123'));
      });

      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(0);
      expect(result.current.errors.name).toBe(validationMessage);

      act(() => {
        result.current.handleChange('name')(getFakeTestEvent('John123'));
      });

      act(() => {
        result.current.handleSubmit(getFakeTestEvent());
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(result.current.errors.name).toBeUndefined();
    });
  });
});