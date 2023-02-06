<script>
import App from '../App.vue';
import { store } from '../store';
// TODO usare hiding elements di bootstrap per gestire la nav che compare sotto 
export default {
    name: 'NavbarComponent',
    data() {
        return {
            store
        }
    },
    methods: {
    }
}
</script>
<template>
    <!--Modificare le classi "ps-5, pe-5 se si vuole cambiare il padding sinistra e destra"-->
    <nav class="ps-5 pe-5 d-flex justify-content-between align-items-center">
        <div class="hide">
            LOGO
            <!--TODO Aggiungere logo-->
        </div>
        <div class="d-flex align-items-center hide">
            <!--sotto i 744 px lo span sparisce -->
            <span>Passa alla modalità host</span>
            <button type="button" class="btn " data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-bars"></i>
                A.M. <!--TODO Lettere test, aggiungere ipotetica immagine user-->
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Messaggi</a></li>
                <li><a class="dropdown-item" href="#">Preferiti</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Gestisci gli annunci</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Esci</a></li>
            </ul>
        </div>
    </nav>
    <div class="fixed-bottom d-flex justify-content-center nav_bot">
        <div class="d-flex rounded p-2 mb-3 gap-5 icons">
            <div>
                <div class="d-flex justify-content-center">
                    <button type="button" class="icons" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div>
                    Esplora
                </div>
            </div>
            <div>
                <div class="d-flex justify-content-center">
                    <button type="button" class="icons" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                </div>
                Preferiti
            </div>
            <div>
                <div class="d-flex justify-content-center dropup">
                    <button type="button" class="icons" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-user"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Messaggi</a></li>
                        <li><a class="dropdown-item" href="#">Preferiti</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Gestisci gli annunci</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Esci</a></li>
                    </ul>
                </div>
                <div>Accedi</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;


.icons {
    background-color: #45BAE1;
    // TODO fix color
    box-shadow: 0 0 10px  #45BAE1;
    // TODO box shadow momentaneo 
}

.border_top {
    border-top: 1px solid black;
}

@media screen and (min-width: 744px) {
    .nav_bot {
        visibility: hidden;
    }
}

@media screen and (max-width: 744px) {
    .hide {
        visibility: hidden;
    }
}
</style>