import low from 'lowdb';
import fetch from './fetch';

const db = low('db');

export default function init(){
    return new Promise((resolve, reject) => {
        if(hasData()) resolve(db);
        else fetch()
            .then(data => db
                .set('stats', data.stats)
                .set('minions', data.minions)
                .set('update', Date.now()).write())
            .then(() => resolve(db))
            .catch(err => reject(err));
    });
}

function hasData(){
    return ['update', 'minions', 'stats'].every(name => db.has(name).value())
        && Math.abs(Date.now() - parseInt(db.get('update').value())) < 604800000; //7d
}
