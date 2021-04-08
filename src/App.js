import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from '@apollo/client';


const App = () => {

  const ALL_HORSES = gql`
    query {
      allHorses {
        id
        name
        description
      }
    }
  `

  const { data } = useQuery(ALL_HORSES)
  console.log('data:', data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
