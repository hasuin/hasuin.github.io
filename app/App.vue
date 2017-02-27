<template lang="pug">
    #app
        section.section: .container
            h1.title.is-2.has-text-centered {{ answer.attack }}/{{ answer.health }} 하수인
            .columns.is-multiline
                minion(v-for='minion in minions', :minion='minion', :answer='answer.id === minion.id', :key='minion.id', @choose='choose(minion)', :status='status')
</template>

<script>
    import 'noto-sans-kr';
    import 'bulma/css/bulma.css';

    import init from './src/init';
    import make from './src/make';
    import Minion from './components/Minion.vue';

    let updateQuestion = null;

    let data = {
        status: {
            show: false,
            correct: false
        },
        minions: [],
        answer: {
            attack: 0, health: 0
        }
    };

    export default {
        name: 'app',

        data: () => data,
        components: { Minion },

        created(){
            init().then(db => (updateQuestion = make(db, data))());
        },

        methods: {
            choose(theMinion){
                if(this.status.show){
                    this.status.show = false;
                    return updateQuestion();
                }
                
                this.status.show = true;
                this.status.correct = this.answer.id === theMinion.id;
            }
        }
    }
</script>

<style scoped>
    * {
        font-family: 'Noto Sans Korean', sans-serif;
    }
</style>
