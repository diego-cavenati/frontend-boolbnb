<script>
import { store } from '../store';
import axios from 'axios';
import CardComponent from '../components/CardComponent.vue';
;

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
        }
    },
    components: {
        CardComponent
    },
    methods: {
        previousPage() {
            if (this.prevPageUrl !== null) {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    console.log(this.currentPage);
                    axios.get(`http://127.0.0.1:8000/api/search?page=${this.currentPage}`)
                        .then(response => {
                            store.results = response.data.results.data;
                            this.nextPageUrl = response.data.results.next_page_url;
                            this.prevPageUrl = response.data.results.prev_page_url
                        })
                        .catch(error => {
                            console.error(error)
                        });
                }
            }

        },
        nextPage() {
            if (this.nextPageUrl !== null) {
                if (this.currentPage > 0 && this.currentPage < store.pages) {
                    this.currentPage++;

                    axios.get(`http://127.0.0.1:8000/api/search?page=${this.currentPage}`)
                        .then(response => {
                            store.results = response.data.results.data;
                            this.nextPageUrl = response.data.results.next_page_url;
                            this.prevPageUrl = response.data.results.prev_page_url
                        })
                        .catch(error => {
                            console.error(error)
                        });
                }
            }
        },
        goToPage(pageNumber) {
            this.currentPage = pageNumber;
            console.log(this.currentPage);
            this.callApi();
        },
        addMarker(longitude, latitude) {
            try {
                if (this.map) {
                    const tt = window.tt;
                    var location = [longitude, latitude];
                    // var popupOffset = 25;
                    // var marker = new tt.Marker().setLngLat(location).addTo(this.map);

                    var element = document.createElement("div")
                    element.id = "marker"

                    var marker = new tt.Marker({ element: element })
                        .setLngLat(location)
                        .addTo(this.map)

                }

            } catch (error) {
                console.error(error);
                // Expected output: ReferenceError: nonExistentFunction is not defined
                // (Note: the exact output may be browser-dependent)
            }
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
            try {
                if (store.address.length > 0 && store.address !== null) {
                    const tt = window.tt;

                    this.map = tt.map({
                        key: '45POhoazK93Ibg5oAGDMtKuyqLhjzUGo',
                        container: this.$refs.mapRef,
                        style: 'tomtom://vector/1/basic-light',
                        center: [store.lon, store.lat],
                        interactive: true,
                        // center: [store.results[0].longitude, store.results[0].latitude],
                        zoom: 12,
                    });
                    //console.log(this.map)

                    this.map.addControl(new tt.FullscreenControl());
                    this.map.addControl(new tt.NavigationControl());
                    this.map.dragpan.enable({
                        linearity: 0.3,
                        easing: bezier(0, 0, 0.3, 1),
                        maxSpeed: 1400,
                        deceleration: 2500,
                    });


                    this.map.on('render', () => {
                        this.map.resize();
                    })



                }

            } catch (error) {
                console.error(error);
                // Expected output: ReferenceError: nonExistentFunction is not defined
                // (Note: the exact output may be browser-dependent)
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
        async SubmitServices() {
            try {
                const mapHiddenEmptyAddress = document.querySelector('.col.d-none.d-xxl-block.map');
                //console.log(store.address);
                store.loading = true;
                //console.log(store.radius * 1000);
                axios.get('http://127.0.0.1:8000/api/search?address=' + store.address + '&services=' + store.services_back + '&category=' + store.categories_back + '&radius=' + store.radius * 1000 + '&beds=' + store.beds)
                    .then(response => {
                        //console.log(resp);
                        // convertire km to metri prima di mandarli 
                        store.results = response.data.results;
                        store.price = response.data.results.price;
                        store.lat = response.data.poi.lat;
                        store.lon = response.data.poi.lon;
                        store.loading = false;

                        if (store.address.length < 1 || store.address == null || store.address === '' || store.results == null || store.results.length < 1) {
                            if (!mapHiddenEmptyAddress.classList.contains('hide')) {
                                mapHiddenEmptyAddress.classList.add('hide')

                            }
                        } else {
                            mapHiddenEmptyAddress.classList.remove('hide')
                        }
                        /*  console.log('funziono, nascondo');
                        console.log(store.categories_back);
                        console.log(store.radius, 'radius');
                        console.log(store.beds, 'beds');
                        console.log(store.address, 'address');
                         console.log(store.results); */
                        //console.log('http://127.0.0.1:8000/api/search?address=' + store.address + '&services=' + store.services_back + '&category=' + store.categories_back + '&radius=' + store.radius * 1000 + '&beds=' + store.beds);
                    }).catch(err => {
                        console.log(err);
                    })





            } catch (error) {
                console.error(error);
                // Expected output: ReferenceError: nonExistentFunction is not defined
                // (Note: the exact output may be browser-dependent)
            }

        },
        PushCategory(i) {
            try {
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
                    //console.log('faccio la call api');
                    console.log(store.categories_back);
                    //console.log(this.map);

                    this.SubmitServices();

                    // esegue la call api in base a tutti i dati
                } else if (store.categories_back.length > 0 && store.categories_back[0] === store.categories[i].id) {
                    // Se l'elemento è già presente, ma è l'unico elemento nell'array, non fare nulla
                    /*  console.log('non faccio nulla');
                     console.log(store.categories_back); */
                    console.log(store.categories_back);

                    return;
                } else {
                    let elementToRemove = store.categories[i].id;
                    let index = store.categories_back.indexOf(elementToRemove);
                    if (index !== -1) {
                        store.categories_back.splice(index, 1);
                        console.log(store.categories_back);
                    }
                }
                store.activeCategoryIndex = i;

                /*  console.log(store.address);
                console.log(store.results);
                 console.log(store.categories_back); */
            } catch (error) {
                console.error(error);
                // Expected output: ReferenceError: nonExistentFunction is not defined
                // (Note: the exact output may be browser-dependent)
            }
            /*console.log(store.radius, 'radius');
            console.log(store.beds, 'beds');
            console.log(store.address, 'address'); */
        },
        clearMap() {
            if (this.map) {
                this.map.remove();
                this.map = null;
            }
            //document.getElementById('map').style.display = 'none';
        },
        AllApartments() {
            store.categories_back = []; // Rimuovi tutti gli elementi dall'array categories_back
            /* const categories = document.querySelectorAll('.active_category');
            console.log(categories); // Seleziona tutti gli elementi che hanno la classe "active_category"
            categories.forEach(category => category.classList.remove('active_category')); */ // Rimuovi la classe "active_category" da tutti gli elementi
            //console.log(store.categories_back);
            this.SubmitServices();
        },
        HideShowPopup() {
            const element = document.getElementById("filterPopup")
            element.classList.toggle("hide")
        },
        SearchHide() {
            this.SubmitServices();
            this.HideShowPopup();
        },
        slide(direction) {
            const scrollStep = this.categoriesWrapper.offsetWidth / 2;
            this.categoriesWrapper.scrollLeft += scrollStep * direction;
        },
        /*
        HideShowMap() {
            const realMap = document.getElementById('map') // MAPPA
            const rightCol = document.querySelector('.hide_map_custom'); // COLONNA DX
            const leftCol = document.getElementById('apartments'); // COLONNA SX
            rightCol.classList.remove('hide_map_custom')
            leftCol.classList.add('hide')
            realMap.classList.remove('d-none')
            realMap.classList.remove('d-xxl-block')
            //leftCol.classList.toggle('hide')
            //map.classList.toggle('d-none')
            //realMap.classList.add('d-none')
            //map.classList.toggle('hide')
            console.log(leftCol);
            console.log(realMap);
            //console.log(map);
        },
        */

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
                if (newValue !== null && newValue.length > 0) {
                    //console.log(store.address);
                    if (store.address.length > 0 && store.address !== null) {
                        //console.log(store.address);
                        // Recupera la mappa
                        if (this.map !== null) {
                            this.clearMap();
                        }
                        this.getMap();
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
                        // Aggiungi i marker

                        for (const [lng, lat] of result) {

                            this.addMarker(parseFloat(lng), parseFloat(lat));


                        }


                    }
                }


            } catch (error) {
                console.error(error);
                // Expected output: ReferenceError: nonExistentFunction is not defined
                // (Note: the exact output may be browser-dependent)
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
        /*  console.log(store.services);
         console.log(store.categories); */


        if (store.results === null || store.results.length === 0) {
            this.SubmitServices();
        }

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
            <div class="categories d-flex  align-items-center">
                <div class="text-center">
                    <div @click="AllApartments()" class="all_apartments">
                        <img src="../assets/img/tutti-gli-alloggi.png" alt="">
                        <div>
                            Tutti gli alloggi
                        </div>
                    </div>
                </div>
                <div class="categories_container d-flex">
                    <div class="text-center p-3" v-for="category, i in store.categories" :key="category.id">
                        <div class="category"
                            :class="[i === store.activeCategoryIndex && store.categories_back.length !== 0 ? 'active_category' : '', store.loading ? 'loading' : '']"
                            @click.stop="PushCategory(i)" :id="'category-' + i">
                            <img :src="getImagePath(`${category.img}.png`)" alt="">
                            <div>
                                {{ category.name }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="align-self-center p-3">
                    <button @click="HideShowPopup()" class="button" id="filterBtn">
                        <i class="fa-solid fa-sliders"></i>
                        Filtri
                    </button>
                </div>
            </div>

            <!--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <button @click=" HideShowMap()" class="btn btn-primary test_map">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            MAPPA
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                -->


            <div> <!--Scrivere all'interno del popup-->
                <div id="filterPopup" class="container rounded hide">
                    <div class="close">
                        <button @click="HideShowPopup()"></button>
                    </div>
                    <div class="row">
                        <h3>Servizi</h3>
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

                        <div class="row">

                            <div class="col-6 distance">
                                <h3>Seleziona il raggio in km:</h3>
                                <!--TODO bisogna pushare store.radius al back insieme ai servizi-->
                                <input type="range" min="20" max="100" id="range" v-model.number="store.radius" />
                                <p>Il raggio selezionato è {{ store.radius }} km.</p>
                            </div>


                            <div class="col-6 beds-input">
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
                    <div class="container pb-5">
                        <div class="row">


                            <CardComponent class="pb-4"
                                v-if="!store.loading && (!store.results == null || !store.results.length < 1)"
                                v-for="apartment in store.results" :apartment="apartment" />


                            <div class="cardList row row-cols-4" v-else-if="store.loading">
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
                            <!-- <div class="pagination" v-if="!store.loading">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <button @click="previousPage">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <i class="fa-solid fa-chevron-left"></i>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div class="page-numbers">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <div v-for="pageNumber in pageNumbers" :key="pageNumber"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            :class="{ active: currentPage === pageNumber }" @click="goToPage(pageNumber)">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            {{ pageNumber }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <button @click="nextPage">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <i class="fa-solid fa-chevron-right"></i>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div> -->
                        </div>
                    </div>
                </div>
                <div class="col d-none d-xxl-block map">
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


.not_found img {
    width: 400px;
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

.categories_container {
    overflow-x: auto;
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

.loading {
    pointer-events: none;
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

/*
.beds_svg {
    width: 30px;
}
*/

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
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-radius: 1.3rem !important;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
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
    border-bottom: 2px solid $bb-primary;
    color: $bb-primary;
    font-weight: 500;
}

.confirm {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
}

.close {

    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    height: 30px;

    button:after {
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
    /* width: calc((100% - 60px) / 4); */
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
