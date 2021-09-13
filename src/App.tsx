import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/rooms/new" component={NewRoom}></Route>
        </Switch>
    </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
