import React from "react";
import "./SearchPage.css";
import { useEffect, useState } from "react";
// import { myContext } from "../Context/context";
import LoadingPage from "../Loading/LoadingPage";
import axios from "axios";

function SearchPage(props){

    const [searchValue, setSearchValue] = useState("")
    const [abilitesValue, setAbilitesValue] = useState([])
    const [genderValue, setGenderValue] = useState([])
    const [groupValue, setGroupValue] = useState([])
    const [habitatValue, setHabitatValue] = useState([])
    const [abiliteChangeValue, setAbiliteChangeValue] = useState("")
    const [groupChangeValue, setGroupChangeValue] = useState("")

    function change(e){
        setSearchValue(e.target.value)
       
    }

    function abilitesChange(event){
        const selectedValue = event.target.value;
        
        setAbiliteChangeValue(selectedValue);
      };
      console.log(abiliteChangeValue)

    // function groupChange(event){
    //     const selectedValue = event.target.value;
    //     setGroupChangeValue(selectedValue);
    // };

    async function abilites(){
        const abilitesData = await axios.get("https://pokeapi.co/api/v2/ability?limit=367")
        const abilitesDataResult = abilitesData.data.results
        setAbilitesValue(abilitesDataResult)
        abilitesValue.sort()
    }

    // async function gender(){
    //     const genderData = await axios.get("https://pokeapi.co/api/v2/gender")
    //     setGenderValue(genderData.data.results)

    // }

    // async function group(){
    //     const groupData = await axios.get("https://pokeapi.co/api/v2/egg-group")
    //     setGroupValue(groupData.data.results)
    // }

    // async function habitat(){
    //     const habitatData = await axios.get("https://pokeapi.co/api/v2/pokemon-habitat")
    //     setHabitatValue(habitatData.data.results)
    // }

    useEffect(()=>{
        abilites()
    },[])


    
    return(
        <div>
            <div class="content-wrapper">
        <h1>pokemon</h1>
        <main>

            <form id="pokemon-search-form">
                <input id="pokemon-search-input" onChange={(e)=> change(e)} type="text" name="" placeholder="Enter Pokémon Name" />
                <button id="button-search">Seach</button>
            </form>

            <form id="pokemon-type-filter">
                <select name="type" class="type-filter" onChange={abilitesChange}>
                <option value = "">abilites</option>
                {
                    abilitesValue.map((abilite,i) =>(
                        <option key={i}>{abilite.name}</option>
                    ))
                }
                </select>
                {/* <select class="type-filter">
                    <option>gender</option>
                    {
                        genderValue.map((gen, i)=>(
                            <option key={i}>{gen.name}</option>
                        ))
                    }       
                </select>
                <select class="type-filter" onChange={groupChange}>
                   <option>group</option>
                   {
                        groupValue.map((group, i)=>(
                            <option key={i}>{group.name}</option>
                        ))
                    } 
                </select>
                <select class="type-filter">
                   <option>habitat</option>
                   {
                       habitatValue.map((habitates, i)=>(
                        <option key={i}>{habitates.name}</option>

                       ))
                   }
                </select>                               */}
            </form>

        </main>
    </div>
    <LoadingPage data = {searchValue} abiliteData = {abiliteChangeValue}/>
        </div>
    )
}

export default SearchPage;
