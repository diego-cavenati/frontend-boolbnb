
<script>
export default {
    name: 'FooterComponent',
    data() {
        return {
            partecipanti: [
                { nome: 'Diego Cavenati', link: 'https://www.linkedin.com/in/diego-cavenati/' },
                { nome: 'Marco Mariosa', link: 'https://www.linkedin.com/in/marco-mariosa-0b4b34237/' },
                { nome: 'Michele Rossetti', link: 'https://www.linkedin.com/in/michele-rossetti-298561263/' },
                { nome: 'Sarra Karfai', link: 'https://www.linkedin.com/in/sarra-karfai/' },
                { nome: 'Marco Arnulfo', link: 'https://www.linkedin.com/in/marcoarnulfo7/' },
            ],
        }
    },
    components: {
    },
    mounted() {
        this.shufflePartecipanti()
    },
    methods: {
        shufflePartecipanti() {
            this.partecipanti.sort(() => Math.random() - 0.5)
        }
    }
}
</script>

<template>
    <div id="footer">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="logo">
                        <img src="../assets/svg/boolbnb-white.svg" alt="">
                    </div>

                    <div class="links">
                        <a href="#">Home</a>
                        <span class="divider"></span>
                        <a href="#">About</a>
                        <span class="divider"></span>
                        <a href="#">Contacts</a>
                        <span class="divider"></span>
                        <a href="#">Apartments</a>
                        <span class="divider"></span>
                        <a href="#">More</a>
                    </div>

                    <div class="description">
                        <p>Copyright © Airbnb, Inc. I contenuti di questo sito web includono immagini, testi e icone tratte
                            da Airbnb e sono soggetti ai termini d'uso di Airbnb disponibili al seguente link:
                            https://www.airbnb.it/help/article/2908.</p>
                    </div>
                    <div class="credits">
                        <ul>
                            <li>Developed by:</li>
                            <li v-for="(partecipante, index) in partecipanti" :key="index">
                                <a :href="partecipante.link" target="_blank">{{ partecipante.nome }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;

#footer {
    background: linear-gradient(90deg, $bb-primary 0%, $bb-secondary 100%);
    padding: 3rem 0;
    color: $bb-lighter;
    text-align: center;
    position: relative;

    .links {
        display: flex;
        justify-content: center;
        margin: 1rem 0;
        flex-wrap: wrap;

        a {
            margin: 0 1rem;
            color: $bb-lighter;
        }

        .divider {
            border-left: 1px solid $bb-lighter;
            height: 1rem;
            margin: 0 1rem;
        }
    }

    .logo {
        padding-bottom: 1rem;

        img {
            width: 10rem;
        }
    }

    .description {
        padding-bottom: 1rem;

        p {
            text-align: center;
        }
    }

    .credits {
        display: flex;
        justify-content: center;
    }

    ul {
        list-style: none;
        display: flex;
        color: white;
        text-align: center;
        flex-wrap: wrap;

        li {
            padding: 1rem;

            a {
                color: white;
            }
        }
    }
}
</style>