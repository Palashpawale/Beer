import React from "react";
import Results from "./components/Results";
import Search from "./components/Search";
import Header from "./components/Header";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      beers: [],
      loading: true
    };
  }

  componentDidMount() {
    console.log(`mounting`);
    console.log(this);
    const params = this.props.match.params || {};
    const searchTerm = params.searchTerm || undefined;
    this.loadBeers(searchTerm);
  }

  componentDidUpdate(prevProps) {
    console.log('did update');
    const currentSearchTerm = this.props.match.params.searchTerm;
    const oldSearchTerm = prevProps.match.params.searchTerm;
    if (currentSearchTerm !== oldSearchTerm) {
      this.loadBeers(currentSearchTerm);
    }
  }

  loadBeers = (searchTerm = "hops") => {
    this.setState({ loading: true });

    const localStorageBeers = localStorage.getItem(`search-${searchTerm}`);

    if (localStorageBeers) {
      const localBeers = JSON.parse(localStorageBeers);
      this.setState({ beers: localBeers, loading: false });
      return; 
    }

    fetch(`http://api.react.beer/v2/search?q=${searchTerm}&type=beer`)
      .then(data => data.json())
      .then(data => {
        
        const beers = data.data || [];
        const filteredBeers = beers.filter(beer => !!beer.labels);
        this.setState({ beers: filteredBeers, loading: false });
        
        localStorage.setItem(
          `search-${searchTerm}`,
          JSON.stringify(this.state.beers)
        );
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div className="wrapper">
        <Header siteName="Beer Application" />
        <Search />
        <Results beers={this.state.beers} loading={this.state.loading} />
      </div>
    );
  }
}

export default App;
