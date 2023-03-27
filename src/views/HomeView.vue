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
        const swiper1 = new Swiper('.swiper-1', {
            modules: [Navigation, Autoplay],
            speed: 500,
            direction: 'horizontal',
            loop: true,
            slidesPerView: 1,
            spaceBetween: 50,
            navigation: {
                nextEl: '.swiper-button-next-1',
                prevEl: '.swiper-button-prev-1',
            },
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
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
        const swiper2 = new Swiper('.swiper-2', {
            modules: [Navigation],
            direction: 'horizontal',
            slidesPerView: 1,
            spaceBetween: 50,
            navigation: {
                nextEl: '.swiper-button-next-2',
                prevEl: '.swiper-button-prev-2',
            },
            breakpoints: {
                440: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 4,
                },
                1400: {
                    slidesPerView: 6,

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

<style lang="scss" scoped></style>
