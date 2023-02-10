<script>
import { store } from './store';
import CardComponent from './components/CardComponent.vue';
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
    name: 'App',
    data() {
        return {
            store
        }
    },
    components: {
        CardComponent,
        NavbarComponent,
        FooterComponent
    }
}
</script>

<template>

    <NavbarComponent />
    <router-view></router-view>

    <FooterComponent />

</template>

<style lang="scss" scoped>
@use './assets/scss/general.scss';
</style>
