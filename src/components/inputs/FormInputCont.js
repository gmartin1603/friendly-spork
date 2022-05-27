import React from 'react';

function FormInputCont({styling, label, valiTag, children}) {
    return (
        <div className={styling}>
            <div className={`flex flex-wrap justify-between max-w-[200px]`}>
                <h6>{label}</h6>
                <p className={`text-red text-sm font-semibold`}>{valiTag}</p>
            </div>
            {children}
        </div>
    );
}

export default FormInputCont;