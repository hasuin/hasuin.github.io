import low from 'lowdb';
import fetch from './fetch';

const db = low('db');

export default function init(){
    return new Promise((resolve, reject) => {
        if(hasData()) return resolve(db);

        fetch()
            .then(minions => db
                .set('minions', minions)
                .set('update', Date.now()).write())
            .then(() => resolve(db))
            .catch(err => reject(err));
    });
}

function hasData(){
    return db.has('update').value() &&
        Math.abs(Date.now() - db.get('update').value()) < 604800000; //7d
}
