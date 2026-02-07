import React, { createContext, useState, useContext, useEffect } from 'react';
import { tutorials as initialTutorials } from '../data/grenades';
import { guides as initialGuides } from '../data/guides';
import { eloRanges as initialEloGuides } from '../data/eloGuides';
import { initialMovementModules } from '../data/movementData';
import { initialTacticsModules } from '../data/tacticsData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [tutorials, setTutorials] = useState([]);
    const [guides, setGuides] = useState([]);
    const [eloGuides, setEloGuides] = useState([]);
    const [movementModules, setMovementModules] = useState([]);
    const [tacticsModules, setTacticsModules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        // Load local overrides
        try {
            const storedData = localStorage.getItem('lutsch1fy_data');
            if (storedData) {
                const parsed = JSON.parse(storedData);
                // Merge strategies could be complex, but for now we'll just use the stored data 
                // if it exists, assuming it started as a copy of initialTutorials.
                // However, if we want to get updates from code, we should merge.
                // Simple approach: Stored data IS the source of truth if it exists.
                // Better approach for this customized app: 
                // 1. Start with static data.
                // 2. Apply "Actions" saved in local storage (Adds, Edits, Deletes).

                // Let's go with the Action Log approach for better robustness? 
                // No, simpler: Just Replace static with LocalStorage content if found, 
                // OR initialize LocalStorage with Static if empty.

                const processedTutorials = (parsed.tutorials || parsed).map(t => ({
                    ...t,
                    status: t.status || 'approved'
                }));

                setTutorials(processedTutorials);
                setGuides(parsed.guides || initialGuides);
                setEloGuides(parsed.eloGuides || initialEloGuides);
                setMovementModules(parsed.movementModules || initialMovementModules);
                setTacticsModules(parsed.tacticsModules || initialTacticsModules);
            } else {
                setTutorials(initialTutorials.map(t => ({ ...t, status: 'approved' })));
                setGuides(initialGuides);
                setEloGuides(initialEloGuides);
                setMovementModules(initialMovementModules);
                setTacticsModules(initialTacticsModules);
            }
        } catch (e) {
            console.error("Failed to load data", e);
            setTutorials(initialTutorials);
        }
        setIsLoading(false);
    };

    const saveToStorage = (newTutorials, newGuides, newEloGuides, newMovementModules, newTacticsModules) => {
        const payload = {
            tutorials: newTutorials || tutorials,
            guides: newGuides || guides,
            eloGuides: newEloGuides || eloGuides,
            movementModules: newMovementModules || movementModules,
            tacticsModules: newTacticsModules || tacticsModules
        };
        localStorage.setItem('lutsch1fy_data', JSON.stringify(payload));
        if (newTutorials) setTutorials(newTutorials);
        if (newGuides) setGuides(newGuides);
        if (newEloGuides) setEloGuides(newEloGuides);
        if (newMovementModules) setMovementModules(newMovementModules);
        if (newTacticsModules) setTacticsModules(newTacticsModules);
    };

    const addTutorial = (tutorial) => {
        const newTutorials = [...tutorials, {
            ...tutorial,
            id: crypto.randomUUID(),
            status: tutorial.status || 'approved' // Default to approved (for admin use)
        }];
        saveToStorage(newTutorials, null);
    };

    const updateTutorial = (id, updates) => {
        const newTutorials = tutorials.map(t =>
            t.id === id ? { ...t, ...updates } : t
        );
        saveToStorage(newTutorials, null);
    };

    const approveTutorial = (id) => {
        const newTutorials = tutorials.map(t =>
            t.id === id ? { ...t, status: 'approved' } : t
        );
        saveToStorage(newTutorials, null);
    };

    const deleteTutorial = (id) => {
        const newTutorials = tutorials.filter(t => t.id !== id);
        saveToStorage(newTutorials, null);
    };

    const addGuide = (guide) => {
        // Check if guide for map already exists, if so replace, else add
        const existingIndex = guides.findIndex(g => g.mapId === guide.mapId);
        let newGuides;
        if (existingIndex >= 0) {
            newGuides = guides.map((g, i) => i === existingIndex ? { ...guide, id: g.id } : g);
        } else {
            newGuides = [...guides, { ...guide, id: crypto.randomUUID() }];
        }
        saveToStorage(null, newGuides, null);
    };

    const updateEloGuide = (eloGuide) => {
        const newEloGuides = eloGuides.map(g => g.id === eloGuide.id ? eloGuide : g);
        saveToStorage(null, null, newEloGuides, null);
    };

    const addMovementModule = (module) => {
        const newModules = [...movementModules, { ...module, id: crypto.randomUUID() }];
        saveToStorage(null, null, null, newModules, null);
    };

    const updateMovementModule = (module) => {
        const newModules = movementModules.map(m => m.id === module.id ? module : m);
        saveToStorage(null, null, null, newModules, null);
    };

    const deleteMovementModule = (moduleId) => {
        const newModules = movementModules.filter(m => m.id !== moduleId);
        saveToStorage(null, null, null, newModules, null);
    };

    const addTacticsModule = (module) => {
        const newModules = [...tacticsModules, { ...module, id: crypto.randomUUID() }];
        saveToStorage(null, null, null, null, newModules);
    };

    const updateTacticsModule = (module) => {
        const newModules = tacticsModules.map(m => m.id === module.id ? module : m);
        saveToStorage(null, null, null, null, newModules);
    };

    const deleteTacticsModule = (moduleId) => {
        const newModules = tacticsModules.filter(m => m.id !== moduleId);
        saveToStorage(null, null, null, null, newModules);
    };

    const resetData = () => {
        if (window.confirm('Are you sure? This will reset all your custom grenades to the default app state.')) {
            localStorage.removeItem('lutsch1fy_data');
            setTutorials(initialTutorials);
        }
    };

    return (
        <DataContext.Provider value={{
            tutorials,
            guides,
            addTutorial,
            updateTutorial,
            approveTutorial,
            deleteTutorial,
            addGuide,
            eloGuides,
            updateEloGuide,
            movementModules,
            addMovementModule,
            updateMovementModule,
            deleteMovementModule,
            tacticsModules,
            addTacticsModule,
            updateTacticsModule,
            deleteTacticsModule,
            resetData,
            isLoading
        }}>
            {children}
        </DataContext.Provider>
    );
};
