<script>
import axios from 'axios';
import { store } from '../store';



export default {
    name: 'TopPlacesComponent',
    data() {
        return {
            store,
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
        /*  displayedDestinationsBg() {
             return this.destinations.slice(this.startIndex, this.startIndex + 3)
         },
         displayedDestinationsMd() {
             return this.destinations.slice(this.startIndex, this.startIndex + 2)
         },
         displayedDestinationsSm() {
             return this.destinations.slice(this.startIndex, this.startIndex + 1)
         } */
    },
    methods: {

        async searchApi(destination) {
            try {
                /*   const response = await axios.get('http://127.0.0.1:8000/api/search?address=' + destination + '&services=' + store.services_back + '&category=' + store.categories_back + '&radius=' + store.radius * 1000 + '&beds=' + store.beds);
                  //store.results = response.data.results.data*/
                const searchQuery = destination;
                store.address = searchQuery;
                const query = searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : '';
                this.$router.push({ name: 'search', path: '/search' + query, query: { q: searchQuery } })
                /* store.results = response.data.results
                store.loading = false;
                console.log(store.results);
                console.log(response.data.results);
                console.log(response.data);
                console.log(this.displayedDestinations);
                console.log(destination); */
                //console.log('http://127.0.0.1:8000/api/search?address=' + destination + '&services=' + store.services_back + '&category=' + store.categories_back + '&radius=' + store.radius * 1000 + '&beds=' + store.beds);

                // Reindirizza l'utente alla pagina /search


            } catch (error) {
                console.log(error);
            }
        },


        // async testApi (){
        //     try {
        //         //console.log('http://127.0.0.1:8000/api/search?address=' + store.address + '&services=' + store.services_back + '&category=' + store.categories_back + '&radius=' + store.radius * 1000 + '&beds=' + store.beds)
        //         const response = await axios.get('http://127.0.0.1:8000/api/search?address=' + 'Roma' + '&services=' + store.services_back + '&category=' + store.categories_back + '&radius=' + store.radius * 1000 + '&beds=' + store.beds);
        //         console.log(response);

        //         store.results = response.data.results;


        //         if (response.data.poi !== null) {
        //             store.lat = response.data.poi.lat;
        //             store.lon = response.data.poi.lon;
        //         }

        //         store.loading = false;

        //         const searchQuery = store.address;
        //         const query = searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : '';
        //         this.$router.push({ name: 'search', path: '/search' + query, query: { q: searchQuery } });
        //         /*
        //         const mapHiddenEmptyAddress = document.querySelector('.col.hide_map_custom');
        //         const map = document.querySelector('.hide_map_custom #map')
        //         if (store.address.length == 0 || store.address == null) {
        //             console.log(store.address);
        //             mapHiddenEmptyAddress.classList.add('d-none')
        //             map.classList.add('map_hidden')

        //         }
        //         if (store.address.length > 0) {
        //             mapHiddenEmptyAddress.classList.remove('d-none')
        //             map.classList.remove('map_hidden');
        //             console.log(map);

        //         }
        //         */

        //     } catch (error) {
        //         console.error(error);
        //     }
        // },

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
            /* this.cardWidth = document.querySelector(".card").clientWidth;
            this.displayedDestinations = this.destinations.slice(this.startIndex, this.startIndex + 3); */

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
            <div class="swiper p-5">
                <!-- Additional required wrapper -->
                <div class="swiper-wrapper">
                    <!-- Slides -->
                    <div class="swiper-slide card_top bg_screen" v-for="(destination, index) in destinations"
                        :key="destination.name">
                        <div class="image-container"
                            :style="{ 'background-image': `url(${destination.image})`, 'background-size': 'cover', 'background-position': 'center' }"
                            @click="searchApi(destination.name)">
                            <h3>{{ destination.name }} <img :src="destination.flag" :alt="`${destination.name} flag`"
                                    class="flag"></h3>
                        </div>
                    </div>


                </div>


                <!-- If we need navigation buttons -->
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>


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

}






.description {
    display: flex;
    align-items: center;
    padding-bottom: 2rem;
    justify-content: space-between;
}

.swiper-slide {
    display: grid;
    place-items: center;



    .image-container {
        transition: all 0.4s ease-in-out;
        width: 90%;
        height: 90%;


    }
}

.swiper-slide.swiper-slide-active {

    .image-container {
        scale: 1.1;
    }

}

.swiper-slide.swiper-slide-next {

    .image-container {
        scale: 1;
    }

}

@media screen and (min-width:992px) {
    .swiper-slide.swiper-slide-active {

        .image-container {
            scale: 1;
        }

    }

    .swiper-slide.swiper-slide-next {

        .image-container {
            scale: 1.1;
        }

    }
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





.card:hover .main_img {
    transform: scale(1.2);
}

.swiper-slide .image-container {
    position: relative;
}

.swiper-slide .image-container::before {
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
    height: 100;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
}







@media screen and (max-width: 767px) {



    .image-container {
        aspect-ratio: 1.8/2;
    }


}

@media screen and (max-width: 991px) {
    .image-container {
        aspect-ratio: 1.5/2;
    }

}
</style> 
