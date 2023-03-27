<script>
// axios import
import axios from 'axios';
// store import
import { store } from '../store.js';
import moment from 'moment';
import { watch } from 'vue';
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import successJSON from '../assets/97240-success.json'

export default {
    name: 'SingleApartmentView',
    components: {
        Vue3Lottie
    },
    data() {
        return {
            successJSON,
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
            messageForm: '',
            userIP: null,

        }
    },
    methods: {
        addMarker() {
            const tt = window.tt;
            var location = [this.longitude, this.latitude];
            var element = document.createElement("div")
            element.id = "marker"
            var marker = new tt.Marker({ element: element })
                .setLngLat(location)
                .addTo(this.map)
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
                        this.messageForm = 'Form inviato con successo!'
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


            console.log(this.store.check_in);
            console.log(this.store.check_out);
            console.log(this.store.price);
            console.log(this.nights);
            console.log(this.price_nights);
            console.log(this.total_price);
        },
        getImagePath(path) {
            if (path.startsWith("http")) {
                return path;
            } else {
                return this.store.url_back + '/storage/' + path;
            }
        },
        async getIpClient() {
            try {
                this.loading = true;
                const response = await axios.get('https://api.ipify.org?format=json');
                this.userIP = response.data.ip;
                //console.log(this.userIP);
            } catch (error) {
                console.error(error);
            }
        },


        async getApartment() {
            try {
                this.loading = true;
                const url = 'http://127.0.0.1:8000/api/apartments/' + this.$route.params.slug;
                const response = await axios.get(url);
                if (response.data.success) {
                    this.apartment = response.data.results;
                    this.latitude = response.data.results.latitude;
                    this.longitude = response.data.results.longitude;
                    this.loading = false;
                    this.apartment_id = this.apartment.id
                    this.getMap();
                    this.addMarker();
                    this.$nextTick(() => {
                        window.scrollTo(0, 0);

                    });
                    //console.log(this.apartment);
                } else {
                    this.$router.push({ name: 'not-found' });
                }
            } catch (error) {
                console.error(error);
            }
        },
        async AddView() {
            await this.getIpClient();
            await this.getApartment();
            try {
                const date = new Date();
                const todaysDate = date.toLocaleDateString('en-US');
                //console.log(todaysDate);
                const url = 'http://127.0.0.1:8000/api/views'
                const data = { apartment_id: this.apartment_id, ip_address: this.userIP, date: todaysDate }
                const response = await axios.post(url, data);
                //console.log(response);
                if (!response.data.success) {
                    if (response.data.errors) {
                        console.log(response.data.errors)
                    } else {
                        console.error('Unable to view this apartment');
                    }

                }

            } catch (error) {
                console.log(error);
            }
        },
        clearMessageForm() {
            this.messageForm = '';
        }


    },

    mounted() {

        this.AddView();








    },
    created() {
        watch(() => this.store.datePicker, this.calc_price);



    }
}

