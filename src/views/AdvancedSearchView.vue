<script>
import { store } from '../store';
import axios from 'axios';
import CardComponent from '../components/CardComponent.vue';
import { toHandlers } from 'vue';

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
                    console.log('funziono, nascondo');
                    console.log(store.categories_back);
                    console.log(store.radius, 'radius');
                    console.log(store.beds, 'beds');
                    console.log(store.address, 'address');
                    console.log(store.results);
                    console.log('http://127.0.0.1:8000/api/search?address=' + store.address + '&services=' + store.services_back + '&category=' + store.categories_back + '&radius=' + store.radius * 1000 + '&beds=' + store.beds);
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
                this.SubmitServices() // esegue la call api in base a tutti i dati
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
        AllApartments() {
            store.categories_back = []; // Rimuovi tutti gli elementi dall'array categories_back
            const categories = document.querySelectorAll('.active_category'); // Seleziona tutti gli elementi che hanno la classe "active_category"
            categories.forEach(category => category.classList.remove('active_category')); // Rimuovi la classe "active_category" da tutti gli elementi
            //console.log(store.categories_back);
            axios.get('http://127.0.0.1:8000/api/search')
                .then(response => {
                    store.results = response.data.results;
                    console.log(store.results);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        HideShowPopup() {
            const element = document.getElementById("filterPopup")
            element.classList.toggle("hide")
        },
        SearchHide() {
            this.SubmitServices();
            this.HideShowPopup();
        }

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
                // Recupera la mappa
                this.getMap();

                // Inizializza l'array vuoto

                this.mapData = [];
                console.log(store.results)
                for (let index = 0; index < store.results.length; index++) {
                    console.log(store.results[index]);
                    let element = store.results[index];
                    console.log(element);
                    this.mapData.push([element.longitude, element.latitude]);
                }
                //console.log(this.mapData)
                for (let i = 0; i < this.mapData.length; i++) {
                    for (let j = i; j < this.mapData.length; j++) {
                        if (this.mapData[i][0] === this.mapData[j][0] && this.mapData[i][1] === this.mapData[j][1]) {
                            this.mapData[j][1] = Number(this.mapData[j][1]) + 0.00900;
                            this.mapData[j][1] = this.mapData[j][1].toString();
                        }
                    }
                }
                //console.log(this.mapData)
                
                // Stampa l'array finale
                const result = [];
                const latMap = new Map();

                for (const location of uniqueLocations) {
                    let lat = location.latitude;
                    let lng = location.longitude;
                    let latStr = lat.toFixed(5);
                    let lngStr = lng.toFixed(5);

                    while (latMap.has(latStr)) {
                        const latInc = Math.random() * (0.009 - 0.001) + 0.001;
                        lat = parseFloat(lat) + latInc;
                        latStr = lat.toFixed(5);
                    }

                    latMap.set(latStr, true);

                    while (latMap.has(lngStr)) {
                        const lngInc = Math.random() * (0.009 - 0.001) + 0.001;
                        lng = parseFloat(lng) + lngInc;
                        lngStr = lng.toFixed(5);
                    }

                    latMap.set(lngStr, true);

                    result.push([lngStr, latStr]);
                }

                // Aggiungi i marker alla mappa
                for (const [lng, lat] of result) {
                    this.addMarker(parseFloat(lng), parseFloat(lat));
                }
            } else {
                // Se i dati non sono caricati, rimuovi i marker dalla mappa
                this.clearMap();
            }
        }
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
        /* // possibile funzione per far scomparire il popup 
        document.addEventListener("click", function (event) {
            var elementoDaNascondere = document.getElementById("filterPopup");
            if (event.target !== elementoDaNascondere && parseInt(window.getComputedStyle(event.target).getPropertyValue("z-index")) < 11) {
                elementoDaNascondere.style.display = "none";
            }
        });
        */
    },
    created() {
    },

}
</script>


