import { MdOutlinePowerSettingsNew } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/FirebaseConfig';
import { setToast, setUserStatus, setPokemonTab } from '../app/slices/AppSlice';
import { pokemonTabs } from '../utils/Constants';
import { useLocation } from 'react-router-dom';

function Footer() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { currentPokemonTab } = useAppSelector(({ app }) => app);
  const handleLogout = () => {
    signOut(firebaseAuth);
    dispatch(setUserStatus(undefined));
    dispatch(setToast('Logged out successfully from Firebase'));
  }

  const routes = [
    {
      name: pokemonTabs.description,
      value: "Description",
    },
    {
      name: pokemonTabs.evolution,
      value: "Evolution",
    },
    {
      name: pokemonTabs.locations,
      value: "Catching",
    },
    {
      name: pokemonTabs.moves,
      value: "Capable Moves",
    },
  ];

  return (
    <footer>
      <div className="block"></div>
      <div className="data">
        {
          location.pathname.includes('/pokemon') &&
          (
            <ul>
              {
                routes.map((route) => {
                  return (
                    <li
                      key={route.name}
                      className={`${currentPokemonTab === route.name ? 'active' : ''}`}
                      onClick={() => {
                        dispatch(setPokemonTab(route.name));
                      }}
                    >
                      {route.value}
                    </li>
                  )
                })
              }
            </ul>
          )
        }
      </div>
      <div className="block">
        <MdOutlinePowerSettingsNew onClick={handleLogout} />
      </div>
    </footer>
  )
}

export default Footer