import React, {Component} from 'react';
import axios from 'axios';
import $ from 'jquery';
import Card from './card';
import Loader from './loder';
import Error from './error';
import ErrorBoundary from './errorboundary/errorboundary';

class Page extends Component {
    //move next and page here?
      componentDidMount() {
        $('.loading-icon').hide();
        $('.error').hide();
        if (this.props.results===null){
          $('.loading-icon').show();
          let request = `https://swapi.co/api/${this.props.route}/`;
          axios.get(request)
          .then(response => {
            console.log(response.data);
            this.props.handleGet(this.props.route, response.data.results, response.data.next);
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
        let results = this.props.results;
        let resultslist;
        if (results) {
            resultslist = results.map(resultitem=><Card key={resultitem.name? resultitem.name:resultitem.title} resultitem={resultitem} />);
        }
let route = this.props.route;

        return(
          <div>
          <div style={{display: "flex", flexDirection: "row"}}>
          {this.props.back &&<button onClick={()=>this.props.handleBack(route, this.props.page)}>Back</button>}
          {this.props.next && <button onClick={()=>this.props.handleNext(route, this.props.page)}>Next</button>} 
          </div>
          <div>{route} {this.props.total && "page " + this.props.page + "/" + this.props.total} <br></br>
          <Loader />
          <Error />
          {resultslist}
          </div>
          {resultslist &&
          <div style={{display: "flex", flexDirection: "row"}}>
          {this.props.back &&<button onClick={()=>this.props.handleBack(route, this.props.page)}>Back</button>}
          {this.props.next && <button onClick={()=>this.props.handleNext(route, this.props.page)}>Next</button>} 
          </div>
          }
          </div>
        )
      }
    }

    export default Page