<template>
    <div id="results">
        <div class="container-fluid">
            <div class="categories d-flex justify-content-center">
                <div class="text-center pt-1">
                    <div @click="AllApartments()" class="all_apartments">
                        <img src="../assets/img/pin_boolbnb.png" alt="">
                        <div>
                            ALL
                        </div>
                    </div>
                </div>
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
                    <button @click="HideShowPopup()" class="btn btn-primary " id="filterBtn">Apri filtro</button>
                    <!-- <button class="btn btn-primary ms-3">Tutti gli appartamenti</button> -->
                </div>
            </div>
            <div class="container">
                <div> <!--Scrivere all'interno del popup-->
                    <div id="filterPopup" class="container rounded hide">
                        <div @click="SearchHide()" class="close">
                            <button class="btn btn-primary ms-3">CERCA</button>
                            <!-- Bottone di ricerca per categoria, via servizi etc-->
                        </div>
                        <div>
                            <button @click="HideShowPopup()" class="btn btn-primary ms-3">CHIUDI</button>
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
                                <input type="range" min="20" max="100" id="range" v-model.number="store.radius" />
                                <p>Il raggio selezionato è {{ store.radius }} km.</p>
                            </div>
                            <!--

                                                                                                                                                                                    <div class="card card_custom"> 
                                                                                                                                                                                        <svg class="beds_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><g id="Livello_2" data-name="Livello 2"><g id="Livello_1-2" data-name="Livello 1"><path d="M21,192H0V92c2.63-4.14,5.35-8.23,7.86-12.44,1.17-2,2.74-4.13,2.76-6.23.23-17.12.16-34.25.13-51.38,0-9,4.07-15.54,11.92-19.8C24.08,1.38,25.55.71,27,0H165c12.53,4.93,17.05,14.2,16.42,27.44-.73,15.26-.21,30.58-.11,45.88a9.82,9.82,0,0,0,1.28,5c3,4.67,6.25,9.14,9.41,13.69V192H171V171.19H21ZM170.43,96.31H21.59V149H170.43ZM32.32,21.48V74.75H52.58a8.1,8.1,0,0,0,.57-1.65c.05-5.66.06-11.32.1-17,.08-9.67,3.68-13.34,13.29-13.36q29,0,58,0c10.92,0,14.23,3.38,14.25,14.41,0,5.74,0,11.49,0,17.17h20.92V21.48Z"/></g></g></svg>
                                                                                                                                                                                        <input type="number" min="0" max="128" id="beds" v-model.number="store.beds">
                                                                                                                                                                                        <p>i posti letti sono {{ store.beds }} </p>
                                                                                                                                                                                    </div>
                                                                                                                                                                                -->

                            <div class="beds-input">
                                <label for="beds">Posti Letto</label>
                                <div class="beds-input-container">
                                    <svg class="beds-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
                                        <g id="Livello_2" data-name="Livello 2">
                                            <g id="Livello_1-2" data-name="Livello 1">
                                                <path
                                                    d="M21,192H0V92c2.63-4.14,5.35-8.23,7.86-12.44,1.17-2,2.74-4.13,2.76-6.23.23-17.12.16-34.25.13-51.38,0-9,4.07-15.54,11.92-19.8C24.08,1.38,25.55.71,27,0H165c12.53,4.93,17.05,14.2,16.42,27.44-.73,15.26-.21,30.58-.11,45.88a9.82,9.82,0,0,0,1.28,5c3,4.67,6.25,9.14,9.41,13.69V192H171V171.19H21ZM170.43,96.31H21.59V149H170.43ZM32.32,21.48V74.75H52.58a8.1,8.1,0,0,0,.57-1.65c.05-5.66.06-11.32.1-17,.08-9.67,3.68-13.34,13.29-13.36q29,0,58,0c10.92,0,14.23,3.38,14.25,14.41,0,5.74,0,11.49,0,17.17h20.92V21.48Z" />
                                            </g>
                                        </g>
                                    </svg>
                                    <input type="number" id="beds" v-model.number="store.beds">
                                </div>
                                <p>i posti letti sono {{ store.beds }}</p>
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

.beds-input {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.beds-input label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

.beds-input-container {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.5rem;
}

.beds-icon {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    fill: #ccc;
}

#beds {
    width: 3rem;
    border: none;
    outline: none;
    font-size: 1rem;
}

.beds-input p {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: #666;
}

/*
.beds_svg {
    width: 30px;
}
*/
.all_apartments {
    cursor: pointer;
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
    //overflow: hidden;
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
    //opacity: 0;
    //transition: opacity 0.3s ease-out, visibility 0s 0.3s;
}

/*
#filterPopup.open {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
}
*/
.hide {
    display: none;
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
