'use client';
import Image from "next/image";
import { useState } from "react";
import styles from "./PageContent.module.css";
import ResponseSection from "../ResponseSection/ResponseSection";
import ByPokemon from "../ByPokemon/ByPokemon";
import ByAbility from "../ByAbility/ByAbility";

export default function PageContent({pokemons , abilities}) {
    const [searchValue, setSearchValue] = useState('');
    const [searchType, setSearchType] = useState('pokemon');
    const [responseData, setResponseData] = useState(null);
    const [errorMmessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchValue.trim()) {
            setErrorMessage('You can’t catch ‘em all if you enter nothing, silly!')
            return;
        }
        const req = await fetch(`/api/${searchType}/${searchValue}`);
        const res = await req.json();
        if (res.message) {
            setErrorMessage(res.message)
            return
        }
        setResponseData(res);
    };

    const handleClear = () => {
        setSearchValue('')
        setSearchType('')
        setErrorMessage('')
        setResponseData(null)
    }

    return (
        <div className={styles.whole}>
            <a href="https://github.com/mLuisKm">
                <Image
                    className={styles.git}
                    src="/github.png"
                    alt=""
                    width={180}
                    height={38}
                    priority
                />
            </a>
            <fieldset className={styles.formContainer}>
                <legend className="formContainerTitle">
                    <Image
                        className={styles.pokeTitle}
                        src="/poke.png"
                        alt=""
                        width={180}
                        height={38}
                        priority
                    />
                </legend>
                <div id="form-card" className={styles.formCard}>
                    <div id="card-header" className={styles.cardHeader}>
                        <h1>Pokemon finder</h1>
                        <h2>Search for Pokémon details or discover which Pokémon can use a specific ability</h2>
                    </div>
                    <div id="card-body" className={styles.cardBody}>
                        <form id="form-pokemon" className={styles.formPokemon} onSubmit={handleSubmit}>
                            <div id="form-fields" className={styles.formFields}>
                                <div id="search-value" className={styles.searchValue}>
                                    <label htmlFor="pokemon-input">Search</label>
                                    <input  type="text"
                                            list="search-list" 
                                            id="pokemon-input" 
                                            className={styles.pokemonInput} 
                                            name="pokemon-input"
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}/>
                                    {pokemons && abilities && searchType=='pokemon' ? 
                                    <datalist id="search-list">
                                        {pokemons.map((pokeInfo, index) => (
                                            <option key={index} value={pokeInfo.name}></option>
                                        ))}
                                    </datalist> : 
                                    <datalist id="search-list">
                                        {abilities.map((abInfo, index) => (
                                            <option key={index} value={abInfo.name}></option>
                                        ))}
                                    </datalist>}
                                </div>
                                <div id="search-type" className={styles.searchType}>
                                    <label htmlFor="pokemon-search-type">Search type</label>
                                    <select name="pokemon-search-type" 
                                            id="pokemon-search-type" 
                                            className={styles.pokemonSearchType}
                                            value={searchType}
                                            onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="pokemon">By pokemon</option>
                                        <option value="ability">By ability</option>
                                    </select>
                                </div>
                            </div>
                            <h2 className={styles.errorMessage}>{errorMmessage}</h2>
                            <div id="form-buttons" className={styles.formButtons}>
                                <button id="cleaning-button" type="button" className={styles.clean} onClick={handleClear}>Clear fields</button>
                                <input type="submit" value="Search" id="buscar" className={styles.search}/>
                            </div>
                        </form>
                    </div>
                </div>
            </fieldset>
            {responseData && !responseData.message && !responseData.response && searchType=='pokemon' && 
                <ResponseSection>
                    <ByPokemon {...responseData}>
                    </ByPokemon>
                </ResponseSection>
            }
            {responseData && !responseData.message && responseData.response && searchType=='ability' && 
                <ResponseSection>
                    <ByAbility {...responseData}>
                    </ByAbility>
                </ResponseSection>
            }
        </div>
    )
}