<script>
import axios from 'axios';
import { store } from '../store';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ref } from 'vue';
import { watch } from 'vue';
import '@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss';


export default {
    name: 'SearchbarComponent',
    props: {
        id: {
            type: String,
            required: true
        }
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
                const response = await axios.get('http://127.0.0.1:8000/api/search', {
                    params: {
                        address: store.address,
                    }
                });
                console.log(response);

                store.results = response.data.results;
                store.price = response.data.results.price;
                store.lat = response.data.poi.lat;
                store.lon = response.data.poi.lon;
                store.loading = false;

                const searchQuery = store.address.trim();
                const query = searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : '';
                this.$router.push({ name: 'search', path: '/search' + query, query: { q: searchQuery } });

                const mapHiddenEmptyAddress = document.querySelector('.hide_map_custom')
                if (!store.address) {
                    mapHiddenEmptyAddress.classList.add('map_hidden')
                    console.log(mapHiddenEmptyAddress);
                } if (store.address) {
                    mapHiddenEmptyAddress.classList.remove('map_hidden');
                    console.log(mapHiddenEmptyAddress);

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
        clearAdress() {
            store.address = '';
        },
    },
    computed: {
        // elementId() {
        //     if (this.$route.name === 'home') {
        //         return 'large_element';
        //     } else {
        //         return 'small_element';
        //     }
        // },
    },
    created() {
        watch(() => this.store.datePicker, this.convertDates);
    }, mounted() {
        const searchBoxWrapper = document.getElementById('searchBox');
        const options = {
            searchOptions: {
                key: "FiLLCEGWt31cQ9ECIWAD6zYjczzeC6zn",
                language: "it-IT",
                limit: 5,
                typeahead: ["address"],
                center: [12.49167, 41.89022],
                countrySet: ["IT"],
                minFuzzyLevel: 1
            },
            autocompleteOptions: {
                key: "FiLLCEGWt31cQ9ECIWAD6zYjczzeC6zn",
                language: "it-IT",
                minLength: 1,
            }
        };
        const searchBox = new tt.plugins.SearchBox(tt.services, options);
        const searchBoxHTML = searchBox.getSearchBoxHTML();
        searchBoxWrapper.appendChild(searchBoxHTML);

        const searchBoxInput = document.querySelector('.tt-search-box-input');
        const searchBoxInputContainer = document.querySelector('.tt-search-box-input-container');
        searchBoxInputContainer.insertAdjacentHTML('afterbegin', `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
  <path d='M15,4.946l-6-2L2,5.279V21.387l7-2.333,6,2,7-2.333V2.613Zm-5,.442,4,1.333V18.612l-4-1.333ZM4,6.721,8,5.388V17.279L4,18.613ZM20,17.279l-4,1.333V6.721l4-1.334Z'/>
</svg>`)

        searchBoxInput.addEventListener('change', () => {
            const address = searchBoxInput.value;
            store.address = address;
        });
        searchBoxInput.value = store.address;
    }
}

</script>

<template>
    <div :id="id">
        <form @submit.prevent="search">
            <div class="container_search">
                <div class="input">
                    <!-- <i class="fa-regular fa-map"></i> -->
                    <div id="searchBox" @click="clearAdress()"></div>
                    <!-- <input type="text" v-model="store.address" placeholder="Dove vuoi andare?"> -->
                </div>
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
                                                                                                                                                    <button @click="decrement" :disabled="guests <= 1">-</button> -->

                <!-- <input type="text" v-model="store.guests" placeholder="Quanti siete?"> -->
                <!-- </div> -->
            </div>

            <router-link :to="{ name: 'search' }">
                <button type="submit" class="searchButton" @click="search">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </router-link>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;

.map_hidden {
    display: none;
}

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

    .container_search {
        display: flex;
        align-items: center;
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
        padding: 0.9rem 2.5rem 0.9rem 2.5rem;
        border-radius: 4rem;
        font-size: 1.3rem;

        svg {
            color: $bb-lighter;
        }
    }

    .container_search {
        display: flex;
        align-items: center;
    }
}


// MEDIA QUERY
@media screen and (min-width: 744px) {
    //
}

@media screen and (max-width: 744px) {
    #small_element {
        // width: 100%;
    }
}
</style>