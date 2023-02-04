import {
    reactive
} from 'vue';

// import axios per fare call api
import axios from 'axios';


export const store = reactive({
    test: 'store.js funziona',
    images : [
        {
            img : 'https://masterx.iulm.it/wp-content/uploads/2019/01/braccio-di-ferro-200x200.jpg',
        },
        {
            img : 'https://storage.superpixel.com/cover/2f4c5302af3bb6ea2b8201ee6d8ca8dd.png@200x200',
        },
        {
            img : 'https://upload.wikimedia.org/wikipedia/commons/6/60/W-200x200-300dpi.png',
        },
        {
            img : 'https://upload.wikimedia.org/wikipedia/commons/9/96/Logo-warga-200x200.png',
        }
    ],
})