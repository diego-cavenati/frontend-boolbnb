
<script>
export default {
    name: 'FooterComponent',
    data() {
        return {
        }
    },
    components: {
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
                        <a href="#">Link 1</a>
                        <span class="divider"></span>
                        <a href="#">Link 2</a>
                        <span class="divider"></span>
                        <a href="#">Link 3</a>
                        <span class="divider"></span>
                        <a href="#">Link 4</a>
                        <span class="divider"></span>
                        <a href="#">Link 5</a>
                    </div>

                    <div class="description">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa repellendus tempora
                            reiciendis fugiat aperiam dolore magni earum, ut numquam expedita est, quod magnam eius
                            officiis optio unde eum quae. Facere</p>
                    </div>
                    <div class="credits">
                        © 2023 BoolBnb | Powered by
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

    .links {
        display: flex;
        justify-content: center;
        margin: 1rem 0;

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

}
</style>