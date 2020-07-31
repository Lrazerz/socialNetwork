import React from "react";
import spinnerSrc from './spinner.gif';

export default () => {
  return (
    <>
      <img
        src={spinnerSrc}
        style={{ width: '200px', margin: 'auto', display: 'block'}}
        alt='Loading spinner'
      />
    </>
  )
}