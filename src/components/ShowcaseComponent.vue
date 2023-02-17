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
            if (this.currentPage > 1) {
                this.currentPage--;
                console.log(this.currentPage);
                axios.get(`http://127.0.0.1:8000/api/apartments?page=${this.currentPage}`)
                    .then(response => {
                        this.apartments = response.data.results.data;
                    })
                    .catch(error => {
                        console.error(error)
                    });
            }
        },
        nextPage() {
            if (this.currentPage > 0 && this.currentPage < this.pages) {
                this.currentPage++;
                console.log(this.currentPage);
                axios.get(`http://127.0.0.1:8000/api/apartments?page=${this.currentPage}`)
                    .then(response => {
                        this.apartments = response.data.results.data;
                    })
                    .catch(error => {
                        console.error(error)
                    });
            }
        },

        goToPage(pageNumber) {
            this.currentPage = pageNumber;
            console.log(this.currentPage);
            this.callApi();
        },

        callApi() {
            axios.get(`http://127.0.0.1:8000/api/apartments?page=${this.currentPage}`)
                .then(response => {
                    this.apartments = response.data.results.data;
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
        callAll() {
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
        }
    },
    created() {
        this.callApi()
    },
    mounted() {
    },
}
</script>

<template>
    <div id="showcase">
        <div class="container">
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

                <CardComponent class="col-lg-4 col-md-6 col-sm-12 pb-4" v-for="apartment in apartments" :key="apartment.id"
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


#showcase {
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