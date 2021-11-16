import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import ComunidadEdad from "./pages/CommunityAge/ComunidadEdad";
import ContextoActual from "./pages/ContextoActual";
import Lengua from "./pages/Lengua";
import Intergenerational from "./pages/Intergenerational/Intergenerational";


const App = () => {
    return (
        <Router>
            <Switch>
                <Route path={'/ComunidadEdad'} component={ComunidadEdad}/>
                <Route path={'/ContextoActual'} component={ContextoActual}/>
                <Route path={'/Intergeneracional'} component={Intergenerational}/>
                <Route path={'/Lengua'} component={Lengua}/>
                <Redirect to={'/ComunidadEdad'} />
            </Switch>
        </Router>
    );
}
export default App;
