import pick from './pick';
import shuffle from './shuffle';

export default function make(db, data){
    let stats = db.get('stats').value();

    return () => {
        let minionLists = shuffle(Object.values(stats)).slice(0, 5);

        data.minions = minionLists.map(minions => pick(minions));
        data.answer = pick(data.minions);
    };
}
