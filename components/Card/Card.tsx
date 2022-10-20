import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = { children: React.ReactNode; className: string };

const Card: React.FC<Props> = props => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        exit={{ x: [0, -100], opacity: [1, 0] }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delayChildren: 0.5,
        }}
        className={`card ${props.className}`}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Card;
