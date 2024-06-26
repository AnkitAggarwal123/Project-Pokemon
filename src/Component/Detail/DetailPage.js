import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import "./Detail.css"




function DetailPage(){

  const {id} = useParams();
  const [detailsData , setDetailsData] = useState();
  const PokemonDetails = async() => {
    try{
      let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      let convertedData = await data.json();
      setDetailsData({
        id : convertedData.id,
        name : convertedData.name,
        height : convertedData.height,
        weight : convertedData.weight,
        type : convertedData.types,
        stats : convertedData.stats,
        ability : convertedData.abilities,
        moves : (convertedData.moves.length > 9) ? convertedData.moves.splice(0,9) : convertedData.moves,
        image : convertedData.sprites.other
        ? convertedData.sprites.other.dream_world.front_default
        : convertedData.sprites.front_shiny,
      })
    }
    catch(error){
      alert(error.message);
    }

  }
  useEffect(() => {
    PokemonDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [])

  console.log(detailsData);
  let type = detailsData?.type.map((element) => element.type.name);
  let ability = detailsData?.ability.map((element) => element.ability.name);
  let stats = detailsData?.stats.map((element) => element);
  let moves = detailsData?.moves.map((element) => element.move.name);

    return (
        <div className="main">
            <div className="left" >
                <img src = {detailsData?.image}/>
                <h2>{detailsData?.name}</h2>
            </div>
            <div className="right">
                <div>Height {detailsData?.height}</div>
                <div>Weight {detailsData?.weight}</div>
                <div>Abilities {ability?.map((element , index) => <li key={index}>{element}</li>)}</div>
                <div>Moves {moves?.map((element , index) => <li key={index}>{element}</li>)}</div>
 

            </div>
        </div>
    )
}

export default DetailPage