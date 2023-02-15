<script>
export default {
    name: 'ShowAllComponent',
    components: {
    },
    data() {
        return {
        }
    },
    computed: {

    },
    methods: {

    },

}
</script>

<template>
    <router-link :to="{ name: 'search' }">
        <button class="button">Vedi tutti</button>
    </router-link>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;
</style>