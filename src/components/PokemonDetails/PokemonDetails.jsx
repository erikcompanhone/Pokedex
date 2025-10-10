import style from './PokemonDetails.module.css';
import { usePokemon } from '../../hooks/usePokemon';
import Loading from '../Loading/Loading';
import { useState } from 'react';

function PokemonDetails({ pokemonName }) {
    const { pokemon, pokemonDescription, evolutionChain, loading, error } = usePokemon(pokemonName);
    const [isShiny, setIsShiny] = useState(false);
    const [isPlayingCry, setIsPlayingCry] = useState(false);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className={style.error}>{error}</div>;
    }

    if (!pokemon || !pokemonDescription) {
        return null;
    }

    // Get the sprite based on shiny state
    const currentSprite = isShiny 
        ? pokemon?.sprites?.front_shiny 
        : pokemon?.sprites?.front_default;

    // Handle cry sound
    const playCry = () => {
        if (pokemon?.cries?.latest) {
            setIsPlayingCry(true);
            const audio = new Audio(pokemon.cries.latest);
            audio.play();
            audio.onended = () => setIsPlayingCry(false);
        }
    };

    return(
        <>
            <div className={style.firstContainer}>
                {/* Badges Section */}
                <div className={style.badgesContainer}>
                    {pokemonDescription?.generation?.name && (
                        <span className={style.generationBadge}>
                            {pokemonDescription.generation.name.replace('generation-', 'Gen ').toUpperCase()}
                        </span>
                    )}
                    {pokemonDescription?.is_legendary && (
                        <span className={`${style.specialBadge} ${style.legendary}`}>
                            ⭐ Legendary
                        </span>
                    )}
                    {pokemonDescription?.is_mythical && (
                        <span className={`${style.specialBadge} ${style.mythical}`}>
                            ✨ Mythical
                        </span>
                    )}
                </div>

                <div className={style.pokemonNumber}>#{pokemon?.id}</div>
                <div className={style.pokemonName}>
                    {pokemon?.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : 'Unknown'}
                </div>

                {/* Image with Shiny Toggle */}
                <div className={style.imageContainer}>
                    <img 
                        className={style.pokemonImage} 
                        src={currentSprite} 
                        alt={pokemon?.name || 'Pokemon'}
                    />
                    <button 
                        className={`${style.shinyToggle} ${isShiny ? style.active : ''}`}
                        onClick={() => setIsShiny(!isShiny)}
                        title={isShiny ? "Show Normal" : "Show Shiny"}
                    >
                        ✨ {isShiny ? 'Normal' : 'Shiny'}
                    </button>
                    {pokemon?.cries?.latest && (
                        <button 
                            className={`${style.cryButton} ${isPlayingCry ? style.playing : ''}`}
                            onClick={playCry}
                            disabled={isPlayingCry}
                            title="Play Cry"
                        >
                            🔊 {isPlayingCry ? 'Playing...' : 'Cry'}
                        </button>
                    )}
                </div>

                <div className={style.pokemonDescription}>
                    Description: {pokemonDescription?.flavor_text_entries?.find(entry => entry.language.name === 'en')?.flavor_text || 'No description available'}
                </div>

                {/* Additional Info Cards */}
                <div className={style.infoCards}>
                    {pokemon?.base_experience && (
                        <div className={style.infoCard}>
                            <span className={style.infoLabel}>Base XP</span>
                            <span className={style.infoValue}>{pokemon.base_experience}</span>
                        </div>
                    )}
                    {pokemonDescription?.color?.name && (
                        <div className={style.infoCard}>
                            <span className={style.infoLabel}>Color</span>
                            <span className={style.infoValue}>{pokemonDescription.color.name}</span>
                        </div>
                    )}
                    {pokemonDescription?.habitat?.name && (
                        <div className={style.infoCard}>
                            <span className={style.infoLabel}>Habitat</span>
                            <span className={style.infoValue}>{pokemonDescription.habitat.name}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className={style.secondContainer}>
                <div className={style.pokemonStats}>
                    <div className={style.stat}>
                        Health: {pokemon?.stats?.[0]?.base_stat || 0}
                    </div>
                    <div className={style.stat}>
                        Attack: {pokemon?.stats?.[1]?.base_stat || 0}
                    </div>
                    <div className={style.stat}>
                        Defense: {pokemon?.stats?.[2]?.base_stat || 0}
                    </div>
                    <div className={style.stat}>
                        Special-Attack: {pokemon?.stats?.[3]?.base_stat || 0}
                    </div>
                    <div className={style.stat}>
                        Special-Defense: {pokemon?.stats?.[4]?.base_stat || 0}
                    </div>
                    <div className={style.stat}>
                        Speed: {pokemon?.stats?.[5]?.base_stat || 0}
                    </div>
                </div>

                <div className={style.pokemonType}>
                    <div className={style.sectionTitle}>Types</div>
                        {pokemon?.types?.map((typeObj, index) => (   
                                <div key={index} className={style.typeContainer}>
                                    {typeObj?.type?.name} <img src={`/types/${typeObj?.type?.name}.svg`} alt={typeObj?.type?.name} />
                                </div>
                        ))}
                </div>

                <div className={style.physicalStats}>
                    <div className={style.sectionTitle}>Physical Stats</div>
                    <p className={style.pokemonHeight}>Height: {((pokemon?.height || 0) * 0.1).toFixed(1)} Meters</p>
                    <p className={style.pokemonWeight}>Weight: {((pokemon?.weight || 0) * 0.1).toFixed(1)} Kg</p>
                </div>
                
                <div className={style.pokemonAbilities}>
                    <div className={style.sectionTitle}>Abilities</div>
                    {pokemon?.abilities?.map((abilityObj, index) => (   
                                    <div key={index} className={style.pokemonAbility}>{abilityObj?.ability?.name}</div>
                        ))}
                </div>

                {/* Evolution Chain */}
                {evolutionChain && evolutionChain.length > 1 && (
                    <div className={style.evolutionSection}>
                        <div className={style.sectionTitle}>Evolution Chain</div>
                        <div className={style.evolutionChain}>
                            {evolutionChain.map((evo, index) => (
                                <div key={index} className={style.evolutionItem}>
                                    <button
                                        className={`${style.evolutionName} ${evo.name === pokemon?.name ? style.currentEvolution : ''}`}
                                        onClick={() => {
                                            if (evo.name !== pokemon?.name) {
                                                window.location.hash = `#${evo.name}`;
                                                // Trigger parent component to update
                                                const event = new CustomEvent('pokemon-change', { detail: evo.name });
                                                window.dispatchEvent(event);
                                            }
                                        }}
                                        disabled={evo.name === pokemon?.name}
                                    >
                                        {evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}
                                    </button>
                                    {index < evolutionChain.length - 1 && (
                                        <span className={style.evolutionArrow}>→</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default PokemonDetails;
