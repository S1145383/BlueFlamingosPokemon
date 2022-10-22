import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";


interface iPokemonListItem {
    name: string,
    url: string
}

function PokemonList() {

    let [pagination, setPagination] = useState<number>(0);
    let paginationAmount = 15;
    const navigate = useNavigate();

    let [pokemonList, setPokemonList] = useState<iPokemonListItem[]>([]);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pagination}&limit=${paginationAmount}`).then(result => {
                result.json().then(obj => {
                    setPokemonList(obj.results)
                })
            }
        )
    }, [pagination, paginationAmount])

    let onNextButtonClicked = () => {
        setPagination(pagination + paginationAmount);
    }

    let onPreviousButtonClicked = () => {
        if (pagination - paginationAmount >= 0) {
            setPagination(pagination - paginationAmount);
        }
    }

    let onPokemonRecordClicked = (id : number) => {
        navigate("/pokemon/" + (id + 1) )
    }

    return (
        <div className="flex w-full">
            <div className="m-auto mt-8 p-8 shadow-md bg-gray-100">
                <div className="mb-2">
                    <h1 className="font-medium leading-tight text-5xl mt-0 text-blue-600">
                        Pokemonnen
                    </h1>
                    <p className="text-sm font-semibold">
                        Klik op een pokemon om zijn details te zien!
                    </p>
                </div>
                <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
                    {pokemonList.map((item, index) => {
                        return <li key={index} onClick={() => { onPokemonRecordClicked(index + pagination)}}
                                   className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg hover:bg-blue-700 hover:text-white capitalize">{item.name}
                        </li>;
                    })}
                </ul>


                <div className="m-4">
                    <button onClick={onPreviousButtonClicked}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-8">Previous
                    </button>
                    <button onClick={onNextButtonClicked}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-8">Next
                    </button>
                </div>
                <p>
                    Pagina {pagination / paginationAmount + 1}
                </p>

            </div>
        </div>
    )

}

export default PokemonList;