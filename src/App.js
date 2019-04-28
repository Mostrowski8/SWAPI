import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Planets from './components/planets';

class App extends Component {
  state={
    planetsroute:{
      planets:null,
      page: 1,
      next: true,
      back: false
    } 
  }

  handlePlanets = (planets, next) => {
    this.setState({planetsroute: {...this.state.planetsroute, planets:planets, next:next}})
  }

handleNext = (page) => {
  console.log(page);
  let nextpage = `https://swapi.co/api/planets/?page=${page+1}`
  console.log(nextpage);
axios.get(nextpage)
.then(response => {
  console.log(response.data);
  this.handlePlanets(response.data.results);
  response.data.next===null? this.setState({planetsroute:{...this.state.planetsroute, next: false, page:page+1}}):this.setState({planetsroute:{...this.state.planetsroute, next: true, page:page+1}});
  response.data.previous===null? this.setState({planetsroute: {...this.state.planetsroute, back: false, page:page+1}}):this.setState({planetsroute:{...this.state.planetsroute, back: true, page:page+1}});
})
.catch(error => {
  console.log(error);
});
}

handleBack = (page) => {
  console.log(page);
  let nextpage = `https://swapi.co/api/planets/?page=${page-1}`
  console.log(nextpage);
axios.get(nextpage)
.then(response => {
  console.log(response.data);
  this.handlePlanets(response.data.results);
  response.data.next===null? this.setState({planetsroute: {...this.state.planetsroute, next: false, page:page-1}}):this.setState({planetsroute:{...this.state.planetsroute, next: true, page:page-1}});
  response.data.previous===null? this.setState({planetsroute:{...this.state.planetsroute, back: false, page:page-1}}):this.setState({planetsroute:{...this.state.planetsroute, back: true, page:page-1}});
})
.catch(error => {
  console.log(error);
});
}

  render () {
  return (
    <div className="App">
     <Router>
       <div>
         <nav>
           <ul>
             <li>
               <Link  to="/">Home</Link>
             </li>
             <li>
               <Link to="/planets">Planets</Link>
             </li>
           </ul>
         </nav>
       </div>
       <Route exact={true} path="/" component={Index} />
        <Route  path="/planets" render={(routeProps)=><Planets {...routeProps} back={this.state.planetsroute.back} next={this.state.planetsroute.next} page={this.state.planetsroute.page} handleBack={this.handleBack} handleNext={this.handleNext} handlePlanets={this.handlePlanets} planets={this.state.planetsroute.planets}></Planets>} />
     </Router>

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
