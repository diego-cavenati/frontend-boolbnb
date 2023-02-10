<script>
import App from '../App.vue';
import { store } from '../store';
import axios from 'axios';

export default {
    name: 'CardComponent',
    data() {
        return {
            store,
            // error: null,
            apartments: [],
            // loading: true,
            // base_api_url: 'http://127.0.0.1:8000/api/apartments?page=2',
            // max: 100,
        }
    },
    props: ['apartment'],
    methods: {
        /* 
        NextImg: function () { //TODO fix. cambiare il ciclo 
            for (let index = 0; index < store.images.length; index++) {
                const element = store.images[index];
            }
            if (store.immagineAttiva < store.images.length -1) {
                store.immagineAttiva++
            } else {
                store.immagineAttiva = 0
            }
        },

        */
        /*
        PrevImg: function () {
            for (let index = 0; index < store.images.length; index++) {
                const element = store.images[index];
            }
            if (store.immagineAttiva === 0) {
                store.immagineAttiva = element.img.length -1
            } else {
                store.immagineAttiva--
            }
        }
        */
    },
    // created() {
    //     axios.get('http://127.0.0.1:8000/api/apartments')
    //         .then(response => {
    //             console.log('FUNZIONO');
    //             console.log(response.data.results.data);
    //             this.apartments = response.data.results.data;
    //             // this.apartments = response.data.
    //             this.loading = false;
    //         })
    //         .catch(error => {
    //             console.error(error)
    //             this.error = error.message;
    //             this.loading = false;
    //         })
    // },
    mounted() {
    }
}
</script>

<template>

    <div class="col-4">
        <div class="card border-0">

            <div class="card_img">
                <!-- carousel -->
                <!-- <div v-if="store.immagineAttiva > 0" @click="PrevImg()">
                    <i class="fa-solid fa-circle-chevron-left arrow_left"></i>
                </div>
                <div v-if="store.immagineAttiva != store.images.length - 1" @click="NextImg()">
                    <i class="fa-solid fa-circle-chevron-right arrow_right"></i>
                </div> -->
                <!-- img thumb -->
                <img :src="apartment.media" :class="classe" alt="">

            </div>

            <div class="card-body text-start">
                <!-- <div class="summary">Appartmaneto - {{ apartment.address }}</div> -->
                <h5>{{ apartment.title }}</h5>

                <div class="info">Ospiti {{ apartment.guests }} - Stanze {{ apartment.total_rooms }} - Letti {{
                    apartment.beds
                }} - Bagni {{ apartment.baths }} - Mq {{ apartments.mq }}</div>

                <div class="d-flex justify-content-end">
                    <!-- <div>⭐️</div> TODO add reviews-->
                    <div><span class="price">{{ apartment.price }} €</span> /notte</div>
                </div>

            </div>
        </div>
    </div>
    <!-- :link="element.img[store.immagineAttiva] da tenere per il card component-->
</template>

<style lang="scss">
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;

.card-body {
    padding: 1.6rem;
    background-color: $bb-background;
    border-radius: 0 0 1.25rem 1.25rem;
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
}

.info {
    padding-bottom: 0.8rem;
    color: $bb-text-gray;
}

.price {
    font-size: 1.3rem;
    font-weight: 500;
    font-family: $bb-font-primary;
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