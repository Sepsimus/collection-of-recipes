import React, { useState } from "react";
import logo from '../image/logo.png'

function Main(){

    const [checkedValue, setCheckedValue] = useState('Любая');

    function changeCheckedValue(event){
        setCheckedValue(event.target.value);
    }

    return(
        <div className="main">
            <section className="main__settings" id={"settings"}>
                <div className="main__wrapper main__wrapper_type_description">
                    <img className="main__logo" src={logo} alt='Логотип' />
                    <div className="main__wrapper main__wrapper_type_text">
                        <p className="main__description">
                            В нашей жизни, когда время становится все более ценным ресурсом, задача планирования приема пищи становится все более сложной.
                        </p>
                        <p className="main__description">
                            Часто мы сталкиваемся с дилеммой: что приготовить на завтрак, обед или ужин? Каким образом мы можем легко и быстро определиться с выбором блюда и не тратить много времени на принятие этого решения?
                        </p>
                        <p className="main__description">
                            Наш сервис поможет: выбирайте параметры - и вперед!
                        </p>
                    </div>
                </div>
                <div className='main__wrapper main__wrapper_type_filter'>
                    <div className='main__wrapper main__wrapper_type_setting'>
                        <h4 className='main__title-h4'>Кухня:</h4>
                        <button className='button main__button main__button_type_drop-down-menu main__button_type_kitchen'>Все страны и регионы</button>
                        <ul className='main__drop-down-menu main__drop-down-menu_type_kitchen'>
                            <li className='main__drop-down-item main__drop-down-item_type_all' id={'all'}>Все страны и регионы</li>
                            <li className='main__drop-down-item main__drop-down-item_type_asia' id={'asia'}>Азия</li>
                            <li className='main__drop-down-item main__drop-down-item_type_italy' id={'italy'}>Италия</li>
                        </ul>
                    </div>
                    <div className='main__wrapper main__wrapper_type_setting'>
                        <h4 className='main__title-h4'>Тип блюда:</h4>
                        <button className='button main__button main__button_type_drop-down-menu main__button_type_dish'>Все типы</button>
                        <ul className='main__drop-down-menu main__drop-down-menu_type_dish'>
                            <li className='main__drop-down-item main__drop-down-item_type_dish' id={'dish'}>Все типы</li>
                            <li className='main__drop-down-item main__drop-down-item_type_breakfast' id={'breakfast'}>Завтрак</li>
                            <li className='main__drop-down-item main__drop-down-item_type_lunch' id={'lunch'}>Обед</li>
                            <li className='main__drop-down-item main__drop-down-item_type_dinner' id={'dinner'}>Ужин</li>
                        </ul>
                    </div>
                    <div className='main__wrapper main__wrapper_type_setting'>
                        <h4 className='main__title-h4'>Сложность приготовления:</h4>
                        <div className="main__wrapper main__wrapper_type_complexity">
                            <label className='button main__button main__button_type_radio' htmlFor='any'>
                                <input className="main__button_type_radio-main" type="radio" id='any' value='Любая' checked={checkedValue==="Любая" ? true : false} onChange={changeCheckedValue} />
                                <span className="main__button_span">Любая</span>
                            </label>
                            <label className='button main__button main__button_type_radio' htmlFor='low'>
                                <input className="main__button_type_radio-main" type="radio" id='low' value='Низкая' checked={checkedValue==="Низкая" ? true : false} onChange={changeCheckedValue} />
                                <span className="main__button_span">Низкая</span>
                            </label>
                            <label className='button main__button main__button_type_radio' htmlFor='medium'>
                                <input className="main__button_type_radio-main" type="radio" id='medium' value='Средняя' checked={checkedValue==="Средняя" ? true : false} onChange={changeCheckedValue}/>
                                <span className="main__button_span">Средняя</span>
                            </label>
                            <label className='button main__button main__button_type_radio' htmlFor='high'>
                                <input className="main__button_type_radio-main" type="radio" id='high' value='Высокая' checked={checkedValue==="Высокая" ? true : false} onChange={changeCheckedValue}/>
                                <span className="main__button_span">Высокая</span>
                            </label>
                        </div>
                    </div>
                    <button className='button button_inactive main__button main__button_type_resert' type='button'>Сбросить все фильтры</button>
                </div>

                <div className='main__wrapper main__wrapper_type_luck'>
                    <h5 className='main__title-h5'>А еще можно попробовать на вкус удачу</h5>
                    <button className='button main__button main__button_type_luck' type="button">Мне повезёт!</button>
                </div>
            </section>

            <section className="main__recipes" id={"recipes"}>
                
            </section>
        </div>
    )
}

export default Main;