<script>
import axios from 'axios';
import { store } from '../store';
import AdvancedSearchView from '../views/AdvancedSearchView.vue';


export default {
    name: 'SearchbarComponent',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        AdvancedSearchView,
    },
    data() {
        return {
            store,
            date: null,
            maxGuests: 10,
            searchTerm: '',
        }
    },
    methods: {
        debounce(func, delay) {
            let timeout;
            return () => {
                clearTimeout(timeout);
                store.loading = true;
                store.isSearchbarComponentLoaded = false;
                timeout = setTimeout(() => {
                    func();
                }, delay);
            };
        },
        search() {
            try {
                axios.get('http://127.0.0.1:8000/api/search?address=' + store.address + '&services=' + store.services_back + '&category=' + store.categories_back + '&radius=' + store.radius * 1000 + '&beds=' + store.beds)
                    .then(response => {
                        console.log(response);
                        if (response.data.success) {


                            store.results = response.data.results;
                            store.isSearchbarComponentLoaded = true;



                            if (response.data.poi !== null) {
                                store.lat = response.data.poi.lat;
                                store.lon = response.data.poi.lon;
                            }

                            store.loading = false;

                            const searchQuery = store.address;
                            const query = searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : '';
                            this.$router.push({ name: 'search', path: '/search' + query, query: { q: searchQuery } });




                        } else {
                            store.results = [];
                            store.loading = false;
                            store.isSearchbarComponentLoaded = true;


                        }
                    })




            } catch (error) {
                console.error(error.message);
            }

        },
        setAddress(address) {
            console.log(address);
        },
        increment() {
            if (this.store.guests < this.maxGuests) {
                this.store.guests++;
            }
        },
        decrement() {
            if (this.store.guests > 1) {
                this.store.guests--;
            }
        },
        validateGuests() {
            if (this.store.guests <= 0) {
                this.store.guests = 1;
            }
        },
    },
    computed: {
        debouncedSearch() {
            return this.debounce(this.search, 1000);
        }
    },
    mounted() {
        console.log(store.address, store.categories_back, store.services_back);
        const searchBoxWrapper = document.getElementById('searchBoxWrapper');
        const options = {
            searchOptions: {
                key: "45POhoazK93Ibg5oAGDMtKuyqLhjzUGo",
                language: "it-IT",
                limit: 5,
                typeahead: ["address"],
                center: [12.49167, 41.89022],
                countrySet: ["IT"],
                minFuzzyLevel: 1
            },
            autocompleteOptions: {
                key: "45POhoazK93Ibg5oAGDMtKuyqLhjzUGo",
                language: "it-IT",
                minLength: 1,
            }
        };
        const searchBox = new tt.plugins.SearchBox(tt.services, options);
        const searchBoxHTML = searchBox.getSearchBoxHTML();
        searchBoxWrapper.appendChild(searchBoxHTML);

        const searchBoxInput = document.querySelector('.tt-search-box-input');
        searchBoxInput.placeholder = 'Dove vuoi andare?';

        const searchBoxInputContainer = document.querySelector('.tt-search-box-input-container');
        searchBoxInputContainer.insertAdjacentHTML('afterbegin', `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
  <path d='M15,4.946l-6-2L2,5.279V21.387l7-2.333,6,2,7-2.333V2.613Zm-5,.442,4,1.333V18.612l-4-1.333ZM4,6.721,8,5.388V17.279L4,18.613ZM20,17.279l-4,1.333V6.721l4-1.334Z'/>
</svg>`)

        searchBoxInput.addEventListener('change', () => {
            let address = searchBoxInput.value;
            store.address = address;

        });
        searchBoxInput.value = store.address;

        searchBoxInput.addEventListener('blur', function () {
            if (this.value == '') {
                this.value = store.address;


            }
            if (searchBoxInput.value !== null && searchBoxInput.value.replace(/\s/g, '') !== '') {

                closeIcon.classList.remove('-hidden');

            }
            if (searchBoxInput.value === null || searchBoxInput.value.replace(/\s/g, '') === '') {

                closeIcon.classList.add('-hidden');

            }
        })
        searchBoxInput.addEventListener('click', function () {
            if (this.value == '') {
                this.value = store.address;

            }
            if (searchBoxInput.value !== null && searchBoxInput.value.replace(/\s/g, '') !== '') {

                closeIcon.classList.remove('-hidden');
            }
            if (searchBoxInput.value === null || searchBoxInput.value.replace(/\s/g, '') === '') {

                closeIcon.classList.add('-hidden');
            }
        })

        searchBoxInput.addEventListener('focus', function () {
            if (this.value == '') {
                this.value = store.address;

            }
            if (searchBoxInput.value !== null && searchBoxInput.value.replace(/\s/g, '') !== '') {

                closeIcon.classList.remove('-hidden');

            }
            if (searchBoxInput.value === null || searchBoxInput.value.replace(/\s/g, '') === '') {

                closeIcon.classList.add('-hidden');
            }

        })
        const closeIcon = document.querySelector('.tt-search-box-close-icon');
        closeIcon.addEventListener('click', () => {


            searchBoxInput.value = '';
            store.address = '';
            if (searchBoxInput.value !== null && searchBoxInput.value.replace(/\s/g, '') !== '') {

                closeIcon.classList.remove('-hidden');
            }
            if (searchBoxInput.value === null || searchBoxInput.value.replace(/\s/g, '') === '') {

                closeIcon.classList.add('-hidden');
            }

            //console.log('clear'); 


        })
        if (searchBoxInput.value !== null && searchBoxInput.value.replace(/\s/g, '') !== '') {
            closeIcon.classList.remove('-hidden');

        }
        if (searchBoxInput.value === null || searchBoxInput.value.replace(/\s/g, '') === '') {
            closeIcon.classList.add('-hidden');

        }


    }
}

