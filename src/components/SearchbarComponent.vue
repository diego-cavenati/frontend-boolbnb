<script>
import axios from 'axios';

export default {
    name: 'SearchbarComponent',
    data() {
        return {
            address: '',
            guests: 0,
            checkIn: '',
            checkOut: '',
            results: []
        }
    },
    components: {
    },
    methods: {
        async search() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/apartments/search', {
                    params: {
                        address: this.address,
                        // guests: this.guests,
                        // checkIn: this.checkIn,
                        // checkOut: this.checkOut
                    }
                });
                this.results = response.data.results.data;
                console.log(this.results);
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<template>
    <div>
        <form @submit.prevent="search">
            <input type="text" v-model="address" placeholder="Indirizzo">
            <input type="number" v-model="guests" placeholder="Ospiti">
            <input type="date" v-model="checkIn" placeholder="Check-in">
            <input type="date" v-model="checkOut" placeholder="Check-out">
            <button type="submit">Cerca</button>
        </form>

        <ul v-if="results.length">
            <li v-for="result in results">
                {{ result.name }} - {{ result.address }}
            </li>
        </ul>
        <p v-else>Nessun risultato trovato</p>
    </div>

    <!-- 
    <div class="searchBar">

        <div class="container_search">
            <div class="input">
                <i class="fa-regular fa-map"></i>
                <input type="text" v-model="searchTerm" placeholder="Dove vuoi andare?">
            </div>
            <div class="input">
                <div class="line"></div>
                <i class="fa-regular fa-calendar"></i>
                <input type="text" v-model="checkin" placeholder="Check-in">
                <input type="text" v-model="checkout" placeholder="Check-out">
            </div>
            <div class="input">
                <div class="line"></div>
                <i class="fa-regular fa-user"></i>
                <input type="text" v-model="persons" placeholder="Quanti siete?">
            </div>
        </div>

        <button class="searchButton" @click="search">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>

    </div> -->
    <!-- <div v-for="result in results">
        {{ result.name }}
    </div> -->

</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;


.searchBar {
    background: #FFFFFF;
    box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.05);
    border-radius: 4rem;
    font-size: 1.2rem;
    font-family: $bb-font-secondary;
    color: $bb-text-gray;
    display: flex;
    align-items: center;
    padding-left: 1rem;

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
</style>