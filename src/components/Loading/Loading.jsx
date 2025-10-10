import style from './Loading.module.css';

function Loading() {
  return (
    <div className={style.loadingContainer}>
      <div className={style.pokeball}>
        <div className={style.pokeballTop}></div>
        <div className={style.pokeballButton}></div>
        <div className={style.pokeballBottom}></div>
      </div>
      <p className={style.loadingText}>Loading Pokémon...</p>
    </div>
  );
}

export default Loading;
