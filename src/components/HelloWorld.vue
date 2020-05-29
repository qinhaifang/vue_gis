<template>
    <div class="hello">
        <keep-alive>
            <ces class="ces"></ces>
        </keep-alive>


        <router-view></router-view>


    </div>

</template>


<script>
    import ces from "./openlayerExample/No02-init"
    // import ces from "./CesiumExample/No01-init"
    export default {
        components: {
            ces
        },
        props: {
            msg: String
        },
        mounted() {
        },
        methods: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    body {
        width: 100%;
        height: 100%;
    }

    .ces {
        display: inline;
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 1;
    }

    .cyan {
        width: 200px;
        height: 200px;
        background-color: yellow;
        position: absolute;
        left: 100px;
        top: 100px;
        z-index: 2;
    }
</style>
