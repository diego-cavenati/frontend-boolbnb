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
            // date,
            format,
        }
    },
    data() {
        return {
            store,
            date: null,
            maxGuests: 10,
        }
    },
    components: {
        Datepicker,
    },
    methods: {
        async search() {
            try {
                //http://127.0.0.1:8000/api/search?address=roma
                const response = await axios.get('http://127.0.0.1:8000/api/search', {
                    params: {
                        address: store.address,
                    }
                });
                store.results = response.data.results;
                store.price = response.data.results.price;
                store.lat = response.data.poi.lat;
                store.lon = response.data.poi.lon;

                store.loading = false;

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
        elementId() {
            if (this.$route.name === 'home') {
                return 'large_element';
            } else {
                return 'small_element';
            }
        },
    },
    created() {
        // if (store.datePicker) {
        //     let datesArray = store.datePicker.split(" - ");
        //     store.check_in = datesArray[0];
        //     store.check_out = datesArray[1];
        //     console.log(store.check_in);
        // }
        watch(() => this.store.datePicker, this.convertDates);
    },
    mounted() {
        // const searchBoxWrapper = document.getElementById('searchBox');
        // const options = {
        //     searchOptions: {
        //         key: "FiLLCEGWt31cQ9ECIWAD6zYjczzeC6zn",
        //         language: "it-IT",
        //         limit: 5,
        //     },
        //     autocompleteOptions: {
        //         key: "FiLLCEGWt31cQ9ECIWAD6zYjczzeC6zn",
        //         language: "it-IT",
        //     },

        // }
        // const ttSearchBox = new tt.plugins.SearchBox(tt.services, options)
        // const searchBoxHTML = ttSearchBox.getSearchBoxHTML()
        // searchBoxWrapper.append(searchBoxHTML);
        // const searchBoxInput = document.querySelector('.tt-search-box-input');
        // searchBoxInput.addEventListener('input', function () {
        //     this.store.address = searchBoxInput.value
        // })
        // console.log(searchBoxHTML);
    }
}

</script>

<template>

    <div :id="elementId">
        <form @submit.prevent="search">
            <div class="container_search">
                <div class="input" required>
                    <!-- <i class="fa-regular fa-map"></i> -->
                    <!-- <div id="searchBox"></div> -->
                    <input type="text" v-model="store.address" placeholder="Dove vuoi andare?">
                </div>
                <div class="input">
                    <div class="line"></div>
                    <!-- <i class="fa-regular fa-calendar"></i> -->
                    <Datepicker class="dataPicker" v-model="date" :enable-time-picker="false" :format="format" range />
                </div>
                <div class="input">
                    <div class="line"></div>
                    <i class="fa-regular fa-user"></i>

                    <button @click="increment" :disabled="guests >= maxGuests">+</button>
                    <input type="number" id="guests" name="guests" v-model.number="store.guests"
                        @input="validateGuests">
                    <button @click="decrement" :disabled="guests <= 1">-</button>

                    <!-- <input type="text" v-model="store.guests" placeholder="Quanti siete?"> -->
                </div>
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

#large_element {

    background: #FFFFFF;
    box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.05);
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
        width: calc(100%/3);
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
    box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.08);
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
        width: calc(100%/3);
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
</style>