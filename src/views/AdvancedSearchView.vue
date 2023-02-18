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
            store,
            client: null,
            apartments: [],
            mapData: [],
        }
    },
    components: {
        CardComponent
    },
    methods: {
        clearInput() {
            store.address = '';
        },
        addMarker(longitude, latitude) {
            const tt = window.tt;
            var location = [longitude, latitude];
            // var popupOffset = 25;
            // var marker = new tt.Marker().setLngLat(location).addTo(this.map);

            var element = document.createElement("div")
            element.id = "marker"

            var marker = new tt.Marker({ element: element })
                .setLngLat(location)
                .addTo(this.map)

            // var popup = new tt.Popup({ offset: popupOffset })
            // .setHTML("Your address!");
            // marker.setPopup(popup).togglePopup();


            //

            // const icon = {
            //     iconUrl: '/img/pin_boolbnb.png',
            //     iconSize: [40, 40],
            //     iconAnchor: [0, 0],
            // };

            // const marker = new tt.Marker({ icon }).setLngLat([longitude, latitude]).addTo(this.map);

            // const popup = new tt.Popup().setHTML('<h3>Il tuo titolo personalizzato</h3>');
            // marker.setPopup(popup);
            //          
        },
        getMap() {
            const tt = window.tt;
            this.map = tt.map({
                key: 'h0FDAudCcFnS8TK5dT1mvgXYkqCGc1CW',
                container: this.$refs.mapRef,
                style: 'tomtom://vector/1/basic-light',
                center: [store.lon, store.lat],
                // center: [store.results[0].longitude, store.results[0].latitude],
                zoom: 12,
            });
            this.map.addControl(new tt.FullscreenControl());
            this.map.addControl(new tt.NavigationControl());
        },
        getImagePath: function (imgPath) {
            return new URL(`../assets/img/${imgPath}`, import.meta.url).href;
        },
        getUniqueArrayWithLatIncrease(arr) {
            const result = [];
            const latMap = new Map();
            for (const item of arr) {
                const lat = item[1];
                let latStr = lat;
                let latInc = 0;

                while (latMap.has(latStr)) {
                    latInc += 0.009;
                    latStr = (parseFloat(lat) + latInc).toFixed(5);
                }
                latMap.set(latStr, true);
                result.push([item[0], latStr]);
            }
            return result;
        },
        PushService(i) {
            const element = document.getElementById('service-' + i);
            console.log(store.address);
            if (!store.services_back.includes(store.services[i].id)) {
                store.services_back.push(store.services[i].id);
                element.classList.add('active');
                //console.log('http://127.0.0.1:8000/api/search?address=' + '' + '&services=' + store.services_back + '&category=' + '');
            } else {
                let elementToRemove = store.services[i].id;
                let index = store.services_back.indexOf(elementToRemove);
                if (index !== -1) {
                    store.services_back.splice(index, 1);
                }
                element.classList.remove('active');
                //console.log('http://127.0.0.1:8000/api/search?address=' + '' + '&services=' + store.services_back + '&category=' + '');
            }
            console.log(store.services_back);
        },
        SubmitServices() {
            axios.get('http://127.0.0.1:8000/api/search?address=' + store.address + '&services=' + store.services_back + '&category=' + store.categories_back + '&radius=' + store.radius * 1000 + '&beds=' + store.beds)
                .then(response => {
                    //console.log(resp);
                    // convertire km to metri prima di mandarli 
                    store.results = response.data.results;
                    store.loading = false
                    console.log(store.results);
                    console.log(store.categories_back);
                    console.log(store.radius, 'radius');
                    console.log(store.beds, 'beds');
                    console.log(store.address, 'address');
                })

        },
        PushCategory(i) {
            const element = document.getElementById('category-' + i);
            // Rimuovi la classe "active" da tutti gli elementi tranne quello selezionato
            for (let j = 0; j < store.categories.length; j++) {
                if (j !== i) {
                    const el = document.getElementById('category-' + j);
                    el.classList.remove('active_category');
                }
            }
            if (!store.categories_back.includes(store.categories[i].id)) {
                store.categories_back.pop(); // rimuove l'elemento precedente
                store.categories_back.push(store.categories[i].id);
                console.log('faccio la call api');
                this.SubmitServices()
            } else if (store.categories_back.length > 0 && store.categories_back[0] === store.categories[i].id) {
                // Se l'elemento è già presente, ma è l'unico elemento nell'array, non fare nulla
                console.log('non faccio nulla');
                return;
            } else {
                let elementToRemove = store.categories[i].id;
                let index = store.categories_back.indexOf(elementToRemove);
                if (index !== -1) {
                    store.categories_back.splice(index, 1);
                }
            }
            element.classList.add('active_category');
            console.log(store.categories_back);
            console.log(store.radius, 'radius');
            console.log(store.beds, 'beds');
            console.log(store.address, 'address');
        },
        clearMap() {
            document.getElementById('map').style.display = 'none';
        },



        /*
        SubmitCategory(){
            axios.get('http://127.0.0.1:8000/api/search?services='+ {params: {services: store.services_back, category : null , address : null}} )
            .then( resp =>{
                console.log(resp);
            })
        }
        */
    },
    computed: {
        computedRadius() {
            return console.log(`calc(${this.store.radius}% - (10px / 2))`);
        },
        /*
        computedRadius() {
            return `${store.radius}km`
        },
        */
        /*
        classObject(){
            return {
                active : store.isActive
            }
        },
        */

        dataLoaded() {
            return store.results
        },
    },
    watch: {
        dataLoaded(newValue) {
            if (newValue) {
                this.getMap();
                // Inizializza l'array vuoto
                this.mapData = [];
                for (let index = 0; index < store.results.length; index++) {
                    let element = store.results[index];
                    let filteredElements = this.mapData.filter((el) => el[0] === element.longitude);
                    if (filteredElements.length === 0) {
                        this.mapData.push([element.longitude, element.latitude]);
                    } else {
                        let sameLatElements = filteredElements.filter((el) => el[1] === element.latitude);
                        if (sameLatElements.length === 0) {
                            this.mapData.push([element.longitude, element.latitude + 0.00900]);
                        } else {
                            let increment = sameLatElements.length * 0.00900;
                            this.mapData.push([element.longitude, element.latitude + increment]);
                        }
                    }
                }
                // Stampa l'array finale
                const result = [];
                const latMap = new Map();

                for (const item of this.mapData) {
                    const lat = item[1];
                    let latStr = lat;
                    let latInc = 0;

                    while (latMap.has(latStr)) {
                        latInc = Math.random() * (0.00900 - 0.000100) + 0.000100;
                        latStr = (parseFloat(lat) + latInc).toFixed(5);
                    }

                    latMap.set(latStr, true);
                    const lng = item[0];
                    let lngStr = lng;
                    let lngInc = 0;

                    while (latMap.has(lngStr)) {
                        lngInc = Math.random() * (0.00900 - 0.000100) + 0.000100;
                        lngStr = (parseFloat(lng) + lngInc).toFixed(5);
                    }

                    result.push([lngStr, latStr]);
                    latMap.set(lngStr, true);
                }
                // Aggiungi i marker
                for (const [lng, lat] of result) {
                    this.addMarker(parseFloat(lng), parseFloat(lat));
                }
            }
            /*
            else {
                this.clearMap();
                console.log('sono nell else');
            }
            */
        },
    },
    mounted() {
        const filterBtn = document.querySelector('#filterBtn');
        const filterPopup = document.querySelector('#filterPopup');

        filterBtn.addEventListener('click', function () {
            filterPopup.classList.toggle('open');
        });

        axios.get('http://127.0.0.1:8000/api/services')
            .then(response => {
                store.services = response.data.results
            })

        axios.get('http://127.0.0.1:8000/api/categories')
            .then(response => {
                store.categories = response.data.results
            })
        //console.log('http://127.0.0.1:8000/api/search?services='+ store.services_back );

    },
    created() {
    },

}
</script>

