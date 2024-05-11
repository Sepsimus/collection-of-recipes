import Card from "./Card";

function Cards(props) {
    
    function cardDraw(page){
        let cardsArray = [];
        for(let i = (page * 6); i < (page * 6 + 6); i++){
            let item = props.recipes[i];
            if(item === undefined) return(cardsArray)
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