</script>
<template>
    <div class="message-sent" v-if="this.messageForm">
        <h4 class="py-4 text-center">Messaggio inviato con successo!</h4>
        <Vue3Lottie :animationData="successJSON" :loop="false" :height="200" :width="200" />
        <span class="close" @click="clearMessageForm()"></span>
    </div>
    <div class="layover" v-if="this.messageForm"></div>

    <div class="min-vh-100 d-flex justify-content-center align-items-center position-relative" v-if="loading">
        <div class="preloader">
            <svg viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path class="big-circle" d="M101 51C101 78.6142 78.6142 101 51 101C23.3858 101 1 78.6142 1 51"
                    stroke="#252525" stroke-width="2" />
                <path class="small-circle" d="M91 51C91 28.9086 73.0914 11 51 11C28.9086 11 11 28.9086 11 51"
                    stroke="#252525" stroke-width="2" />
            </svg>
        </div>
    </div>
    <div class="container" v-if="!loading">
        <div>
            <h3>{{ apartment.title }}</h3>
            <div class="address">
                {{ apartment.address }}
            </div>
        </div>
    </div>
    <div class="container" v-if="!loading">
        <div class="row">
            <div class="col-12 prova2">
                <div class="cover_img">
                    <img class="main_img" :src="getImagePath(apartment.media) || apartment.media" alt="">
                    <div class="badge_promotion" v-if="apartment.subscription_id">
                        IN EVIDENZA
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container pt-5" v-if="!loading">
        <div>{{ date }}</div>
        <div class="row">
            <div class="col-sm-12 col-lg-7">

                <div class="details">
                    <div class="guest">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 183.89 201.64">
                            <g id="Livello_2" data-name="Livello 2">
                                <g id="Livello_1-2" data-name="Livello 1">
                                    <path
                                        d="M128.24,117.39c34.94,17.4,53.71,45.07,55.65,84.25H165.47c-.88-25.07-11-45.47-31.65-60.11-14.06-10-29.94-14.15-47.1-12.93-37.4,2.65-67.64,33.1-68.26,73H0c1.91-39.13,20.71-66.84,55.71-84.19-18.76-14-28.64-32.48-27.84-56C28.46,44,35.46,29.2,48.2,17.33a64,64,0,0,1,91.41,3.89C164.79,49.28,161.21,94.06,128.24,117.39Zm9.56-53a45.86,45.86,0,1,0-46.14,45.66A45.74,45.74,0,0,0,137.8,64.4Z" />
                                </g>
                            </g>
                        </svg>
                        <span>{{ apartment.guests }}</span>
                    </div>
                    <div class="total_rooms">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213.51 213.52">
                            <g id="Livello_2" data-name="Livello 2">
                                <g id="Livello_1-2" data-name="Livello 1">
                                    <path
                                        d="M64,106.77H97.06c6.5,0,13-.09,19.49,0,7.15.12,11.24,4,11.4,11.1q.24,10.24,0,20.49c-.15,6.48-4.6,11-10.48,11.05-6.06,0-10.51-4.68-10.68-11.44-.09-3.13,0-6.26,0-9.66H64V156c0,11.72-3.09,14.79-14.8,14.8-5.83,0-11.67-.17-17.49.08a10.31,10.31,0,0,0-10.14,10.29c-.13,5.8,3.74,10.64,9.57,10.68,25,.2,49.95.09,75.62.09,0-7.13-.1-14.07,0-21,.09-5,2.51-8.59,7.35-10.17,4.63-1.51,8.83-.34,11.5,3.62a16.08,16.08,0,0,1,2.24,7.91c.32,6.29.1,12.6.1,19.32h63.55V138.76c-10.2,0-20.33.06-30.45,0-5.83,0-10.15-3.2-11.28-8-1.6-6.75,2.85-12.9,9.94-13.12,8.66-.28,17.33-.11,26-.12h5.84V54H128V70.81c0,4.5.06,9,0,13.5-.15,7.36-4.26,11.75-10.78,11.64-6.17-.1-10.35-4.64-10.42-11.58-.09-8.5,0-17,0-25.49V53.52c-6.48,0-12.43.06-18.38,0a21.33,21.33,0,0,1-6.4-.79c-4.59-1.51-7-5-7.16-9.78a10,10,0,0,1,7.35-10.13,29.1,29.1,0,0,1,7.41-.73q54.48-.07,109,0C210,32,213.5,35.46,213.5,46.88q0,76,0,152c0,11.11-3.55,14.66-14.65,14.66q-81.73,0-163.47,0C13.21,213.5,0,200.25,0,178Q0,106.76,0,35.52C0,13.26,13.2.06,35.39,0c5.16,0,10.33,0,15.49,0C60.2.1,64,3.81,64,13.06q.06,43.48,0,87ZM42.49,149.19V21.52H36.88c-12.55,0-15.37,2.74-15.37,15.1V150.26Z" />
                                </g>
                            </g>
                        </svg>
                        <span>{{ apartment.total_rooms }}</span>
                    </div>
                    <div class="beds">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
                            <g id="Livello_2" data-name="Livello 2">
                                <g id="Livello_1-2" data-name="Livello 1">
                                    <path
                                        d="M21,192H0V92c2.63-4.14,5.35-8.23,7.86-12.44,1.17-2,2.74-4.13,2.76-6.23.23-17.12.16-34.25.13-51.38,0-9,4.07-15.54,11.92-19.8C24.08,1.38,25.55.71,27,0H165c12.53,4.93,17.05,14.2,16.42,27.44-.73,15.26-.21,30.58-.11,45.88a9.82,9.82,0,0,0,1.28,5c3,4.67,6.25,9.14,9.41,13.69V192H171V171.19H21ZM170.43,96.31H21.59V149H170.43ZM32.32,21.48V74.75H52.58a8.1,8.1,0,0,0,.57-1.65c.05-5.66.06-11.32.1-17,.08-9.67,3.68-13.34,13.29-13.36q29,0,58,0c10.92,0,14.23,3.38,14.25,14.41,0,5.74,0,11.49,0,17.17h20.92V21.48Z" />
                                </g>
                            </g>
                        </svg>
                        <span>{{ apartment.beds }}</span>
                    </div>
                    <div class="baths">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 214">
                            <g id="Livello_2" data-name="Livello 2">
                                <g id="Livello_1-2" data-name="Livello 1">
                                    <path
                                        d="M0,126V17C3,7.58,9.37,2,19,0H67C82.43,6,85.25,10.18,85.25,27.19V107H192v19c-.49,2.07-1,4.12-1.46,6.2-5,23.2-18.53,40.39-37.68,53.58-2.59,1.79-3.79,3.55-3.7,6.81.21,7.13-.08,14.27-.16,21.41H43c-.08-7.14-.35-14.28-.17-21.41.09-3.23-1-5-3.67-6.82-16.63-11.33-29.23-26-35.5-45.4C2.14,135.68,1.2,130.8,0,126Zm24.87,2.51c.29,1.53.4,2.5.65,3.44,5.18,19.3,17,33.21,34.65,42.25,2.9,1.49,4.2,3.16,3.91,6.5-.33,3.73-.08,7.52-.08,11.3h64c0-3.69.34-7.18-.09-10.58-.51-4,1.46-5.69,4.59-7.63,5.9-3.67,11.83-7.54,16.89-12.26,9.45-8.8,15.16-19.91,17.79-33Zm-3.4-21.86H63.66V22.16H21.47Z" />
                                    <path d="M32.38,32.5H52.9V63.84H32.38Z" />
                                </g>
                            </g>
                        </svg>
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
                                <div v-if="apartment.services" class="py-2">
                                    <div class="card_custom d-flex gap-2 pb-1">
                                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                            role="presentation" focusable="false"
                                            style="display: block; height: 24px; width: 24px; fill: currentcolor;">
                                            <path :d="service.img"></path>
                                        </svg>
                                        {{ service.name }}
                                    </div>
                                </div>
                                <div v-else>
                                    <span>test</span>
                                </div>
                            </div>
                            <hr class="linea">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-lg-5">
                <div id="contact_host" class="d-flex justify-content-between">
                    <div class="container">
                        <div class="apartment_price">
                            <span class="price">{{ apartment.price }} €</span> /notte
                        </div>

                        <div v-if="this.nights">
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

                        <form @submit.prevent="sendForm()">
                            <div class="col_2">
                                <div class="name">
                                    <label for="" class="form-label">Nome*</label>
                                    <input type="text" name="name" id="name" class="form-control" placeholder=""
                                        aria-describedby="helpId" required v-model="name">

                                    <div class="alert alert-danger" role="alert" v-for="error in errors.name">
                                        {{ error }}
                                    </div>
                                </div>
                                <div class="surname">
                                    <label for="" class="form-label">Cognome*</label>
                                    <input type="text" name="surname" id="surname" class="form-control" placeholder=""
                                        aria-describedby="helpId" required v-model="surname">

                                    <div class="alert alert-danger" role="alert" v-for="error in errors.surname">
                                        {{ error }}
                                    </div>
                                </div>
                            </div>
                            <div class="email">
                                <label for="" class="form-label">Email*</label>
                                <input type="email" name="email" id="email" class="form-control" placeholder=""
                                    aria-describedby="helpId" required v-model="email">

                                <div class="alert alert-danger" role="alert" v-for="error in errors.email">
                                    {{ error }}
                                </div>
                            </div>
                            <div class="message">
                                <label for="" class="form-label">Messaggio*</label>
                                <textarea rows="3" cols="50" name="body" id="body" class="form-control" placeholder=""
                                    aria-describedby="helpId" required v-model="body">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </textarea>

                                <div class="alert alert-danger" role="alert" v-for="error in errors.body">
                                    {{ error }}
                                </div>
                            </div>

                            <button type="submit" class="button" :disabled="loading_form">
                                {{ loading_form ? 'Invio in corso...' : "Contatta l'host" }}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <hr>
    </div>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="address_map" v-if="!loading">
                    <i class="fa-regular fa-solid fa-location-dot"></i>
                    {{ apartment.address }}
                </div>
                <!-- Mappa -->
                <div id='map' ref="mapRef"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;

