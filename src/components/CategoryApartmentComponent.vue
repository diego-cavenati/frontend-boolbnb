<script>
import axios from 'axios';
import { store } from '../store';
import CardComponent from './CardComponent.vue';

export default {
    name: 'ShowcaseComponent',
    components: {
        CardComponent,
    },
    data() {
        return {
            store,
            apartments: [],
            currentPage: 1,
            perPage: 6,
            pages: null,
            maxHeight: null,
            nextPageUrl: '',
            prevPageUrl: '',
            categories: [],
            activeCategoryIndex: null,
            loading: false,
        }
    },
    computed: {
        pageNumbers() {
            return this.pages;
        },
        paginatedApartments() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return store.results.slice(start, end);
        }
    },
    methods: {
        setMaxHeight() {
            const cards = document.querySelectorAll(".card");
            let maxHeight = 0;

            cards.forEach(card => {
                const height = card.offsetHeight;
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });

            this.maxHeight = maxHeight;
        },
        previousPage() {
            // if (this.currentPage > 1) {
            //     this.currentPage--;
            // }
            if (this.prevPageUrl !== null) {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    console.log(this.currentPage);
                    if (this.categories !== null && this.categories.length > 0) {
                        axios.get('http://127.0.0.1:8000/api/apartments?category=' + this.categories + `&page=${this.currentPage}`)
                            .then(response => {
                                store.results = response.data.results.data
                                //this.apartments = response.data.results.data;
                                this.nextPageUrl = response.data.results.next_page_url;
                                this.prevPageUrl = response.data.results.prev_page_url
                            })
                            .catch(error => {
                                console.error(error)
                            });
                    } else {
                        axios.get(`http://127.0.0.1:8000/api/apartments?page=${this.currentPage}`)
                            .then(response => {
                                store.results = response.data.results.data
                                //this.apartments = response.data.results.data;
                                this.nextPageUrl = response.data.results.next_page_url;
                                this.prevPageUrl = response.data.results.prev_page_url
                            })
                            .catch(error => {
                                console.error(error)
                            });

                    }
                }
            }
        },
        nextPage() {
            // if (this.currentPage < this.pages) {
            //     this.currentPage++;
            // }
            if (this.nextPageUrl !== null) {
                if (this.currentPage > 0 && this.currentPage < this.pages) {
                    this.currentPage++;
                    console.log(this.currentPage);
                    if (this.categories !== null && this.categories.length > 0) {
                        axios.get('http://127.0.0.1:8000/api/apartments?category=' + this.categories + `&page=${this.currentPage}`)
                            .then(response => {
                                store.results = response.data.results.data
                                //this.apartments = response.data.results.data;
                                this.nextPageUrl = response.data.results.next_page_url;
                                this.prevPageUrl = response.data.results.prev_page_url
                            })
                            .catch(error => {
                                console.error(error)
                            });

                    } else {
                        axios.get(`http://127.0.0.1:8000/api/apartments?page=${this.currentPage}`)
                            .then(response => {
                                store.results = response.data.results.data
                                //this.apartments = response.data.results.data;
                                this.nextPageUrl = response.data.results.next_page_url;
                                this.prevPageUrl = response.data.results.prev_page_url
                            })
                            .catch(error => {
                                console.error(error)
                            });
                    }

                }
            }
        },
        goToPage(pageNumber) {
            this.currentPage = pageNumber;
            if (this.categories !== null && this.categories.length > 0) {
                axios.get('http://127.0.0.1:8000/api/apartments?category=' + this.categories + `&page=${this.currentPage}`)
                    .then(response => {
                        //this.apartments = response.data.results.data;
                        store.results = response.data.results.data
                        this.pages = response.data.results.last_page;
                        this.loading = false;
                    })
                    .catch(error => {
                        console.error(error)
                        this.error = error.message;
                        this.loading = false;
                    })
            } else {
                axios.get(`http://127.0.0.1:8000/api/apartments?page=${this.currentPage}`)
                    .then(response => {
                        //this.apartments = response.data.results.data;
                        store.results = response.data.results.data
                        this.pages = response.data.results.last_page;
                        this.loading = false;
                    })
                    .catch(error => {
                        console.error(error)
                        this.error = error.message;
                        this.loading = false;
                    })
            }


        },
        callAll() {
            this.loading = true;
            this.categories = [];
            //store.categories_back = []; // Rimuovi tutti gli elementi dall'array categories_back
            this.activeCategoryIndex = null

            // Rimuovi la classe "active_category" da tutti gli elementi
            axios.get(`http://127.0.0.1:8000/api/apartments`)
                .then(response => {
                    store.results = response.data.results.data
                    //this.apartments = response.data.results.data;
                    // this.pages = Math.ceil(this.apartments.length / this.perPage);
                    // console.log(response);
                    this.pages = response.data.results.last_page;
                    console.log(response.data.results.last_page);
                    this.loading = false;
                })
                .catch(error => {
                    console.error(error)
                    this.error = error.message;
                    this.loading = false;
                })
        },
        search() {
            store.address = '';
            store.categories_back = [];
            store.services_back = [];
            store.servicesIndex = [];
            store.radius = 20;
            store.beds = '';
            axios.get(`http://127.0.0.1:8000/api/search`)
                .then(response => {
                    this.apartments = response.data.results;
                    // this.pages = Math.ceil(this.apartments.length / this.perPage);
                    // console.log(response);

                    this.loading = false;
                })
                .catch(error => {
                    console.error(error)
                    this.error = error.message;
                    this.loading = false;
                })
        },
        getImagePath: function (imgPath) {
            return new URL(`../assets/img/${imgPath}`, import.meta.url).href;
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
                if (!this.categories.includes(store.categories[i].id)) {
                    this.categories.pop(); // rimuove l'elemento precedente
                    this.categories.push(store.categories[i].id);

                    /*console.log(this.categories);
                    console.log(this.map);
 */
                    this.SubmitServices();
                    /* console.log('faccio la call api');
                    console.log(store.results); */

                    // esegue la call api in base a tutti i dati
                } else if (this.categories.length > 0 && this.categories[0] === store.categories[i].id) {
                    // Se l'elemento è già presente, ma è l'unico elemento nell'array, non fare nulla
                    /*  console.log('non faccio nulla');
                     console.log(this.categories); */
                    return;
                } else {
                    let elementToRemove = store.categories[i].id;
                    let index = this.categories.indexOf(elementToRemove);
                    if (index !== -1) {
                        this.categories.splice(index, 1);

                    }
                }
                this.activeCategoryIndex = i;

                this.currentPage = 1;
            } catch (error) {
                console.error(error);
            }
        },
        SubmitServices() {
            try {
                this.loading = true;
                //console.log(this.categories);
                axios.get('http://127.0.0.1:8000/api/apartments?category=' + this.categories)
                    .then(response => {
                        //console.log(resp);
                        // convertire km to metri prima di mandarli 
                        store.results = response.data.results.data;
                        console.log(response.data.results.data);
                        //console.log('faccio la call api');
                        //console.log(store.results);
                        this.pages = response.data.results.last_page;
                        console.log(response.data.results.last_page);
                        this.loading = false;
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

        }
    },
    created() {
        this.callAll()

    },
    mounted() {
        this.setMaxHeight();
        axios.get('http://127.0.0.1:8000/api/categories')
            .then(response => {
                //console.log(response);
                store.categories = response.data.results
                //console.log(store.categories)
            })
            .catch(err => {
                console.log(err);
            })
    },
}
</script>

<template>
    <div id="categories">
        <div class="container">
            <h2>Scopri le nostre categorie <span class="title_mark">di appartamenti</span></h2>
            <div class="description">
                <p>
                    Benvenuti nel nostro catalogo di appartamenti unici e spettacolari, suddivisi in diverse categorie per
                    soddisfare le esigenze di ogni tipo di viaggiatore. Siamo orgogliosi di offrire una vasta gamma di
                    alloggi unici, dal lusso assoluto alle sistemazioni più minimaliste e funzionali.
                </p>

                <router-link :to="{ name: 'search' }">
                    <button class="button" @click="search()">Vedi tutti</button>
                </router-link>
            </div>

            <div class="container-fluid"> <!-- CAROUSEL -->
                <div class="categories d-flex  align-items-center">
                    <div class="text-center">
                        <div @click="callAll()" class="all_apartments">
                            <img src="../assets/img/tutti-gli-alloggi.png" alt="">
                            <div>
                                Tutti gli alloggi
                            </div>
                        </div>
                    </div>
                    <div class="categories_container d-flex">
                        <div class="text-center " v-for="category, i in store.categories" :key="category.id">
                            <div class="category p-3"
                                :class="[i === activeCategoryIndex ? 'active_category' : '', loading ? 'loading' : '']"
                                @click.stop="PushCategory(i)" :id="'category-' + i">
                                <img :src="getImagePath(`${category.img}.png`)" alt="">
                                <div>
                                    {{ category.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="align-self-center p-3">
                        <!--
                                                                                                                                                                                                                                                                                                                                                                            <button @click="HideShowPopup()" class="button" id="filterBtn">
                                                                                                                                                                                                                                                                                                                                                                                <i class="fa-solid fa-sliders"></i>
                                                                                                                                                                                                                                                                                                                                                                                Filtri
                                                                                                                                                                                                                                                                                                                                                                            </button>

                                                                                                                                                                                                                                                                                                                                                                        -->
                    </div>
                </div>
            </div>

            <div class="row">
                <!--
                                                                                                                                                                                                                                                                                                                                                                    <div class="col-lg-4 col-md-6 col-sm-12 pb-4" v-for="(apartment, index) in apartments" :key="apartment.id">
                                                                                                                                                                                                                                                                                                                                                                        <CardComponent :apartment="apartment" />
                                                                                                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                                                                                                -->
                <CardComponent class="pb-4 col-12 col-md-6 col-xl-4" v-for="apartment in store.results"
                    :apartment="apartment" />


                <div class="pagination">
                    <button @click="previousPage"><i class="fa-solid fa-chevron-left"></i></button>
                    <div class="page-numbers">
                        <div v-for="pageNumber in pageNumbers" :key="pageNumber"
                            :class="{ active: currentPage === pageNumber }" @click="goToPage(pageNumber)">
                            {{ pageNumber }}
                        </div>
                    </div>
                    <button @click="nextPage"><i class="fa-solid fa-chevron-right"></i></button>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;

.all_apartments {
    cursor: pointer;
}

.category {
    white-space: nowrap;
    cursor: pointer;
}

.category.loading {
    pointer-events: none;
}

.active_category {
    border-bottom: 2px solid $bb-primary;
    color: $bb-primary;
    font-weight: 500;
}

.categories {

    //overflow-x: auto;
    white-space: nowrap;
    display: flex;
    justify-content: center;
}

.categories_container {
    overflow-x: auto;
    margin-bottom: 1rem;
}

@media (max-width: 1739px) {
    .categories {
        justify-content: start;
    }
}

.categories img {
    width: 30px;
}


#categories {
    padding: 5rem 0;
}

h2 {
    padding-bottom: 0.8rem;
}

p {
    max-width: 80%;
}

.cardComponent {
    align-items: stretch;
}

.description {
    display: flex;
    align-items: center;
    padding-bottom: 2rem;
    justify-content: space-between;
}

// Pagination
.pagination {
    padding-top: 1.5rem;
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
    flex-wrap: wrap;
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

/* stile della scrollbar */
::-webkit-scrollbar {
    height: 10px;
}

/* stile del thumb (la parte trascinabile della scrollbar) */
::-webkit-scrollbar-thumb {
    background-color: #e5e5e5;
    border-radius: 5px;
}

/* stile del track (la parte non trascinabile della scrollbar) */
::-webkit-scrollbar-track {
    background-color: #ffffff;
}
</style>