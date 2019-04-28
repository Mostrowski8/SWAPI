import React from 'react';
import crash from '../assets/crash.gif';

const Error = (props) => {
    return <div className="error">
    <img src={crash} alt="Error" />
    <p>Something went wrong!</p>
    </div>
  }

  export default Error