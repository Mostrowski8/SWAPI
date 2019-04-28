import React, {Component} from 'react';
import {parseFromNow} from '../helper-functions';
import {isoDateRegExp, hasLettersRegExp} from '../regExpLib';


class Stats extends Component {
     
componentDidMount(){
    
}

    render(){
    let stat = this.props.stat;
    const name = this.props.name;
    if (Array.isArray(stat) === true && stat.length===0) stat = "no data";
    let hasLetters =  hasLettersRegExp.test(stat);
    if (isoDateRegExp.test(stat)) stat=parseFromNow(stat);

    return(
    <div style={{display: "flex", flexDirection: "row"}}><div>{name}:&nbsp; </div><div data-count={stat} className={hasLetters? "string-stats":"number-stats"}>{hasLetters? stat:0}</div></div>
        )
      }
    }

    export default Stats