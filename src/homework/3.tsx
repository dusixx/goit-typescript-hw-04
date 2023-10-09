import { useState, ChangeEvent } from 'react';

export function FormComponent() {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <input type="text" value={value} onChange={handleChange} />;
}
