import pick from './pick';
import shuffle from './shuffle';

export default function make(db){
    const list = Object.values(db.get('stats').value());
    return () => {
        let minions = shuffle(list).slice(0, 5).map(pick);
        return { minions, answer: pick(minions) };
    };
}
