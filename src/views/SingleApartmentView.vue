<script>
import { reactive } from 'vue'
// axios import
import axios from 'axios';
// store import
import { store } from '../store.js';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import moment from 'moment';
import { watch } from 'vue';

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
            name: '',
            surname: '',
            email: '',
            body: '',
            apartment_id: '',
            errors: {},
            loading_form: false,
            success: false,
            nights: '',
            price_nights: '',
            total_price: '',
            price_per_night: '',
        }
    },
    methods: {
        addMarker() {
            const tt = window.tt;
            var location = [this.longitude, this.latitude];
            // var popupOffset = 25;

            // var marker = new tt.Marker().setLngLat(location).addTo(this.map);
            var element = document.createElement("div")
            element.id = "marker"

            var marker = new tt.Marker({ element: element })
                .setLngLat(location)
                .addTo(this.map)


            // var popup = new tt.Popup({ offset: popupOffset }).setHTML("Your address!");
            // marker.setPopup(popup).togglePopup();
        },
        getMap() {
            const tt = window.tt;
            this.map = tt.map({
                key: 'FiLLCEGWt31cQ9ECIWAD6zYjczzeC6zn',
                container: this.$refs.mapRef,
                style: 'tomtom://vector/1/basic-light',
                center: [this.longitude, this.latitude],
                zoom: 7,
            });
            this.map.addControl(new tt.FullscreenControl());
            this.map.addControl(new tt.NavigationControl());
        },
        sendForm() {
            this.loading_form = true
            const data = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                body: this.body,
                apartment_id: this.apartment_id,
            }
            const urlMessage = 'http://127.0.0.1:8000/api/messages'
            axios.post(urlMessage, data)
                .then(resp => {
                    console.log(resp);
                    this.success = resp.data.success
                    if (this.success) {
                        this.name = ''
                        this.surname = ''
                        this.email = ''
                        this.body = ''
                        this.errors = {}
                    } else {
                        this.errors = resp.data.errors;
                    }
                    this.loading_form = false
                })
        },
        calc_price() {
            const start = moment(this.store.check_in, 'DD/MM');
            const end = moment(this.store.check_out, 'DD/MM');
            this.nights = end.diff(start, 'days') - 1;

            this.price_per_night = this.store.price;
            this.price_nights = this.price_per_night * this.nights;
            this.total_price = this.price_nights + 100;
            this.price_per_night = this.price_nights / this.nights;


            // this.price_nights = this.store.price * this.nights;
            // this.total_price = this.price_nights + 100;
            console.log(this.store.check_in);
            console.log(this.store.check_out);
            console.log(this.store.price);
            console.log(this.nights);
            console.log(this.price_nights);
            console.log(this.total_price);
        },
        getImagePath(path) {
            if (path.startsWith("http")) {
                return path; // Link esterno, restituiscilo direttamente
            } else {
                return this.store.url_back + '/storage/' + path; // Percorso relativo alla cartella storage
            }
        }
    },
    mounted() {
        const url = 'http://127.0.0.1:8000/api/apartments/' + this.$route.params.slug;
        console.log(url);
        axios.get(url)
            .then(resp => {
                if (resp.data.success) {
                    this.apartment = resp.data.results;
                    this.latitude = resp.data.results.latitude;
                    this.longitude = resp.data.results.longitude;
                    this.loading = false;
                    this.apartment_id = this.apartment.id
                    this.getMap();
                    this.addMarker();
                } else {
                    // this.$router.push({ name: 'not-found' }); //
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    created() {
        watch(() => this.store.datePicker, this.calc_price);
    }
}

</script>
<template>

    <div class="container" v-if="!loading">
        <div>
            <h3>{{ apartment.title }}</h3>
            <div class="address">
                {{ apartment.address }}
                <!-- Turn on for favorites -->
                <!-- <span>
                    &hearts; Salva
                </span> -->
            </div>
        </div>
        <!-- turn on in case off name  -->
        <!-- <div>
            <span>
                Icona
            </span>
            <span>
                Host: Edoardo C.
            </span>
        </div> -->
    </div>
    <div class="container" v-if="!loading"> <!--Sezione immagini-->
        <!--TODO creare classi css apposite per ogni col per gestire e sovrascrivere il padding dato da bootstrap-->
        <div class="row">
            <div class="col-12 prova2">
                <div class="cover_img">
                    <img class="main_img" :src="getImagePath(apartment.media) || apartment.media" alt="">
                </div>
            </div>
            <!-- <div class="col-5">
                <div class="row">
                    <div class="col-6 ">
                        <img src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg" alt="">
                    </div>
                    <div class="col-6 ">
                        <img class="border_top"
                            src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg" alt="">
                    </div>
                    <div class="col-6 pt-3 "> 
                        <img class="test1"
                            src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg" alt="">
                    </div>
                    <div class="col-6 pt-3 ">  -->
            <!-- <img class="border_bot"
                            src="https://a0.muscache.com/im/pictures/e5788fdd-1626-4085-877e-3f2f659db4c7.jpg" alt="">
                    </div>
                </div>
            </div> -->
        </div>
    </div>
    <!--ps-5, pe-5, pt-5 da togliere se si vuole modificare il padding left, right e top-->
    <div class="container pt-5" v-if="!loading"> <!-- Sezione descrizione, servizi e check in-->
        <div>{{ date }}</div>
        <div class="row">
            <div class="col-7">

                <div class="details">
                    <div class="guest">
                        <i class="fa-solid fa-user"></i>
                        <span>{{ apartment.guests }}</span>
                    </div>
                    <div class="total_rooms">
                        <i class="fa-solid fa-house"></i>
                        <span>{{ apartment.total_rooms }}</span>
                    </div>
                    <div class="beds">
                        <i class="fa-solid fa-bed"></i>
                        <span>{{ apartment.beds }}</span>
                    </div>
                    <div class="baths">
                        <i class="fa-solid fa-toilet"></i>
                        <span>{{ apartment.baths }}</span>
                    </div>
                </div>

                <p>
                    {{ apartment.description }}
                </p>
                <hr>
                <div class="Services">
                    <div class="what_find fw-semibold">Cosa troverai</div>
                    <div class="container">
                        <div class="row">
                            <div v-for="service in apartment.services" class="col-6 p-0">
                                <!-- <span class="pe-1"><i :class=service.img></i></span> -->
                                <span>{{ service.text }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="d-flex justify-content-between">
                    <div>
                        {{ apartment.price }}€ notte
                    </div>
                    <!-- v-if="this.nights" -->
                    <div>
                        <h4>{{ this.nights }} notti in {{ apartment.address }}</h4>
                        <div> {{ store.check_in }} - {{ store.check_out }}
                        </div>
                        <div class="d-flex justify-content-between">
                            {{ apartment.price }}€ x {{ this.nights }} notti
                            <div>
                                {{ this.price_nights }}
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
                                {{ this.total_price }}€
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container border rounded p-0">
                    <!-- <Datepicker v-model="date" range /> -->
                    <div class="row">
                        <!--TODO aggiungere padding personalizzato se vogliamo tenere questo tipo di struttura-->
                        <div class="col ">
                            check-in
                            <div>{{ store.check_in }}</div>
                        </div>
                        <div class="col">
                            check-out
                            <div>{{ store.check_out }}</div>
                        </div>
                        <div class="col">
                            Ospiti
                            <div>1 ospite</div>
                        </div>
                    </div>
                    <form @submit.prevent="sendForm()">
                        <div class="border-top"> <!--TODO decidere grandezza dell'input-->
                            <div class="mb-3 d-flex align-items-center gap-3 p-2 ">
                                <label for="" class="form-label">Nome*</label>
                                <input type="text" name="name" id="name"
                                    class="form-control border-0 border-bottom w-50 rounded-0" placeholder=""
                                    aria-describedby="helpId" required v-model="name">

                                <div class="alert alert-danger" role="alert" v-for="error in errors.name">
                                    {{ error }}
                                </div>
                            </div>
                            <div class="mb-3 d-flex align-items-center gap-3 p-2">
                                <label for="" class="form-label">Cognome*</label>
                                <input type="text" name="surname" id="surname"
                                    class="form-control border-0 border-bottom w-50 rounded-0" placeholder=""
                                    aria-describedby="helpId" required v-model="surname">

                                <div class="alert alert-danger" role="alert" v-for="error in errors.surname">
                                    {{ error }}
                                </div>
                            </div>
                            <div class="mb-3 d-flex align-items-center gap-3 p-2 ">
                                <label for="" class="form-label">Email*</label>
                                <input type="email" name="email" id="email"
                                    class="form-control border-0 border-bottom w-50 rounded-0" placeholder=""
                                    aria-describedby="helpId" required v-model="email">

                                <div class="alert alert-danger" role="alert" v-for="error in errors.email">
                                    {{ error }}
                                </div>
                            </div>
                            <div class="mb-3 d-flex align-items-center gap-3 p-2 ">
                                <label for="" class="form-label">Messagio*</label>
                                <input type="text" name="body" id="body"
                                    class="form-control border-0 border-bottom w-50 rounded-0" placeholder=""
                                    aria-describedby="helpId" required v-model="body">

                                <div class="alert alert-danger" role="alert" v-for="error in errors.body">
                                    {{ error }}
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="custom_button" :disabled="loading_form">
                            {{ loading_form? 'Sending...': 'Invia prenotazione' }}
                        </button>
                    </form>
                </div>

            </div>
        </div>
        <hr>
    </div>
    <div class="container">
        <div class="row">
            <div class="col">
                <!-- Mappa -->
                <div id='map' ref="mapRef"></div>
            </div>
        </div>
    </div>




    <!-- <div>  -->
    <!--Host and aircover-->
    <!-- <div class="container pt-5">
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
    </div> -->

</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;

#map {
    height: 40vh;
    min-height: 400px;
    width: 100%;
}

h3 {
    padding-top: 1rem;
}

img {
    max-width: 100%;
}

.cover_img {
    width: 100%;

    img {
        object-fit: cover;
        border-radius: 2rem;
        width: 100%;
        height: 35rem;
    }
}

.address {
    padding-bottom: 1rem;
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

.details {
    display: flex;
    justify-content: center;
    background-color: $bb-primary;
    border-radius: 20px;
    width: 80%;
    margin: auto;
    padding: 2.5rem;
    color: $bb-lighter;
    font-size: 1.2rem;
    margin-top: -7rem;
    margin-bottom: 3rem;

    div {
        padding: 0 1rem;
        display: flex;
        align-items: center;

        span {
            padding-left: 0.5rem;
            font-size: 1.3rem;
        }
    }
}

.services {
    margin-top: -5rem;
    padding-bottom: 2rem;
}
</style>
