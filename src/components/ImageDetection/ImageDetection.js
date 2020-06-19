import React from 'react';
import './ImageDetection.css';

const ImageDetection = ({ ImageUrl, box }) => {

    return (
        <div className = 'center ma'>
            <div className = 'absolute mt2'>
           <img id = 'inputimage'src ={ ImageUrl } alt=''  width = '500px' heigh = 'auto'/>
           <div className="bounding_box" style={{top: box.top_row, right: box.right_col, bottom: box.bottom_row, left: box.left_col}}></div>
           </div>
        </div>
    )
}

export default ImageDetection;