<script>

import { store } from './store';
import CardComponent from './components/CardComponent.vue';
import NavbarComponent from './components/NavbarComponent.vue';

export default {
    name: 'App',
    data() {
        return {
            store
        }
    },
    components: {
        CardComponent,
        NavbarComponent
    }
}
</script>

<template>

    <NavbarComponent />
    <router-view></router-view>
    


</template>

<style lang="scss" scoped>
@use './assets/scss/general.scss';
</style>
