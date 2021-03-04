import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css'
import './App.scss';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard"

function App() {
  return (
    <div className="App">
          <BrowserRouter>
            <Switch>
                <Route path="/" component={Dashboard} />
            </Switch>
         </BrowserRouter>
    </div>
  );
}

export default App;
