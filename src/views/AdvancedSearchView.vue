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
        addMarker() {
            const tt = window.tt;
            var location = [2.323653, 48.873261]; //ciclare per risultati per aggiungere marker
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
                center: [2.323653, 48.873261],
                // center: [this.longitude, this.latitude],
                zoom: 7,
            });
            this.map.addControl(new tt.FullscreenControl());
            this.map.addControl(new tt.NavigationControl());
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
    mounted() {
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
        this.getMap();
        this.addMarker();
    },
    created() {
        // this.callApi()


    },
}
</script>

<template>

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
</style>
