<template lang="pug">
    footer.footer: .container
        .content.has-text-centered
            p
                a.button.is-medium.is-link(href='https://github.com/hasuin/hasuin.github.io')
                    span.icon.is-medium: i.fa.fa-github-alt

                a.button.is-medium.is-link(:href='"http://www.facebook.com/sharer.php?u=" + encodeURIComponent(url)')
                    span.icon.is-medium: i.fa.fa-facebook-square

                a.button.is-medium.is-link(:href='"https://twitter.com/intent/tweet?text=" + encodeURIComponent(text)')
                    span.icon.is-medium: i.fa.fa-twitter

            p
                strong Hasuin
                | &nbsp;by&nbsp;
                a(href='http://chalk.pe') ChalkPE
                | .
            p
                | The source code is licensed under the&nbsp;
                a(href='http://opensource.org/licenses/mit-license.php') MIT License
                | .
            p
                | This website contains&nbsp;
                a(href='http://playhearthstone.com') Hearthstone
                | &nbsp;data that is copyright © Blizzard Entertainment.
            p
                | This website is not affiliated with&nbsp;
                a(href='http://blizzard.com') Blizzard Entertainment
                | .
</template>

<script>
    export default {
        props: ['status'],
        computed: {
            url: () => 'https://hasuin.github.io',
            text(){
                return `#hasuin ${this.status.kill}/${this.status.death}점 달성! https://hasuin.github.io`;
            }
        }
    }
</script>

<style scoped>
    .icon {
        color: black;
    }
</style>
