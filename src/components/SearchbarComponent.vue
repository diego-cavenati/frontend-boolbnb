<script>
import axios from 'axios';
import { store } from '../store';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref } from 'vue';
import { watch } from 'vue';
import '@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss';
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
    setup() {
        const format = (dates) => {
            const start = dates[0];
            const end = dates[1];
            const startDay = start.getDate();
            const startMonth = start.getMonth() + 1;
            // const startYear = start.getFullYear();
            const endDay = end.getDate();
            const endMonth = end.getMonth() + 1;
            // const endYear = end.getFullYear();
            return store.datePicker = `${startDay}/${startMonth} - ${endDay}/${endMonth}`;
        }

        return {
            format,
        }
    },
    data() {
        return {
            store,
            date: null,
            maxGuests: 10,
            searchTerm: '',
        }
    },
    components: {
        Datepicker,
    },
    methods: {
        async search() {
            try {
                store.loading = true;
                store.isSearchbarComponentLoaded = false;
                //store.isAdvancedSearchViewLoaded = false;
                //console.log(store.address, store.categories_back, store.services_back);
                //console.log('http://127.0.0.1:8000/api/search?address=' + store.address + '&services=' + store.services_back + '&category=' + store.categories_back + '&radius=' + store.radius * 1000 + '&beds=' + store.beds)
                const response = await axios.get('http://127.0.0.1:8000/api/search?address=' + store.address + '&services=' + store.services_back + '&category=' + store.categories_back + '&radius=' + store.radius * 1000 + '&beds=' + store.beds);
                console.log(response);

                store.results = response.data.results;
                store.isSearchbarComponentLoaded = true;

                //store.isAdvancedSearchViewLoaded = true;


                if (response.data.poi !== null) {
                    store.lat = response.data.poi.lat;
                    store.lon = response.data.poi.lon;
                }

                store.loading = false;

                const searchQuery = store.address;
                const query = searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : '';
                this.$router.push({ name: 'search', path: '/search' + query, query: { q: searchQuery } });

                const mapHiddenEmptyAddress = document.querySelector('.col.d-none.d-xxl-block.map');

                if (store.address.length < 1 || store.address == null || store.address === '' || store.results == null || store.results.length < 1) {
                    console.log(store.address);
                    mapHiddenEmptyAddress.classList.add('hide')


                } else {
                    mapHiddenEmptyAddress.classList.remove('hide')


                }

            } catch (error) {
                console.error(error);
            }

        },
        setAddress(address) {
            console.log(address);
        },
        convertDates() {
            let datesArray = this.store.datePicker.split(" - ");
            this.store.check_in = datesArray[0];
            this.store.check_out = datesArray[1];
            console.log(this.store.check_in);
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

    },
    created() {
        watch(() => this.store.datePicker, this.convertDates);
    }, mounted() {
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

            if (store.isAdvancedSearchViewLoaded && store.isSearchbarComponentLoaded) {
                searchBoxInput.value = '';
                store.address = '';
                if (searchBoxInput.value !== null && searchBoxInput.value.replace(/\s/g, '') !== '') {

                    closeIcon.classList.remove('-hidden');
                }
                if (searchBoxInput.value === null || searchBoxInput.value.replace(/\s/g, '') === '') {

                    closeIcon.classList.add('-hidden');
                }

                //console.log('clear'); 
            }

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
                :class="(store.isSearchbarComponentLoaded === false || store.isAdvancedSearchViewLoaded === false) ? 'loading' : ''">
                <div id="searchBoxWrapper">
                    <div class="layover"></div>
                </div>
                <!-- <div class="input">
                                                                                                                                                                                                                                                                                                                                                                 <i class="fa-regular fa-map"></i>
                    
                                                                                                                                                                                                                                                                                                                                                                <input type="text" v-model="store.address" placeholder="Dove vuoi andare?">
                                                                                                                                                                                                                                                                                                                                                            </div> -->
                <!-- <div class="input">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <div class="line"></div> -->
                <!-- <i class="fa-regular fa-calendar"></i> -->
                <!-- <Datepicker class="dataPicker" v-model="date" :enable-time-picker="false" :format="format" range />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <div class="input">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <div class="line"></div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <i class="fa-regular fa-user"></i> -->

                <!-- <button @click="increment" :disabled="guests >= maxGuests">+</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <input type="number" id="guests" name="guests" v-model.number="store.guests" @input="validateGuests">

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <input type="text" v-model="store.guests" placeholder="Quanti siete?"> -->
                <!-- </div> -->
            </div>

            <router-link :to="{ name: 'search' }">
                <button type="submit" class="searchButton h-100" @click="search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>

            </router-link>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
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


// MEDIA QUERY
@media screen and (min-width: 744px) {
    //
}

@media screen and (max-width: 744px) {}
</style>