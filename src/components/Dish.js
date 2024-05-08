import dish from '../image/dish.png'
import {Link, useLocation} from "react-router-dom";
import { useEffect, useState } from 'react';

function Dish() {
    const [allData, setAllData] = useState(useLocation().state);
    const recipes = JSON.parse(localStorage.getItem('recipes')).recipes;
    
    useEffect(() => {
        sessionStorage.setItem('page', Math.floor((allData.id-1)/6))
    },[allData])

    function changeAllData(newAllData){
        setAllData(newAllData);
    }

    function dishSteps(){
        let stepsArray = [];
        stepsArray.push(
            <li className='dish__step dish__step_first' key={0}>{allData.instructions[0]}</li>
            )
        for(let i = 1; i < allData.instructions.length-1; i++){
            stepsArray.push(
                <li className='dish__step' key={i}>{allData.instructions[i]}</li>
                )
        }
        stepsArray.push(
            <li className='dish__step dish__step_last' key={allData.instructions.length-1}>{allData.instructions[allData.instructions.length-1]}</li>
            )

        return(stepsArray)

    }

    return(
        <div className='dish'>
            <header className="dish__header">
                <Link className='dish__link' to='/'/>
                <h1 className="dish__title-h1">{allData.name}</h1>
            </header>
            <div className="dish__global-wrapper">
                <div className="dish__wrapper">
                    <div className="dish__info dish__info_type_kitchen">
                        <h2 className="dish__title-h2">Кухня</h2>
                        <p className="dish__text">{allData.cuisine}</p>
                    </div>
                    <div className="dish__info dish__info_type_tags">
                        <h2 className="dish__title-h2">Теги</h2>
                        <p className="dish__text dish__text_type_light">{'#' + allData.tags.join(' #')}</p>
                    </div>
                    <div className="dish__info dish__info_type_calories">
                        <h2 className="dish__title-h2">Калорийность</h2>
                        <p className="dish__text dish__text_type_alternate-padding">{allData.caloriesPerServing} ккал</p>
                        <p className="dish__text dish__text_type_light dish__text_type_alternate-padding">100 грамм</p>
                    </div>
                    <div className="dish__info dish__info_type_servings">
                        <h2 className="dish__title-h2">Количество порций</h2>
                        <p className="dish__text dish__text_type_bold">{allData.servings}</p>
                    </div>
                    <div className="dish__info dish__info_type_description">
                        <h2 className="dish__title-h2">Описание</h2>
                        <p className="dish__text dish__text_type_light dish__text_type_short">
                            {allData.instructions.join(' ')}    
                        </p>
                    </div>
                </div>
                
                <div className="dish__wrapper">
                    <div className="dish__info dish__info_type_description">
                        <h2 className="dish__title-h2">Общее время приготовления</h2>
                        <p className="dish__text">
                            {allData.cookTimeMinutes + allData.prepTimeMinutes} минут
                        </p>
                    </div>
                    <div className="dish__info dish__info_type_steps">
                        <h2 className="dish__title-h2">Инструкции по приготовлению</h2>
                        <ul className='dish__steps-list'>
                            {dishSteps()}
                        </ul>
                    </div>
                </div>
                
                <div className="dish__wrapper dish__wrapper_type_img">
                    <img className="dish__img" src={allData.image || dish} alt="Изображение блюда"/>
                    <div className="dish__pagination">
                        <button className={`button dish__button dish__button_type_pagination dish__button_type_prev ${allData.id === 1 && 'button_inactive'}`} onClick={(e) => {changeAllData(recipes[allData.id-2])}}></button>
                        <button className={`button dish__button dish__button_type_pagination dish__button_type_next ${allData.id === recipes.length && 'button_inactive'}`} onClick={(e) => {changeAllData(recipes[allData.id])}}></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dish;