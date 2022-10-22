import React from 'react';
import './App.css';
import PokemonList from "./Components/PokemonList";
import Pokemon from "./Components/Pokemon";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PokemonList/>} />
                <Route path="/pokemon/:pokemonId" element={<Pokemon/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
