import React from 'react';
import Image from 'next/future/image';
import { motion } from 'framer-motion';
import { FaUser } from 'react-icons/fa';

type Props = {
  id: string;
  onClick: () => void;
  image: string;
  title: string;
  publisher: string;
  recipeKey: string | undefined;
};

const RecipeList = (props: Props) => {
  return (
    <motion.li
      key={props.id}
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{
        duration: 1,
        ease: 'easeInOut',
        delayChildren: 0.5,
      }}
      className="preview"
      onClick={props.onClick}
    >
      <a className="preview__link" href={`#${props.id}`}>
        <figure className="preview__fig">
          <Image
            src={props.image}
            alt={props.title}
            width={112.59}
            height={36.8}
          />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">{props.title}</h4>
          <p className="preview__publisher">{props.publisher}</p>

          <div
            className={`preview__user-generated ${
              props.recipeKey ? '' : 'hidden'
            }`}
          >
            <FaUser />
          </div>
        </div>
      </a>
    </motion.li>
  );
};

export default RecipeList;
