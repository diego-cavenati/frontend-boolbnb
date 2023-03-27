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
    },
    data() {
        return {
            isMobileView: false,
        };
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.isMobileView = window.innerWidth <= 744;
        },
    },
    computed: {
        isHomepage() {
            return this.$route.path === '/';
        },
        showSearchbar() {
            return this.isHomepage && this.isMobileView;
        },
    },
}
</script>

<template>
    <NavbarComponent v-if="!isHomepage" />
    <NavbarComponent :show-searchbar="showSearchbar" v-else />

    <router-view></router-view>

    <FooterComponent />
</template>

<style lang="scss" scoped></style>
