<template lang="pug">
    #app
        section.section: .container
            h1.title.is-2.has-text-centered 7/7 하수인
            .columns.is-desktop
                .column
                    a.button.is-outlined.is-info.is-medium.is-fullwidth 용암 광전사
                .column
                    a.button.is-outlined.is-info.is-medium.is-fullwidth 완전히 정신 나간 폭격수
                .column
                    a.button.is-outlined.is-info.is-medium.is-fullwidth 누군가 조종하는 하늘 골렘
                .column
                    a.button.is-outlined.is-info.is-medium.is-fullwidth 얼굴 없는 화염투사
                .column
                    a.button.is-outlined.is-info.is-medium.is-fullwidth 안녕로봇
</template>

<style scoped>
    * {
        font-family: 'Noto Sans Korean', sans-serif;
    }
</style>

<script>
    export default {
        name: 'app',
        data: () => ({ msg: 'Hello' })
    }
</script>
