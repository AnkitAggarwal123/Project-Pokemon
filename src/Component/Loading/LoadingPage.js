import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./LoadingPage.css"
import { Link } from "react-router-dom";

const LoadingPage = (props) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [scroll, setScroll] = useState(10)
  const [filterData, setFilter] = useState([])
  const [allDataValue, setAllDataValue] = useState([])


  let namevalue = props.data
  // console.log(value);

  let abiliteValue = props.abiliteData;


  let groupData = props.groupData
  console.log(groupData)

  useEffect(()=>{
    if(abiliteValue == ""){
      setFilter(pokemonData)
    }else{
    const filterAbilities = allDataValue.filter((item) => {
      const data = item.abilities.some((e) => {
        return e.ability.name == abiliteValue
      });

      // const data2 = item.version_group_details.some((e) => {
      //   return e.version_group.name == groupData
      // });
      return data;
    })
    setFilter(filterAbilities)
  }
  },[abiliteValue, groupData])

  let groupValue = props.groupData
  console.log(groupValue)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${scroll}`
      );
      const results = response.data.results;
      const pokemonPromises = results.map(async (pokemon) => {
        const pokemonResponse = await axios.get(pokemon.url);
        return (
          pokemonResponse.data
        );
      });
      const pokemonData = await Promise.all(pokemonPromises);
      setPokemonData(pokemonData)
      setFilter(pokemonData)

      setScroll(prev => prev + 10);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const allData = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=500`
      );
      const results = response.data.results;
      const pokemonPromises = results.map(async (pokemon) => {
        const pokemonResponse = await axios.get(pokemon.url);
        return (
          pokemonResponse.data
        );
      });
      const pokemonData = await Promise.all(pokemonPromises);
      // setPokemonData(pokemonData)
      // setFilter(pokemonData)
      setAllDataValue(pokemonData)

      setScroll(prev => prev + 10);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
       fetchData();
       allData()
  }, []);



    return (
      <div className="main">
        <div className = "pokemonData">
  
  
            <InfiniteScroll
            dataLength={filterData.length}
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget={window} >
          {filterData.map((pokemon, index) => (
           <Link to={`/PokemonDetails/${pokemon.id}`} key={index}>
           <div className="pokemonCard" >
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
           </Link>
          ))}
          </InfiniteScroll>
  
  
        </div>
      
  
      </div>
    );


};

export default LoadingPage;


