import './normalize.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CajaBusqueda from './components/CajaBusqueda/CajaBusqueda'
import ResultadoBusqueda from './components/ResultadoBusqueda/ResultadoBusqueda'
import DetalleProducto from './components/DetalleProducto/DetalleProducto'


function App() {
  return (
      <Router>
        <Route path='/' component={CajaBusqueda}></Route>
        <Switch>
          <Route path='/items/:id' component={DetalleProducto} exact></Route>
          <Route path='/items' component={ResultadoBusqueda} exact></Route>
        </Switch>
      </Router>
  );
}

export default App;
