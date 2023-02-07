<script>
import App from '../App.vue';
import { store } from '../store';

export default {
    name: 'CardComponent',
    data() {
        return {
            store,
        }
    },
    props: {
        link: String,
        //classe: String,
    },
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
    mounted() {
    }
}
</script>

<template>
    <div class="col-4">
        <div class="card border-0">

            <div class="card_img">
                <!-- carousel -->
                <div v-if="store.immagineAttiva > 0" @click="PrevImg()">
                    <i class="fa-solid fa-circle-chevron-left arrow_left"></i>
                </div>
                <div v-if="store.immagineAttiva != store.images.length - 1" @click="NextImg()">
                    <i class="fa-solid fa-circle-chevron-right arrow_right"></i>
                </div>
                <!-- img thumb -->
                <img :src="link" :class="classe" alt="">
            </div>

            <div class="card-body text-start">
                <div class="summary">Appartmaneto - Treviso, Italia</div>
                <h5>Casa vacanze "La Corte di Giada"</h5>

                <div class="info">3 letti</div>

                <div class="d-flex justify-content-between">
                    <div>⭐️</div>
                    <div><span class="price">1552 €</span> /notte</div>
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