import { useEffect } from 'react'
import Wrapper from '../sections/Wrapper';
import { useAppDispatch } from '../app/hooks';
import { getInitialPokemonData } from '../app/reducers/getInitalPokemonData';
import { useSelector } from 'react-redux';
import { getPokemonsData } from '../app/reducers/getPokemonsData';
import PokemonCardGird from '../components/PokemonCardGird';
import { debounce } from '../utils/Debounce';

function Search() {
  const dispatch = useAppDispatch();
  const { allPokemon, randomPokemons } = useSelector(({ pokemon }) => pokemon);

  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch])

  useEffect(() => {
    if (allPokemon) {
      const clonePokemons = [...allPokemon];
      const randomPokemonId = clonePokemons.sort(() => Math.random() - Math.random()).slice(0, 20);
      dispatch(getPokemonsData(randomPokemonId));
    }
  }, [allPokemon, dispatch])

  const handleChange = debounce((value: string) => getPokemon(value), 300);

  const getPokemon = async (value: string) => {
    if (value.length) {
      const pokemons = allPokemon.filter((pokemon:any) =>
        pokemon.name.includes(value.toLowerCase())
      );
      dispatch(getPokemonsData(pokemons));
    } else {
      const clonedPokemons = [...allPokemon];
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      dispatch(getPokemonsData(randomPokemonsId));
    }
  };

  return (
    <>
      <div className='search'>
        <input 
        className='pokemon-searchbar' 
        placeholder='Search Pokemon'
        onChange={(e) => handleChange(e.target.value)} />
        <PokemonCardGird pokemons={randomPokemons!} />
      </div>
    </>
  )
}

export default Wrapper(Search);