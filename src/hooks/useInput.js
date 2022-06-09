import { useState, useCallback } from 'react';

export default function useInput(initialPlace) {
  const [inputValue, setInputValue] = useState(initialPlace);

  const onChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  return [inputValue, onChange];
}
