<script>
import App from '../App.vue';
import { store } from '../store';


export default {
    name: 'CardComponent',
    data() {
        return {
            store,
            apartments: [],
        }
    },
    props: ['apartment'],
    methods: {
        getImagePath(path) {
            if (path.startsWith("http")) {
                return path; // Link esterno, restituiscilo direttamente
            } else {
                return this.store.url_back + '/storage/' + path; // Percorso relativo alla cartella storage
            }
        }
    },
    mounted() {
    },
    computed: {
        elementClass() {
            if (this.$route.name === 'home') {
                return '';
            } else {
                return 'col-12 col-md-6 ';
            }
        },
    },
}
</script>

<template>
    <div :class="elementClass">
        <router-link :to="{ name: 'single-apartment', params: { slug: apartment.slug } }">


            <div class="card h-100 border-0">

                <div class="card_img">
                    <div class="badge_promotion" v-if="apartment.subscription">
                        IN EVIDENZA
                    </div>
                    <!-- carousel -->
                    <!-- <div v-if="store.immagineAttiva > 0" @click="PrevImg()">
                                                        <i class="fa-solid fa-circle-chevron-left arrow_left"></i>
                                                        </div>
                                                        <div v-if="store.immagineAttiva != store.images.length - 1" @click="NextImg()">
                                                        <i class="fa-solid fa-circle-chevron-right arrow_right"></i> </div> -->

                    <!-- img thumb -->
                    <img :src="getImagePath(apartment.media) || apartment.media" alt="">
                    <!-- TODO aggiungere funzione per il path SOLO quando torna un img uploadata-->

                </div>

                <div class="card_body text-start d-flex flex-column justify-content-between">
                    <div class="summary">{{ apartment.address }}</div>
                    <h5>{{ apartment.title }}</h5>

                    <div class="info">Ospiti {{ apartment.guests }} - Stanze {{ apartment.total_rooms }} - Letti {{
                        apartment.beds
                    }} - Bagni {{ apartment.baths }} - Mq {{ apartment.mq }}</div>

                    <div>
                        <!-- <div>??????</div> TODO add reviews-->
                        <div class="nights"><span class="price">{{ apartment.price }} ???</span> /notte</div>
                    </div>

                </div>
            </div>
        </router-link>
    </div>
<!-- :link="element.img[store.immagineAttiva] da tenere per il card component--></template>

<style lang="scss">
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;

.badge_promotion {
    background: linear-gradient(89.74deg, $bb-primary 0.19%, $bb-secondary 99.78%);
    border-radius: 1rem;
    padding: 0.3rem 0.8rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1.1rem;
    font-weight: 400;
    color: $bb-lighter;
}

.card_body {
    padding: 1.6rem;
    background-color: $bb-background;
    border-radius: 0 0 1.25rem 1.25rem;
    height: 100%;
}

.card_img {
    display: flex;
    flex-direction: column;

    img {
        border-radius: 1.25rem 1.25rem 0 0;
        max-width: 100%;
        height: 23.5rem;
        max-height: 100%;
        object-fit: cover;
    }
}

.summary {
    font-family: $bb-font-secondary;
    font-size: 1rem;
    letter-spacing: 0.05rem;
    color: $bb-secondary;
    padding-bottom: 0.6rem;
    font-weight: 500;
}

h5 {
    padding-bottom: 0rem;
    color: $bb-dark;
}

.info {
    padding-bottom: 0.8rem;
    color: $bb-text-gray;
}

.price {
    font-size: 1.3rem;
    font-weight: 500;
    font-family: $bb-font-primary;
    color: $bb-darker;

}

.nights {
    color: $bb-dark;
    // position: absolute;
    // bottom: 5%;
    // right: 5%;

}

// ON IF WE HAVE AN CAROUSEL
// .arrow_left {
//     position: absolute;
//     top: 33%;
//     left: 1%;
//     color: whitesmoke;
//     cursor: pointer;
//     font-size: 2rem;

//     &:hover {
//         color: gray;
//     }
// }

// .arrow_right {
//     position: absolute;
//     top: 33%;
//     right: 1%;
//     color: whitesmoke;
//     cursor: pointer;
//     font-size: 2rem;

//     &:hover {
//         color: gray;
//     }
// }
</style>