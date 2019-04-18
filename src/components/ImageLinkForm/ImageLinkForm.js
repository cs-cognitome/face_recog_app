import React from 'react'; 
import './ImageLinkForm.css'; 

const ImageLinkForm = () => { 
    return (
        <div>
            <p className='f3'>
                {"The Red Queen AI will detect faces at your pictures. Don't hesitate to try!"}
            </p>
            <div className='center'>
                <div className='form center pa5 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex'/> 
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-dark-gray'>DETECT</button>
                </div>
            </div>
        </div>
        
    ); 
}

export default ImageLinkForm; 