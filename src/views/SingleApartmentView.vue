<script>
// axios import
import axios from 'axios';
// store import
import { store } from '../store.js';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    name: 'SingleApartmentView',
    components: {
        Datepicker
    },
    data() {
        return {
            date: null,
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
    <div class="container"> <!--Sezione immagini-->
        <!--TODO creare classi css apposite per ogni col per gestire e sovrascrivere il padding dato da bootstrap-->
        <div class="row">
            <div class="col-7 prova2">
                <img class="main_img "
                    src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg" alt="">
            </div>
            <div class="col-5">
                <div class="row">
                    <div class="col-6 ">
                        <img src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg" alt="">
                    </div>
                    <div class="col-6 ">
                        <img class="border_top"
                            src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg" alt="">
                    </div>
                    <div class="col-6 pt-3 "> <!--TODO sistemare in perfect pixel -->
                        <img class="test1"
                            src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg" alt="">
                    </div>
                    <div class="col-6 pt-3 "> <!--TODO sistemare in perfect pixel -->
                        <img class="border_bot"
                            src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--ps-5, pe-5, pt-5 da togliere se si vuole modificare il padding left, right e top-->
    <div class="container pt-5"> <!-- Sezione descrizione, servizi e check in-->
        <div>{{ date }}</div>
        <div class="row">
            <div class="col-7">
                <div class="group_services2">
                    <div class=" group_services text-center px-5">
                        prova
                    </div>
                </div>
                <p>
                    Splendida villa con piscina a sfioro, situata nella campagna di Panzano in Chianti, a metà strada
                    tra Firenze e Siena. Può ospitare fino a 12 persone, ha 6 camere da letto e 5 bagni.
                    Villa Poggio Greve si trova nella campagna di Panzano in Chianti e si raggiunge attraversando un
                    tranquilla strada asfaltata.
                    La proprietà è situata in cima a una collina, in posizione panoramica ad un'altitudine di 450 m, e
                    gode di un panorama mozzafiato sui vigneti e oliveti del Chianti Classico.
                    Circondata da un giardino con prato, fiori, ulivi e limone, la villa dispone di un ampio patio con
                    vista panoramica, barbecue e parcheggio privato.
                </p>
                <hr>
                <div class="Services">
                    <div class="what_find fw-semibold">Cosa troverai</div>
                    <div class="container">
                        <div class="row">
                            <div v-for="service in store.services" class="col-6 p-0">
                                <span class="pe-1"><i :class=service.img></i></span>
                                <span>{{ service.text }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="d-flex justify-content-between">
                    <div>
                        800€ notte
                    </div>
                    <div>
                        <h4>7 notti a Greve in chianti</h4>
                        <div>4 feb 2023 - 11 feb 2023</div>
                        <div class="d-flex justify-content-between">
                            800€ x 7 notti
                            <div>
                                5.600€
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            Costi di pulizia
                            <div>
                                100€
                            </div>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between">
                            Totale
                            <div>
                                5.700€
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container border rounded p-0">
                    <Datepicker v-model="date" range />
                    <div class="row">
                        <!--TODO aggiungere padding personalizzato se vogliamo tenere questo tipo di struttura-->
                        <div class="col ">
                            check-in
                            <div>4/2/2023</div>
                        </div>
                        <div class="col">
                            check-out
                            <div>11/2/2023</div>
                        </div>
                        <div class="col">
                            Ospiti
                            <div>1 ospite</div>
                        </div>
                    </div>
                    <div class="border-top"> <!--TODO decidere grandezza dell'input-->
                        <div>Message</div>
                        <input type="text" placeholder="Scrivi qui">
                    </div>
                </div>

                <div class="text-center custom_button">
                    Invia prenotazione
                </div>
            </div>
        </div>
        <hr>
    </div>
    <div class="text-center"> <!-- Sezione momentanea mappa -->
        <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg"
            alt="">
    </div>
    <div> <!--Host and aircover-->
        <div class="container pt-5">
            <div class="col">
                <div class="d-flex">
                    <div class="align-self-center px-2 ">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div>
                        <div class="host_name fw-semibold">
                            Edoardo C
                        </div>
                        <div class="registration_date">
                            Membro da : novembre 2014
                        </div>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="align-self-center px-2">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <div>
                        Identità verificata
                    </div>
                </div>
                <div>
                    Lingue: English, Italiano
                </div>
            </div>
            <div class="col">

            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;

img {
    max-width: 100%;
    
    //object-fit: cover;
}

.main_img {
    border-radius: 30px 0 0 30px;
}

.provaz {
    padding: 0px;
}

.border_top {
    border-radius: 0 15px 0 0;
}

.border_bot {
    border-radius: 0 0 15px 0;
}

.what_find {
    font-size: 22px;
}

.host_name {
    font-size: 22px;
    font-style: $bb-font-secondary;
}

.registration_date {
    color: #717171;
    font-size: 14px;
}

.custom_button{
    background-color: rebeccapurple;
    padding: 1rem;
    margin-top: 2rem;
    border-radius: 20px;
}

.group_services{
    background-color: blue;
    border-radius: 20px;
    max-width: 70%;
    margin: auto;
    padding: 1rem;
}
.group_services2{
    margin-top: -5rem;
    padding-bottom: 2rem;
}
</style>
