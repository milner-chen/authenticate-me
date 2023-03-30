import { createContext, useRef, useState, useEffect, useContext } from "react";
// import { ReactDOM } from "react";
import './Modal.css'
import { createPortal } from "react-dom";

// create a react context
const ModalContext = createContext();

// what i think is happening here:
// wrap components in MovalProvider
// ModalProvider wraps ModalContext.Provider around components
// ModalContext.Provider passes the prop value to all wrapped components
// ModalProvider is also sticking a div underneath these components
// this div holds our persisting ref, modalRef
// 'value' will be used to update modelRef

export const ModalProvider = ({ children }) => {

    // value that is persisted between renders
    // does not cause render when updated
    // can access a DOM element directly
    const modalRef = useRef();
    const [value, setValue] = useState();
    
    useEffect(() => {
        setValue(modalRef.current);
    }, []); // empty dependency array means it only runs once at initial render

    return (
        <>
            <ModalContext.Provider value={value} >
                { children }
            </ModalContext.Provider>
            <div ref={ modalRef } />
        </>
    )
}

export const Modal = ({ onClose, children }) => {
    // pass in and access the context that we created
    const modalNode = useContext(ModalContext);

    if (!modalNode) return null;

    return createPortal( // the content of your modal
        <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">
                { children }
            </div>
        </div>,
        modalNode
    ); // where you want the modal to 
}