import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  searchRef = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = this.searchRef.current.value;
    
  }

  render() {
    return (
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={this.searchRef} placeholder="Type Beer Names.." />
          <input type="submit" value="Hit me up" />
        </form>
      </div>
    );
  }
};


export default Search;
