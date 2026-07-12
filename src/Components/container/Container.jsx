import React from "react";

function Container({ children }) {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
            {children}
        </div>
    );
}


export default Container;