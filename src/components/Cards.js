import Card from "./Card";

function Cards(props) {
    
    const recipes = JSON.parse(localStorage.getItem('recipes')).recipes;

    function cardDraw(page){
        let cardsArray = [];
        for(let i = (page * 6); i < (page * 6 + 6); i++){
            let item = recipes[i];
            cardsArray.push(<Card
                key={item.id}
                allData={item}
                />)
        }
        return(cardsArray)
    }

    return(
        <div className="cards">
        {
            cardDraw(props.page)
        }
        </div>
    )
}
export default Cards;