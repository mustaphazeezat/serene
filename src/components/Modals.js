import React from 'react'
import Modal from 'react-modal';

const Modals = ({setIsOpen, isOpen, children}) => {
    Modal.setAppElement('#root');
    const customStyles = {
        content: {
          width: '600px',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    
      function closeModal() {
        setIsOpen(false);
      }
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
            <div className='d-flx-alc-jfe'><button type='button' className='close-modal' onClick={closeModal}>close</button></div>
              {children}
            </Modal>
        </div>
    )
}

export default Modals
