
import {Route} from 'react-router-dom';
import SearchResult from './components/SearchResults';
import Home from './components/Home';
import Search from './components/Search';
import Details from './components/Details';
import Userlist from './components/Userlist';
import History from './components/History';

function App() {
  return (
    <div>
    <Route exact path="/">
       <Home/>
    </Route>

    <Route exact path="/search/">
       <Search/>
    </Route>

    <Route exact path="/user-list">
       <Userlist/>
    </Route>
    
    <Route exact path="/history/:useremail">
       <History/>
    </Route>

    <Route exact path="/book/:bookid">
       <Details/>
    </Route>

    <Route path="/results/:serachTerm">
       <SearchResult/>
    </Route>

    </div>
  );
}

export default App;
