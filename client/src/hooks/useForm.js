import { useState } from 'react';

export const useForm = onSubmit => {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState({});

  const submit = async event => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await onSubmit(formData);
      if (result && result.errors) {
        setErrors(result.errors);
      } else {
        setErrors({});
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsPending(false);
    }
  };

  return [errors, isPending, submit];
};
