import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

import Button from '../Buttons/Button';

interface Backdrop {
  onConfirm: () => void;
}
interface ModalOverlay {
  onConfirm: () => void;
  title: string;
  message: string;
}

type Props = { onConfirm: () => void; title: string; message: string };

const Backdrop = (props: Backdrop) => {
  return <div className="modal-backdrop" onClick={props.onConfirm} />;
};

const ModalOverlay = (props: ModalOverlay) => {
  return (
    <AnimatePresence>
      <motion.div
        className="app__modal"
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ y: [-100, 0], opacity: [0, 1] }}
        exit={{ y: [0, -100], opacity: [1, 0] }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delayChildren: 0.5,
        }}
      >
        <header className="modal-header">
          <FaExclamationTriangle />
          <h2>{props.title}</h2>
        </header>

        <div className="modal-content">
          <p>{props.message}</p>
        </div>

        <footer className="modal-actions">
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};

const Modal: React.FC<Props> = props => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root') as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById('overlay-root') as HTMLElement
      )}
    </React.Fragment>
  );
};

export default React.memo(Modal);
