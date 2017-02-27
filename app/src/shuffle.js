export default function shuffle(array){
    return array.map(i => [Math.random(), i]).sort().map(i => i[1]);
}