</script>

<template>
    <div :id="id">
        <form @submit.prevent="search">
            <div class="container_search"
                :class="(store.loading || store.isSearchbarComponentLoaded === false || store.isAdvancedSearchViewLoaded === false) ? 'loading' : ''">
                <div id="searchBoxWrapper">
                    <div class="layover"></div>
                </div>
            </div>

            <router-link :to="{ name: 'search' }">
                <button type="submit" class="searchButton h-100" @click="debouncedSearch">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>

            </router-link>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;



#large_element {

    background: #FFFFFF;
    box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.03);
    border-radius: 4rem;
    font-size: 1.2rem;
    font-family: $bb-font-secondary;
    color: $bb-text-gray;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    min-width: 35%;

    form {
        display: flex;
        flex-grow: 1;
        justify-content: space-between;
    }

    #searchBoxWrapper {
        // width: calc(100%/3);
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            color: black;
            padding-right: 0.5rem;
        }

        input {
            width: 70%;
        }

    }

    .line {
        width: 0.2rem;
        height: 4rem;
        color: $bb-background;
    }

    .searchButton {
        background-color: $bb-primary;
        padding: 1.5rem 5rem 1.5rem 5rem;
        border-radius: 4rem;
        font-size: 2.5rem;

        svg {
            color: $bb-lighter;
        }
    }




}


#small_element {
    background: $bb-lighter;
    border: 1px solid $bb-light;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.02);
    border-radius: 2rem;
    font-size: 1rem;
    font-family: $bb-font-secondary;
    color: $bb-text-gray;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;

    form {
        display: flex;
    }


    .input {
        // width: calc(100%/3);
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            color: black;
            padding-right: 0.5rem;
        }

        input {
            width: 50%;
        }

    }

    .line {
        width: 0.2rem;
        height: 2rem;
        color: $bb-background;
    }

    .searchButton {
        background-color: $bb-primary;
        padding: 0.9rem 3rem 0.9rem 3rem;
        border-radius: 4rem;
        font-size: 1.3rem;

        svg {
            color: $bb-lighter;
        }
    }


}
</style>