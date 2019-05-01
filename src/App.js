import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Page from './components/page';
import $ from 'jquery';
import Loader from './components/loder'

class App extends Component {
  state={
    stateloaded: false,
    routes: {}
  }

componentDidMount() {
  if (this.state.stateloaded===false) {
    $('.loading-icon').show();
    axios.get(`https://swapi.co/api/`)
      .then(response => {
        console.log("response data", response.data);
        this.handleCreateState(response.data);
        $('.loading-icon').hide();
        this.setState({
          stateloaded: true
          })
      })
      .catch(error => {
        console.log(error);
        $('.loading-icon').hide();
        $('.error').show();
      });
  } 
}

handleCreateState = (data) => {
  Object.keys(data).forEach(
    route => this.setState({
      routes:{ ...this.state.routes,
        [route]: {
          results: null,
          page: 1,
          next: true,
          back: false
        }
      } 
    })
  )
  console.log(this.state);
};

handleGet = (route, data, next) => {
  this.setState({routes: {...this.state.routes, [route]: {...this.state.routes[route], results:data, next:next}}});
}
 
handleNext = (route, page) => {
  $('.loading-icon').show();
  $('.card').hide();
  let nextpage = `https://swapi.co/api/${route}/?page=${page+1}`
axios.get(nextpage)
.then(response => {
  $('.loading-icon').hide();
  $('.card').show();
  this.handleGet(route, response.data.results);
    response.data.next===null? this.setState({routes:{...this.state.routes, [route]:{...this.state.routes[route], next: false, page:page+1}}}):this.setState({routes:{...this.state.routes, [route]:{...this.state.routes[route], next: true, page:page+1}}});
    response.data.previous===null? this.setState({routes:{...this.state.routes, [route]: {...this.state.routes[route], back: false, page:page+1}}}):this.setState({routes:{...this.state.routes, [route]:{...this.state.routes[route], back: true, page:page+1}}}); 
})
.catch(error => {
  console.log(error);
  $('.loading-icon').hide();
  $('.error').show();
});
}

handleBack = (route, page) => {
  $('.loading-icon').show();
  $('.card').hide();
  let nextpage = `https://swapi.co/api/${route}/?page=${page-1}`
axios.get(nextpage)
.then(response => {
  $('.loading-icon').hide();
  $('.card').show();
  this.handleGet(route, response.data.results);
  response.data.next===null? this.setState({routes:{...this.state.routes, [route]: {...this.state.routes[route], next: false, page:page-1}}}):this.setState({routes:{...this.state.routes, [route]:{...this.state.routes[route], next: true, page:page-1}}});
  response.data.previous===null? this.setState({routes:{...this.state.routes, [route]:{...this.state.routes[route], back: false, page:page-1}}}):this.setState({routes:{...this.state.routes, [route]:{...this.state.routes[route], back: true, page:page-1}}});
})
.catch(error => {
  console.log(error);
  $('.loading-icon').hide();
  $('.error').show();
});
}

render () {

    let routes = Object.keys(this.state.routes).map(routename=><Route key={routename}  path={`/${routename}`} render={(routeProps)=><Page {...routeProps} back={this.state.routes[routename].back} next={this.state.routes[routename].next} page={this.state.routes[routename].page} handleBack={this.handleBack} handleNext={this.handleNext} handleGet={this.handleGet} route={routename} results={this.state.routes[routename].results}/>} />);
    let links =  Object.keys(this.state.routes).map(routename=><li key={routename}><Link to={`/${routename}`}>{routename}</Link></li>);
    
    return (
    <div className="App">
    {!this.state.stateloaded && <Loader />} 
    {this.state.stateloaded && 
    <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link  to="/">Home</Link>
          </li>
          {this.state.stateloaded && links}
        </ul>
      </nav>
    </div>
    <Route exact={true} path="/" component={Index} />
     {this.state.stateloaded && routes}
  </Router>
    } 
    </div>
  )
  }
}

class Index extends Component {
  render(){
    return(
      <div>Index</div>
    )
  }
}

export default App;
