import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

interface iPokemonListItem {
    name: string,
    url: string
}

function PokemonList() {

    let [currentPagination, setCurrentPagination] = useState<number>(0);
    let [totalItems, setTotalItems] = useState<number>(0);

    let [paginationAmount, setPaginationAmount] = useState<number>(15)

    let pagesAmount = Math.ceil(totalItems / paginationAmount);

    const navigate = useNavigate();

    let [pokemonList, setPokemonList] = useState<iPokemonListItem[]>([]);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${currentPagination}&limit=${paginationAmount}`).then(result => {
                result.json().then(obj => {
                    setPokemonList(obj.results)
                    setTotalItems(obj.count)
                })
            }
        )
    }, [currentPagination, paginationAmount])

    let onNextButtonClicked = () => {
        if(currentPagination + paginationAmount <= totalItems){
            setCurrentPagination(currentPagination + paginationAmount);
        }
    }

    let onPreviousButtonClicked = () => {
        if (currentPagination - paginationAmount >= 0) {
            setCurrentPagination(currentPagination - paginationAmount);
        }
    }

    let onPokemonRecordClicked = (id : number) => {
        navigate("/pokemon/" + (id + 1) )
    }

    let onPaginationSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPaginationAmount(parseInt(event.target.value));
    }

    return (
        <div className="flex w-screen">
            <div className="m-auto mt-8 lg:p-8 shadow-md bg-gray-100">
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
                        return <li key={index} onClick={() => { onPokemonRecordClicked(index + currentPagination)}}
                                   className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg hover:bg-blue-700 hover:text-white capitalize">{item.name}
                        </li>;
                    })}
                </ul>


                <div className="m-4 flex justify-between">
                    <button onClick={onPreviousButtonClicked}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-24 rounded">Vorige
                    </button>
                    <button onClick={onNextButtonClicked}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-24 rounded">Volgende
                    </button>
                </div>
                <div className="flex justify-between">
                    <p>
                        Pagina {currentPagination / paginationAmount + 1} van {pagesAmount}
                    </p>
                    <div className="flex">
                        <p>
                            Aantal per pagina:
                        </p>
                        <select onChange={onPaginationSelected} defaultValue={15}>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={40}>40</option>
                        </select>
                    </div>

                </div>


            </div>
        </div>
    )

}

export default PokemonList;