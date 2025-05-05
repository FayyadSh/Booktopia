import './BooksFilter.css';
import useBrowse from "../../hooks/useBrowse";

const BooksFilter = () => {

  const { sortType, sortDirection, setSearchParams } = useBrowse();
    
  // Handle radio button change for sorting direction
  const handleRadioChange = (e) => {
    setSearchParams((prevParams) => {
      const updatedParams = new URLSearchParams(prevParams);
      updatedParams.set("sortDirection", e.target.value); // Update sort direction
      return updatedParams;
    });
  };

  // Handle select dropdown change for sorting type
const handleSelectChange = (e) => {
  if (e.target.value === sortType) return; // Prevent unnecessary updates
  setSearchParams((prevParams) => {
    const updatedParams = new URLSearchParams(prevParams);
    updatedParams.set("sortType", e.target.value); // Update sort type
    return updatedParams;
  });
};

  return (
    <div className="books-filters">
      <h3>Sort By :</h3>
    <div className="filters-buttons">

      {/* Dropdown for sorting type */}
      <select 
        value={sortType} 
        onChange={handleSelectChange}
      >
        <option value="rating">Rating</option>
        <option value="publish-date">Publish Date</option>
      </select>

      {/* Radio buttons for sorting direction */}
      <label htmlFor="asc">ASC</label>
      <input 
        type="radio" 
        name="sortOrder" 
        id="asc" 
        value="asc" 
        checked={sortDirection === "asc"}
        onChange={handleRadioChange}
      />

      <label htmlFor="desc">DESC</label>
      <input 
        type="radio" 
        name="sortOrder" 
        id="desc" 
        value="desc" 
        checked={sortDirection === "desc"}
        onChange={handleRadioChange}
      />
    </div>
    </div>
  );
};

export default BooksFilter;
