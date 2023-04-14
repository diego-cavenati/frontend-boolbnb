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
            nextPageUrl: null,
            prevPageUrl: null,
            categories: [],
            activeCategoryIndex: null,
            loading: false,
        }
    },
    computed: {
        debounceCall() {
            return this.debounce(this.SubmitServices, 500);
        },
        debounceCallAll() {
            return this.debounce(this.callAll, 500);
        },
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
        debounce(func, delay) {
            try {
                let timeout;
                return () => {
                    clearTimeout(timeout);
                    this.loading = true;
                    timeout = setTimeout(() => {
                        func();
                    }, delay);
                };

            } catch (error) {
                console.log(error.message);
            }
        },
        previousPage() {
            // if (this.currentPage > 1) {
            //     this.currentPage--;
            // }
            if (this.prevPageUrl !== null && !this.loading) {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    console.log(this.currentPage);
                    this.loading = true;
                    if (this.categories !== null && this.categories.length > 0) {
                        axios.get('http://127.0.0.1:8000/api/apartments?category=' + this.categories + `&page=${this.currentPage}`)
                            .then(response => {
                                store.results = response.data.results.data
                                //this.apartments = response.data.results.data;
                                this.nextPageUrl = response.data.results.next_page_url;
                                this.prevPageUrl = response.data.results.prev_page_url;
                                this.pages = response.data.results.last_page;
                                this.loading = false;
                                this.$nextTick(() => {
                                    // Fai lo scroll dell'elemento nella finestra del browser
                                    this.$refs.categories.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

                                });
                            })
                            .catch(error => {
                                console.error(error)
                                this.loading = false;
                            });
                    } else {
                        axios.get(`http://127.0.0.1:8000/api/apartments?page=${this.currentPage}`)
                            .then(response => {
                                store.results = response.data.results.data
                                //this.apartments = response.data.results.data;
                                this.nextPageUrl = response.data.results.next_page_url;
                                this.prevPageUrl = response.data.results.prev_page_url;
                                this.pages = response.data.results.last_page;
                                this.loading = false;
                                this.$nextTick(() => {
                                    // Fai lo scroll dell'elemento nella finestra del browser
                                    this.$refs.categories.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

                                });
                            })
                            .catch(error => {
                                console.error(error)
                                this.loading = false;
                            });

                    }
                }
            }
            /*  console.log(this.currentPage);
             console.log(this.pages); */


        },
        nextPage() {
            if (this.nextPageUrl !== null && !this.loading) {
                if (this.currentPage > 0 && this.currentPage < this.pages) {
                    this.currentPage++;
                    console.log(this.currentPage);
                    this.loading = true;
                    if (this.categories !== null && this.categories.length > 0) {
                        axios.get('http://127.0.0.1:8000/api/apartments?category=' + this.categories + `&page=${this.currentPage}`)
                            .then(response => {
                                store.results = response.data.results.data
                                //this.apartments = response.data.results.data;
                                this.nextPageUrl = response.data.results.next_page_url;
                                this.prevPageUrl = response.data.results.prev_page_url;
                                this.pages = response.data.results.last_page;
                                this.loading = false;
                                this.$nextTick(() => {
                                    // Fai lo scroll dell'elemento nella finestra del browser
                                    this.$refs.categories.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

                                });
                            })
                            .catch(error => {
                                console.error(error);
                                this.loading = false;
                            });

                    } else {
                        axios.get(`http://127.0.0.1:8000/api/apartments?page=${this.currentPage}`)
                            .then(response => {
                                store.results = response.data.results.data
                                //this.apartments = response.data.results.data;
                                this.nextPageUrl = response.data.results.next_page_url;
                                this.prevPageUrl = response.data.results.prev_page_url;
                                this.pages = response.data.results.last_page;
                                this.loading = false;
                                this.$nextTick(() => {
                                    // Fai lo scroll dell'elemento nella finestra del browser
                                    this.$refs.categories.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

                                });
                            })
                            .catch(error => {
                                console.error(error);
                                this.loading = false;
                            });
                    }

                }
            }
            console.log(this.currentPage);
            console.log(this.pages);
        },
        goToPage(pageNumber) {
            if (!this.loading) {
                this.currentPage = pageNumber;
                this.loading = true;
                if (this.categories !== null && this.categories.length > 0) {
                    axios.get('http://127.0.0.1:8000/api/apartments?category=' + this.categories + `&page=${this.currentPage}`)
                        .then(response => {
                            //this.apartments = response.data.results.data;
                            store.results = response.data.results.data
                            this.nextPageUrl = response.data.results.next_page_url;
                            this.prevPageUrl = response.data.results.prev_page_url;
                            this.pages = response.data.results.last_page;
                            this.loading = false;
                            this.$nextTick(() => {
                                // Fai lo scroll dell'elemento nella finestra del browser
                                this.$refs.categories.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

                            });
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
                            this.nextPageUrl = response.data.results.next_page_url;
                            this.prevPageUrl = response.data.results.prev_page_url;
                            this.pages = response.data.results.last_page;
                            this.loading = false;
                            this.$nextTick(() => {
                                // Fai lo scroll dell'elemento nella finestra del browser
                                this.$refs.categories.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

                            });
                        })
                        .catch(error => {
                            console.error(error)
                            this.error = error.message;
                            this.loading = false;
                        })
                }

            }




        },
        callAll() {
            this.currentPage = 1;
            this.categories = [];
            //store.categories_back = []; // Rimuovi tutti gli elementi dall'array categories_back
            this.activeCategoryIndex = null
            this.debounceCall();
        },
        search() {
            store.address = '';
            store.categories_back = [];
            store.services_back = [];
            store.servicesIndex = [];
            store.radius = 20;
            store.beds = '';
            this.loading = true;
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


                    this.debounceCall();


                    // esegue la call api in base a tutti i dati
                } else if (this.categories.length > 0 && this.categories[0] === store.categories[i].id) {
                    // Se l'elemento è già presente, ma è l'unico elemento nell'array, non fare nulla
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
                //console.log(this.categories);
                axios.get('http://127.0.0.1:8000/api/apartments?category=' + this.categories)
                    .then(response => {
                        //console.log(resp);
                        // convertire km to metri prima di mandarli 
                        store.results = response.data.results.data;
                        console.log(response.data.results.data);
                        //console.log('faccio la call api');
                        this.nextPageUrl = response.data.results.next_page_url;
                        this.prevPageUrl = response.data.results.prev_page_url;
                        this.pages = response.data.results.last_page;
                        //console.log(response.data.results.last_page);
                        console.log(this.currentPage);
                        console.log(this.pages);
                        this.loading = false;

                    }).catch(err => {
                        console.log(err);
                        this.loading = false;
                    })

            } catch (error) {
                console.error(error);
                this.loading = false;


            }

        }
    },
    created() {
        this.callAll()

    },

    mounted() {
        this.loading = true;
        axios.get('http://127.0.0.1:8000/api/categories')
            .then(response => {
                //console.log(response);
                store.categories = response.data.results;
                this.loading = false;
                //console.log(store.categories)
            })
            .catch(err => {
                console.log(err);
                this.loading = false;
            })
    },
}
</script>

