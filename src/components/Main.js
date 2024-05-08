import React, { useEffect, useState } from "react";
import logo from '../image/logo.png'
import Cards from "./Cards";
import Header from "./Header";
import {Link} from "react-router-dom";

function Main(){

    const [page, setPage] = useState(parseInt(sessionStorage.getItem('page')) || 0);
    const [checkedValue, setCheckedValue] = useState('Any');
    const cashRecipes = JSON.parse(localStorage.getItem('recipes')).recipes;
    const [recipes, setRecipes] = useState(cashRecipes || {});
    let randomMainImage = cashRecipes[2].image;
    let lastPageNumber = Math.ceil(recipes.length/6);
    let isButtonInactive = checkedValue === 'Any' ? true : false;
    
    function changeCheckedValue(event){
        setCheckedValue(event.target.value);
    }

    useEffect(()=>{
        if(checkedValue === 'Any') {
            setRecipes(cashRecipes)
            return
        }
        let filteredRecipes = cashRecipes.filter((recipe) =>  recipe.difficulty === checkedValue )
        setRecipes(filteredRecipes);
        setPage(0);
    }, [checkedValue])


    function refreshFilter(){
        setCheckedValue('Any');
    }

    function rememberPagiPage(page){
        setPage(page);
        sessionStorage.setItem('page', page);
    }

    function paginationDraw(currentPage){
        let paginationArray = [];
        
        let startPage;
        currentPage < 1 ? startPage = 2 : startPage = currentPage - 1;
        let endPage;
        startPage + 4 >= (lastPageNumber - 1) ? endPage = lastPageNumber - 1 : endPage = startPage + 4;
        for(let i = startPage; i <= endPage; i++){
            paginationArray.push(
            <button className={`button main__button ${page === i-1 && 'button_pagination_active'} main__button_type_pagination main__button_type_visible-number-of-page`} onClick={(e) => {rememberPagiPage(i-1)}} key={i}>{i}</button>
            )
        }
        if(currentPage - 1 > 2) {
            paginationArray.unshift(<div className="main__dots"  key={-2} />)
            paginationArray.push(<div className="main__dots" key={-1}/>)
        }
        return(paginationArray)
    }

    return(
        <>  
            <Header />
            <div className="main">
                <section className="main__settings" id={"settings"}>
                    <div className="main__wrapper main__wrapper_type_description">
                        <img className="main__logo" src={ randomMainImage || logo} alt='Логотип' />
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
                                <li className='main__drop-down-item main__drop-down-item_type_side-dish' id={'side-dish'}>Закуски</li>
                                <li className='main__drop-down-item main__drop-down-item_type_drink' id={'drink'}>Напитки</li>
                            </ul>
                        </div>
                        <div className='main__wrapper main__wrapper_type_setting'>
                            <h4 className='main__title-h4'>Сложность приготовления:</h4>
                            <div className="main__wrapper main__wrapper_type_complexity">
                                <label className='button main__button main__button_type_radio' htmlFor='any'>
                                    <input className="main__button_type_radio-main" type="radio" id='any' value='Any' checked={checkedValue==="Any" ? true : false} onChange={changeCheckedValue} />
                                    <span className="main__button_span">Любая</span>
                                </label>
                                <label className='button main__button main__button_type_radio' htmlFor='easy'>
                                    <input className="main__button_type_radio-main" type="radio" id='easy' value='Easy' checked={checkedValue==="Easy" ? true : false} onChange={changeCheckedValue} />
                                    <span className="main__button_span">Низкая</span>
                                </label>
                                <label className='button main__button main__button_type_radio' htmlFor='medium'>
                                    <input className="main__button_type_radio-main" type="radio" id='medium' value='Medium' checked={checkedValue==="Medium" ? true : false} onChange={changeCheckedValue}/>
                                    <span className="main__button_span">Средняя</span>
                                </label>
                                <label className='button button_inactive main__button main__button_type_radio' htmlFor='high'>
                                    <input className="main__button_type_radio-main" type="radio" id='high' value='High' checked={checkedValue==="High" ? true : false} onChange={changeCheckedValue}/>
                                    <span className="main__button_span">Высокая</span>
                                </label>
                            </div>
                        </div>
                        <button className={`button ${ isButtonInactive && 'button_inactive'} main__button main__button_type_resert`} onClick={refreshFilter} type='button'>Сбросить все фильтры</button>
                    </div>

                    <div className='main__wrapper main__wrapper_type_luck'>
                        <h5 className='main__title-h5'>А еще можно попробовать на вкус удачу</h5>
                        <Link className='button main__button main__button_type_luck' to='/dish' state={recipes[Math.floor(Math.random() * recipes.length)]}>Мне повезёт!</Link>
                    </div>
                </section>

                <section className="main__recipes" id={"recipes"}>
                    <h2 className="main__title-h2">Найденные рецепты<span className="main__number-recipes">{recipes.length}</span></h2>
                    <Cards 
                        recipes={recipes}
                        page={page}/>
                    <div className="main__pagination">
                        <button className={`button main__button main__button_type_pagination main__button_type_prev  ${page ===  0 && "button_inactive"}`} onClick={(e) => {rememberPagiPage(page-1)}}></button>
                        <button className={`button ${page === 0 && 'button_pagination_active'} main__button main__button_type_pagination main__button_type_first-page`} onClick={(e) => {rememberPagiPage(0)}}>1</button>
                        {paginationDraw(0)}
                        <button className={`button main__button ${page === lastPageNumber - 1 && 'button_pagination_active'} main__button_type_pagination main__button_type_last-page`} onClick={(e) => {rememberPagiPage(lastPageNumber - 1)}}>{lastPageNumber}</button>
                        <button className={`button main__button main__button_type_pagination main__button_type_next ${page ===  lastPageNumber - 1 && "button_inactive"}`} onClick={(e) => {rememberPagiPage(page+1)}}></button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Main;