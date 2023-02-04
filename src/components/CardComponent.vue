<script>
import { store } from '../store';


export default {
    name: 'CardComponent',
    data() {
        return {
            store
        }
    },
    mounted() {
        //console.log(store.images[0].img);
        const slidesElement = document.querySelector(".card")
        //console.log(slidesElement);
        let immagineAttiva = 0 // setto il valore di img active a 0 
        for (let index = 0; index < store.images.length; index++) { // ciclo dentro l'array di oggetti 
            const element = store.images[index];
            const slideHtml = `<img class="${index === immagineAttiva ? 'active' : ''} rounded" src="${element.img}" alt="">`
            slidesElement.insertAdjacentHTML("afterbegin", slideHtml)
            //console.log(element);
        }
        //TODO aggiungere event listener per bottoni left e right
        //TODO non mostrare il bottone left se siamo alla prima immaagine
        //TODO non mostrare il bottone right fino a che non siamo sull'hover della card/img
    }
}
</script>

<template>
    <h1>Funziono</h1>
    <div class="card" style="width: 18rem;">
        <i class="fa-solid fa-circle-chevron-left arrow_left"></i>
        <i class="fa-solid fa-circle-chevron-right arrow_right"></i>
        
        <!-- <img :src="store.images[0].img" class="card-img-top active" alt=""> -->
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

.active {
    display: block;
}

img {
    max-width: 100%;
    display: none;
    box-shadow: 0 0 10px gray;
}

.arrow_left{
    position:absolute;
    top: 33%;
    left: 1%;
    color: whitesmoke;
    cursor: pointer;
    font-size: 2rem;
    &:hover{
        color: gray;
    }
}
.arrow_right{
    position:absolute;
    top: 33%;
    right: 1%;
    color: whitesmoke;
    cursor: pointer;
    font-size: 2rem;
    &:hover{
        color: gray;
    }
}
</style>