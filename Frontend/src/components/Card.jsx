import "./Card.css";

const Card = () => {
  return (
    <div>
      <div className='card'>
        <p className='disaster-ready'>Stay informed, stay safe.</p>
        <p>Discover</p>
        <img src="https://images.pexels.com/photos/4477291/pexels-photo-4477291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Disaster Alert" />
        <p>Be aware of the disasters ,stay connected with community</p>
      </div>
    </div>
  );
}

export default Card;
