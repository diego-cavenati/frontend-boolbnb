<script>
export default {
    name: 'AdvancedSearchView',
}
</script>

<template>
    <!-- <CardComponent v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" /> -->
    <ul>
        <li v-for="result in results" :key="result.poi.name">
            {{ result.poi.name }} - {{ result.address.freeformAddress }}
        </li>
    </ul>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
</style>
