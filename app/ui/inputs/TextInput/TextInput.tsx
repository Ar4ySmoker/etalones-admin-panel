// Input.js
import React from 'react';

interface TextInputProps {
    id: string;
    placeholder?: string;
    title?: string;
    [x: string]: any; // Для дополнительных свойств
  }
  

const TextInput: React.FC<TextInputProps> = ({ id, title, placeholder, ...rest }) => {
  return (
    <label htmlFor={id}>
      {title && <div>{title}</div>}
      <input 
       className='input input-sm input-bordered input-accent w-full max-w-xs'
       type="text" id={id} name={id}
       placeholder={placeholder}
       {...rest}/>
    </label>
  );
};

export default TextInput;
