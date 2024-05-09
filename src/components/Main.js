import React, { useEffect, useState } from "react";
import logo from '../image/logo.png'
import Cards from "./Cards";
import Header from "./Header";
import {Link} from "react-router-dom";

function Main(){

    const cashRecipes = JSON.parse(localStorage.getItem('recipes')).recipes;
    const [page, setPage] = useState(0);
    const [isSecondMenuOpen, setIsSecondMenuOpen] = useState(false);
    const [isFirstMenuOpen, setIsFirstMenuOpen] = useState(false);
    const [searchByDifficulty, setSearchByDifuclt] = useState(sessionStorage.getItem('searchByDifficulty') || 'Any');
    const [searchByMeal, setSearchByMeal] = useState(sessionStorage.getItem('searchByMeal') || 'All types');
    const [searchByCountry, setSearchByCountry] = useState(sessionStorage.getItem('searchByCountry') || 'All country');
    const [recipes, setRecipes] = useState(cashRecipes || {});
    const [randomMainImage, setRandomMainImage] = useState('');
    let lastPageNumber = Math.ceil(recipes.length/6);
    let isResetButtonInactive = (searchByDifficulty === 'Any' && searchByMeal === 'All types' && searchByCountry==="All country") ? true : false;

    let mealTypesArray = [];
    let countryTypesArray = [];

    cashRecipes.forEach((recipe) => {
        countryTypesArray.push(recipe.cuisine)
        recipe.mealType.forEach(
            (mealType) => mealTypesArray.push(mealType)
        )
    });
    countryTypesArray = [...new Set(countryTypesArray)];
    mealTypesArray = [ ...new Set(mealTypesArray)];

    function changeCheckedValue(event){
        setSearchByDifuclt(event.target.value);
    }

    function changeSecondMenuState(event){
        event.stopPropagation();
        setIsSecondMenuOpen(!isSecondMenuOpen);
        setIsFirstMenuOpen(false);
    }

    function changeFirstMenuState(event){
        event.stopPropagation();
        setIsFirstMenuOpen(!isFirstMenuOpen);
        setIsSecondMenuOpen(false);
    }

    useEffect(()=>{
        sessionStorage.setItem('searchByDifficulty', searchByDifficulty);
        sessionStorage.setItem('searchByMeal', searchByMeal);
        sessionStorage.setItem('searchByCountry', searchByCountry);
        if(isResetButtonInactive) {
            setRecipes(cashRecipes)
            return
        }
        let filteredRecipes = cashRecipes;
        if(searchByDifficulty !=='Any'){
            filteredRecipes = filteredRecipes.filter((recipe) =>  recipe.difficulty === searchByDifficulty )
        }
        if(searchByMeal !=='All types'){
            filteredRecipes = filteredRecipes.filter((recipe) =>  recipe.mealType.includes(searchByMeal))
        }
        if(searchByCountry !=='All country'){
            filteredRecipes = filteredRecipes.filter((recipe) =>  recipe.cuisine === searchByCountry)
        }
        setRecipes(filteredRecipes);
        setPage(0);
        sessionStorage.setItem('page', page);
    }, [searchByDifficulty, searchByMeal, searchByCountry])

    useEffect(() => {
        if(recipes.length <= 0){
            return
        }
        setRandomMainImage(recipes[Math.floor(Math.random() * recipes.length)].image)
    },[recipes])

    useEffect(() => {
        setPage(parseInt(sessionStorage.getItem('page')) || 0);
    },[])

    function refreshFilter(){
        setSearchByDifuclt('Any');
        setSearchByMeal('All types');
        setSearchByCountry('All country');
        setIsFirstMenuOpen(false);
        setIsSecondMenuOpen(false);
    }

    function rememberPagiPage(page){
        setPage(page);
        sessionStorage.setItem('page', page);
    }

    function rememberSearchByMeal(event){
        setSearchByMeal(event.target.id);
    }

    function rememberSearchByCountry(event){
        setSearchByCountry(event.target.id);
    }

    function mealTypesDraw(){
        let mealArray = [];
        if(searchByMeal !== 'All types') mealArray.push(<li className='main__drop-down-item main__drop-down-item_type_breakfast' key={'All types'} onClick={rememberSearchByMeal} id={'All types'}>All types</li>)
        for(let i = 0; i < mealTypesArray.length; i++){
            mealArray.push(<li className='main__drop-down-item main__drop-down-item_type_breakfast' key={mealTypesArray[i]} onClick={rememberSearchByMeal} id={mealTypesArray[i]}>{mealTypesArray[i]}</li>)
        }
        return(mealArray)
    }

    function countryDraw(){
        let countryArray = [];
        if(searchByCountry !== 'All country') countryArray.push(<li className='main__drop-down-item main__drop-down-item_type_breakfast' key={'All country'} onClick={rememberSearchByCountry} id={'All country'}>All country</li>)
        for(let i = 0; i < countryTypesArray.length; i++){
            countryArray.push(<li className='main__drop-down-item main__drop-down-item_type_breakfast' key={countryTypesArray[i]} onClick={rememberSearchByCountry} id={countryTypesArray[i]}>{countryTypesArray[i]}</li>)
        }
        return(countryArray)
    }

    function paginationDraw(currentPage){
        let paginationArray = [];
        console.log('lastPage:'+lastPageNumber)
        // console.log(currentPage);
        let startPage;
        currentPage <= 2 ? startPage = 2 : startPage = currentPage - 1;
        let endPage;
        startPage + 4 >= (lastPageNumber - 1) ? endPage = lastPageNumber - 1 : endPage = startPage + 4;
        console.log('startPage'+startPage)
        if (startPage > lastPageNumber - 4 && lastPageNumber - 4 > 2) startPage = lastPageNumber - 4;
        if(lastPageNumber < 8){
            startPage = 2;
        }
        for(let i = startPage; i <= endPage; i++){
            paginationArray.push(
            <button className={`button main__button ${page === i-1 && 'button_pagination_active'} main__button_type_pagination main__button_type_visible-number-of-page`} onClick={(e) => {rememberPagiPage(i-1)}} key={i}>{i}</button>
            )
        }

        // if(paginationArray.length < 5){
        //     paginationArray.unshift(
        //         <button className={`button main__button ${page === startPage-2 && 'button_pagination_active'} main__button_type_pagination main__button_type_visible-number-of-page`} onClick={(e) => {rememberPagiPage(startPage-2)}} key={startPage-1}>{startPage-1}</button>
        //         )
        // }

        // if((currentPage - 1 > 2) && (currentPage < lastPageNumber - 3)) {
        //     paginationArray.unshift(<div className="main__dots main__dots_type_first"  key={-2} />)
        //     paginationArray.push(<div className="main__dots main__dots_type_last" key={-1}/>)
        // } else 
        
        if (startPage > 2) {
            paginationArray.unshift(<div className="main__dots main__dots_type_first"  key={-2} />)
        }
        if(!(endPage > lastPageNumber-2) ) {
            paginationArray.push(<div className="main__dots main__dots_type_last" key={-1}/>)
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
                            <button className={`button main__button main__button_type_drop-down-menu main__button_type_kitchen ${isFirstMenuOpen && 'main__button_type_drop-down-menu-open'}`} onClick={changeFirstMenuState} >{searchByCountry}
                                <ul className={`main__drop-down-menu main__drop-down-menu_type_kitchen ${isFirstMenuOpen && 'main__drop-down-menu_open'}`}>
                                    {countryDraw()}
                                </ul>
                            </button>
                        </div>
                        <div className='main__wrapper main__wrapper_type_setting'>
                            <h4 className='main__title-h4'>Тип блюда:</h4>
                            <button className={`button main__button main__button_type_drop-down-menu main__button_type_dish ${isSecondMenuOpen && 'main__button_type_drop-down-menu-open'}`} onClick={changeSecondMenuState}>{searchByMeal}
                                <ul className={`main__drop-down-menu main__drop-down-menu_type_dish ${isSecondMenuOpen && 'main__drop-down-menu_open'}`}>
                                    {mealTypesDraw()}
                                </ul>
                            </button>
                        </div>
                        <div className='main__wrapper main__wrapper_type_setting'>
                            <h4 className='main__title-h4'>Сложность приготовления:</h4>
                            <div className="main__wrapper main__wrapper_type_complexity">
                                <label className='button main__button main__button_type_radio' htmlFor='any'>
                                    <input className="main__button_type_radio-main" type="radio" id='any' value='Any' checked={searchByDifficulty==="Any" ? true : false} onChange={changeCheckedValue} />
                                    <span className="main__button_span">Любая</span>
                                </label>
                                <label className='button main__button main__button_type_radio' htmlFor='easy'>
                                    <input className="main__button_type_radio-main" type="radio" id='easy' value='Easy' checked={searchByDifficulty==="Easy" ? true : false} onChange={changeCheckedValue} />
                                    <span className="main__button_span">Низкая</span>
                                </label>
                                <label className='button main__button main__button_type_radio' htmlFor='medium'>
                                    <input className="main__button_type_radio-main" type="radio" id='medium' value='Medium' checked={searchByDifficulty==="Medium" ? true : false} onChange={changeCheckedValue}/>
                                    <span className="main__button_span">Средняя</span>
                                </label>
                                <label className='button button_inactive main__button main__button_type_radio' htmlFor='high'>
                                    <input className="main__button_type_radio-main" type="radio" id='high' value='High' checked={searchByDifficulty==="High" ? true : false} onChange={changeCheckedValue}/>
                                    <span className="main__button_span">Высокая</span>
                                </label>
                            </div>
                        </div>
                        <button className={`button ${ isResetButtonInactive && 'button_inactive'} main__button main__button_type_resert`} onClick={refreshFilter} type='button'>Сбросить все фильтры</button>
                    </div>

                    <div className='main__wrapper main__wrapper_type_luck'>
                        <h5 className='main__title-h5'>А еще можно попробовать на вкус удачу</h5>
                        <Link className={`button ${recipes.length <= 0 && 'button_inactive'} main__button main__button_type_luck`} to='/dish' state={recipes[Math.floor(Math.random() * recipes.length)]}>Мне повезёт!</Link>
                    </div>
                </section>

                <section className="main__recipes" id={"recipes"}>
                    <div className="main__header">
                        <h2 className="main__title-h2">Найденные рецепты</h2>
                        <p className="main__number-recipes">{recipes.length}</p>
                    </div>
                    <Cards 
                        recipes={recipes}
                        page={page}/>
                    <div className="main__pagination">
                        <button className={`button main__button main__button_type_pagination main__button_type_prev  ${page ===  0 && "button_inactive"}`} onClick={(e) => {rememberPagiPage(page-1)}}></button>
                        <button className={`button ${page === 0 && 'button_pagination_active'} main__button main__button_type_pagination main__button_type_first-page`} onClick={(e) => {rememberPagiPage(0)}}>1</button>
                        {paginationDraw(page)}
                        <button className={`button main__button ${lastPageNumber < 2 && 'button_none'} ${page === lastPageNumber - 1 && 'button_pagination_active'} main__button_type_pagination main__button_type_last-page`} onClick={(e) => {rememberPagiPage(lastPageNumber - 1)}}>{lastPageNumber}</button>
                        <button className={`button main__button main__button_type_pagination main__button_type_next ${((page ===  lastPageNumber - 1) || (lastPageNumber <= 0)) && "button_inactive"}`} onClick={(e) => {rememberPagiPage(page+1)}}></button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Main;