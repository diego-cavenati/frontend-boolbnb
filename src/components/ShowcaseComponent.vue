<script>
import { store } from '../store';
import CardComponent from './CardComponent.vue';

export default {
    name: 'ShowcaseComponent',
    data() {
        return {
            store
        }
    },
    components: {
        CardComponent,
    }
}
</script>

<template>
    <div id="showcase">
        <div class="container">
            <h2>I nostri appartamenti <span class="title_mark"> in vetrina</span></h2>
            <div class="row">
                <div class="col-8">Lorem ipsum dolor sit amet consectetur. Neque mauris massa mauris et dui volutpat
                    nunc purus felis. Est vitae et velit at. Interdum sodales gravida mattis venenatis fusce sagittis
                    quisque. Ut et imperdiet tempor eget sed. Eu augue consectetur adipiscing neque mauris placerat nec
                    diam. Sit etiam sed egestas enim. Turpis sed ante facilisi sapien dictum. Ultrices elementum enim
                    commodo nunc nulla sed id nec. Integer u</div>
                <div class="col-4">

                </div>
            </div>
            <div class="row">
                <!-- Single card -->
                <CardComponent v-for="element in store.images" :link="element.img[0]" />
                <!-- :link="element.img[store.immagineAttiva] da tenere per il card component-->
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/general.scss';

#showcase {
    padding: 5rem 0;
}
</style>