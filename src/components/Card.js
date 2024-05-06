
import dish from '../image/dish.png'
import time from '../image/time.svg'
import star from '../image/star.svg'
import starEmpty from '../image/star-empty.svg'

function Card() {

    return(
        <div className="card">
            <div className="card__info">
                <h3 className="card__title-h3">Наименование блюда длинное</h3>
                <img className="card__img" src={dish} alt="Изображение блюда"/>
            </div>
            <div className='card__info'>
                <p className='card__description'>
                    Традиционное итальянское блюдо, изначально в виде круглой дрожжевой лепёшки, выпекаемой с уложенной сверху начинкой из томатного соуса, сыра и зачастую других ингредиентов, таких как мясо, овощи, грибы и прочие продукты. Небольшую пиццу иногда называют пиццеттой.
                </p>
                <div className='card__wrapper'>
                    <img className="card__time-img" src={time} alt="Изображение часов"/>
                    <p className='card__text card__time-to-cook'>30 минут</p>
                </div>
                <div className='card__wrapper'>
                    <p className='card__text card__hard'>Сложность:</p>
                    <div>
                        <img className="card__star-img" src={star} alt="Звезды рейтинга"/>
                        <img className="card__star-img card__star-img_empty" src={starEmpty} alt="Звезды рейтинга"/>
                        <img className="card__star-img card__star-img_empty" src={starEmpty} alt="Звезды рейтинга"/>
                    </div>
                </div>
                <p className='card__text card__region'>Европейская кухня</p>
                <p className='card__text card__eating'>Завтрак, Обед, Ужин</p>
            </div>
        </div>
    )
}
export default Card;