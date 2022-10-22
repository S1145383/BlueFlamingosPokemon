import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

interface iPokemon {
    abilities: [],
    base_experience: number,
    forms: [],
    height: number,
    held_items: [],
    id: number,
    is_default: boolean,
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
    stats: [],
    types: []
}

function Pokemon() {
    const params = useParams();

    const pokemonId = params.pokemonId;

    const [currentPokemon, setCurrentPokemon] = useState<iPokemon>();

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`).then(result => {
            result.json().then(obj => {
                setCurrentPokemon(obj);
            })
        })
    }, [pokemonId])

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
						Wat een mooi ding!!
					</p>

				</div>



                {/*<div className="m-4">*/}
                {/*    <button onClick={onPreviousButtonClicked}*/}
                {/*            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-8">Previous*/}
                {/*    </button>*/}
                {/*    <button onClick={onNextButtonClicked}*/}
                {/*            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-8">Next*/}
                {/*    </button>*/}
                {/*</div>*/}
                {/*<p>*/}
                {/*    Pagina {pagination / paginationAmount + 1}*/}
                {/*</p>*/}

			</div>
                : <div>Wacht!</div>}
        </div>
    )

}

export default Pokemon;