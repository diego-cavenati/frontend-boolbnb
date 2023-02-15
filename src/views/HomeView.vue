<script>
import JumbotronComponent from '../components/JumbotronComponent.vue';
import ShowcaseComponent from '../components/ShowcaseComponent.vue';

export default {
    name: 'HomeView',
    components: {
        JumbotronComponent,
        ShowcaseComponent,
    }
}
</script>

<template>
    <JumbotronComponent />
    <ShowcaseComponent />

</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
</style>
