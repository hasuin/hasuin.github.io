<template lang="pug">
    #app
        section.section: .container
            h1.title.is-2.has-text-centered {{ question }}
            .columns.is-multiline
                minion(v-for='minion in minions', :minion='minion', :status='status', :key='minion.id', @choose='choose(minion)')
            .has-text-centered
                a.button.is-white.is-large(@click='openModal')
                    span 점수: {{ status.kill }}/{{ status.death }}
                    span.icon: i.fa.fa-question
        hasuin-footer(:status='status')
        card-modal(:status='modalStatus', @close='closeModal')
</template>

<script>
    import 'noto-sans-kr';
    import 'bulma/css/bulma.css';
    import 'font-awesome/css/font-awesome.min.css';

    import init from './src/init';
    import make from './src/make';

    import Minion from './components/Minion.vue';
    import CardModal from './components/CardModal.vue';
    import HasuinFooter from './layouts/HasuinFooter.vue';

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

                    question: () => 'Hasuin',
                    explain: () => '......!',

                    answer: null, chosen: false, correct: false,

                },

                modalStatus: {
                    show: false, card: null
                },

                factory: null
            }
        },

        computed: {
            question(){
                return this.status.question(this.status.answer);
            }
        },

        components: {
            Minion,
            CardModal,
            HasuinFooter
        },

        created(){
            init().then(db => {
                this.factory = make(db);
                this.update();
            });
        },

        methods: {
            update(){
                let product = this.factory();

                this.minions = product.minions;
                this.status.question = product.question;
                this.status.explain = product.explain;

                this.status.chosen = false;
                this.status.answer = this.minions[Math.floor(Math.random() * this.minions.length)];
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

    #app {
        display: flex;
        min-height: 100vh;
        flex-direction: column;
    }

    section {
        flex: 1 0 auto;
    }
</style>
