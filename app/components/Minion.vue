<template lang="pug">
    .column
        a.button.is-medium.is-fullwidth(@click='choose', :class='color + " " + state') {{ minion.name }}
            span(v-if='status.chosen') &nbsp;- {{ explaination }}
</template>

<script>
    export default {
        props: ['minion', 'status'],
        computed: {
            color(){
                return !this.status.chosen ? 'is-info' :
                    this.status.correct ? 'is-success' : 'is-danger';
            },

            state(){
                return !this.status.chosen ? 'is-outlined' :
                    this.status.answer === this.minion ? '' :
                    this.status.chosen === this.minion ? 'is-disabled' : 'is-outlined';
            },

            explaination(){
                return this.status.explain(this.minion);
            }
        },

        methods: {
            choose(){
                console.log(this.minion.id)
                this.$emit('choose');
            }
        }
    }
</script>
