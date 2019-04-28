import React from 'react';
import loading from '../assets/loading.gif';

const Loader = (props) => {
    return <div className="loading-icon">
    <img src={loading} alt="loading..." />
    </div>
  }

  export default Loader