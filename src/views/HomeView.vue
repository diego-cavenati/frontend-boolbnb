<script>
import JumbotronComponent from '../components/JumbotronComponent.vue';
import ShowcaseComponent from '../components/ShowcaseComponent.vue';
import TopPlacesComponent from '../components/TopPlacesComponent.vue';
import CategoryApartmentComponent from '../components/CategoryApartmentComponent.vue';

export default {
    name: 'HomeView',
    components: {
        JumbotronComponent,
        ShowcaseComponent,
        TopPlacesComponent,
        CategoryApartmentComponent
    }
}
</script>

<template>
    <JumbotronComponent />
    <ShowcaseComponent />
    <TopPlacesComponent />
    <CategoryApartmentComponent />
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
</style>
