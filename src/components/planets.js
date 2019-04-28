import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';
import Planetcard from './planetcard';
import Loader from './loder';
import Error from './error';

class Planets extends Component {
    //move next and page here?
      componentDidMount() {
        $('.error').hide();
        if (this.props.planets===null){
          axios.get('https://swapi.co/api/planets')
          .then(response => {
            console.log(response.data);
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

    export default Planets