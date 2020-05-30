<template>
    <div id="olContainer"></div>
</template>

<script>
    export default {
        data() {
            return {
                map: null
            };
        },
        mounted() {
            this.$initOL.olMap("olContainer");
        }
    };
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    body {
        width: 100%;
        height: 100%;
    }
    #olContainer {
        height: 100%;
        width: 100%;
    }
</style>
