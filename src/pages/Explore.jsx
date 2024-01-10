import React, { useState, useEffect } from 'react';
import data from '../components/object.json';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Explore() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedSearchData, setAdvancedSearchData] = useState({
    type: '',
    price: '',
    bedrooms: '',
    dateAdded: '',
  });

  useEffect(() => {
    // Set the initial properties and favorites
    setFilteredProperties(data.na);
  }, []);

  useEffect(() => {
    // Filter properties based on the search query
    const filtered = data.na.filter((property) =>
      property.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchQuery]);

  const handleTileClick = (property) => {
    setSelectedProperty(property);
  };

  const closeDialog = () => {
    setSelectedProperty(null);
  };

  const addToFavorites = (property) => {
    setFavorites((prevFavorites) => [...prevFavorites, property]);
  };

  const removeFromFavorites = (property) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== property.id)
    );
  };

  const filterProperties = () => {
    // Filter properties based on the search query
    const filtered = data.na.filter((property) =>
      property.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  const handleAdvancedSearch = () => {
    setShowAdvancedSearch(true);
  };

  const handleAdvancedSearchSubmit = () => {
    // Implement logic to filter properties based on advanced search data
    const filtered = data.na.filter((property) => {
      const typeMatch = !advancedSearchData.type || property.type.toLowerCase().includes(advancedSearchData.type.toLowerCase());
      const priceMatch = !advancedSearchData.price || property.price === parseInt(advancedSearchData.price, 10);
      const bedroomsMatch = !advancedSearchData.bedrooms || property.bedrooms === parseInt(advancedSearchData.bedrooms, 10);
      const dateAddedMatch = !advancedSearchData.dateAdded || property.dateAdded.includes(advancedSearchData.dateAdded);

      return typeMatch && priceMatch && bedroomsMatch && dateAddedMatch;
    });

    setFilteredProperties(filtered);
    setShowAdvancedSearch(false);
  };

  const handleAdvancedSearchCancel = () => {
    setShowAdvancedSearch(false);
  };

  return (
    <div className="explore">
      <header className="header">
        <p className="pageTitle">Explore Properties</p> {/* Added title */}
        <p className="pageHeader">Search Here</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={filterProperties}>Search</button>
        </div>
        <br />
        <br />
        {/* Advanced Search button */}
        <button className="advanced-search-button" onClick={handleAdvancedSearch}>
          Advanced Search
        </button>

        {/* Advanced Search Form */}
        {showAdvancedSearch && (
          <div className="advanced-search-container">
            <h2>Advanced Search</h2>
            <br />
            <br />
            <label>Type:</label>
            <input
              type="text"
              value={advancedSearchData.type}
              onChange={(e) =>
                setAdvancedSearchData({
                  ...advancedSearchData,
                  type: e.target.value,
                })
              }
            />
            <br />
            <br />
            <label>Price:</label>
            <input
              type="text"
              value={advancedSearchData.price}
              onChange={(e) =>
                setAdvancedSearchData({
                  ...advancedSearchData,
                  price: e.target.value,
                })
              }
            />
            <br />
            <br />
            <label>Bedrooms:</label>
            <input
              type="text"
              value={advancedSearchData.bedrooms}
              onChange={(e) =>
                setAdvancedSearchData({
                  ...advancedSearchData,
                  bedrooms: e.target.value,
                })
              }
            />
            <br />
            <br />
            <label>Date Added:</label>
            <input
              type="text"
              value={advancedSearchData.dateAdded}
              onChange={(e) =>
                setAdvancedSearchData({
                  ...advancedSearchData,
                  dateAdded: e.target.value,
                })
              }
            />
            <br />
            <br />
            <button onClick={handleAdvancedSearchSubmit}>Search</button>
            <button onClick={handleAdvancedSearchCancel}>Cancel</button>
          </div>
        )}
      </header>

      <main className="main-content">
        <div className="tiles">
          {filteredProperties.map((property) => (
            <div key={property.id} className="tile">
              <img
                src={process.env.PUBLIC_URL + property.picture}
                alt={property.type}
                className="tileImage"
              />
              <p>{property.type}</p>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Price: {property.price}</p>
              <p>Tenure: {property.tenure}</p>
              <p>Location: {property.location}</p>
              <button onClick={() => handleTileClick(property)}>
                View Details
              </button>
              <button
                onClick={() => {
                  if (favorites.some((fav) => fav.id === property.id)) {
                    removeFromFavorites(property);
                  } else {
                    addToFavorites(property);
                  }
                }}
              >
                {favorites.some((fav) => fav.id === property.id)
                  ? 'Remove from Favorites'
                  : 'Add to Favorites'}
              </button>
            </div>
          ))}
        </div>
      </main>

      <div className="favorites-tile">
        <h2>Favorites</h2>
        <ul>
          {favorites.map((fav) => (
            <li key={fav.id}>
              <img
                src={process.env.PUBLIC_URL + fav.picture}
                alt={fav.type}
                className="tileImage"
              />
              <p>{fav.type}</p>
              <p>Bedrooms: {fav.bedrooms}</p>
              <p>Price: {fav.price}</p>
              <p>Tenure: {fav.tenure}</p>
              <button onClick={() => removeFromFavorites(fav)}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={!!selectedProperty}
        onRequestClose={closeDialog}
        contentLabel="Property Details"
      >
        {selectedProperty && (
          <div>
            <h2>{selectedProperty.type}</h2>
            <img
              src={process.env.PUBLIC_URL + selectedProperty.picture}
              alt={selectedProperty.type}
              className="tileImage"
            />
            <p>Description: {selectedProperty.description}</p>
            <p>Bedrooms: {selectedProperty.bedrooms}</p>
            <p>Price: {selectedProperty.price}</p>
            <p>Tenure: {selectedProperty.tenure}</p>
            <p>Location: {selectedProperty.location}</p>
            <button onClick={closeDialog}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Explore;
