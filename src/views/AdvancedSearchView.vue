<script>
import { store } from '../store';
import axios from 'axios';
import CardComponent from '../components/CardComponent.vue';

export default {
    name: 'AdvancedSearchView',
    data() {
        return {
            store,
            date: null,
            apartment: null,
            latitude: null,
            longitude: null,
            loading: true,
            store,
            client: null,
            apartments: [],
        }
    },
    components: {
        CardComponent
    },
    methods: {
        addMarker(longitude, latitude) {
            const tt = window.tt;
            var location = [longitude, latitude]; //ciclare per risultati per aggiungere marker
            // var location = [this.longitude, this.latitude];
            var popupOffset = 25;
            var marker = new tt.Marker().setLngLat(location).addTo(this.map);
            var popup = new tt.Popup({ offset: popupOffset }).setHTML("Your address!");
            marker.setPopup(popup).togglePopup();
        },
        getMap() {
            const tt = window.tt;
            this.map = tt.map({
                key: 'h0FDAudCcFnS8TK5dT1mvgXYkqCGc1CW',
                container: this.$refs.mapRef,
                style: 'tomtom://vector/1/basic-light',
                //center: [2.323653, 48.873261],
                //center: [this.longitude, this.latitude],
                center: [store.results[0].longitude, store.results[0].latitude],
                zoom: 7,
            });
            this.map.addControl(new tt.FullscreenControl());
            this.map.addControl(new tt.NavigationControl());
        },
        getImagePath: function (imgPath) {
            return new URL(`../assets/img/${imgPath}`, import.meta.url).href;
        },

        // callApi() {
        //     axios.get(`http://127.0.0.1:8000/api/apartments?page=${this.currentPage}`)
        //         .then(response => {
        //             this.apartments = response.data.results.data;
        //             this.pages = response.data.results.last_page;
        //             console.log(this.apartments);
        //             this.loading = false;
        //             this.getMap();
        //             this.addMarker();
        //         })
        //         .catch(error => {
        //             console.error(error)
        //             this.error = error.message;
        //             this.loading = false;
        //         })
        // }
    },
    computed: {
        dataLoaded() {
            //return this.$store.state.dataLoaded;
            return store.results;
        }
    },
    watch: {
        dataLoaded(newValue) {
            if (newValue) {
                console.log('funziono');
                console.log(store.results);
                this.getMap();
                for (let index = 0; index < store.results.length; index++) {
                    const element = store.results[index];
                    this.addMarker(element.longitude, element.latitude);

                }
            }
        },
    },
    mounted() {
        const filterBtn = document.querySelector('#filterBtn');
        const filterPopup = document.querySelector('#filterPopup');

        filterBtn.addEventListener('click', function () {
            filterPopup.classList.toggle('open');
        });
        // const url = 'http://127.0.0.1:8000/api/apartments/';
        // console.log(url);
        // axios.get(url)
        //     .then(resp => {
        //         if (resp.data.success) {
        //             this.apartment = resp.data.results;
        //             this.latitude = resp.data.results.latitude;
        //             this.longitude = resp.data.results.longitude;
        //             this.loading = false;
        //             this.getMap();
        //             this.addMarker();
        //         } else {
        //             // this.$router.push({ name: 'not-found' }); //
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
        //this.getMap();
        //this.addMarker();
        console.log(store.results);
    },
    created() {
        // this.callApi()
    },
}
</script>

<template>
    <div class="container-fluid">
        <div class="categories d-flex justify-content-center">
            <div class="text-center p-3" v-for="category in store.test_categorys">
                <img :src="getImagePath(`${category.img}.png`)" alt="">
                <!--Funzione per stampare le immagini dinamicamente-->
                <div>
                    {{ category.name }}
                </div>
            </div>
            <div class="align-self-center p-3">
                <button class="btn btn-primary" id="filterBtn">Apri filtro</button>
            </div>
        </div>
        <div class="container">
            <div > <!--Scrivere all'interno del popup-->
                <div id="filterPopup" class="container rounded">
                    <div class="close" id="filterBtn">
                        <i class="fa-solid fa-xmark "></i>
                        close
                    </div>
                    <div class="row">
                        <div v-for="service in store.services" class="col-4 d-flex"> <!--Stampare dinamicamente i servizi-->
                                <div class="card p-3 my-2 card_custom">
                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 24px; width: 24px; fill: currentcolor;"><path :d="service.path"></path></svg>
                                    {{ service.name }}
                                </div>
                        </div>
                        
                    </div>
                </div>
                <!-- <h3>Opzioni di filtro</h3>
                <form>
                    <label for="dateRange">Intervallo di date:</label>
                    <input type="text" id="dateRange">
                    <br><br>
                    <label for="location">Posizione:</label>
                    <input type="text" id="location">
                    <br><br>
                    <label for="guests">Numero di ospiti:</label>
                    <input type="number" id="guests">
                    <br><br>
                    <button type="submit">Applica filtro</button>
                </form> -->
            </div>

        </div>
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-6">
                <div class="container">
                    <div class="row">

                        <CardComponent v-for="apartment in store.results" :key="apartment.id" :apartment="apartment" />

                    </div>
                </div>
                <!-- <ul>
                    <li v-for="result in store.results">
                        {{ result.address }}
                    </li>
                </ul> -->
            </div>
            <div class="col-6">
                <div id='map' ref="mapRef"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;


#map {
    height: 80vh;
    width: 100%;
}

.categories img {
    width: 30px;
}

#filterPopup {
    z-index: 11;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-out, visibility 0s 0.3s;
}

#filterPopup.open {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
}

.card_custom{
    
    width: 250px;
    &:hover{
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
        cursor: pointer;
    }
}


.close{
    position: absolute;
    right: 30px;
    cursor: pointer;
}
</style>
