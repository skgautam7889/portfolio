// import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from './components/layout/Header';
import Resume from './components/Resume';
function App() {
  return (
    <HashRouter>
      {/* <h1>Hello 0</h1> */}
      {/* <Preloader /> */}
      {/* <Navbar /> */}
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/resume" component={Resume} />
        
        {/* <PrivateRoute path="/app" component={Layout} />
      <PublicRoute path="/login" component={Login} />
      <Route component={Error} /> */}
        <Redirect to="/" />
      </Switch>
      {/* <Footer /> */}
      {/* <OuterFooter /> */}
    </HashRouter>
  );
}

export default App;
