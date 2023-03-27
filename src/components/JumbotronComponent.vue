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


                    <div class="css-typing">
                        <h1>Scopri nuove destinazioni</h1>
                        <h2>Prenota la tua casa ideale</h2>
                    </div>

                    <SearchbarComponent v-if="!isMobileView" :id="large_element" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;



.css-typing h1,
.css-typing h2 {
    border-right: .15em solid white;
    white-space: nowrap;
    overflow: hidden;
}


.css-typing h1 {
    width: 100%;
    opacity: 0;
    -webkit-animation: type2 2s steps(20, end), blink .5s step-end infinite alternate;
    animation: type2 2s steps(20, end), blink .5s step-end infinite alternate;
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}

.css-typing h2 {
    margin-inline: auto;
    width: 55%;
    opacity: 0;
    -webkit-animation: type3 2s steps(20, end), blink .5s step-end infinite alternate;
    animation: type3 2s steps(20, end), blink .5s step-end infinite alternate;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards;
}



@keyframes type2 {
    0% {
        width: 0;
    }

    1% {
        opacity: 1;
    }

    99.9% {
        border-right: .15em solid white;
    }

    100% {
        opacity: 1;
        border: none;
    }
}

@-webkit-keyframes type2 {
    0% {
        width: 0;
    }

    1% {
        opacity: 1;
    }

    99.9% {
        border-right: .15em solid white;
    }

    100% {
        opacity: 1;
        border: none;
    }
}

@keyframes type3 {
    0% {
        width: 0px;
    }

    1% {
        opacity: 1;
    }

    100% {
        opacity: 1;
    }
}

@-webkit-keyframes type3 {
    0% {
        width: 0px;
    }

    1% {
        opacity: 1;
    }

    100% {
        opacity: 1;
    }
}

@keyframes blink {
    50% {
        border-color: transparent;
    }
}

@-webkit-keyframes blink {
    50% {
        border-color: tranparent;
    }
}


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
    margin-bottom: 1rem;
}

h2 {
    color: $bb-lighter;
    font-weight: 600;
    font-size: 2rem;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 3rem
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

@media screen and (max-width: 820px) {
    h1 {
        font-size: 3rem;

    }

    #jumbotron {

        h2 {
            font-size: 1.8rem;

        }
    }

    .css-typing h2 {
        width: 65%;
    }
}



// mobile
@media screen and (max-width: 744px) {
    /*  html {
        font-size: 14px;
    } */

    .mobile_hide {
        // visibility: hidden;
        display: none !important;
    }

    h1 {
        font-size: 1.8rem;

    }

    #jumbotron {
        height: 350px;

        h2 {
            font-size: 1.6rem;

        }
    }

    .css-typing h2 {
        width: 95%;
    }




}

@media screen and (max-width: 586px) {
    h1 {
        font-size: 1.4rem;
        padding: 0 0.5rem;
    }

    #jumbotron {
        height: 350px;

        h2 {
            font-size: 1.3rem;
            padding-bottom: 0;
            padding: 0 0.5rem;
        }
    }

    .css-typing h2 {
        width: 95%;
    }
}
</style>