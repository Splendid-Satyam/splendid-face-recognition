import React from 'react';
import './ImageLink.css';

const ImageLink = ({ onInputChange, onButtonChange}) => {

    return (
        <div>
            <h1 className = "f2">This Magic Brain will Detect faces in your Pictures... <br /> GIVE IT A TRY</h1>
            <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type="text"  placeholder ="Image URL here" onChange = { onInputChange }/>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick = { onButtonChange }>Detect</button>
            </div>
        </div>
    )
}

export default ImageLink;