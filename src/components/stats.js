import React, {Component} from 'react';
import {parseFromNow} from '../helper-functions';
import {isoDateRegExp, hasLettersRegExp} from '../regExpLib';
import $ from 'jquery';


const Statstyle = {
backgroundColor: 'black',
  color: '#1ec503',
  fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace',
  display: "flex", 
  flexDirection: "row"
}


class Stats extends Component {
     
componentDidMount(){

}

    render(){
    let stat = this.props.stat;
    const name = this.props.name;
    if (Array.isArray(stat) === true && stat.length===0) stat = "unknown";
    let hasLetters =  hasLettersRegExp.test(stat);
    if (isoDateRegExp.test(stat)) stat=parseFromNow(stat);
    return(
    <div style={Statstyle}><div>{name}:&nbsp; </div><div data-count={stat} className={hasLetters? "string-stats":"number-stats"}>{hasLetters? stat:0}</div></div>
        )
      }
    }

    export default Stats