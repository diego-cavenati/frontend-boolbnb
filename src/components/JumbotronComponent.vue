<script>
import SearchbarComponent from './SearchbarComponent.vue';

export default {
    name: 'JumbotronComponent',
    data() {
        return {
            isMobileView: false,
            large_element: 'large_element',
            text: "Amsterdam",
            typedText: "",
            currentIndex: 0,
            typingSpeed: 500, // Mezzo secondo
        }
    },
    components: {
        SearchbarComponent
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.isMobileView = window.innerWidth <= 744;
        },
        typeNextLetter() {
            if (this.currentIndex < this.text.length) {
                // Aggiungi la prossima lettera
                this.typedText += this.text.charAt(this.currentIndex);
                this.currentIndex++;

                // Ripeti la funzione con la distanza di tempo specificata
                setTimeout(this.typeNextLetter, this.typingSpeed);
            }
        },
    },
    mounted() {
        this.typeNextLetter();
    },
}
</script>

<template>
    <div id="jumbotron">
        <div class="pattern">
            <div class="blur">
                <div class="content">
                    <!-- <input type="text" ref="input" v-model="typedText"> -->
                    <h1>Scopri nuove destinazioni</h1>
                    <h2>Prenota la tua casa ideale</h2>

                    <SearchbarComponent v-if="!isMobileView" :id="large_element" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;

#jumbotron {
    height: 800px;
    background-image: url('../assets/img/jumbotron.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

h1 {
    color: $bb-lighter;
    font-weight: 700;
    font-size: 4rem;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding-bottom: 1rem;
}

h2 {
    color: $bb-lighter;
    font-weight: 600;
    font-size: 2rem;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding-bottom: 3rem;
}

.pattern {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    position: absolute;
    left: 0;
    top: 0;
}

.blur {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(2px);
    position: absolute;
    left: 0;
    top: 0;
}

// MEDIA QUERY
// desktop
@media screen and (min-width: 744px) {
    .nav_bottom {
        visibility: hidden;
    }


}

// mobile
@media screen and (max-width: 744px) {
    .mobile_hide {
        // visibility: hidden;
        display: none !important;
    }

    h1 {
        font-size: 2.4rem;
    }

    #jumbotron {
        height: 350px;

        h2 {
            padding-bottom: 0;
        }
    }
}
</style>