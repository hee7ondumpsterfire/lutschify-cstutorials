import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { maps } from '../data/maps';
import './GuideDetail.css';

const GuideDetail = () => {
    const { mapId } = useParams();
    const { guides } = useData();
    const mapData = maps.find(m => m.id === mapId);
    const guide = guides.find(g => g.mapId === mapId);

    if (!mapData) return <div className="container" style={{ paddingTop: '4rem' }}>Map not found</div>;

    return (
        <div className="guide-page">
            <div className="guide-hero" style={{ backgroundImage: `linear-gradient(to bottom, rgba(15,16,20, 0.7), var(--bg-dark)), url(${mapData.image})` }}>
                <div className="container guide-hero-content">
                    <Link to="/" className="back-link">← Back to Home</Link>
                    <h1>{guide ? guide.title : `${mapData.name} Guide`}</h1>
                    <div className="guide-meta">
                        {guide && <>
                            <span>By {guide.author}</span>
                            <span>•</span>
                            <span>Updated {guide.lastUpdated}</span>
                        </>}
                    </div>
                </div>
            </div>

            <div className="container guide-content-container">
                <main className="guide-main">
                    {!guide ? (
                        <div className="empty-state">
                            <p>Guide for {mapData.name} is currently being written. Check back later!</p>
                            <Link to={`/training/${mapId}`} className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                                View {mapData.name} Grenades
                            </Link>
                        </div>
                    ) : (
                        <div className="guide-sections">
                            {guide.sections.map((section, idx) => (
                                <section key={idx} className="guide-section">
                                    <h3>{section.heading}</h3>
                                    <p>{section.content}</p>
                                    {section.image && (
                                        <img src={section.image} alt={section.heading} className="guide-image" />
                                    )}
                                </section>
                            ))}

                            <div className="guide-cta">
                                <h3>Ready to practice?</h3>
                                <p>Jump into our interactive grenade finder for {mapData.name}.</p>
                                <Link to={`/training/${mapId}`} className="btn btn-primary">
                                    Browse {mapData.name} Nades
                                </Link>
                            </div>
                        </div>
                    )}
                </main>

                <aside className="guide-sidebar">
                    <div className="sidebar-widget">
                        <h4>More Guides</h4>
                        <ul className="widget-list">
                            {maps.filter(m => m.active && m.id !== mapId).slice(0, 5).map(m => (
                                <li key={m.id}>
                                    <Link to={`/guides/${m.id}`}>
                                        <img src={m.icon || m.radar} alt="" />
                                        <span>{m.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default GuideDetail;
