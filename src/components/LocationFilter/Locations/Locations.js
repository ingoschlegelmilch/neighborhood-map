import React, { Component } from 'react';

class Locations extends Component {
  state = {
    activeLocation: 0
  }

  handleKeyDown(code, p, index) {
    this.props.onClick(this.props.locations[index + 1]);
  }
  
  render() {
    const { locations, onClick } = this.props;
    return (
      <ol className="locations">
        {locations && locations.map((p, index) =>
          <li id={p.place_id}
            key={p.id}
            onClick={() => onClick(p)}
            onKeyPress={() => onClick(p)}
            onKeyDown={(e) => this.handleKeyDown(e.keyCode, p, index)}
            onFocus={(e) => onClick(locations[index])}
            aria-label={p.name}
            role="menuitem"
            tabIndex="0">{p.name}</li>
        )}
      </ol>
    );
  }
}

export default Locations;