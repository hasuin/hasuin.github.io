import 'whatwg-fetch';

const LOCALE = 'koKR';
const DATA_URL = `https://api.hearthstonejson.com/v1/latest/${LOCALE}/cards.collectible.json`;

function computeAvailableStats(minions){
    return minions.reduce((map, minion) => {
        let { id, name, attack, health } = minion;
        let stat = `${attack}/${health}`;

        map[stat] = map[stat] || [];
        map[stat].push({ id, name, attack, health });

        return map;
    }, {});
}

export default function fetchJSON(filter = card => card.type === 'MINION'){
    return new Promise((resolve, reject) => fetch(DATA_URL)
        .then(res => res.json())
        .then(json => {
            let minions = json.filter(filter);
            let stats = computeAvailableStats(minions);

            resolve({ minions, stats });
        })
        .catch(err => reject(err)));
}
