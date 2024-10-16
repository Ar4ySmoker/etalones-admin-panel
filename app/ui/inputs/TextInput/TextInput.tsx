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
    <label htmlFor={id} className='flex w-[400px] justify-between gap-2 items-center'>
      {title && <div>{title}</div>}
      <input 
       className='input input-bordered input-success input-xs w-[200px]'
       type="text" id={id} name={id}
       placeholder={placeholder}
       {...rest}/>
    </label>
  );
};

export default TextInput;
