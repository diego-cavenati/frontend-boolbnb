<script>
import { store } from '../store';
import axios from 'axios';
import CardComponent from '../components/CardComponent.vue';
import Swiper, { Navigation, Autoplay } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';

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
            categoriesWrapper: null,
            /* activeCategoryIndex: null, */
            currentPage: 1,
            perPage: 6,
            // pages: null,
            maxHeight: null,
            nextPageUrl: '',
            prevPageUrl: '',
            largeContainer: false,
        }
    },
    components: {
        CardComponent
    },
    methods: {
        debounce(func, delay) {
            try {
                let timeout;
                return () => {
                    clearTimeout(timeout);
                    store.loading = true;
                    store.isAdvancedSearchViewLoaded = false;
                    timeout = setTimeout(() => {
                        func();
                    }, delay);
                };

            } catch (error) {
                console.log(error.message);
            }
        },
        getMap(result) {
            try {
                if (store.address.length > 0 && store.address !== null) {
                    const tt = window.tt;


                    this.map = tt.map({
                        key: '45POhoazK93Ibg5oAGDMtKuyqLhjzUGo',
                        container: this.$refs.mapRef,
                        style: '../src/assets/style-map/map-style.json',
                        center: [store.lon, store.lat],
                        interactive: true,
                        zoom: 12,
                    });
                    //console.log(this.map)
                    this.map.on('load', () => {

                        for (const [lng, lat] of result) {

                            var location = [parseFloat(lng), parseFloat(lat)];
                            var element = document.createElement("div")
                            element.id = "marker"
                            new tt.Marker({ element: element })
                                .setLngLat(location)
                                .addTo(this.map)
                        }
                        this.map.addControl(new tt.FullscreenControl());
                        this.map.addControl(new tt.NavigationControl());
                        this.map.resize();
                    })








                }

            } catch (error) {
                console.error(error.message);
            }
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
            //console.log(store.address);
            if (!store.services_back.includes(store.services[i].id)) {
                store.services_back.push(store.services[i].id);
                store.servicesIndex.push(i);
                element.classList.add('active');
                console.log(store.services_back);
                //console.log('http://127.0.0.1:8000/api/search?address=' + '' + '&services=' + store.services_back + '&category=' + '');
            } else {
                let elementToRemove = store.services[i].id;
                let index = store.services_back.indexOf(elementToRemove);
                if (index !== -1) {
                    store.services_back.splice(index, 1);
                }
                store.servicesIndex.splice(index, 1);
                element.classList.remove('active');
                //console.log('http://127.0.0.1:8000/api/search?address=' + '' + '&services=' + store.services_back + '&category=' + '');
            }
            //console.log(store.services_back);
        },
        SubmitServices() {
            try {


                axios.get('http://127.0.0.1:8000/api/search?address=' + store.address + '&services=' + store.services_back + '&category=' + store.categories_back + '&radius=' + store.radius * 1000 + '&beds=' + store.beds)
                    .then(response => {
                        console.log(response);
                        if (response.data.success) {

                            // convertire km to metri prima di mandarli 
                            store.results = response.data.results;
                            store.price = response.data.results.price;
                            store.lat = response.data.poi.lat;
                            store.lon = response.data.poi.lon;




                        } else {
                            store.results = [];


                        }
                        store.loading = false;
                        store.isAdvancedSearchViewLoaded = true;

                    }).catch(err => {
                        console.log(err);
                    })





            } catch (error) {
                console.error(error.message);

            }

        },
        PushCategory(i) {
            try {

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
                    //console.log('faccio la call api');
                    console.log(store.categories_back);
                    //console.log(this.map);
                    console.log('chiamata categories')
                    this.debounceCall();

                    // esegue la call api in base a tutti i dati
                } else if (store.categories_back.length > 0 && store.categories_back[0] === store.categories[i].id) {
                    // Se l'elemento è già presente, ma è l'unico elemento nell'array, non fare nulla
                    if (store.results.length === 0) {
                        this.debounceCall();
                    }

                } else {
                    let elementToRemove = store.categories[i].id;
                    let index = store.categories_back.indexOf(elementToRemove);
                    if (index !== -1) {
                        store.categories_back.splice(index, 1);
                        console.log(store.categories_back);
                    }
                }
                store.activeCategoryIndex = i;


            } catch (error) {
                console.error(error);
            }

        },
        clearMap() {
            if (this.map) {
                this.map.remove();
                this.map = null;
            }
            //document.getElementById('map').style.display = 'none';
        },
        AllApartments() {
            // Rimuovi tutti gli elementi dall'array categories_back
            console.log('chiamata tutti appartamenti')
            store.categories_back = [];
            this.debounceCall();
        },
        HideShowPopup() {
            const element = document.getElementById("filterPopup")
            element.classList.toggle("hide")
        },
        SearchHide() {
            console.log('chiamata services')
            this.debounceCall();
            this.HideShowPopup();
        },
        slide(direction) {
            const scrollStep = this.categoriesWrapper.offsetWidth / 2;
            this.categoriesWrapper.scrollLeft += scrollStep * direction;
        },


    },
    computed: {
        debounceCall() {
            return this.debounce(this.SubmitServices, 1000);
        },
        computedRadius() {
            return console.log(`calc(${this.store.radius} % - (10px / 2))`);
        },
        pageNumbers() {
            return store.pages;
        },
        paginatedApartments() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.apartments.slice(start, end);
        },
        dataLoaded() {
            return store.results
        },
    },
    watch: {
        dataLoaded(newValue) {
            try {
                const mapHiddenEmptyAddress = document.querySelector('.col.d-none.d-xxl-block.map');
                if (this.map !== null) {
                    this.clearMap();
                }
                if (newValue !== null && newValue.length > 0) {

                    //console.log(store.address);
                    if (store.address.length > 0 && store.address !== null) {
                        //console.log(store.address);
                        // Recupera la mappa

                        //console.log(this.map);


                        // Inizializza l'array vuoto

                        this.mapData = [];
                        //console.log(store.results)
                        for (let index = 0; index < store.results.length; index++) {
                            //console.log(store.results[index]);
                            let element = store.results[index];
                            //console.log(element);
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


                        this.getMap(result);




                        if (mapHiddenEmptyAddress.classList.contains('hide')) {
                            mapHiddenEmptyAddress.classList.remove('hide')

                        }
                        this.store.largeContainer = true;

                    } else {
                        if (!mapHiddenEmptyAddress.classList.contains('hide')) {
                            mapHiddenEmptyAddress.classList.add('hide')

                        }
                        this.store.largeContainer = false;

                    }

                } else {
                    if (this.map !== null) {
                        this.clearMap();
                    }
                    if (!mapHiddenEmptyAddress.classList.contains('hide')) {
                        mapHiddenEmptyAddress.classList.add('hide')

                    }
                    this.store.largeContainer = true;
                }


            } catch (error) {
                console.error(error);

            }

        }
    },

    mounted() {

        const swiper3 = new Swiper('.swiper-3', {
            modules: [Navigation],
            direction: 'horizontal',
            slidesPerView: 1,
            spaceBetween: 60,
            navigation: {
                nextEl: '.swiper-button-next-3',
                prevEl: '.swiper-button-prev-3',
            },
            breakpoints: {
                400: {
                    slidesPerView: 2,
                    spaceBetween: 80,
                },

                992: {
                    slidesPerView: 3,
                    spaceBetween: 60,
                },
                1400: {
                    slidesPerView: 5,

                }
            }

        });
        const filterBtn = document.querySelector('#filterBtn');
        const filterPopup = document.querySelector('#filterPopup');

        filterBtn.addEventListener('click', function () {
            filterPopup.classList.toggle('open');
        });

        axios.get('http://127.0.0.1:8000/api/services')
            .then(response => {
                //console.log(response);
                store.services = response.data.results
                //console.log(store.services);
            })
            .catch(err => {
                console.log(err);
            })

        axios.get('http://127.0.0.1:8000/api/categories')
            .then(response => {
                //console.log(response);
                store.categories = response.data.results
                //console.log(store.categories)
            })
            .catch(err => {
                console.log(err);
            })
        //TODO with next tick
        /* window.scrollTo(0, 0); */

        this.debounceCall()

    },

}
</script>


