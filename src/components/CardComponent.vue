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
    <h1>Funziono</h1>
    <div class="card" style="width: 18rem;"> <!--Fix style-->
        <div v-if="store.immagineAttiva > 0" @click="PrevImg()">
            <i class="fa-solid fa-circle-chevron-left arrow_left"></i>
        </div>
        <div v-if="store.immagineAttiva != store.images.length -1" @click="NextImg()">
            <i class="fa-solid fa-circle-chevron-right arrow_right"></i>
        </div>
        <img :src="link" :class="classe" alt="">
        <div class="card-body text-start bg-gray">

            <div class="test">Appartmaneto - Treviso, Italia</div>
            <h5>Casa vacanze "La Corte di Giada"</h5>
            <div>3 letti</div>
            <div class="d-flex justify-content-between">
                <div>stelle</div>
                <div>1552 € /notte</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;

.test {
    color: $bb-secondary;
}

.bg-gray {
    background-color: lightgray;
}

.arrow_left {
    position: absolute;
    top: 33%;
    left: 1%;
    color: whitesmoke;
    cursor: pointer;
    font-size: 2rem;

    &:hover {
        color: gray;
    }
}

.arrow_right {
    position: absolute;
    top: 33%;
    right: 1%;
    color: whitesmoke;
    cursor: pointer;
    font-size: 2rem;

    &:hover {
        color: gray;
    }
}
</style>