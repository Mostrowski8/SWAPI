import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';
import moment from 'moment';
import loading from './assets/loading.gif';
import crash from './assets/crash.gif';


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
    this.setState({planets:planets, next:next})
  }

handleNext = (page) => {
  console.log(page);
  let nextpage = `https://swapi.co/api/planets/?page=${page+1}`
  console.log(nextpage);
axios.get(nextpage)
.then(response => {
  console.log(response.data);
  this.handlePlanets(response.data.results);
  response.data.next===null? this.setState({next: false, page:page+1}):this.setState({next: true, page:page+1});
  response.data.previous===null? this.setState({back: false, page:page+1}):this.setState({back: true, page:page+1});
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
  response.data.next===null? this.setState({next: false, page:page-1}):this.setState({next: true, page:page-1});
  response.data.previous===null? this.setState({back: false, page:page-1}):this.setState({back: true, page:page-1});
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
        <Route  path="/planets" render={(routeProps)=><Planets {...routeProps} back={this.state.back} next={this.state.next} page={this.state.page} handleBack={this.handleBack} handleNext={this.handleNext} handlePlanets={this.handlePlanets} planets={this.state.planets}></Planets>} />
     </Router>

    </div>
  )
  }
}


class Planets extends Component {
//move next and page here?




  componentDidMount() {
    $('.error').hide();
    if (this.props.planets===null){
      axios.get('https://swapi.co/api/planets')
      .then(response => {
       
        console.log(response.data);
        //;check props if should update
        this.props.handlePlanets(response.data.results, this.props.next, this.props.back);
        $('.loading-icon').hide();
      })
      .catch(error => {
        console.log(error);
        $('.loading-icon').hide();
        $('.error').show();
      });
    }
  }
  render(){
    let planets = this.props.planets;
    let planetlist;
    if (planets) {
       planetlist = planets.map(planet=><Planetcard key={planet.name} planet={planet} />);
    }
    return(
      <div>
      <div style={{display: "flex", flexDirection: "row"}}>
      {this.props.back &&<button onClick={()=>this.props.handleBack(this.props.page)}>Back</button>}
     {this.props.next && <button onClick={()=>this.props.handleNext(this.props.page)}>Next</button>} 
      </div>
      <div>Planets <br></br>{planetlist}</div>
      <Loader />
      <Error />
      </div>
    )
  }
}


function Loader (props) {
  return <div className="loading-icon">
  <img src={loading} alt="loading..." />
  </div>
}

function Error (props) {
  return <div className="error">
  <img src={crash} alt="Error" />
  <p>Something went wrong!</p>
  </div>
}


class Planetcard extends Component {

componentDidMount(){
  $('.number-stats').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-count');
    $({ countNum: $this.text()}).animate({
      countNum: countTo
    },
    {
      duration: 1000,
      easing:'linear',
      step: function() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.text(this.countNum);
      }
    });  
  });
 

}

  
render(){
const planet = this.props.planet;
const parseFromNow = (ISOdate) => moment(Date.parse(ISOdate)).fromNow();
//styled components on this

    return(
      <div>


        <div style={{display: "flex", flexDirection: "row"}}><div>Name:&nbsp; </div><div>{planet.name}</div></div>
        <div style={{display: "flex", flexDirection: "row"}}><div>Climate:&nbsp; </div><div data-count={planet.climate} className="stats">{planet.climate}</div></div>
        <div style={{display: "flex", flexDirection: "row"}}><div>Created:&nbsp; </div><div data-count={planet.created} className="stats">{parseFromNow(planet.created)}</div></div>
        <div style={{display: "flex", flexDirection: "row"}}><div>Diameter:&nbsp; </div><div data-count={planet.diameter} className="number-stats">0</div></div>
        <div style={{display: "flex", flexDirection: "row"}}><div>Edited:&nbsp; </div><div data-count={planet.edited} className="stats">{parseFromNow(planet.edited)}</div></div>
        <div style={{display: "flex", flexDirection: "row"}}><div>Gravity:&nbsp; </div><div data-count={planet.gravity} className="stats">{planet.gravity}</div></div>
        <div style={{display: "flex", flexDirection: "row"}}><div>Orbital_period:&nbsp; </div><div data-count={planet.orbital_period} className="number-stats">0</div></div>
        <div style={{display: "flex", flexDirection: "row"}}><div>Population:&nbsp; </div><div data-count={planet.population} className="number-stats">0</div></div>
        <div style={{display: "flex", flexDirection: "row"}}><div>Rotation_period:&nbsp; </div><div data-count={planet.rotation_period} className="number-stats">0</div></div>
        <div style={{display: "flex", flexDirection: "row"}}><div>Surface_water:&nbsp; </div><div data-count={planet.surface_water} className="number-stats">0</div></div>
        <br></br>
      </div>
    )
  }
}

class Stats extends Component {

  render(){
const stat = this.props.stat;
const name = this.props.name;
const numbercheck = typeof stat === "number"

    return(
<div style={{display: "flex", flexDirection: "row"}}><div>{name}:&nbsp; </div><div data-count={this.props.stat} className={numbercheck? "number-stats":"stats"}>{numbercheck? 0:stat}</div></div>
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
