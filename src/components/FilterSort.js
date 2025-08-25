// src/components/FilterSort.js
import React from 'react';

function FilterSort({ filter, setFilter, sortBy, setSortBy }) {
  return (
    <div className="filter-sort">
      <h3>Filter & Urutkan</h3>
      <div className="filter-sort-controls">
        <div className="control-group">
          <label>Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Semua</option>
            <option value="positive">Yang hutang ke kamu</option>
            <option value="negative">Yang kamu hutang</option>
            <option value="zero">Sudah lunas</option>
          </select>
        </div>
        
        <div className="control-group">
          <label>Urutkan:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Nama (A-Z)</option>
            <option value="balance">Balance (Tertinggi)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterSort;