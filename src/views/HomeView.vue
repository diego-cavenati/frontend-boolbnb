<script>
import JumbotronComponent from '../components/JumbotronComponent.vue';
import ShowcaseComponent from '../components/ShowcaseComponent.vue';
import TopPlacesComponent from '../components/TopPlacesComponent.vue';

export default {
    name: 'HomeView',
    components: {
        JumbotronComponent,
        ShowcaseComponent,
        TopPlacesComponent,
    }
}
</script>

<template>
    <JumbotronComponent />
    <ShowcaseComponent />
    <!-- <TopPlacesComponent /> -->
<!-- <ShowcaseComponent /> --></template>

<style lang="scss" scoped>@use '../assets/scss/general.scss';</style>
