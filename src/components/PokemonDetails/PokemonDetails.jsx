import style from './PokemonDetails.module.css';
import { usePokemon } from '../../hooks/usePokemon';
import Loading from '../Loading/Loading';

function PokemonDetails({ pokemonName }) {
    const { pokemon, pokemonDescription, loading, error } = usePokemon(pokemonName);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className={style.error}>{error}</div>;
    }

    if (!pokemon || !pokemonDescription) {
        return null;
    }

    return(
        <>
            <div className={style.firstContainer}>
                <div className={style.pokemonNumber}>#{pokemon?.id}</div>
                <div className={style.pokemonName}>
                    {pokemon?.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : 'Unknown'}
                </div>
                <img className={style.pokemonImage} src={pokemon?.sprites?.front_default} alt={pokemon?.name || 'Pokemon'}/>
                <div className={style.pokemonDescription}>
                    Description: {pokemonDescription?.flavor_text_entries?.find(entry => entry.language.name === 'en')?.flavor_text || 'No description available'}
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
            </div>
        </>
    );
}

export default PokemonDetails;
