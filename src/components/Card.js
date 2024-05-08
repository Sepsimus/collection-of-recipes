
import dish from '../image/dish.png'
import time from '../image/time.svg'
import star from '../image/star.svg'
import starEmpty from '../image/star-empty.svg'
import {Link} from "react-router-dom";

function Card(props) {

    return(
        <div className="card">
            <Link className='card__link' to="/dish" state={props.allData}/>
            <div className="card__info">
                <h3 className="card__title-h3">{props.allData.name}</h3>
                <img className="card__img" src={props.allData.image || dish} alt="Изображение блюда"/>
            </div>
            <div className='card__info'>
                <p className='card__description'>
                {props.allData.instructions.join(' ')}
                </p>
                <div className='card__wrapper'>
                    <img className="card__time-img" src={time} alt="Изображение часов"/>
                    <p className='card__text card__time-to-cook'>{props.allData.cookTimeMinutes}</p>
                </div>
                <div className='card__wrapper'>
                    <p className='card__text card__hard'>{props.allData.difficulty}</p>
                    <div>
                        <img className="card__star-img" src={star} alt="Звезды рейтинга"/>
                        <img className="card__star-img card__star-img_empty" src={props.allData.difficulty === 'Medium' ? star : starEmpty} alt="Звезды рейтинга"/>
                        <img className="card__star-img card__star-img_empty" src={starEmpty} alt="Звезды рейтинга"/>
                    </div>
                </div>
                <p className='card__text card__region'>{props.allData.cuisine}</p>
                <p className='card__text card__eating'>{props.allData.mealType.join(', ')}</p>
            </div>
        </div>
    )
}
export default Card;