import React from 'react';
import './TagFilter.css';

const TagFilter = ({ availableTags, selectedTags, onToggleTag }) => {
    if (!availableTags || availableTags.length === 0) return null;

    return (
        <div className="tag-filter-container">
            <span className="tag-filter-label">Filter by:</span>
            <div className="tag-list">
                {availableTags.map(tag => (
                    <button
                        key={tag}
                        className={`tag-chip ${selectedTags.includes(tag) ? 'active' : ''}`}
                        onClick={() => onToggleTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TagFilter;
