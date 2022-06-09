import { useState, useCallback } from 'react';

export default function useInput(initialPlace) {
  const [input, setInput] = useState(initialPlace);

  const onChange = useCallback((event) => {
    setInput(event.target.value);
  }, []);

  return [input, onChange];
}
