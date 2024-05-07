import dish from '../image/dish.png'

function Dish(props) {
    return(
        <div className='dish'>
            <header className="dish__header">
                <a className='dish__link' href='#'/>
                <h1 className="dish__title-h1">Наименование блюда длинное</h1>
            </header>
            <div className="dish__global-wrapper">
                <div className="dish__wrapper">
                    <div className="dish__info dish__info_type_kitchen">
                        <h2 className="dish__title-h2">Кухня</h2>
                        <p className="dish__text">Европейская</p>
                    </div>
                    <div className="dish__info dish__info_type_tags">
                        <h2 className="dish__title-h2">Теги</h2>
                        <p className="dish__text dish__text_type_light">#Выпечка</p>
                    </div>
                    <div className="dish__info dish__info_type_calories">
                        <h2 className="dish__title-h2">Калорийность</h2>
                        <p className="dish__text dish__text_type_alternate-padding">444 ккал</p>
                        <p className="dish__text dish__text_type_light dish__text_type_alternate-padding">100 грамм</p>
                    </div>
                    <div className="dish__info dish__info_type_servings">
                        <h2 className="dish__title-h2">Количество порций</h2>
                        <p className="dish__text dish__text_type_bold">4</p>
                    </div>
                    <div className="dish__info dish__info_type_description">
                        <h2 className="dish__title-h2">Описание</h2>
                        <p className="dish__text dish__text_type_light dish__text_type_short">
                            Традиционное итальянское блюдо, изначально в виде круглой дрожжевой лепёшки, выпекаемой с уложенной сверху начинкой из томатного соуса, сыра и зачастую других ингредиентов, таких как мясо, овощи, грибы и прочие продукты. Небольшую пиццу иногда называют пиццеттой.
                        </p>
                    </div>
                </div>
                
                <div className="dish__wrapper">
                    <div className="dish__info dish__info_type_description">
                        <h2 className="dish__title-h2">Общее время приготовления</h2>
                        <p className="dish__text">
                            30 минут
                        </p>
                    </div>
                    <div className="dish__info dish__info_type_steps">
                        <h2 className="dish__title-h2">Инструкции по приготовлению</h2>
                        <ul className='dish__steps-list'>
                            <li className='dish__step dish__step_first'>Собрать</li>
                            <li className='dish__step'>Собрать</li>
                            <li className='dish__step'>Собрать</li>
                            <li className='dish__step'>Собрать</li>
                            <li className='dish__step'>Собрать</li>
                            <li className='dish__step'>Собрать</li>
                            <li className='dish__step dish__step_last'>Собрать</li>
                        </ul>
                    </div>
                </div>
                
                <div className="dish__wrapper dish__wrapper_type_img">
                    <img className="dish__img" src={dish || props.allData.image} alt="Изображение блюда"/>
                    <div className="dish__pagination">
                        <button className={`button dish__button dish__button_type_pagination dish__button_type_prev button_inactive`}></button>
                        <button className={`button dish__button dish__button_type_pagination dish__button_type_next`}></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dish;