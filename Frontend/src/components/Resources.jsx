import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Resources.css'


const Resources = () => {
  const navigate = useNavigate();

  const handleRedirect1 = () => {
    navigate('https://blog.education.nationalgeographic.org/tag/natural-disasters/'); 
  };
  const handleRedirect2 = () => {
    navigate('https://blog.education.nationalgeographic.org/2013/11/11/crisis-mapping-the-philippines/'); 
  };
  const handleRedirect3 = () => {
    navigate('https://www.scientificamerican.com/report/moore-oklahoma-tornado/'); 
  };

  return (
    <div className='blogs'>
        <h1>Blog posts</h1>
    <button onClick={handleRedirect1} className='but'>
      Quake Devastates Nepal
    </button>
    <button onClick={handleRedirect2} className='but'>
    Crisis Mapping the Philippines
  </button>
  <button onClick={handleRedirect3} className='but'>
  Twister Devastates Oklahoma
</button></div>
  );
};



export default Resources;