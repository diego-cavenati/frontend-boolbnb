<script>
export default {
    name: 'TopPlacesComponent',
    data() {
        return {
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
                }
            ]
        }
    },
    methods: {
        redirectToAddress(destination) {
            // Qui si potrebbe effettuare una chiamata API per reindirizzare l'utente all'indirizzo specificato nella proprietà 'address' della destinazione cliccata
            console.log(`Redirecting to ${destination.address}...`);
        }
    }
}
</script>

<template>
    <div class="top_places">
        <div class="container card-section">
            <div class="card" v-for="destination in destinations" :key="destination.name"
                @click="redirectToAddress(destination)">
                <h3>{{ destination.name }}</h3>
                <img :src="destination.flag" :alt="`${destination.name} flag`" class="flag">
                <div class="image-container">
                    <img :src="destination.image" :alt="`${destination.name} image`">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;

.top_places {
    background: linear-gradient(90deg, $bb-primary 0%, $bb-secondary 100%);

}

.card-section {
    display: grid;
    padding: 3rem 0;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;
}

.card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-5px);
}

h3 {
    font-size: 1.5rem;
    margin: 20px;
}

.flag {
    width: 50px;
    margin: 0 auto;
    display: block;
}

.image-container {
    position: relative;
    overflow: hidden;
    height: 200px;
}

img {
    width: 100%;
    height: auto;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
