import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import { getPokemonsData } from '../../app/reducers/getPokemonsData';
import PokemonCardGird from '../../components/PokemonCardGird';
import { genericPokemonType } from "../../utils/Types";

function Evolution() {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentPokemon, randomPokemons } = useSelector(({ pokemon }) => pokemon);

  useEffect(() => {
    const fetchData = async () => {
      const pokemons: genericPokemonType[] =
        currentPokemon?.evolution.map(({ pokemon }: { pokemon: genericPokemonType }) => pokemon);
      await dispatch(getPokemonsData(pokemons!));
      setIsLoaded(true);
    }
    fetchData();
  }, [dispatch, currentPokemon])

  return (
    <div className='page'>
      {isLoaded && <PokemonCardGird pokemons={randomPokemons} />}
    </div>
  )
}

export default Evolution