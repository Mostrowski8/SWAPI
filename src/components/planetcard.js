import React, {Component} from 'react';
import $ from 'jquery';
import Stats from './stats';

class Planetcard extends Component {

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
            let str = $('.stat-string').text();
            let spans = '<span>' + str.split(/\s+/).join(' </span><span>') + '</span>';
            $(spans).hide().appendTo('body').each(function (i) {
                $(this).delay(1000 * i).fadeIn();
            });
    }
    
    render(){
    const planet = this.props.planet;
    let statslist = Object.keys(planet).map(objkey=>{return {name:objkey, value:planet[objkey]}});
    let renderstatlist =  statslist.map(stat=><Stats key={stat.name} name={stat.name} stat={stat.value}/>);

        return(
          <div>
    {renderstatlist}
            <br></br>
          </div>
        )
      }
    }

    export default Planetcard