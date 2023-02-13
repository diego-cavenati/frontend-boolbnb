<script>
import { store } from '../store';
export default {
    name: 'AdvancedSearchView',
    data (){
        return {
            store,
        }
    }
}
</script>

<template>
    <!-- <CardComponent v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" /> -->
    <ul>
        <li v-for="result in store.results">
            {{ result.address }}
        </li>
    </ul>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
</style>