<template>
    <div id="results">

        <div class="container">
            <div class="categories d-flex justify-content-around align-items-center  flex-wrap flex-md-nowrap">
                <div class="text-center">
                    <div @click="AllApartments()" class="all_apartments px-0 px-sm-3">
                        <img src="../assets/img/tutti-gli-alloggi.png" alt="">
                        <div>
                            Tutti gli alloggi
                        </div>
                    </div>
                </div>
                <div class="swiper swiper-3 order-3  mt-3 mt-md-0">
                    <!-- Additional required wrapper -->
                    <div class="swiper-wrapper">
                        <!-- Slides -->
                        <div class="swiper-slide text-center " v-for="category, i in store.categories" :key="category.id">
                            <div class="category"
                                :class="i === store.activeCategoryIndex && store.categories_back.length !== 0 ? 'active_category' : ''"
                                @click.stop="PushCategory(i)" :id="'category-' + i">
                                <img :src="getImagePath(`${category.img}.png`)" alt="">
                                <div>
                                    {{ category.name }}
                                </div>
                            </div>
                        </div>


                    </div>


                    <!-- If we need navigation buttons -->
                    <div class="swiper-button-prev swiper-button-prev-3"></div>
                    <div class="swiper-button-next swiper-button-next-3"></div>


                </div>
                <div class="align-self-center p-3 order-2 order-md-3">
                    <button @click="HideShowPopup()" class="button" id="filterBtn">
                        <i class="fa-solid fa-sliders"></i>
                        Filtri
                    </button>
                </div>
            </div>
            <div> <!--Scrivere all'interno del popup-->
                <div id="filterPopup" class="container hide">

                    <div class="popup_heading">
                        <h3>Servizi</h3>
                        <span class="close" @click="HideShowPopup()"></span>
                    </div>
                    <div class="row services_icons">
                        <div v-for="service, i in store.services" :key="service.id"
                            class="col-xl-3 col-md-4 col-sm-6 d-flex">
                            <div @click="PushService(i)" :id="'service-' + i" class="card p-3 my-2 card_custom"
                                :class="store.servicesIndex.includes(i) ? 'active' : ''">
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                    role="presentation" focusable="false"
                                    style="display: block; height: 24px; width: 24px; fill: currentcolor;">
                                    <path :d="service.img"></path>
                                </svg>
                                {{ service.name }}
                            </div>
                        </div>



                    </div>
                    <div class="row distance_beds">

                        <div class="col-12 col-sm-6 distance">
                            <h3>Seleziona il raggio in km:</h3>
                            <!--TODO bisogna pushare store.radius al back insieme ai servizi-->
                            <input type="range" min="20" max="100" id="range" v-model.number="store.radius" />
                            <p>Il raggio selezionato è {{ store.radius }} km.</p>
                        </div>


                        <div class="col-12 col-sm-6 beds-input">
                            <h3 for="beds">Posti Letto</h3>
                            <div class="beds-input-container">
                                <svg class="beds-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
                                    <g id="Livello_2" data-name="Livello 2">
                                        <g id="Livello_1-2" data-name="Livello 1">
                                            <path
                                                d="M21,192H0V92c2.63-4.14,5.35-8.23,7.86-12.44,1.17-2,2.74-4.13,2.76-6.23.23-17.12.16-34.25.13-51.38,0-9,4.07-15.54,11.92-19.8C24.08,1.38,25.55.71,27,0H165c12.53,4.93,17.05,14.2,16.42,27.44-.73,15.26-.21,30.58-.11,45.88a9.82,9.82,0,0,0,1.28,5c3,4.67,6.25,9.14,9.41,13.69V192H171V171.19H21ZM170.43,96.31H21.59V149H170.43ZM32.32,21.48V74.75H52.58a8.1,8.1,0,0,0,.57-1.65c.05-5.66.06-11.32.1-17,.08-9.67,3.68-13.34,13.29-13.36q29,0,58,0c10.92,0,14.23,3.38,14.25,14.41,0,5.74,0,11.49,0,17.17h20.92V21.48Z" />
                                        </g>
                                    </g>
                                </svg>
                                <input type="number" id="beds" min="1" max="127" v-model.number="store.beds">
                            </div>
                            <p>i posti letti sono {{ store.beds }}</p>
                        </div>
                    </div>
                    <div @click="SearchHide()" class="confirm">
                        <button class="button">Applica i filtri</button>
                        <!-- Bottone di ricerca per categoria, via servizi etc-->
                    </div>
                </div>
            </div>


        </div>
        <div class="container-fluid">
            <div class="row">
                <div id="apartments" class="col">
                    <div class="container pb-5 results_container">
                        <div class="row flex-grow-1">


                            <CardComponent class="pb-4"
                                v-if="!store.loading && store.isAdvancedSearchViewLoaded && (!store.results == null || !store.results.length < 1)"
                                v-for="apartment in store.results" :apartment="apartment" />


                            <div class="cardList row row-cols-1 row-cols-md-4 gx-0 gx-md-2 gy-2"
                                v-else-if="store.loading || store.isSearchbarComponentLoaded === false || store.isAdvancedSearchViewLoaded === false">
                                <div class=" col cardLoading is-loading">
                                    <div class="image"></div>
                                    <div class="content">
                                        <h2></h2>
                                        <p></p>
                                    </div>
                                </div>

                                <div class=" col cardLoading is-loading">
                                    <div class="image"></div>
                                    <div class="content">
                                        <h2></h2>
                                        <p></p>
                                    </div>
                                </div>
                                <div class=" col cardLoading is-loading">
                                    <div class="image"></div>
                                    <div class="content">
                                        <h2></h2>
                                        <p></p>
                                    </div>
                                </div>
                                <div class="col cardLoading is-loading">
                                    <div class="image"></div>
                                    <div class="content">
                                        <h2></h2>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div v-else-if="!store.loading && (store.results == null || store.results.length == 0)"
                                class=" justify-content-center not_found d-flex align-items-center p-5">
                                <div class="text-center">
                                    <img src="../assets/img/not-found.png" alt="">
                                    <div class="pt-5">
                                        <h1>Siamo spiacenti, la nostra piattaforma non copre ancora la tua ricerca</h1>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col d-none d-xxl-block map">
                    <div id='map' ref="mapRef" style='width: 100%; height:100%;'></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;




