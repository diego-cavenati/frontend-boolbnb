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
                const response = await axios.get('http://127.0.0.1:8000/api/search', {
                    params: {
                        address: this.address,
                    }
                });
                this.results = response.data.results.results;
                console.log(this.results);
            } catch (error) {
                console.error(error);
            }
        }
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
}
</script>

<template>

    <div :id="elementId">
        <form @submit.prevent="search">
            <div class="container_search">
                <div class="input">
                    <i class="fa-regular fa-map"></i>
                    <input type="text" v-model="address" placeholder="Dove vuoi andare?">
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

            <button type="submit" class="searchButton" @click="search">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
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


    background: #FFFFFF;
    box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.05);
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
        padding: 1.5rem 5rem 1.5rem 5rem;
        border-radius: 4rem;
        font-size: 2rem;

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