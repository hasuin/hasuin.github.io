<template lang="pug">
    #app
        section.section: .container
            h1.title.is-2.has-text-centered {{ status.answer.attack }}/{{ status.answer.health }} 하수인
            .columns.is-multiline
                minion(v-for='minion in minions', :minion='minion', :status='status', :key='minion.id', @choose='choose(minion)')
            .has-text-centered
                a.button.is-white.is-large(@click='openModal')
                    span 점수: {{ status.kill }}/{{ status.death }}
                    span.icon: i.fa.fa-question

        card-modal(:status='modalStatus', @close='closeModal')

        footer.footer: .container
            .content.has-text-centered
                p: a.icon(href='https://github.com/hasuin/hasuin.github.io')
                    i.fa.fa-github
                p
                    strong Hasuin
                    | &nbsp;by&nbsp;
                    a(href='http://chalk.pe') ChalkPE
                    | .

                p The source code is licensed under the&nbsp;
                    a(href='http://opensource.org/licenses/mit-license.php') MIT License
                    | .
                p This website contains Hearthstone data that is copyright © Blizzard Entertainment.
                p This website is not affiliated with Blizzard Entertainment.
</template>

<script>
    import 'noto-sans-kr';
    import 'bulma/css/bulma.css';
    import 'font-awesome/css/font-awesome.min.css';

    import init from './src/init';
    import make from './src/make';

    import Minion from './components/Minion.vue';
    import CardModal from './components/CardModal.vue';

    export default {
        name: 'app',

        data(){
            return {
                minions: [{
                    attack: 0, health: 0,
                    name: '잠시만 기다려주세요'
                }, {
                    attack: 0, health: 0,
                    name: '카드 정보를 가져오는 중입니다'
                }],
                status: {
                    kill: 0, death: 0,
                    chosen: false, correct: false,
                    answer: { attack: 0, health: 0 }
                },

                modalStatus: {
                    show: false, card: null
                },

                factory: null
            }
        },
        components: { Minion, CardModal },

        created(){
            init().then(db => {
                this.factory = make(db);
                this.update();
            });
        },

        methods: {
            update(){
                let problem = this.factory();
                this.minions = problem.minions;

                this.status.chosen = false;
                this.status.answer = problem.answer;
            },

            choose(chosen){
                if(this.status.chosen) return this.update();

                this.status.chosen = chosen;
                this.status.correct = this.status.answer.id === chosen.id;

                this.status[this.status.correct ? 'kill' : 'death']++;
            },

            openModal(){
                if(!this.status.chosen) return;
                this.modalStatus.show = true;
                this.modalStatus.card = this.status.answer;
            },
            
            closeModal(){
                this.modalStatus.show = false;
            }
        }
    }
</script>

<style scoped>
    * {
        font-family: 'Noto Sans Korean', sans-serif;
    }
</style>
