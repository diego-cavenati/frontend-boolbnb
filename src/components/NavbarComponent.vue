<script>
import App from '../App.vue';
import { store } from '../store';
import SearchbarComponent from './SearchbarComponent.vue';

export default {
    name: 'NavbarComponent',
    data() {
        return {
            store,
            showInNavbar: false,
        }
    },
    components: {
        SearchbarComponent
    },
    methods: {
    },
    computed: {
        hideInHome() {
            return this.$route.path === '/';
        }
    }
}
</script>
<template>
    <nav class="ps-5 pe-5 pt-3 d-flex justify-content-between align-items-center">
        <div class="hide">
            <router-link :to="{ name: 'home' }">
                <img src="../assets/svg/boolbnb-color.svg" alt="">
            </router-link>
        </div>
        <SearchbarComponent v-if="!hideInHome" />
        <div class="d-flex align-items-center hide">

            <!-- <span class="host">Passa alla modalità host</span> -->

            <button type="button" class="profile_btn btn d-flex flex-row" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-bars"></i>
                <div class="profile_img">
                    <!-- TODO add letter user -->
                    <span><i class="fa-solid fa-user"></i></span>
                </div>
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="http://127.0.0.1:8000/">Accedi</a></li>
                <li><a class="dropdown-item" href="http://127.0.0.1:8000/register">Registrati</a></li>
                <!-- <li><a class="dropdown-item" href="#">Messaggi</a></li>
                                                    <li><a class="dropdown-item" href="#">Preferiti</a></li>
                                                    <li>
                                                        <hr class="dropdown-divider">
                                                    </li>
                                                    <li><a class="dropdown-item" href="#">Gestisci gli annunci</a></li>
                                                    <li>
                                                        <hr class="dropdown-divider">
                                                    </li>
                                                    <li><a class="dropdown-item" href="#">Esci</a></li> -->
            </ul>
        </div>
    </nav>

    <!-- Nav bottom -->
    <div class="nav_bottom">
        <div class="container icons">


            <div class="nav_icon">
                <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-user"></i>
                    <span><a href="http://127.0.0.1:8000/">Accedi</a></span>
                </button>
            </div>

            <div class="nav_icon">
                <router-link :to="{ name: 'search' }">
                    <button type=" button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class=" fa-solid fa-magnifying-glass"></i>
                        <span>Cerca</span>
                    </button>
                </router-link>
            </div>

            <div class="nav_icon">
                <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-pen"></i>
                    <span><a href="http://127.0.0.1:8000/register">Registrati</a></span>
                </button>
            </div>



            <!--
                                                <div>
                                                    <div class="nav_icon dropup">
                                                        <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i class="fa-solid fa-user"></i>
                                                            <span>Accedi</span>
                                                        </button>

                                                        <ul class="dropdown-menu">
                                                            <li><a class="dropdown-item" href="#">Messaggi</a></li>
                                                            <li><a class="dropdown-item" href="#">Preferiti</a></li>
                                                            <li>
                                                                <hr class="dropdown-divider">
                                                            </li>
                                                            <li><a class="dropdown-item" href="#">Gestisci gli annunci</a></li>
                                                            <li>
                                                                <hr class="dropdown-divider">
                                                            </li>
                                                            <li><a class="dropdown-item" href="#">Esci</a></li>
                                                        </ul>
                                                    </div>

                                                </div> -->

        </div>
</div>
</template>

<style lang="scss">
@use '../assets/scss/general.scss';
@use '../assets/scss/partials/variables.scss' as *;

// nav {
// height: 5vh;
// }

// Top navbar
.profile_btn {
    padding: 0.4rem;
    padding-left: 0.8rem;
    border-color: $bb-light;
    border-radius: 2rem;

    svg {
        font-size: 1rem;
        color: gray;
    }
}

.profile_img {
    color: $bb-lighter;
    font-family: $bb-font-primary;
    font-weight: 500;
    font-size: 1rem;
    background: linear-gradient(180deg, #45BAE1 0%, #51D48E 100%);
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.5rem;

    svg {
        color: $bb-lighter;

    }
}

// bottom navbar
.nav_bottom {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1030;
    width: 100%;
    box-shadow: 0px 10px 20px rgba(166, 229, 255, 0.2);

}

.icons {
    padding: 1rem 2rem;
    background: linear-gradient(90deg, $bb-primary 0%, $bb-secondary 100%);
    display: flex;
    justify-content: space-around;
    border-radius: 1rem;
    margin-bottom: 1rem;
}


button {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $bb-lighter;
    background: none;
    font-size: 1.5rem;

    // text-shadow: 2px 2px 3px #333;
    span {
        font-size: 1.1rem;
        font-family: $bb-secondary;
        font-weight: 400;
        padding-top: 0.3rem;

        a {
            color: $bb-lighter;
        }
    }
}

nav {
    padding-bottom: 0.7rem;

    img {
        width: 130px;
    }
}

.border_top {
    border-top: 1px solid black;
}


// MEDIA QUERY
@media screen and (min-width: 744px) {
    .nav_bottom {
        visibility: hidden;
    }
}

@media screen and (max-width: 744px) {
    .hide {
        visibility: hidden;
    }

    .nav_bottom {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}

// EFFECTS
.host {
    padding-right: 1.5rem;
    color: gray;

    &:hover {
        color: $bb-primary;
    }
}
</style>