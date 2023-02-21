<script>
import axios from 'axios';

export default {
    name: 'TopPlacesComponent',
    data() {
        return {
            startIndex: 0,
            displayedDestinations: [],
            cardWidth: 0,
            offset: 0,
            destinations: [
                {
                    name: 'Paris',
                    flag: 'https://flagicons.lipis.dev/flags/4x3/fr.svg',
                    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
                    address: 'Parigi'
                },
                {
                    name: 'New York',
                    flag: 'https://flagicons.lipis.dev/flags/4x3/us.svg',
                    image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
                    address: 'New York'
                },
                {
                    name: 'Sydney',
                    flag: 'https://flagicons.lipis.dev/flags/4x3/au.svg',
                    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
                    address: 'Sydney'
                },
                {
                    name: 'Roma',
                    flag: 'https://flagicons.lipis.dev/flags/4x3/it.svg',
                    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
                    address: 'Roma'
                },
                {
                    name: 'Barcellona',
                    flag: 'https://flagicons.lipis.dev/flags/4x3/es.svg',
                    image: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
                    address: 'barcellona'
                },
                {
                    name: 'Bali',
                    flag: 'https://flagicons.lipis.dev/flags/4x3/id.svg',
                    image: 'https://images.unsplash.com/photo-1554481923-a6918bd997bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1530&q=80',
                    address: 'bali'
                },
            ]
        }
    },
    computed: {
        displayedDestinationsBg() {
            return this.destinations.slice(this.startIndex, this.startIndex + 3)
        },
        displayedDestinationsMd() {
            return this.destinations.slice(this.startIndex, this.startIndex + 2)
        },
        displayedDestinationsSm() {
            return this.destinations.slice(this.startIndex, this.startIndex + 1)
        }
    },
    methods: {
        async searchApi(destination) {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/search', {
                    params: {
                        address: destination
                    }
                });
                console.log(response.data);

                // Reindirizza l'utente alla pagina /search
                this.$router.push('/search');

            } catch (error) {
                console.log(error);
            }
        },
        scroll(direction) {
            if (window.innerWidth < 768) { // se larghezza dello schermo è inferiore a 768px (media query per i dispositivi mobili)
                const newIndex = this.startIndex + direction;
                if (newIndex >= 0 && newIndex <= this.destinations.length - 1) {
                    this.startIndex = newIndex;
                    this.displayedDestinations = [this.destinations[this.startIndex]];
                    this.offset = -this.startIndex * this.cardWidth;
                }
            } else { // altrimenti usa lo scorrimento a tre a tre come prima
                const newIndex = this.startIndex + direction;
                if (newIndex >= 0 && newIndex <= this.destinations.length - 3) {
                    this.startIndex = newIndex;
                    this.displayedDestinations = this.destinations.slice(this.startIndex, this.startIndex + 3);
                    this.offset = -this.startIndex * this.cardWidth;
                }
            }
        },
        mounted() {
            this.cardWidth = document.querySelector(".card").clientWidth;
            this.displayedDestinations = this.destinations.slice(this.startIndex, this.startIndex + 3);
        }
    }
}
</script>

