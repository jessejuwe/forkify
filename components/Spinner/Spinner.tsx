import React from 'react';
import { FaSpinner } from 'react-icons/fa';

type Props = {};

const Spinner = (props: Props) => {
  return <div className="spinner">{<FaSpinner />}</div>;
};

export default Spinner;
