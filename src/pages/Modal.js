import React from 'react';

function Modal(props) {
    return <div
        className={"absolute top-0 left-0 flex items-start justify-center z-50 w-full h-full bg-gray-500 bg-opacity-50 py-20"}>
        <div className="h-auto p-4 mx-2 text-left bg-white rounded shadow-xl lg:w-1/2 w-full space-y-5">
            <div className="flex justify-between border-b border-gray-300 pb-2">
                <h3 className="text-lg font-medium leading-6 text-gray-900 w-full">
                    {props.title}
                </h3>
                <button className="order-last font-medium" onClick={e => props.setModal(props.value)}>
                   X
                </button>
            </div>
            {props.children}
        </div>
    </div>
}

export default Modal;