<template>
    <div class="top_places">
        <div class="container">
            <h2>Ecco le migliori <span class="title_mark"> destinazioni 2023</span></h2>
            <div class="description">
                <p>
                    Siamo entusiasti di presentare una selezione di destinazioni che vi lascerà senza fiato. Crediamo
                    fermamente che tra questi appartamenti troverete la soluzione perfetta per la vostra prossima avventura.
                </p>
            </div>
            <div class="carousel">
                <div class="row flex-nowrap overflow-x-auto card-container"
                    :style="{ transform: `translateX(${offset}px)` }">
                    <div class="col-sm-12 col-md-6 col-lg-4 card_top bg_screen"
                        v-for="(destination, index) in displayedDestinationsBg" :key="destination.name"
                        @click="searchApi(destination.name)">
                        <div class="image-container"
                            :style="{ 'background-image': `url(${destination.image})`, 'background-size': 'cover', 'background-position': 'bottom' }">
                            <h3>{{ destination.name }} <img :src="destination.flag" :alt="`${destination.name} flag`"
                                    class="flag"></h3>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 card_top md_screen"
                        v-for="(destination, index) in displayedDestinationsMd" :key="destination.name"
                        @click="searchApi(destination.name)">
                        <div class="image-container"
                            :style="{ 'background-image': `url(${destination.image})`, 'background-size': 'cover', 'background-position': 'bottom' }">
                            <h3>{{ destination.name }} <img :src="destination.flag" :alt="`${destination.name} flag`"
                                    class="flag"></h3>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-4 card_top sm_screen"
                        v-for="(destination, index) in displayedDestinationsSm" :key="destination.name"
                        @click="searchApi(destination.name)">
                        <div class="image-container"
                            :style="{ 'background-image': `url(${destination.image})`, 'background-size': 'cover', 'background-position': 'bottom' }">
                            <h3>{{ destination.name }} <img :src="destination.flag" :alt="`${destination.name} flag`"
                                    class="flag"></h3>
                        </div>
                    </div>
                </div>
                <button class="prev" @click="scroll(-1)" :disabled="startIndex === 0">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button class="next" @click="scroll(1)" :disabled="startIndex + 3 >= destinations.length">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;


.top_places {
    background: $bb-background;
    padding: 5rem 0;

    .container {
        .carousel {
            position: relative;
        }
    }
}

button {
    font-size: 2rem;
    top: 50%;
    position: absolute;
    color: $bb-primary;
}



button.next,
button.prev {
    // background-color: $bb-background;
    // background: rgba(255, 255, 255, 0.25);
    padding: 0.8rem;
    border-radius: 50%;

    svg {
        aspect-ratio: 1/1;
    }
}

button.prev {
    left: -50px;
}

button.next {
    right: -50px;
}

.description {
    display: flex;
    align-items: center;
    padding-bottom: 2rem;
    justify-content: space-between;
}

.card-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;
}


.card_top {
    border-radius: 1rem;
    cursor: pointer;
    overflow: hidden;
    border: none;
    transition: all 0.3s;

    .main_img {
        transition: transform 0.2s;
        width: 100%;
        background-size: cover;
    }
}


.card.slide-in {
    transform: translateX(0);
    opacity: 1;
}

.card.slide-out {
    transform: translateX(-100%);
    opacity: 0;
}

.card:hover .main_img {
    transform: scale(1.2);
}

.card_top .image-container {
    position: relative;
}

.card_top .image-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5));
}

h3 {
    font-size: 1.5rem;
    margin: 20px;
    display: flex;
    z-index: 2;
    position: relative;

    .flag {
        width: 50px;
        position: relative;
        padding-left: 0.6rem;
    }
}

.image-container {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1.3/2;
    border-radius: 1rem;
}

img {
    width: 100%;
    height: auto;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
}

.sm_screen,
.md_screen {
    display: none;

}

@media screen and (max-width: 991.5px) {
    .bg_screen {
        display: none;
    }

    .md_screen {
        display: block;
    }
}

@media screen and (max-width: 767px) {
    .md_screen {
        display: none;

    }

    .sm_screen {
        display: block;
    }

    .image-container {
        aspect-ratio: 1.8/2;
    }

    button.prev {
        left: -40px;
    }

    button.next {
        right: -40px;
    }

    button.next,
    button.prev {
        // background-color: $bb-background;
        background: rgba(255, 255, 255, 0.5);
        padding: 0.5rem;

        svg {
            aspect-ratio: 1/1;
        }
    }
}

@media screen and (max-width: 991px) {
    .image-container {
        aspect-ratio: 1.5/2;
    }

    button.prev {
        left: -45px;
    }

    button.next {
        right: -45px;
    }

    button.next,
    button.prev {
        // background-color: $bb-background;
        background: rgba(255, 255, 255, 0.8);
        padding: 0.5rem;

        svg {
            aspect-ratio: 1/1;
        }
    }
}
</style>
