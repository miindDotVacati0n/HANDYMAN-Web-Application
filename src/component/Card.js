import './../styles/Component/Card.css'

const Card = ({ children, cardClass }) => {
    return <div className={`${'card'} ${cardClass}`}>{children}</div>;
  };
  
export default Card;