//loader 


.preloader {
    position: absolute;
    width: 102px;
    height: 102px;
    left: 50%;
    top: 50%;
    min-height: 102px;
    transform: translateX(-50%) translateY(-50%);

    svg {
        width: 102px;
        height: 102px;


    }

}

.preloader .small-circle {
    stroke-dasharray: 210;
    stroke-dashoffset: 210;
    stroke: $bb-secondary;
    transform-origin: 50%;
    animation: 1s draw-small infinite alternate;
}

@keyframes draw-big {
    0% {
        stroke-dashoffset: 0;
        transform: rotateY(180deg) rotate(360deg);
    }

    100% {
        stroke-dashoffset: 240;
        transform: rotateY(180deg) rotate(0deg);
    }
}

@keyframes draw-small {
    0% {
        stroke-dashoffset: 0;
        transform: rotate(0deg);
    }

    100% {
        stroke-dashoffset: 210;
        transform: rotate(360deg);
    }
}

.preloader .big-circle {
    stroke-dasharray: 240;
    stroke-dashoffset: 240;
    transform-origin: 50%;
    stroke: $bb-primary;
    animation: 1s draw-big infinite alternate 0.5s;
}



#map {

    min-height: 400px;
    width: 100%;

}


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

p {
    font-size: 1.1rem;
}

