<script>
import JumbotronComponent from '../components/JumbotronComponent.vue';
import ShowcaseComponent from '../components/ShowcaseComponent.vue';
import TopPlacesComponent from '../components/TopPlacesComponent.vue';
import CategoryApartmentComponent from '../components/CategoryApartmentComponent.vue';
import Swiper, { Navigation, Autoplay } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';

export default {
    name: 'HomeView',
    components: {
        JumbotronComponent,
        ShowcaseComponent,
        TopPlacesComponent,
        CategoryApartmentComponent
    }, mounted() {
        const swiper = new Swiper('.swiper', {
            // Optional parameters
            modules: [Navigation, Autoplay],
            speed: 500,
            direction: 'horizontal',
            loop: true,
            slidesPerView: 1,
            spaceBetween: 50,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                // when window width is >= 320px
                // when window width is >= 480px
                // when window width is >= 640px
                992: {
                    slidesPerView: 3,
                    spaceBetween: 40,

                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }

        });
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
