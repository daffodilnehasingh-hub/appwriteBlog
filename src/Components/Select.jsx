import React,{useId} from "react";

function Select({
    options,
    label,
    className = "",
    ...props
},ref){
    const id=useId()
    return(
        <div className="w-full">
            {label && <label htmlFor={id} className=""></label>}
            <select 
            {...props}
            id={id}
            className={`border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            >
                {options.map((option)=>(
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}

            </select>
        </div>
    )
}

export default React.forwardRef(Select);