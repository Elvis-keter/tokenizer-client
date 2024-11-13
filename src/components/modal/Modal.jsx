import React from 'react'
import '../../css/styles.css'

const Modal = ({show, handleClose, children}) => {
  if(!show) return null;

  return (
    <div className='modalBase'>
        <div className='modalBody'>
            <button className='closeBtn' onClick={handleClose}>&times;</button>
            {children}
        </div>
    </div>
  )
}

export default Modal
