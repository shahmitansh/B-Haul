import React, {Component} from 'react';
import './FooterPictures.css';

const SVG_WIDTH = 100;

export default class FooterPictures extends Component {

    constructor(props) {
      super(props);
      this.svgs = [];
      this.state = {xoffset1: 0, xoffset2: 0}
      this.timer = this.timer.bind(this);
    }

    componentDidMount() {
      const reqSvgs = require.context ( './furniture', true, /\.svg$/ )
      const paths = reqSvgs.keys ()

      this.svgs = paths.map( path => reqSvgs ( path ) )
      this._shuffleArray(this.svgs)

      this.groupWidth = SVG_WIDTH * this.svgs.length;
      this.setState({xoffset1: 0, xoffset2: this.groupWidth})
      this.timerID = setInterval(this.timer, 1);
    }

    timer() {
      if (this.state.xoffset1 < this.state.xoffset2 && this.state.xoffset2 < 0) {
        this.setState({xoffset1: this.groupWidth, xoffset2: 0});
      } else if (this.state.xoffset2 < this.state.xoffset1 && this.state.xoffset1 < 0) {
        this.setState({xoffset1: 0, xoffset2: this.groupWidth});
      } else {
        this.setState(state => ({xoffset1: state.xoffset1-1, xoffset2: state.xoffset2-1}));
      }
    }

    _renderFurniturePic = (path, index) => {
      return (
        <div key={index}>
          <img width={`${SVG_WIDTH}px`} height="95%" src={path} />
        </div>
      );
    }

    _getOffsetString = (offset) => {
      const translateStr = `translateX(${offset}px)`;
      return {transform: translateStr};
    }

    _shuffleArray = (array) => {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }

    render() {
        return (
            <div className="Footer">
              <div id="furniture-row1" className="svg-group" style={this._getOffsetString(this.state.xoffset1)}>
                {this.svgs.map(this._renderFurniturePic)}
              </div>
              <div id="furniture-row2" className="svg-group" style={this._getOffsetString(this.state.xoffset2)}>
                {this.svgs.map(this._renderFurniturePic)}
              </div>
            </div>
        )
    }
}
