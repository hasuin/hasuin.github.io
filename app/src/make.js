import pick from './pick';

const CLASS = {
    DRUID: '드루이드',
    HUNTER: '사냥꾼',
    MAGE: '마법사',
    NEUTRAL: '중립',
    PALADIN: '성기사',
    PRIEST: '사제',
    ROGUE: '도적',
    SHAMAN: '주술사',
    WARLOCK: '흑마법사',
    WARRIOR: '전사'
};

// let races = {
//     MECHANICAL: '기계',
//     MURLOC: '멀록',
//     BEAST: '야수',
//     DEMON: '악마',
//     DRAGON: '용족',
//     TOTEM: '토템',
//     PIRATE: '해적'
// };

let types = [
    {
        exclude: minion => false,
        compare: (a, b) => a.attack === b.attack && a.health === b.health,
        question: minion => `${minion.attack}/${minion.health} 하수인`,
        explain: minion => `${minion.attack}/${minion.health}`
    },

    {
        exclude: minion => false,
        compare: (a, b) => a.cost === b.cost,
        question: minion => `비용이 (${minion.cost})인 하수인`,
        explain: minion => `(${minion.cost})`
    },

    Object.entries(CLASS).map(([value, name]) => ({
        exclude: minion => false,
        compare: (a, b) => a.playerClass === b.playerClass,
        question: minion => `${CLASS[minion.playerClass]} 카드`,
        explain: minion => CLASS[minion.playerClass]
    }))
];

function random(array){
    return array[Math.floor(Math.random() * array.length)];
}

export default function make(db){
    const minions = db.get('minions').value();
    return () => {
        let type = random(types);
        if(Array.isArray(type)) type = random(type);

        return {
            minions: pick(minions, type.compare, 5),
            question: type.question, explain: type.explain
        };
    }
}
