import React from 'react';

import { Navbar, Footer } from '../../exports/exports';

type Props = { children: React.ReactNode };

const Wrapper: React.FC<Props> = props => {
  return (
    <div className="">
      <Navbar />
      <main className="">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Wrapper;
