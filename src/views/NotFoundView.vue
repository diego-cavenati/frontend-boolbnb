<script>
export default {
    name: 'NotFoundView',
}
</script>

<template>
    <div class="error_container">
        <div class="error_block">
            <h1>404</h1>
            <h3 class="mb-5">Oops... Pagina non trovata!</h3>
            <a href="/" class="button">TORNA ALLA HOME PAGE</a>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;

body {
    font-family: 'Rubik', sans-serif;
}

a {
    &:hover {
        color: $bb-secondary;
    }
}

.error_container {
    width: 100%;
    height: 100vh;
}

.error_block {
    width: 40%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.error_block h1 {
    font-size: 80px;
    color: #3f3a64;
}

.error_block h3 {
    font-size: 40px;
    color: #3f3a64;
}
</style>