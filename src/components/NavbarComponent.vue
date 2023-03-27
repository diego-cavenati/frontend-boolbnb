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
            isMobileView: false,
            small_element: 'small_element',
        }
    },
    computed: {
        // isHomepage() {
        //     return this.$route.path === '/';
        // }
    },
    components: {
        SearchbarComponent
    },
    props: {
        showSearchbar: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        isHomepage() {
            return this.$route.path === '/';
        },
    }

}
</script>
<template>
    <div class="logo_mobile">
        <router-link :to="{ name: 'home' }">
            <img src="../assets/svg/boolbnb-color.svg" alt="">
        </router-link>
    </div>

    <nav>

        <div class="hide">
            <router-link :to="{ name: 'home' }">
                <img src="../assets/svg/boolbnb-color.svg" alt="">
            </router-link>
        </div>

        <SearchbarComponent :id="small_element" v-if="showSearchbar & isHomepage" />
        <SearchbarComponent :id="small_element" v-if="!isHomepage" />

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
            </ul>
        </div>
    </nav>

    <!-- Nav bottom -->
    <div class="nav_bottom">
        <div class="container icons">


            <div class="nav_icon">
                <i class="fa-solid fa-user"></i>
                <span><a href="http://127.0.0.1:8000/">Accedi</a></span>
            </div>


            <router-link class="nav_icon" :to="{ name: 'search' }">
                <i class=" fa-solid fa-magnifying-glass"></i>
                <span>Cerca</span>
            </router-link>


            <div class="nav_icon">
                <i class="fa-solid fa-pen"></i>
                <span><a href="http://127.0.0.1:8000/register">Registrati</a></span>
            </div>

        </div>
    </div>
</template>

<style lang="scss">
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
    align-items: center;

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
    z-index: 10;
    width: 100%;
    box-shadow: 0px 10px 20px rgba(166, 229, 255, 0.2);

}

.icons {
    padding: 1rem 2rem;
    background: linear-gradient(90deg, $bb-primary 0%, $bb-secondary 100%);
    display: flex;
    justify-content: space-between;
    border-radius: 1rem;
    margin-bottom: 1rem;
}

@media screen and (min-width: 400px) {
    .icons {
        justify-content: space-around;
    }
}

.nav_icon {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $bb-lighter;
    background: none;
    font-size: 1.5rem;
    padding-inline: 0.5rem;

    span {
        font-size: 1.1rem;
        font-family: $bb-secondary;
        font-weight: 400;
        padding-top: 0.3rem;

        a {
            color: $bb-lighter;

            &:hover {
                color: $bb-lighter;
            }
        }
    }
}

a.nav_icon {
    color: $bb-lighter;

    &:hover {
        color: $bb-lighter;
    }
}

nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    padding-left: 3rem;
    padding-right: 3rem;


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

    .logo_mobile {
        display: none !important;
    }
}

@media screen and (max-width: 744px) {
    .logo_mobile {
        padding-top: 0.6rem;

        a {
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;

            img {
                width: 160px;
            }
        }

    }

    .hide {
        display: none !important;
    }

    nav {
        justify-content: center;
        width: 100%;
        padding-left: 0;
        padding-right: 0;
    }

    .logo {
        display: block;
    }

    .nav_bottom {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .my-component-homepage {
        display: none;
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