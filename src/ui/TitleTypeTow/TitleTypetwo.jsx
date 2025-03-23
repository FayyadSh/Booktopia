// ------------ CSS ----------------
import "./TitleTypetwo";
// ------------ SVG ----------------
import Victor from '../../assets/victor.png'

const TitleTypetwo = ({title}) => {
  return (
    <div className='title-type-two container'>
      <h2>{title}</h2>
      <img src={Victor} className="victor" alt="" />
    </div>
  );
};

export default TitleTypetwo;
