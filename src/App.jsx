import './App.css'
import { Route, Switch } from 'react-router-dom';
import OrderPage from './components/OrderPage';
import HomePage from "./components/HomePage";
import SuccesPage from './components/SuccesPage';



function App() {
  

    return (
      <>
        <Switch>
          <Route path="/OrderPage">
            <OrderPage />
          </Route>
          <Route path="/SuccesPage">
            <SuccesPage />
          </Route>
          <Route path="/">
            <HomePage />
            </Route>
        </Switch>
      </>
    );
  }
  
  export default App;


  