:root {
    --computed-radius: calc(50% - (10px / 2));
}

.results_container {
    min-height: 80vh;
    display: flex;
    align-items: center;
}

.not_found img {
    width: 300px;
}

@media screen and (min-width: 586px) {
    .not_found img {
        width: 400px;
    }

}

.all_apartments {
    cursor: pointer;
    //width: 125px;
}

.category {
    white-space: nowrap;
}

.categories {
    //overflow-x: auto;
    white-space: nowrap;
    display: flex;
    justify-content: center;
}

.swiper.swiper-3 {
    padding: 1.5rem 3.5rem;
}

@media (max-width: 1739px) {
    .categories {
        justify-content: start;
    }
}

.test_map {
    position: fixed;
    top: 150px;
    left: 50%;
    z-index: 100;
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
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
}

.beds-input label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
}



.category:hover {
    cursor: pointer;
}



#filterPopup {
    z-index: 11;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-radius: 1.3rem;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

.beds-input-container {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.5rem;
    width: 50%;
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

@media screen and (max-width: 586px) {
    #filterPopup {
        height: 100%;
        border-radius: 0px;

        h3 {
            font-size: 1.4rem;
        }

        .row.services_icons {
            overflow-y: auto;
            height: 500px;
        }

        .row.distance_beds {
            justify-content: center;
        }

        .beds-input,
        .distance {
            width: 100%;
        }

        .beds-input p,
        .distance p {
            font-size: 0.9rem;
        }
    }




}

