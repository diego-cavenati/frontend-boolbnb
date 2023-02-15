<script>
export default {
    name: 'TopPlacesComponent',
    data() {
        return {
            destinations: [
                {
                    name: 'Tokyo',
                    flag: 'https://restcountries.com/data/jpn.svg',
                    image: 'https://images.unsplash.com/photo-1514897463413-ebe473b5ed16',
                    address: 'Tokyo, Japan'
                },
                {
                    name: 'Paris',
                    flag: 'https://restcountries.com/data/fra.svg',
                    image: 'https://images.unsplash.com/photo-1502773860571-c8eaee33c7d2',
                    address: 'Paris, France'
                },
                {
                    name: 'New York',
                    flag: 'https://restcountries.com/data/usa.svg',
                    image: 'https://images.unsplash.com/photo-1464790719320-516ecd75af6c',
                    address: 'New York, USA'
                },
                {
                    name: 'Sydney',
                    flag: 'https://restcountries.com/data/aus.svg',
                    image: 'https://images.unsplash.com/photo-1516982113433-5a5d39cd7013',
                    address: 'Sydney, Australia'
                },
                {
                    name: 'Rio de Janeiro',
                    flag: 'https://restcountries.com/data/bra.svg',
                    image: 'https://images.unsplash.com/photo-1534562394296-8a1e92401f31',
                    address: 'Rio de Janeiro, Brazil'
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
    <div class="card-section">
        <div class="card" v-for="destination in destinations" :key="destination.name"
            @click="redirectToAddress(destination)">
            <h3>{{ destination.name }}</h3>
            <img :src="destination.flag" :alt="`${destination.name} flag`" class="flag">
            <div class="image-container">
                <img :src="destination.image" :alt="`${destination.name} image`">
            </div>
        </div>
    </div>
</template>
<style scoped>
.card-section {
    display: grid;
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
