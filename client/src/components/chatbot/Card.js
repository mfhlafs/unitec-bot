import React from 'react';

const Card = (props) => {
    return (
        
            <div className="card-action">
                <a target="_blank"  href={props.payload.fields.link.stringValue}>Setup Printer</a>
            </div>
        
                
           
        
    );
};

export default Card;