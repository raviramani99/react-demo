import './App.css';
import Routes from './Routes';
import { useDispatch } from 'react-redux';
import { logout } from './redux/authSlice.js';

function App() {

  const dispatch = useDispatch();



  return (
    <>
      <Routes />
      <button onClick={() => dispatch(logout())}>Logout</button>
    </>
  );
}

export default App;