<template><!-- <button class="clearInput" @click="clearInput">clear</button> -->
    <div id="results">
        <div class="container-fluid">
            <div class="categories d-flex justify-content-center">
                <div class="text-center p-3" v-for="category, i in store.categories" :key="category.id">
                    <div @click="PushCategory(i)" :id="'category-' + i">
                        <img :src="getImagePath(`${category.img}.png`)" alt="">
                        <!--Funzione per stampare le immagini dinamicamente-->
                        <div>
                            {{ category.name }}
                        </div>
                    </div>
                </div>
                <div class="align-self-center p-3">
                    <button class="btn btn-primary " id="filterBtn">Apri filtro</button>
                    <!-- <button class="btn btn-primary ms-3">Tutti gli appartamenti</button> -->

                </div>
            </div>
            <div class="container">
                <div> <!--Scrivere all'interno del popup-->
                    <div id="filterPopup" class="container rounded">
                        <div @click="SubmitServices()" class="close">
                            <i class="fa-solid fa-xmark "></i>
                            close
                            (Call api momentanea per inviare i servizi)
                        </div>
                        <div class="row">
                            <div v-for="service, i in store.services" :key="service.id" class="col-4 d-flex">

                                <div @click="PushService(i)" :id="'service-' + i" class="card p-3 my-2 card_custom">

                                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                        role="presentation" focusable="false"
                                        style="display: block; height: 24px; width: 24px; fill: currentcolor;">
                                        <path :d="service.img"></path>
                                    </svg>
                                    {{ service.name }}
                                </div>
                            </div>
                            <div> <!--TODO bisogna pushare store.radius al back insieme ai servizi-->
                                <label for="range">Seleziona il raggio in km:</label>
                                <input type="range" min="0" max="100" id="range" v-model.number="store.radius" />
                                <p>Il raggio selezionato è {{ store.radius }} km.</p>
                            </div>
                            <div> <!--TODO bisogna pushare store.beds al back insieme ai servizi & il raggio di ricerca-->
                                <label for="beds">Seleziona posti letto</label>
                                <input type="number" min="0" max="128" id="beds" v-model.number="store.beds">
                                <p>i posti letti sono {{ store.beds }} </p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div id="apartments" class="col">
                    <div class="container">
                        <div class="row">
                            <div class="cardList" v-if="store.loading">
                                <div class="cardLoading is-loading">
                                    <div class="image"></div>
                                    <div class="content">
                                        <h2></h2>
                                        <p></p>
                                    </div>
                                </div>

                                <div class="cardLoading is-loading">
                                    <div class="image"></div>
                                    <div class="content">
                                        <h2></h2>
                                        <p></p>
                                    </div>
                                </div>
                                <div class="cardLoading is-loading">
                                    <div class="image"></div>
                                    <div class="content">
                                        <h2></h2>
                                        <p></p>
                                    </div>
                                </div>
                                <div class="cardLoading is-loading">
                                    <div class="image"></div>
                                    <div class="content">
                                        <h2></h2>
                                        <p></p>
                                    </div>
                                </div>

                            </div>
                            <CardComponent class="col-lg-4 col-md-6 col-sm-12 pb-4" v-for="apartment in store.results"
                                :key="apartment.id" :apartment="apartment" v-else />

                        </div>
                    </div>

                </div>
                <div class="col hide_map_custom">
                    <div id='map' ref="mapRef"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;

