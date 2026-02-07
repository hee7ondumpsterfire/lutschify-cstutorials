import { useState, useEffect } from 'react';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('aura_favorites') || localStorage.getItem('lutsch1fy_favorites');
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
                if (!localStorage.getItem('aura_favorites')) {
                    localStorage.setItem('aura_favorites', stored);
                }
            } catch (e) {
                console.error('Failed to parse favorites', e);
            }
        }
    }, []);

    const toggleFavorite = (id) => {
        setFavorites(prev => {
            const newFavorites = prev.includes(id)
                ? prev.filter(fId => fId !== id)
                : [...prev, id];

            localStorage.setItem('aura_favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const isFavorite = (id) => favorites.includes(id);

    return { favorites, toggleFavorite, isFavorite };
};
