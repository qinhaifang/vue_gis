<template>
    <div>
        这是一个空白页面
        <videoplayer ref="kongbai" class="vid"></videoplayer>
    </div>
</template>

<script>
    import videoplayer from './video.vue'


    export default {
        name: "kong",
        components:{
            videoplayer
        },
        mounted() {
            this.play();
        },
        methods: {
            play(){
                this.$refs['kongbai'].playerOptions.sources[0].src = 'rtmp://58.200.131.2:1935/livetv/hunantv';
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    body{
        width: 100%;
        height: 100%;
    }
    .vid{
        width: 384px;
        height: 210px;
    }
</style>