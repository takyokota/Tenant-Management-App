import React, { Fragment, useEffect, useState } from 'react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

const BackToTop = () => {
  const [offset, setOffset] = useState(0);

  // Set y-axis pixels scrolled
  const setScroll = () => {
    setOffset(window.scrollY);
  };

  // Event listener for scrolling
  useEffect(() => {
    window.addEventListener('scroll', setScroll);
    return () => {
      window.removeEventListener('scroll', setScroll);
    };
  }, []);

  // console.log(offset);

  // Click handler (back to top)
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      {offset !== 0 ? (
        <div onClick={handleClick}>
          <ExpandCircleDownIcon
            style={{ fontSize: 70 }}
            className='rotate-180 fontSizeLarge text-blue-500 cursor-pointer'
          />
        </div>
      ) : (<></>)}
    </Fragment>
  );
};

export default BackToTop;