<template>
    <div id="categories">
        <div class="container" ref="categories">
            <h2>Scopri le nostre categorie <span class="title_mark">di appartamenti</span></h2>
            <div class="description">
                <p>
                    Benvenuti nel nostro catalogo di appartamenti unici e spettacolari, suddivisi in diverse categorie per
                    soddisfare le esigenze di ogni tipo di viaggiatore. Siamo orgogliosi di offrire una vasta gamma di
                    alloggi unici, dal lusso assoluto alle sistemazioni più minimaliste e funzionali.
                </p>

                <router-link class="d-none d-sm-block" :to="{ name: 'search' }">
                    <button class="button" @click="search()">Vedi tutti</button>
                </router-link>
            </div>

            <div class="container-fluid">
                <div class="categories d-flex justify-content-around align-items-center flex-wrap flex-sm-nowrap">
                    <div class="text-center">
                        <div @click="callAll()" class="all_apartments mx-sm-0 me-sm-4">
                            <img src="../assets/img/tutti-gli-alloggi.png" alt="">
                            <div>
                                Tutti gli alloggi
                            </div>
                        </div>
                    </div>
                    <router-link class="d-block d-sm-none" :to="{ name: 'search' }">
                        <button class="button" @click="search()">Vedi tutti</button>
                    </router-link>
                    <div class="swiper swiper-2 px-5 mt-5 mt-sm-0">
                        <!-- Additional required wrapper -->
                        <div class="swiper-wrapper">
                            <!-- Slides -->
                            <div class="swiper-slide text-center " v-for="category, i in store.categories"
                                :key="category.id">
                                <div class="category" :class="i === activeCategoryIndex ? 'active_category' : ''"
                                    @click.stop="PushCategory(i)" :id="'category-' + i">
                                    <img :src="getImagePath(`${category.img}.png`)" alt="">
                                    <div>
                                        {{ category.name }}
                                    </div>
                                </div>
                            </div>


                        </div>


                        <!-- If we need navigation buttons -->
                        <div class="swiper-button-prev swiper-button-prev-2"></div>
                        <div class="swiper-button-next swiper-button-next-2"></div>


                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="preloader_container d-flex justify-content-center align-items-center position-relative"
                    v-if="loading">
                    <div class="preloader">
                        <svg viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path class="big-circle" d="M101 51C101 78.6142 78.6142 101 51 101C23.3858 101 1 78.6142 1 51"
                                stroke="#252525" stroke-width="2" />
                            <path class="small-circle" d="M91 51C91 28.9086 73.0914 11 51 11C28.9086 11 11 28.9086 11 51"
                                stroke="#252525" stroke-width="2" />
                        </svg>
                    </div>
                </div>
                <CardComponent class="pb-4 col-12 col-md-6 col-xl-4" v-if="!loading" v-for="apartment in store.results"
                    :apartment="apartment" />


                <div class="ms_pagination" v-if="!loading">
                    <div @click="previousPage" v-if="prevPageUrl !== null"><i class="fa-solid fa-chevron-left"></i></div>
                    <div class="page-numbers" v-if="prevPageUrl !== null || nextPageUrl !== null">
                        <div v-for="pageNumber in pageNumbers" :key="pageNumber"
                            :class="{ active: currentPage === pageNumber }" @click="goToPage(pageNumber)">
                            {{ pageNumber }}
                        </div>
                    </div>
                    <div @click="nextPage" v-if="nextPageUrl !== null"><i class="fa-solid fa-chevron-right"></i></div>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;


.preloader_container {
    min-height: 500px;
}

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
    flex-wrap: wrap;
}

// Pagination
.ms_pagination {
    padding-top: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
        color: $bb-dark;

        &:hover {
            cursor: pointer;
        }

        svg {
            color: $bb-text-gray;
        }
    }
}

.page-numbers {
    display: flex;
    flex-wrap: wrap;
    margin: 0 1rem;
    justify-content: center;
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