.map_hidden {
    display: none;
}

#results {
    width: 100%;
}

#apartments {
    max-height: 88vh;
    overflow: auto;
    //overflow: hidden;
}




.categories img {
    width: 30px;
}



// filter




.hide {
    display: none;
}

.col.d-none.d-xxl-block.hide {
    display: none !important;
}

.distance {
    padding-top: 2rem;
    width: 50%;
}

.card_custom {
    width: 100%;
    padding: 1rem;
    display: flex;
    background: white;
    transition: all .3s;

    svg {
        margin-bottom: 0.4rem;
    }


    &:hover {
        cursor: pointer;


    }
}

.active {
    color: white;
    background-color: $bb-primary;
    border: none;
}

.active_category {
    border-bottom: 2px solid $bb-primary;
    color: $bb-primary;
    font-weight: 500;
}

.confirm {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
}

.popup_heading {

    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span.close:after {
        display: inline-block;
        content: "\00d7";
        color: $bb-light;
        font-size: 3rem;
    }
}


//Loading card
.cardList {
    display: flex;
}

.cardLoading {



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

// Pagination
.pagination {
    padding-top: 1.5rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
        color: $bb-dark;

        svg {
            color: $bb-text-gray;
        }
    }
}

.page-numbers {
    display: flex;
    margin: 0 1rem;
    align-items: baseline;
}

.page-numbers div {

    padding: 0.5rem;
    cursor: pointer;
    font-family: $bb-secondary;

    &.active {
        padding: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $bb-primary;
        color: white;
        height: 1.5rem;
        aspect-ratio: 1/1;
        border-radius: 50%;
    }
}



@media screen and (max-width: 1472px) {

    .btn-left,
    .btn-right {
        display: flex;
    }
}

.hide_map_custom {
    display: none;
}

@media screen and (min-width: 1399px) {
    .hide_map_custom {
        display: block;
    }
}

.test_map {
    display: none;
}

@media screen and (max-width: 743px) {
    .test_map {
        display: block;
    }
}
</style>
