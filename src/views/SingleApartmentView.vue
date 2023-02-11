<script>
import { reactive } from 'vue'
// axios import
import axios from 'axios';
// store import
import { store } from '../store.js';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    name: 'SingleApartmentView',
    components: {
        Datepicker,
    },
    data() {
        return {
            date: null,
            apartment: null,
            latitude: null,
            longitude: null,
            loading: true,
            store,
            client: null,
            map: null,
        }
    },
    methods: {
        addMarker(map) {
            const tt = window.tt;
            var location = [this.longitude, this.latitude];
            var popupOffset = 25;

            var marker = new tt.Marker().setLngLat(location).addTo(map);
            var popup = new tt.Popup({ offset: popupOffset }).setHTML("Your address!");
            marker.setPopup(popup).togglePopup();
        },
        getMap() {
            const tt = window.tt;
            var map = tt.map({
                key: 'h0FDAudCcFnS8TK5dT1mvgXYkqCGc1CW',
                container: this.$refs.mapRef,
                style: 'tomtom://vector/1/basic-main',
            });
            map.addControl(new tt.FullscreenControl());
            map.addControl(new tt.NavigationControl());

            const url = 'http://127.0.0.1:8000/api/apartments/' + this.$route.params.slug;
            console.log(url);
            axios.get(url)
                .then(resp => {
                    if (resp.data.success) {
                        this.apartment = resp.data.results;
                        this.latitude = resp.data.results.latitude;
                        this.longitude = resp.data.results.longitude;
                        this.loading = false
                        this.addMarker(map)
                    } else {
                        // this.$router.push({ name: 'not-found' }); //
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    mounted() {
        //console.log(this.$refs.mapRef)
        this.getMap()

    }
}
</script>
<template>
    <!--TODO cambiare ps-5 e pe-5 se si vuole cambiare il padding sinistra e destra-->
    <div class="ps-5 pe-5 d-flex justify-content-between"> <!--Sezione titolo, luogo etc-->
        <div>

            <h3 v-if="!loading">{{ apartment.title }}</h3>
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
                <!-- <img class="main_img " :src="apartment.media" alt=""> -->
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
                    <!-- {{ apartment.description }} -->
                </p>
                <hr>
                <!-- <div class="Services">
                    <div class="what_find fw-semibold">Cosa troverai</div>
                    <div class="container">
                        <div class="row">
                            <div v-for="service in store.services" class="col-6 p-0">
                                <span class="pe-1"><i :class=service.img></i></span>
                                <span>{{ service.text }}</span>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="col-5">
                <div class="d-flex justify-content-between">
                    <div>
                        <!-- {{ apartment.price }}€ notte -->
                    </div>
                    <div>
                        <h4>7 notti a Greve in chianti</h4>
                        <div>4 feb 2023 - 11 feb 2023</div>
                        <div class="d-flex justify-content-between">
                            <!-- {{ apartment.price }}€ x 7 notti -->
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

    <!-- Sezione momentanea mappa -->
    <!-- <MapView /> -->
    <!-- <div id="map-container" style="width: 100%; height: 100%;"></div> -->
    <div id='map' ref="mapRef"></div>


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

#map {
    height: 50vh;
    width: 50vw;
}

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

.custom_button {
    background-color: rebeccapurple;
    padding: 1rem;
    margin-top: 2rem;
    border-radius: 20px;
}

.group_services {
    background-color: blue;
    border-radius: 20px;
    max-width: 70%;
    margin: auto;
    padding: 1rem;
}

.group_services2 {
    margin-top: -5rem;
    padding-bottom: 2rem;
}
</style>
