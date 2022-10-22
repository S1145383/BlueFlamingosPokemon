import React, {useEffect, useState} from 'react';
import './App.css';

interface iPokemon {
    name: string,
    url: string
}

function App() {

    let [pagination, setPagination] = useState<number>(0);
    let [pokemonList, setPokemonList] = useState<iPokemon[]>([]);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pagination}`).then(result => {
                result.json().then(obj => {
                    setPokemonList(obj.results)
                })
            }
        )
    }, [pagination])

    let onNextButtonClicked = () => {
        setPagination(pagination + 20);
    }

    let onPreviousButtonClicked = () => {
        if (pagination - 20 >= 0) {
            setPagination(pagination - 20);
        }
    }

    return (
        <div className="flex w-full">
            <div className="m-auto mt-8 p-8 shadow-md bg-gray-100">
                <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
                    Pokemonnen
                </h1>

                <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
                    {pokemonList.map((item, index) => {
                        return <li key={index} className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg hover:bg-blue-700 hover:text-white">{item.name}</li>;
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
                    Pagina {pagination / 20 + 1}
                </p>

            </div>
        </div>
    );
}

export default App;
