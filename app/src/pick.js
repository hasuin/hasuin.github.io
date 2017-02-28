export default function pick(list, compare, amount = 5){
    let result = [];
    let next = list.slice();

    while(result.length < amount){
        let item = next[Math.floor(Math.random() * next.length)];

        result.push(item);
        next = next.filter(i => !compare(i, item));
    }

    return result;
};
