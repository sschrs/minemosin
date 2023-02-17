import React from "react";

const Input = (props)=>{
    const { name, label, type, placeholder, onChange, text, textType, onKeyDown, innerRef } = props;
    return (
        <div>
            <label> {label} </label>
            <input type={type} name={name} placeholder={placeholder} onChange={onChange} className="form-control" onKeyDown={onKeyDown} ref={innerRef}/>
            <small className={`text-${textType}`}> {text} </small>
        </div>
    )

}

export default Input;