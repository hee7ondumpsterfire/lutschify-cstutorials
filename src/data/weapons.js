export const weapons = [
    {
        id: 'ak47',
        name: 'AK-47',
        type: 'Rifle',
        side: 'T',
        magazine: 30,
        rpm: 600,
        damage: 36, // Body shot armor
        image: 'https://preview.redd.it/counter-strike-2-ak-47-classic-v0-4m5s6o7r60kb1.png?width=1569&format=png&auto=webp&s=6b8d4e4c27806f15668e16972750849303358826', // Placeholder
        pattern: [
            { x: 0, y: 0 },
            { x: 0, y: 3 }, { x: 0.5, y: 7 }, { x: -0.5, y: 12 }, { x: -1, y: 18 }, { x: -0.5, y: 24 }, // Rise
            { x: 0, y: 29 }, { x: 1, y: 33 }, { x: 2, y: 35 }, { x: 4, y: 36 }, // curve right
            { x: 6, y: 36 }, { x: 9, y: 35 }, { x: 12, y: 33 }, { x: 14, y: 30 }, { x: 15, y: 28 }, // hard right
            { x: 14, y: 28 }, { x: 11, y: 28 }, { x: 7, y: 29 }, { x: 2, y: 30 }, { x: -3, y: 31 }, // swing left
            { x: -8, y: 31 }, { x: -12, y: 30 }, { x: -14, y: 29 }, { x: -15, y: 28 }, { x: -14, y: 28 }, // hard left
            { x: -10, y: 28 }, { x: -5, y: 29 }, { x: 0, y: 30 }, { x: 4, y: 30 }, { x: 6, y: 29 } // settle
        ]
    },
    {
        id: 'm4a4',
        name: 'M4A4',
        type: 'Rifle',
        side: 'CT',
        magazine: 30,
        rpm: 666,
        damage: 23,
        pattern: [
            { x: 0, y: 0 },
            { x: 0, y: 3 }, { x: 0.2, y: 6 }, { x: 0.5, y: 10 }, { x: 0.2, y: 15 }, { x: 0, y: 20 },
            { x: -0.5, y: 24 }, { x: -1.5, y: 27 }, { x: -2, y: 30 }, { x: -1, y: 32 },
            { x: 2, y: 33 }, { x: 5, y: 33 }, { x: 8, y: 32 }, { x: 10, y: 30 }, { x: 11, y: 28 },
            { x: 10, y: 28 }, { x: 7, y: 29 }, { x: 3, y: 30 }, { x: -1, y: 31 }, { x: -5, y: 31 },
            { x: -8, y: 30 }, { x: -10, y: 29 }, { x: -11, y: 28 }, { x: -10, y: 28 }, { x: -7, y: 28 },
            { x: -4, y: 29 }, { x: 0, y: 30 }, { x: 3, y: 30 }, { x: 5, y: 29 }, { x: 6, y: 28 }
        ]
    },
    {
        id: 'aug',
        name: 'AUG',
        type: 'Rifle',
        side: 'CT',
        magazine: 30,
        rpm: 666,
        damage: 28,
        pattern: [
            { x: 0, y: 0 },
            { x: 1, y: 2 }, { x: 2, y: 5 }, { x: 3, y: 9 }, { x: 4, y: 14 },
            { x: 5, y: 19 }, { x: 6, y: 24 }, { x: 5, y: 27 }, { x: 4, y: 29 },
            { x: 2, y: 30 }, { x: 0, y: 31 }, { x: -2, y: 31 }, { x: -5, y: 31 },
            { x: -8, y: 30 }, { x: -10, y: 28 }, { x: -9, y: 27 }, { x: -7, y: 27 },
            { x: -4, y: 28 }, { x: -1, y: 29 }, { x: 2, y: 30 }, { x: 5, y: 31 },
            { x: 8, y: 31 }, { x: 10, y: 30 }, { x: 11, y: 28 }, { x: 10, y: 27 },
            { x: 8, y: 27 }, { x: 5, y: 28 }, { x: 2, y: 29 }, { x: 0, y: 30 }, { x: -2, y: 29 }
        ]
    },
    {
        id: 'sg553',
        name: 'SG 553',
        type: 'Rifle',
        side: 'T',
        magazine: 30,
        rpm: 545,
        damage: 30,
        pattern: [
            { x: 0, y: 0 },
            { x: -1, y: 2 }, { x: -2, y: 5 }, { x: -4, y: 9 }, { x: -6, y: 14 },
            { x: -9, y: 19 }, { x: -12, y: 24 }, { x: -10, y: 27 }, { x: -7, y: 29 },
            { x: -4, y: 30 }, { x: -1, y: 31 }, { x: 2, y: 31 }, { x: 5, y: 31 },
            { x: 8, y: 30 }, { x: 10, y: 28 }, { x: 9, y: 27 }, { x: 7, y: 27 },
            { x: 4, y: 28 }, { x: 1, y: 29 }, { x: -2, y: 30 }, { x: -5, y: 31 },
            { x: -8, y: 31 }, { x: -10, y: 30 }, { x: -11, y: 28 }, { x: -10, y: 27 },
            { x: -8, y: 27 }, { x: -5, y: 28 }, { x: -2, y: 29 }, { x: 0, y: 30 }, { x: 2, y: 29 }
        ]
    },
    {
        id: 'm4a1s',
        name: 'M4A1-S',
        type: 'Rifle',
        side: 'CT',
        magazine: 20,
        rpm: 600,
        damage: 26,
        pattern: [
            { x: 0, y: 0 },
            { x: 0, y: 2 }, { x: 0, y: 5 }, { x: 0, y: 9 }, { x: 0, y: 13 },
            { x: 0.5, y: 17 }, { x: 1, y: 20 }, { x: 1.5, y: 23 }, { x: 2, y: 25 },
            { x: 1, y: 26 }, { x: 0, y: 27 }, { x: -2, y: 28 }, { x: -4, y: 28 },
            { x: -5, y: 28 }, { x: -4, y: 28 }, { x: -2, y: 28 }, { x: 0, y: 27 },
            { x: 2, y: 26 }, { x: 3, y: 25 }, { x: 4, y: 24 }
        ]
    }
];