h3 {
    padding-top: 1rem;
}

img {
    max-width: 100%;
}

.cover_img {
    width: 100%;
    position: relative;

    img {
        object-fit: cover;
        border-radius: 2rem;
        width: 100%;


    }
}

.layover {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
}

//lottie popup when message is sent 
.message-sent {
    position: fixed;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    background-color: white;
    padding: 2rem 4rem;
    z-index: 9999;
    border-radius: 1rem;

    span.close:after {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        display: inline;
        content: "\00d7";
        color: $bb-light;
        font-size: 2rem;
        padding-inline: 1rem;
    }


}


#contact_host {
    margin-bottom: 1rem;
    padding: 1.6rem;
    background-color: $bb-background;
    border-radius: 1.25rem;
    color: $bb-dark;

    .apartment_price {
        color: $bb-dark;

        .price {
            font-size: 2rem;
            font-weight: 500;
        }
    }

    form {
        display: flex;
        flex-direction: column;

        label {
            padding-top: 1rem;
            padding-bottom: 0;
            font-family: $bb-font-primary;
            font-size: 1rem;
        }

        input {
            border-radius: 6px;
            padding: 0.8rem;
            width: 100%;
        }

        textarea {
            margin-bottom: 2rem;
        }

        .col_2 {
            display: flex;
            justify-content: space-between;

            div {
                width: 48%;
            }

            input {
                width: 100%;
            }
        }
    }
}


.address {
    padding-bottom: 1rem;
}

.address_map {
    padding-bottom: 0.5rem;
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
    padding: 1.5rem;
    color: $bb-lighter;
    margin-top: -7rem;
    margin-bottom: 3rem;
    position: relative;
    flex-wrap: wrap;

    svg {
        color: $bb-lighter;
        fill: $bb-lighter;
        font-size: 1rem;
        height: 1.5rem;
        width: 1.5rem;
        margin: 0.5rem 0;
    }

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

.card_custom {

    width: 150px;
    background: white;
    transition: all .3s;

    &:hover {

        cursor: pointer;
        // aggiungere le proprietà alla classe dinamica

    }
}

/* Media Query */
.linea {
    display: none;
}

@media screen and (max-width: 992px) {
    .linea {
        display: block;
        padding: 0.5rem 0;
        margin-top: 0.75rem;
    }
}

@media screen and (min-width: 768px) {
    .details {
        padding: 2rem;
    }

    .cover_img {
        img {
            height: 35rem;
        }
    }
}

@media screen and (min-width: 993px) {
    .details {
        padding: 2.5rem;
    }


}
</style>
