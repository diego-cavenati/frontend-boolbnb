<script>
import { store } from './store';
import CardComponent from './components/CardComponent.vue';

export default {
    name: 'App',
    data() {
        return {
            store
        }
    },
    components: {
        CardComponent
    }
}
</script>

<template>
    <router-view></router-view>
    <CardComponent v-for="element in store.images" :link="element.img[0] "/>
        <!-- :link="element.img[store.immagineAttiva] da tenere per il card component-->
</template>

<style lang="scss" scoped>
@use './assets/scss/general.scss';
</style>
