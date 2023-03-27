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
            paginationEl: document.querySelector('.ms_pagination'),
        }
    },
    computed: {
        pageNumbers() {
            return this.pages;
        },
        paginatedApartments() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.apartments.slice(start, end);
        }
    },
    methods: {
        previousPage() {
            if (this.prevPageUrl !== null && !this.loading) {
                if (this.currentPage > 1) {
                    this.loading = true;
                    this.currentPage--;
                    console.log(this.currentPage);
                    axios.get(`http://127.0.0.1:8000/api/showcase?page=${this.currentPage}`)
                        .then(response => {
                            this.apartments = response.data.results.data;
                            this.nextPageUrl = response.data.results.next_page_url;
                            this.prevPageUrl = response.data.results.prev_page_url;
                            this.loading = false;
                            this.$nextTick(() => {
                                // Fai lo scroll dell'elemento nella finestra del browser
                                this.$refs.showcase.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

                            });
                        })
                        .catch(error => {
                            console.error(error);
                            this.loading = false;
                        });
                }
            }

        },
        nextPage() {
            if (this.nextPageUrl !== null && !this.loading) {
                if (this.currentPage > 0 && this.currentPage < this.pages) {
                    this.loading = true;
                    this.currentPage++;
                    console.log(this.currentPage);
                    axios.get(`http://127.0.0.1:8000/api/showcase?page=${this.currentPage}`)
                        .then(response => {
                            this.apartments = response.data.results.data;
                            this.nextPageUrl = response.data.results.next_page_url;
                            this.prevPageUrl = response.data.results.prev_page_url;
                            this.loading = false;
                            this.$nextTick(() => {
                                // Fai lo scroll dell'elemento nella finestra del browser
                                this.$refs.showcase.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

                            });
                        })
                        .catch(error => {
                            console.error(error);
                            this.loading = false;
                        });
                }
            }

        },
        goToPage(pageNumber) {
            if (!this.loading) {
                this.currentPage = pageNumber;
                //console.log(this.currentPage);
                this.callApiPage(this.currentPage);
            }

        },
        callApiPage(pageNumber) {
            this.loading = true;
            axios.get(`http://127.0.0.1:8000/api/showcase?page=` + pageNumber)
                .then(response => {
                    this.apartments = response.data.results.data;
                    this.pages = response.data.results.last_page;
                    //console.log(response.data.results.next_page_url);
                    this.nextPageUrl = response.data.results.next_page_url;
                    this.prevPageUrl = response.data.results.prev_page_url
                    this.loading = false;
                    this.$nextTick(() => {
                        // Fai lo scroll dell'elemento nella finestra del browser
                        this.$refs.showcase.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

                    });
                })
                .catch(error => {
                    console.error(error)
                    this.error = error.message;
                    this.loading = false;
                })
        },
        callApi() {
            this.loading = true;
            axios.get(`http://127.0.0.1:8000/api/showcase`)
                .then(response => {
                    this.apartments = response.data.results.data;
                    this.pages = response.data.results.last_page;
                    console.log(response.data.results.next_page_url);
                    this.nextPageUrl = response.data.results.next_page_url;
                    this.prevPageUrl = response.data.results.prev_page_url
                    this.loading = false;
                })
                .catch(error => {
                    console.error(error)
                    this.error = error.message;
                    this.loading = false;
                })
        },

        callAll() {
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
                    // this.pages = response.data.results.last_page;
                    console.log(response);
                    this.loading = false;
                })
                .catch(error => {
                    console.error(error)
                    this.error = error.message;
                    this.loading = false;
                })
        },

    },
    created() {
        this.callApi()
    },
}
</script>

<template>
    <div id="showcase">
        <div class="container" ref="showcase">
            <h2>I nostri appartamenti <span class="title_mark"> in vetrina</span></h2>
            <div class="description">
                <p>
                    Ecco i nostri appartamenti in vetrina. Siamo sicuri che troverete tra questi appartamenti la soluzione
                    perfetta per il vostro prossimo viaggio. Boolbnb la nostra scelta migliore per le vostre vacanze!
                </p>

                <router-link :to="{ name: 'search' }">
                    <button class="button" @click="callAll()">Vedi tutti</button>
                </router-link>

            </div>

            <div class="row">
                <div class="box-container col-lg-4 col-md-6 col-sm-12 pb-4" v-for="(apartment, index) in apartments"
                    :key="apartment.id">
                    <CardComponent class="box" :apartment="apartment" />
                </div>

            </div>

        </div>


        <div class="ms_pagination">
            <div @click="previousPage" v-if="prevPageUrl !== null"><i class="fa-solid fa-chevron-left"></i></div>
            <div class="page-numbers" v-if="prevPageUrl !== null || nextPageUrl !== null">
                <div v-for="pageNumber in pageNumbers" :key="pageNumber" :class="{ active: currentPage === pageNumber }"
                    @click="goToPage(pageNumber)">
                    {{ pageNumber }}
                </div>
            </div>
            <div @click="nextPage" v-if="nextPageUrl !== null"><i class="fa-solid fa-chevron-right"></i></div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;




.box-container {
    display: flex;
    align-items: stretch;
}

.box {
    flex: 1;
}

#showcase {
    padding: 5rem 0;
}

h2 {
    padding-bottom: 0.8rem;
}

p {
    max-width: 80%;
}

.card_component {
    display: flex;
    // align-items: stretch;
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
</style>