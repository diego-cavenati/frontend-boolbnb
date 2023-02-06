<script>
import { store } from '../store';
import CardComponent from './CardComponent.vue';

export default {
    name: 'ShowcaseComponent',
    data() {
        return {
            store
        }
    },
    components: {
        CardComponent,
    }
}
</script>

<template>
    <!-- Single card -->
    <CardComponent v-for="element in store.images" :link="element.img[0]" />
    <!-- :link="element.img[store.immagineAttiva] da tenere per il card component-->
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
</style>