<script>
import axios from 'axios';

export default {
    name: 'SearchbarComponent',
    data() {
        return {
            searchTerm: "",
            checkin: "",
            checkout: "",
            persons: "",
            results: []
        }
    },
    components: {
    },
    methods: {
        search() {
            axios
                .get(`https://api.example.com/search?term=${this.searchTerm}&checkin=${this.checkin}&checkout=${this.checkout}&persons=${this.persons}`)
                .then(response => {
                    this.results = response.data;
                })
                .catch(error => console.error(error));
        }
    }
}
</script>

<template>

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

        <div v-for="result in results">
            {{ result.name }}
        </div>
    </div>

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