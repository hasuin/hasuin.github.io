<template lang="pug">
    .column
        a.button.is-medium.is-fullwidth(@click='choose', :class='color + outline') {{ minion.name }}
            span(v-if='status.show') &nbsp; {{ minion.attack }}/{{ minion.health }}
</template>

<script>
    export default {
        props: ['minion', 'status', 'answer'],
        computed: {
            color(){
                if(!this.status.show) return 'is-info';

                if(this.status.correct) return 'is-success';
                else return 'is-danger';
            },

            outline(){
                if(!this.status.show || !this.answer) return ' is-outlined';
                else return '';
            }
        },

        methods: {
            choose(){
                console.log(this.minion, 'clicked')
                this.$emit('choose');
            }
        }
    }
</script>

<style lang="css">
</style>
