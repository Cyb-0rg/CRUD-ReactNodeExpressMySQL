import "./App.css";
import Main from "./components/main";
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { pageNotFound } from "./components/pageNotFound";
import logo from './assets/react.svg';


function App() {
 

  return (
    <Router >
     <div className="App">


            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title"> React - CRUD</h1>
            </header>

          <div className="information">

              <Switch>
                      <Route exact path= "/" render={() => (
                        <Redirect to="/home"/>
                          )}/>
                      
                      <Route exact  path='/home'  component={Main}  />
                      <Route exact  path='/*' component={pageNotFound} />

              </Switch>

          </div> 


    </div>
     </Router>
  );
}

export default App;
