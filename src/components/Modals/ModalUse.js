import React from 'react';
import ModalBase from './ModalBase';

const ModalUse = (props) => {
    return (
        <ModalBase title='Editar Admnid'  {...props}>
           {props.children} 
           {props.footer}
        </ModalBase>
    );
};

export default ModalUse;