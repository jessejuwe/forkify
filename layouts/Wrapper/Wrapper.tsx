import React from 'react';

import { Navbar, Footer } from '../../exports/exports';

type Props = { children: React.ReactNode };

const Wrapper: React.FC<Props> = props => {
  return (
    <div className="app w-full">
      <Navbar />
      <main className="app__flex w-full">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Wrapper;
