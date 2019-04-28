import React, {Component} from 'react';
import $ from 'jquery';
import Stats from './stats';

class Card extends Component {

    componentDidMount() {
            $('.number-stats').each(function () {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 1000,
                    easing: 'linear',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                    }
                });
            });
            
    }
    
    render(){
    const resultitem = this.props.resultitem;
    let statslist = Object.keys(resultitem).map(objkey=>{return {name:objkey, value:resultitem[objkey]}});
    let renderstatlist =  statslist.map(stat=><Stats key={stat.name} name={stat.name} stat={stat.value}/>);

        return(
          <div className='card'>
    {renderstatlist}
            <br></br>
          </div>
        )
      }
    }

    export default Card