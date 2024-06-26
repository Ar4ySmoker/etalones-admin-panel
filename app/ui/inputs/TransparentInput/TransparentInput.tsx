// Input.js
import React from 'react';

interface TransparentInputProps {
    id: string;
    placeholder?: string;
    title?: string;
    defaultValue?: string;
    [x: string]: any; // Для дополнительных свойств
  }
  

const TransparentInput: React.FC<TransparentInputProps> = ({ defaultValue, id, title, placeholder, ...rest }) => {
  return (
    <label htmlFor={id}>
      {title && <div>{title}</div>}
      <input 
       className='input input-sm w-full max-w-xs'
       type="text" id={id} name={id}
       placeholder={placeholder}
       defaultValue={defaultValue}
       {...rest}/>
    </label>
  );
};

export default TransparentInput;
