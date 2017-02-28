<template lang="pug">
    .modal(:class='active')
        .modal-background
        .modal-content.has-text-centered
            h1.title.is-3.is-marginless.is-paddingless {{ card.name }}
            img(:src='"http://media.services.zam.com/v1/media/byName/hs/cards/enus/" + card.id + ".png"')
        button.modal-close(@click='close')
</template>

<script>
    export default {
        props: ['status'],
        computed: {
            active(){
                return this.status.show ? 'is-active' : '';
            },

            card(){
                return this.status.card || {
                    attack: 0, health: 0,
                    id: 'CS2_118', name: '오류 발생!'
                };
            }
        },

        methods: {
            close(){
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>
    h1 {
        color: white;
    }
</style>
