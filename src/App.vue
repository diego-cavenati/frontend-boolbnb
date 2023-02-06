<script>
import { store } from './store';

export default {
    name: 'App',
    data() {
        return {
            store
        }
    },
    components: {
    }
}
</script>

<template>
    <router-view></router-view>
</template>

<style lang="scss" scoped>
@use './assets/scss/general.scss';
</style>
