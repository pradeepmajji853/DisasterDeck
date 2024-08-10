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
        <div className='blogposts'>
    <button onClick={handleRedirect1} className='but'>
      <h3>Quake Devastates Nepal</h3>
      <p>The 2015 earthquake in Nepal, a magnitude 7.8 disaster, left widespread devastation, destroying historic buildings</p>
    </button>
    <button onClick={handleRedirect2} className='but'>
    <h3>Crisis Mapping the Philippines</h3>
    <p>It involves using real-time data and geographic information systems (GIS) to respond effectively to natural disasters and emergencies</p>
  </button>
  <button onClick={handleRedirect3} className='but'>
  <h3>Twister Devastates Oklahoma</h3>
  <p>A powerful tornado struck Oklahoma, leaving a trail of destruction across the state</p>
</button>
<button onClick={handleRedirect3} className='but'>
  <h3>Human Costs of Hurricane Katrina</h3>
  <p>Hurricane Katrina, which struck the Gulf Coast in 2005, resulted in severe flooding</p>
</button>
<button onClick={handleRedirect3} className='but'>
  <h3>Indian Ocean Tsunami</h3>
  <p>The 2004 Indian Ocean tsunami, triggered by a massive undersea earthquake</p>
</button>
<button onClick={handleRedirect3} className='but'>
  <h3>2010 Haiti Earthquake</h3>
  <p>The 2010 earthquake in Haiti, with a magnitude of 7.0, devastated the capital city of Port-au-Prince</p>
</button></div>
<div className='Utube' >
   <h1>Want to explore practically!</h1> 
<div className='videos'>
   <div className="video-card">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/dKPvnE1VXAI"
              title="Exploring Disasters"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h3 className="video-title">Exploring Disasters</h3>
        </div>

       <div className="video-card">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/W2UDbDXXYGE"
              title=""
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h3 className="video-title">Exploring Cyclones</h3>
        </div>    

        <div className="video-card">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/h3z50ZX_RMM"
              title="Exploring Disasters"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h3 className="video-title">Exploring Tornodos</h3>
        </div>

        <div className="video-card">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/tSBd55t_WHk"
              title="Exploring Disasters"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h3 className="video-title">Exploring Earthquakes</h3>
        </div>

        <div className="video-card">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/RqqqSnaTfQo"
              title="Exploring Disasters"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h3 className="video-title">Exploring Floods</h3>
        </div>




        <div className="video-card">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/Z-w_z9yobpE"
              title="Exploring Volcanos"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h3 className="video-title">Exploring Disasters</h3>
        </div>
   
   </div>
</div>
</div>
  );
};



export default Resources;