import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';


const Dropdown = (props:any) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const handleClick = (event:any) => {
        if (dropdownRef  && !dropdownRef.current?.contains(event.target)){
            if(props.onClose)props.onClose()
        }
            
    };                               
   
useEffect(()=> {
    document.addEventListener("click", handleClick);
    return () => {
        document.removeEventListener("click", handleClick);
    };
});


  return (
    <div ref={dropdownRef}>{props.children}</div>
  )
}

export default Dropdown