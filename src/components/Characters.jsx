import { useState, useReducer, useMemo, useRef, useCallback} from 'react'

import { Search } from './Search'
import { useCharacters } from '../hooks/useCharacter'
import './styles.css'

const initialState = {
  favorites: []
}

const API = 'https://rickandmortyapi.com/api/character'

const favoriteReducer = (state, action) => {
  switch(action.type){
    case 'ADD_TO_FOVORITE':
      return{
        ...state,
        favorites:[...state.favorites, action.payload]
      };
    default:
      return state;
  }
}

const Characters = () => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null)

  const characters = useCharacters(API)

  const handleClick = favorite =>{
    dispatch({type: 'ADD_TO_FOVORITE', payload: favorite})
  }

  //USECALLBACK
  // const handleSearch = () =>{
  //   setSearch(searchInput.current.value)
  // }
  const handleSearch = useCallback(()=>{
    setSearch(searchInput.current.value)
  }, [])


  // const filteredUsers = characters.filter((user)=>{
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // })
  const filteredUsers = useMemo(()=>
    characters.filter((user)=>{
      return user.name.toLowerCase().includes(search.toLowerCase());
    }),[characters, search]
  )

  return (
    <div className='characters'>

      <h2>Favorites</h2>
      <article className='favorites'>
        {
          favorites.favorites.map(favorite=>(
            <div 
              className='favorites__card'
              key={favorite.id}>
                <img src={favorite.image} alt={favorite.name} />
                <p>{favorite.name}</p>
            </div>
          ))
        }
      </article>
      

      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

      <section className='container__characters'>
        {filteredUsers.map(character => (
          <article className='characters__card' key={character.id}>
            <img className='characters__image' src={character.image} alt={character.name} />
            <h2 className='characters__name'>{character.name}</h2>
            <p className='characters__status'>Status: {character.status}</p>
            <p className='characters__type'>Species: {character.species} {character.type}</p>
            <button 
              className='characters__button'
              type='button' 
              onClick={() => handleClick(character)}
            >❤️</button>
          </article>
          
        ))}
      </section>
    </div>
  )
}

export {Characters}