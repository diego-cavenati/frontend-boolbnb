<script>
import { store } from './store';
export default {
    name: 'App',
    data() {
        return {
            store
        }
    },
    components: {
    }
}
</script>

<template>
    <div class="container text-center">
        <h1>Prova h1</h1>
        <h2>Prova h2 <span class="title_mark">testo evidenziato</span>
        </h2>
        <h3>prova testo 3</h3>
        <button class="button">
            Vedi tutti
            <span></span><span></span><span></span><span></span>
        </button>
        <div>{{ store.test }}</div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo ut quae voluptate nihil officiis incidunt iure
            neque inventore sequi omnis ipsum obcaecati totam, perspiciatis necessitatibus corrupti. Accusantium ut est
            eius, voluptatem itaque, reprehenderit dolorum voluptatibus, impedit quis harum quasi pariatur sunt
            recusandae unde odio quae dignissimos dolores laboriosam officia magnam fuga voluptate distinctio incidunt
            amet? Corporis ullam rerum rem, dolorum, temporibus magni officiis, dolore molestias quis asperiores
            assumenda. Cum similique corporis reprehenderit voluptatem deserunt doloremque perferendis molestiae quos
            nobis dolorem, ut quasi, quidem vel ea, voluptatibus corrupti nihil explicabo molestias voluptatum iste quia
            obcaecati? Illo maxime provident inventore dolor neque.</p>
    </div>
</template>

<style lang="scss">
@use './assets/scss/general.scss';
</style>
