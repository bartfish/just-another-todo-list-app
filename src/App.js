import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard"

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <BrowserRouter>
            <Switch>
                <Route path="/" component={Dashboard} />
            </Switch>
         </BrowserRouter>
         </header>
    </div>
  );
}

export default App;
