import React from 'react';
import './Impressum.css';

const Impressum = () => {
    return (
        <div className="container impressum-page">
            <div className="glass-panel impressum-content">
                <h1>Legal Notice (Impressum)</h1>

                <section className="impressum-section">
                    <h2>Contact Information</h2>
                    <p>Max Wittig</p>
                    <p>Schönbühlring 68</p>
                    <p>6020 Emmenbrücke</p>
                    <p>Switzerland</p>
                    <p>
                        Email: <a href="mailto:maxtinowittig+aura@gmail.com">maxtinowittig+aura@gmail.com</a>
                    </p>
                    <p>
                        Website: <a href="https://maxapps.org" target="_blank" rel="noopener noreferrer">maxapps.org</a>
                    </p>
                </section>

                <section className="impressum-section">
                    <h2>Authorized Representative</h2>
                    <p>Max Wittig, Owner</p>
                </section>

                <section className="impressum-section">
                    <h2>Disclaimer</h2>
                    <p>
                        The author assumes no liability for the correctness, accuracy, timeliness, reliability, and completeness of the information provided.
                    </p>
                    <p>
                        Liability claims against the author for material or immaterial damage resulting from access to or use/non-use of the published information, misuse of the connection, or technical faults are excluded.
                    </p>
                    <p>
                        All offers are non-binding. The author expressly reserves the right to change, supplement, or delete parts of the pages or the entire offer without separate announcement or to temporarily or permanently cease publication.
                    </p>
                </section>

                <section className="impressum-section">
                    <h2>Disclaimer for Links</h2>
                    <p>
                        References and links to third-party websites lie outside our scope of responsibility. No responsibility is accepted for such websites. Access to and use of such websites are at the user's own risk.
                    </p>
                </section>

                <section className="impressum-section">
                    <h2>Copyrights</h2>
                    <p>
                        The copyright and all other rights to content, images, photos, or other files on this website belong exclusively to Max Wittig or the specifically named rights holders. The prior written consent of the copyright holder must be obtained for the reproduction of any elements.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Impressum;
