<script>
// axios import
import axios from 'axios';
// store import
import { store } from '../store.js';

export default {
    name: 'SingleApartmentView',
    data() {
        return {
            store
        }
    },
    mounted() {
        // TODO: call API will go here
    }
}
</script>
<template>
    <!--TODO cambiare ps-5 e pe-5 se si vuole cambiare il padding sinistra e destra-->
    <div class="ps-5 pe-5 d-flex justify-content-between"> <!--Sezione titolo, luogo etc-->
        <div>
            <h3>Villa Poggio Greve - Villa con piscina nel Chianti</h3>
            <div>
                Greve in Chianti, Toscana, Italia
                <span>
                    &hearts; Salva
                </span>
            </div>
        </div>
        <div>
            <span>
                Icona
            </span>
            <span>
                Host: Edoardo C.
            </span>
        </div>
    </div>
    <div class="container-fluid ps-5 pe-5 "> <!--Sezione immagini--> 
        <!--TODO creare classi css apposite per ogni col per gestire e sovrascrivere il padding dato da bootstrap-->
        <div class="row">
            <div class="col-6">
                <img class="main_img" src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg?im_w=1200" alt="">
            </div>
            <div class="col-6">
                <div class="row">
                    <div class="col-6">
                        <img src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg?im_w=1200" alt="">
                    </div>
                    <div class="col-6">
                        <img class="border_top" src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg?im_w=1200" alt="">
                    </div>
                    <div class="col-6 pt-3"> <!--TODO sistemare in perfect pixel -->
                        <img src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg?im_w=1200" alt="">
                    </div>
                    <div class="col-6 pt-3"> <!--TODO sistemare in perfect pixel -->
                        <img class="border_bot" src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg?im_w=1200" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;

img{
    max-width: 100%;
    object-fit: cover;
}

.main_img{
    border-radius: 30px 0 0 30px;
}

.provaz{
    padding: 0px;
}
.border_top{
    border-radius: 0 15px 0 0;
}
.border_bot{
    border-radius: 0 0 15px 0;
}
</style>
