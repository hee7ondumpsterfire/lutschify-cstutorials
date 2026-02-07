export const eloRanges = [
    {
        id: '1000-4999',
        range: '1,000 – 4,999',
        title: 'Silver I – Gold Nova I',
        color: '#94a3b8', // Gray
        percentage: '16.8%',
        skills: [
            { category: 'Mechanics', description: 'Focus on basic crosshair placement. Stop moving before you shoot (counter-strafing basics).' },
            { category: 'Knowledge', description: 'Learn the layout of active duty maps. Understand the basic economy (when to buy, when to save).' },
            { category: 'Utility', description: 'Practice throwing basic HE grenades and flashes. Don\'t worry about complex lineups yet.' }
        ],
        advice: 'At this level, the biggest impact comes from simply being able to hit your shots. Spend 15 minutes a day in Aim Training maps. Focus on being consistent.'
    },
    {
        id: '5000-9999',
        range: '5,000 – 9,999',
        title: 'Gold Nova II – Master Guardian I',
        color: '#60a5fa', // Light Blue
        percentage: '36.8%',
        skills: [
            { category: 'Mechanics', description: 'Improve your recoil control for the AK-47 and M4. Start practicing small bursts.' },
            { category: 'Teamwork', description: 'Use your microphone. Call out enemy positions clearly and concisely.' },
            { category: 'Utility', description: 'Learn 1-2 essential smokes for your favorite map (e.g., Mirage Window or Stairs).' }
        ],
        advice: 'Communication becomes key here. Start looking at the radar more frequently to understand where your teammates are looking.'
    },
    {
        id: '10000-14999',
        range: '10,000 – 14,999',
        title: 'Master Guardian II – Legendary Eagle',
        color: '#2563eb', // Blue
        percentage: '31.2%',
        skills: [
            { category: 'Strategy', description: 'Understand basic "Defaults". Don\'t just rush one site every round.' },
            { category: 'Mechanics', description: 'Utility usage while moving. Pop-flashing for yourself or teammates.' },
            { category: 'Knowledge', description: 'Learn common "pre-fire" spots and how to clear angles methodically.' }
        ],
        advice: 'Start watching your own demos. Look for every time you died and ask: "Was I in a bad position or did I just miss?"'
    },
    {
        id: '15000-19999',
        range: '15,000 – 19,999',
        title: 'Legendary Eagle Master – SMFC',
        color: '#a855f7', // Purple
        percentage: '12.0%',
        skills: [
            { category: 'Teamwork', description: 'Trading kills. Always stay close enough to a teammate to avenge their death.' },
            { category: 'Economy', description: 'Mastering the buy menu. Knowing when to buy a Galil/Famas to keep momentum.' },
            { category: 'Utility', description: 'Executes. Coordinating multiple smokes and flashes to take a site.' }
        ],
        advice: 'Understanding "Spacing" is vital. Don\'t bait your teammates by standing too far back during a push.'
    },
    {
        id: '20000-24999',
        range: '20,000 – 24,999',
        title: 'Supreme – Global Elite',
        color: '#ec4899', // Pink
        percentage: '1.6%',
        skills: [
            { category: 'Knowledge', description: 'Deep map awareness. Tracking the enemy economy and predicting their buys.' },
            { category: 'Mechanics', description: 'Perfection of movement. Using jumps and skill-jumps to gain unexpected angles.' },
            { category: 'Strategy', description: 'Mid-round calls. Changing the plan based on the information gained in the first 30 seconds.' }
        ],
        advice: 'Specialization helps. Pick a role (Entry, Support, AWP) and study professional players who play that role.'
    },
    {
        id: '25000-29999',
        range: '25,000 – 29,999',
        title: 'Upper Global Elite',
        color: '#ef4444', // Red
        percentage: '<0.1%',
        skills: [
            { category: 'Strategy', description: 'Winning the "Mind Game". Using fakes and rotations to manipulate the enemy team.' },
            { category: 'Teamwork', description: 'Cross-fires. Setting up defensive positions where you and a friend cover each other.' },
            { category: 'Utility', description: 'Advanced flashbangs that don\'t blind your own team but fully white the enemies.' }
        ],
        advice: 'Stop "autopiloting". Every move you make should have a reason. If you\'re pushed, ask yourself why.'
    },
    {
        id: '30000plus',
        range: '30,000+',
        title: 'Professional Level',
        color: '#eab308', // Yellow
        percentage: '<0.1%',
        skills: [
            { category: 'Clutching', description: 'Composure in 1vX situations. Effective use of sound and timing to isolate duels.' },
            { category: 'Teamwork', description: 'Systematic play. Executing set-pieces with 100% reliability.' },
            { category: 'Strategy', description: 'Total Adaptation. Reading the enemy\'s tendencies and countering them on the fly.' }
        ],
        advice: 'Consistency is what separates a pug-star from a pro. Focus on your mental health and avoiding tilt to stay at peak performance.'
    }
];
