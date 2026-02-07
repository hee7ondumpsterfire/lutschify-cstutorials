import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import GrenadeFilter from '../components/GrenadeFilter';
import TutorialModal from '../components/TutorialModal';
import TutorialCard from '../components/TutorialCard';
import MapPins from '../components/MapPins';
import TagFilter from '../components/TagFilter';
import { maps } from '../data/maps';
import './MapDetail.css';

const MapDetail = () => {
    const { mapId } = useParams();
    const navigate = useNavigate();
    const [filter, setFilter] = useState('smoke');
    const [selectedTags, setSelectedTags] = useState([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [selectedTutorial, setSelectedTutorial] = useState(null);
    const { favorites, toggleFavorite, isFavorite } = useFavorites();
    const { tutorials, deleteTutorial } = useData();
    const { isAdmin } = useAuth();

    const mapData = maps.find(m => m.id === mapId);

    const mapTutorials = useMemo(() => {
        let results = tutorials.filter(t => t.mapId === mapId && t.type === filter && t.status === 'approved');

        if (selectedTags.length > 0) {
            results = results.filter(t => {
                if (!t.tags) return false;
                return selectedTags.every(tag => t.tags.includes(tag));
            });
        }

        if (showFavoritesOnly) {
            results = results.filter(t => isFavorite(t.id));
        }

        return results;
    }, [mapId, filter, selectedTags, showFavoritesOnly, isFavorite]);

    const availableTags = useMemo(() => {
        if (!tutorials) return [];
        const typeTutorials = tutorials.filter(t => t.mapId === mapId && t.type === filter);
        const tags = new Set();
        typeTutorials.forEach(t => {
            if (t.tags) t.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }, [mapId, filter, tutorials]);

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleEdit = (tutorial) => {
        navigate(`/admin/grenade/edit/${tutorial.id}`);
    };

    // Helper to calculate click percentage on the map image
    const onMapAreaClick = (e) => {
        if (!isAdmin) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        const coords = { x: Math.round(x), y: Math.round(y) };

        if (window.confirm(`Add new grenade at ${Math.round(x)}%, ${Math.round(y)}%?`)) {
            navigate(`/admin/grenade/add/${mapId}`, {
                state: {
                    type: filter,
                    coords
                }
            });
        }
    };

    if (!mapData) {
        return <div className="container" style={{ paddingTop: '4rem' }}>Map not found</div>;
    }

    return (
        <div className="map-detail-page">
            <div className="map-hero" style={{ backgroundImage: `linear-gradient(to bottom, rgba(15, 16, 20, 0.3), var(--bg-dark)), url(${mapData.image})` }}>
                <div className="container map-hero-content">
                    <Link to="/training" className="back-link">← Back to Maps</Link>
                    <h1>{mapData.name} Utilities</h1>
                </div>
            </div>

            <div className="container map-interactive-container">
                <div className="container map-interactive-container">
                    <div className="map-radar-wrapper" onClick={onMapAreaClick} style={{ cursor: isAdmin ? 'crosshair' : 'default' }}>
                        <img src={mapData.radar || mapData.image} alt={`${mapData.name} Radar`} className="map-radar-image" />
                        <MapPins
                            grenades={mapTutorials}
                            onPinClick={setSelectedTutorial}
                        />
                    </div>
                    {isAdmin && (
                        <button
                            className="fab-add-btn"
                            onClick={() => {
                                navigate(`/admin/grenade/add/${mapId}`, { state: { type: filter } });
                            }}
                            title="Add Grenade"
                        >
                            +
                        </button>
                    )}
                </div>
            </div>

            <div className="container content-container">
                <GrenadeFilter selectedType={filter} onSelect={(newType) => {
                    setFilter(newType);
                    setSelectedTags([]); // Reset tags when switching types
                }} />

                <TagFilter
                    availableTags={availableTags}
                    selectedTags={selectedTags}
                    onToggleTag={toggleTag}
                />

                {mapTutorials.length > 0 ? (
                    <div className="tutorials-grid">
                        {mapTutorials.map(tutorial => (
                            <TutorialCard
                                key={tutorial.id}
                                tutorial={tutorial}
                                onClick={() => setSelectedTutorial(tutorial)}
                                isFavorite={isFavorite(tutorial.id)}
                                onToggleFavorite={toggleFavorite}
                                isAdmin={isAdmin}
                                onDelete={deleteTutorial}
                                onEdit={handleEdit}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>No {filter}s found for this map yet.</p>
                    </div>
                )}
            </div>

            <TutorialModal
                tutorial={selectedTutorial}
                onClose={() => setSelectedTutorial(null)}
            />
        </div>
    );
};

export default MapDetail;
