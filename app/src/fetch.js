import 'whatwg-fetch';

const LOCALE = 'koKR';
const DATA_URL = `https://api.hearthstonejson.com/v1/latest/${LOCALE}/cards.collectible.json`;

const FILTER = card => card.type === 'MINION';

export default function fetchJSON(filter = FILTER){
    return new Promise((resolve, reject) => fetch(DATA_URL)
        .then(res => res.json())
        .then(json => resolve(json.filter(filter)))
        .catch(err => reject(err)));
}
