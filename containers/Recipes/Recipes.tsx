import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';

type Props = {};

const Recipes: React.FC<Props> = props => {
  return (
    <>
      <AnimatePresence>
        <div className="flex">
          <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            exit={{ x: [0, 20], opacity: [1, 0] }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              delayChildren: 0.5,
            }}
            className="search-results"
          >
            <ul className="result"></ul>
          </motion.div>

          <motion.div
            whileInView={{ y: [-100, 0], opacity: [0, 1] }}
            exit={{ y: [0, 20], opacity: [1, 0] }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              delayChildren: 0.5,
            }}
            className="recipe"
          ></motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default Recipes;
