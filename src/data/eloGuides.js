export const eloRanges = [
    {
        id: 'start-2500',
        range: '0 - 2,500',
        title: 'The Learning Grounds',
        color: '#94a3b8', // Silver/Grey
        skills: [
            { category: 'Mechanics', description: 'Focus on basic crosshair placement. Stop moving before you shoot (counter-strafing basics).' },
            { category: 'Knowledge', description: 'Learn the layout of active duty maps. Understand the basic economy (when to buy, when to save).' },
            { category: 'Utility', description: 'Practice throwing basic HE grenades and flashes. Don\'t worry about complex lineups yet.' }
        ],
        advice: 'At this level, the biggest impact comes from simply being able to hit your shots. Spend 15 minutes a day in Aim Training maps. Focus on being consistent.'
    },
    {
        id: '5000',
        range: '2,501 - 5,000',
        title: 'Rising Aspirants',
        color: '#fbbf24', // Yellow/Gold
        skills: [
            { category: 'Mechanics', description: 'Improve your recoil control for the AK-47 and M4. Start practicing small bursts.' },
            { category: 'Teamwork', description: 'Use your microphone. Call out enemy positions clearly and concisely.' },
            { category: 'Utility', description: 'Learn 1-2 essential smokes for your favorite map (e.g., Mirage Window or Stairs).' }
        ],
        advice: 'Communication becomes key here. Start looking at the radar more frequently to understand where your teammates are looking.'
    },
    {
        id: '7500',
        range: '5,001 - 7,500',
        title: 'Tactical Novices',
        color: '#3b82f6', // Blue
        skills: [
            { category: 'Strategy', description: 'Understand basic "Defaults". Don\'t just rush one site every round.' },
            { category: 'Mechanics', description: 'Utility usage while moving. Pop-flashing for yourself or teammates.' },
            { category: 'Knowledge', description: 'Learn common "pre-fire" spots and how to clear angles methodically.' }
        ],
        advice: 'Start watching your own demos. Look for every time you died and ask: "Was I in a bad position or did I just miss?"'
    },
    {
        id: '10000',
        range: '7,501 - 10,000',
        title: 'The Competitive Core',
        color: '#8b5cf6', // Purple
        skills: [
            { category: 'Teamwork', description: 'Trading kills. Always stay close enough to a teammate to avenge their death.' },
            { category: 'Economy', description: 'Mastering the buy menu. Knowing when to buy a Galil/Famas to keep momentum.' },
            { category: 'Utility', description: 'Executes. Coordinating multiple smokes and flashes to take a site.' }
        ],
        advice: 'Understanding "Spacing" is vital. Don\'t bait your teammates by standing too far back during a push.'
    },
    {
        id: '12500',
        range: '10,001 - 12,500',
        title: 'Elite Competitors',
        color: '#ec4899', // Pink
        skills: [
            { category: 'Knowledge', description: 'Deep map awareness. Tracking the enemy economy and predicting their buys.' },
            { category: 'Mechanics', description: 'Perfection of movement. Using jumps and skill-jumps to gain unexpected angles.' },
            { category: 'Strategy', description: 'Mid-round calls. Changing the plan based on the information gained in the first 30 seconds.' }
        ],
        advice: 'Specialization helps. Pick a role (Entry, Support, AWP) and study professional players who play that role.'
    },
    {
        id: '15000',
        range: '12,501 - 15,000',
        title: 'Master Tacticians',
        color: '#ef4444', // Red
        skills: [
            { category: 'Strategy', description: 'Winning the "Mind Game". Using fakes and rotations to manipulate the enemy team.' },
            { category: 'Teamwork', description: 'Cross-fires. Setting up defensive positions where you and a friend cover each other.' },
            { category: 'Utility', description: 'Advanced flashbangs that don\'t blind your own team but fully white the enemies.' }
        ],
        advice: 'Stop "autopiloting". Every move you make should have a reason. If you\'re pushed, ask yourself why.'
    },
    {
        id: 'pro',
        range: '15,000+',
        title: 'The Respected Carry',
        color: '#f97316', // Orange/Fire
        skills: [
            { category: 'Clutching', description: 'Composure in 1vX situations. Effective use of sound and timing to isolate duels.' },
            { category: 'Teamwork', description: 'Systematic play. Executing set-pieces with 100% reliability.' },
            { category: 'Strategy', description: 'Total Adaptation. Reading the enemy\'s tendencies and countering them on the fly.' }
        ],
        advice: 'Consistency is what separates a pug-star from a pro. Focus on your mental health and avoiding tilt to stay at peak performance.'
    }
];
