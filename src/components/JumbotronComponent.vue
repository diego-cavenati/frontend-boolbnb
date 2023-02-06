<script>
export default {
    name: 'JumbotronComponent',
    data() {
        return {
        }
    },
    components: {

    }
}
</script>

<template>
    <div id="jumbotron">
        <div class="pattern">
            <div class="blur">
                <div class="content">
                    <h1>Lorem ipsum is simply dummy</h1>
                    <h2>Lorem ipsum dolor sit amet.</h2>

                    <!-- Component SearchBar segnaposto -->
                    <div class="searchBar"></div>
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
}

//placeholder
.searchBar {
    width: 1332.42px;
    height: 134.39px;
    background: #FFFFFF;
    box-shadow: 0px 4px 8px 4px rgba(0, 0, 0, 0.05);
    border-radius: 67.1953px;
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
</style>