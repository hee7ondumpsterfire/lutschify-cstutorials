export const initialTacticsModules = [
    {
        id: 'defaults',
        title: "1. Playing the Default",
        difficulty: "Essential",
        description: "The standard way to start a round. Spreading out to gather information and holding for aggression before committing to a site.",
        details: [
            "Maintain map presence across all lanes.",
            "Listen for utility sound cues and rotations.",
            "Wait for the enemy to make a mistake or waste utility."
        ],
        icon: "🛡️"
    },
    {
        id: 'executes',
        title: "2. Site Executes",
        difficulty: "Intermediate",
        description: "Coordinated utility usage (smokes, molotovs, flashes) to isolate defenders and take control of a bomb site.",
        details: [
            "Time smokes to land simultaneously.",
            "Use flashes to blind common 'anchor' positions.",
            "Entry fraggers must clear specific angles in order."
        ],
        icon: "💣"
    },
    {
        id: 'map-control',
        title: "3. Fast Map Control",
        difficulty: "Advanced",
        description: "Aggressively taking key areas (e.g., Banana on Inferno, Middle on Mirage) early in the round to pin the defenders back.",
        details: [
            "Use 'god-flashes' to support the push.",
            "Commit utility early to deny enemy vision.",
            "Trade kills immediately if the entry player dies."
        ],
        icon: "🚩"
    },
    {
        id: 'retakes',
        title: "4. The Retake Phase",
        difficulty: "Intermediate",
        description: "A coordinated push by the CTs to regain control of a planted bomb site while utility is limited.",
        details: [
            "Wait for teammates to arrive; do not peek one by one.",
            "Clear 'clutch' spots and common post-plant angles.",
            "Use remaining utility to force defenders out of cover."
        ],
        icon: "🔄"
    }
];
