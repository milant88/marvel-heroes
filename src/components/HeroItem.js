import React, { Component } from 'react';

class HeroItem extends Component {

    render() {
        return(
          <div className="hero" onClick={this.props.onClick}>
              <img className="hero__image" src={`${this.props.thumbnail}.${this.props.extension}`} alt={this.props.alt}/>
              <div className="hero__name">{this.props.name}</div>
          </div>
        );
    }
}

export default HeroItem;