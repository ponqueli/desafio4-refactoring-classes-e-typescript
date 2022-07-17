import { useState } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  setIsOpen: () => void;
}

export default function Modal(props:ModalProps){
  const { isOpen, setIsOpen, children } = props;
  const [modalIsOpen] = useState(isOpen);

  return(
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalIsOpen}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}

