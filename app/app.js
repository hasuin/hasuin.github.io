import 'babel-polyfill';

import 'noto-sans-kr'
import 'bulma/css/bulma.css';

import Vue from 'vue';
import App from './App.vue';

new Vue({
    el: '#app',
    render: h => h(App)
});