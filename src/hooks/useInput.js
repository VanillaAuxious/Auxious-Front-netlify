import { useState, useCallback } from 'react';

export default function useInput(initialPlace) {
  const [place, setplace] = useState(initialPlace);

  const onChange = useCallback((e) => {
    setplace(e.target.value);
  }, []);

  return [place, onChange];
}