//$range-progress: calc(#{$computed-radius}/100*100);
/*
input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    background-color: #ddd;
    border-radius: 5px;
    outline: none;
    margin: 0;
    padding: 0;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-color: #333;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -5px;
}

input[type=range]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 10px;
    //background-color: #999;
    background: linear-gradient(to right, red 0%, red calc(var(--computed-radius) - 1px), green calc(var(--computed-radius) + 1px), green 100%);
    border-radius: 5px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
    background: #ccc;
}
*/
/*
:root {
    --range-thumb-size: 20px;
    --range-thumb-color: #333;
    --range-track-height: 10px;
    --range-track-bg: #ddd;
    --range-track-fill-start: red;
    --range-track-fill-end: green;
    --range-track-border-radius: 5px;
}

input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: var(--range-track-height);
    background-color: var(--range-track-bg);
    border-radius: var(--range-track-border-radius);
    outline: none;
    margin: 0;
    padding: 0;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: var(--range-thumb-size);
        height: var(--range-thumb-size);
        background-color: var(--range-thumb-color);
        border-radius: 50%;
        cursor: pointer;
        margin-top: calc((var(--range-track-height) - var(--range-thumb-size)) / 2);
    }

    &::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        height: var(--range-track-height);
        background: linear-gradient(to right,
                var(--range-track-fill-start) 0%,
                var(--range-track-fill-start) calc((var(--range-thumb-size) / 2) + var(--range-thumb-size) / 4),
                var(--range-track-fill-end) calc((var(--range-thumb-size) / 2) + var(--range-thumb-size) / 4),
                var(--range-track-fill-end) 100%);
        border-radius: var(--range-track-border-radius);
    }

    &:focus::-webkit-slider-runnable-track {
        background: #ccc;
    }
}

*/
:root {
    --computed-radius: calc(50% - (10px / 2));
}

input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    background-color: #ddd;
    border-radius: 5px;
    outline: none;
    margin: 0;
    padding: 0;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-color: #333;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -5px;
}

input[type=range]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 10px;
    background: linear-gradient(to right, red 0%, red calc(var(--computed-radius) - 1px), green calc(var(--computed-radius) + 1px), green 100%);
    border-radius: 5px;
}

input[type=range]:focus::-webkit-slider-runnable-track {
    background: #ccc;
}

.map_hidden {
    display: none;
}

#results {
    height: 95vh;
    width: 100%;
}

#apartments {
    max-height: 88vh;
    overflow: auto;
}

#map {
    height: 88vh;
    width: 100%;
}

.categories img {
    width: 30px;
}

// filter
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

.card_custom {

    width: 250px;
    background: white;
    transition: all .3s;

    /*
    box-shadow: 6px 6px 12px #c5c5c5,
        -6px -6px 12px #ffffff;
    */
    &:hover {
        //box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
        cursor: pointer;
        // aggiungere le proprietà alla classe dinamica

    }
}

.active {
    color: white;
    background-color: $bb-primary;
    /*
    box-shadow: inset 4px 4px 12px #c5c5c5,
        inset -4px -4px 12px #ffffff;
        */
    border: none;
}

.active_category {
    background-color: greenyellow;
}

.close {
    position: absolute;
    right: 30px;
    cursor: pointer;
}

//Loading card
.cardList {
    display: flex;
}

.cardLoading {
    width: calc((100% - 60px) / 4);
    margin-right: 20px;

    &:nth-child(4n) {
        margin-right: 0;
    }

    &.is-loading {

        .image,
        h2,
        p {
            background: #eee;
            background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
            border-radius: 5px;
            background-size: 200% 100%;
            animation: 1.5s loading linear infinite;
        }

        .image {
            height: 200px;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        h2 {
            height: 30px;
        }

        p {
            height: 70px;
        }
    }
}

@keyframes loading {
    to {
        background-position-x: -200%;
    }
}

// Loading-map
</style>
