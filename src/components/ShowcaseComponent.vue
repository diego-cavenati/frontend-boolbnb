<script>
import axios from 'axios';
import { store } from '../store';
import CardComponent from './CardComponent.vue';

export default {
    name: 'ShowcaseComponent',
    data() {
        return {
            store,
        }
    },
    components: {
        CardComponent,
    },
    mounted(){
        console.log('FIAOXCADESDASD');
    }


}
</script>

<template>
    <div id="showcase">
        <div class="container">
            <h2>I nostri appartamenti <span class="title_mark"> in vetrina</span></h2>
            <div class="description">
                <p>
                    Lorem ipsum dolor sit amet consectetur. Neque mauris massa mauris et dui volutpat
                    nunc purus felis. Est vitae et velit at. Interdum sodales gravida mattis venenatis fusce sagittis
                    quisque. Ut et imperdiet tempor eget sed. Eu augue consectetur adipiscing neque mauris placerat nec
                    diam. Sit etiam sed egestas enim.
                </p>

                <button class="button">Vedi tutti</button>
            </div>


            <div class="row">
                <!-- Single card -->
                <CardComponent/>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';

#showcase {
    padding: 5rem 0;
}

h2 {
    padding-bottom: 0.8rem;
}

p {
    max-width: 80%;
}

.description {
    display: flex;
    align-items: center;
    padding-bottom: 2rem;
    justify-content: space-between;
}
</style>