import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

interface iPokemon {
    id: number,
    abilities: [],
    base_experience: number,
    forms: [],
    height: number,
    weight: number,
    held_items: [],
    moves: [],
    name: string,
    order: number,
    past_types: [],
    species: {
        name: string
    },
    sprites: {
        back_default: string,
        back_female: string,
        back_shiny: string,
        back_shiny_female: string,
        front_default: string,
        front_female: string,
        front_shiny: string,
        front_shiny_female: string
    },
    stats: [
        {
            base_stat: number,
            effort: number,
            stat: {
                name: string
            }
        }
    ],
    types: []
}

function Pokemon() {
    const params = useParams();
    const pokemonId = params.pokemonId;
    const [currentPokemon, setCurrentPokemon] = useState<iPokemon>();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`).then(result => {
            result.json().then(obj => {
                setCurrentPokemon(obj);
            })
        })
    }, [pokemonId])

    let backButtonClicked = () => {
        navigate("/")
    }

    return (
        <div className="flex w-full">
            {currentPokemon !== undefined ?
			<div className="m-auto mt-8 p-8 shadow-md bg-gray-100">
				<div className="mb-2">
                    <div className="flex">
                        <h1 className="font-medium leading-tight text-5xl mt-0 text-blue-600 align-middle capitalize">
                            {currentPokemon.name}
                        </h1>
                        <img src={currentPokemon?.sprites.front_default} alt={""} width={64} height={64} >
                        </img>
                    </div>
					<p className="text-sm font-semibold">
						Wat een mooi ding!
					</p>
				</div>


                <div className="mb2 font-bold">
                    Statistieken:
                </div>

                {currentPokemon.stats.map((obj, index) => {
                    return <div className="flex my-2 justify-between" key={index}><p className="font-semibold mr-1 capitalize">{obj.stat.name}:</p>  <p>{obj.base_stat}</p></div>
                })}

                <div className="flex my-2 justify-between"><p className="font-semibold mr-1">Base experience:</p> <p>{currentPokemon.base_experience}</p></div>
                <div className="flex my-2 justify-between"><p className="font-semibold mr-1">Height:</p> <p>{currentPokemon.height}</p></div>
                <div className="flex my-2 justify-between"><p className="font-semibold mr-1">Weight:</p> <p>{currentPokemon.weight}</p></div>

                <button onClick={backButtonClicked}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Terug
                </button>

			</div>
                : <div>Aan het laden...</div>}
        </div>
    )

}

export default Pokemon;