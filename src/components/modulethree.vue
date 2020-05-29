<template>
    <div>
        <transition name="fade">
            <div key="fade" v-if="show" class="cyan">
                <div class="anquan">

                    <h3>安全环境</h3>
                    <table class="table" style="width:calc(100% - 7px);">
                        <tbody>
                        <tr>
                            <th style="width: 100px">监测点</th>
                            <th style="width: 70px">数值</th>
                            <th>状态</th>
                        </tr>
                        </tbody>
                    </table>
                    <div class="box">
                        <table class="table">
                            <tbody>
                            <tr v-for="(item,index) in anquan">
                                <td style="width: 120px" title="9煤采区水仓（高浓激光甲烷）">{{item.ssTransducerPoint}}</td>
                                <td style="width: 80px" title="高低浓度甲烷">{{item.ssTransducerValue}}</td>
                                <td style="width: 80px" id="value">正常</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>


                    <h3>人员轨迹</h3>
                    <table class="table" style="width:calc(100% - 7px);">
                        <tbody>
                        <tr>
                            <th style="width: 160px">监测点</th>
                            <th style="width: 70px">数值</th>
                            <th>状态</th>
                        </tr>
                        </tbody>
                    </table>
                    <div class="box">
                        <table class="table" id="traResult">
                            <tbody>
                            <tr v-for="(item,index) in anquan">
                                <td style="width: 120px" title="9煤采区水仓（高浓激光甲烷）">{{item.ssTransducerPoint}}</td>
                                <td style="width: 80px" title="高低浓度甲烷">{{item.ssTransducerValue}}</td>
                                <td style="width: 80px" id="value">正常</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>


                    <h3>人员轨迹</h3>
                    <table class="table" style="width:calc(100% - 7px);">
                        <tbody>
                        <tr>
                            <th style="width: 160px">监测点</th>
                            <th style="width: 70px">数值</th>
                            <th>状态</th>
                        </tr>
                        </tbody>
                    </table>
                    <div class="box">
                        <table class="table" id="traResult">
                            <tbody>
                            <tr v-for="(item,index) in anquan">
                                <td style="width: 120px" title="9煤采区水仓（高浓激光甲烷）">{{item.ssTransducerPoint}}</td>
                                <td style="width: 80px" title="高低浓度甲烷">{{item.ssTransducerValue}}</td>
                                <td style="width: 80px" id="value">正常</td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </transition>

        <div class="leftbtn btn" @click="show = false" v-if="show">
            《
        </div>
        <div class="rightbtn btn" @click="show = true" v-if="!show">
            》
        </div>
        <div class="downbtn btn" @click="bottom = false" v-if="bottom">
            ︾
        </div>
        <div class="upbtn btn" @click="bottom = true" v-if="!bottom">
            ︽
        </div>

        <transition name="fade2">
            <div v-show="bottom" class="boxbottom">
                <swiper class="swiper" :options="swiperOption">
                    <div class="swiper-button-prev" slot="button-prev"></div>

                    <swiper-slide class="swiperbox">
                        <video-player class="videobox" ref="videoone"></video-player>
                    </swiper-slide>
                    <swiper-slide class="swiperbox">
                        <video-player class="videobox" ref="videotwo"></video-player>
                    </swiper-slide>
                    <swiper-slide class="swiperbox">
                        <video-player class="videobox" ref="videothree"></video-player>
                    </swiper-slide>
                    <div class="swiper-button-next" slot="button-next"></div>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
        </transition>

        <div class="rightbtn2 btn" @click="right = false" v-if="right">
            》
        </div>
        <div class="leftbtn2 btn" @click="right = true" v-if="!right">
            《
        </div>
        <transition name="fade3">
            <div v-if="right" class="boxright">
                <h3>设备</h3>
                <div class="table">
                    <div class="toptable">
                        <table class="table" style="width:calc(100% - 17px)">
                            <tbody>
                            <tr>
                                <th style="width: 150px;">设备名称</th>
                                <th style="width: 75px;">运行状态</th>
                                <th>报警</th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </transition>


    </div>
</template>

<script>
    import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import videoPlayer from "./video.vue"
    import $ from "jquery"

    export default {
        name: "modulethree",
        components: {
            Swiper,
            SwiperSlide,
            videoPlayer,
        },
        data() {
            return {
                show: true,
                bottom: true,
                anquan:{},
                right: true,
                websock:null,
                swiperOption: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    loop: false,
                    autoplay:true,
                    zoom:true,
                    navigation: {
                        nextEl: '.swiper-button-next', //前进按钮的css选择器或HTML元素。
                        prevEl: '.swiper-button-prev', //后退按钮的css选择器或HTML元素。
                        hideOnClick: true, //点击slide时显示/隐藏按钮
                        disabledClass: 'my-button-disabled', //前进后退按钮不可用时的类名。
                        hiddenClass: 'my-button-hidden', //按钮隐藏时的Class
                    },
                }
            }
        },
        mounted() {
            this.video();
            // this.$initCesium.tabcesium(["chuanGanQi"]);
            this.$initOL.loadLayer(["hd910Layer", "riskunderground"]);
            this.$initOL.viewFlyTo({// underground
                lng: 112.27675923,
                lat: 36.833577537,
                zoom: 16
            });
        },
        created() {
            this.initWebSocket();
            console.log(this.anquan);
        },
        destoryed() {
            this.websocket.close();

        },
        methods: {
            initWebSocket(){
                function randomWord(randomFlag, min, max) {
                    var str = "",
                        range = min,
                        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                    // 随机产生
                    if (randomFlag) {
                        range = Math.round(Math.random() * (max - min)) + min;
                    }
                    for (var i = 0; i < range; i++) {
                       var pos = Math.round(Math.random() * (arr.length - 1));
                        str += arr[pos];
                    }
                    return str;
                }

                var ws = new WebSocket("ws://122.112.170.1:8081/net/websocket/safeResult/" +randomWord(false, 43));
                ws.onopen = function (evt) {
                    console.log("安全websocket连接成功");
                };
                ws.onmessage = (event) => {
                    if (event.data != null && event.data != '' && event.data != 'ssdata') {
                        var parseData = $.parseJSON(event.data);
                        console.log(parseData);
                        this.anquan = parseData;
                    }
                };
            },
            websocketclose(e){  //关闭
                console.log('断开连接',e);
            },
            video(){
                this.$refs['videoone'].playerOptions.sources[0].src = 'rtmp://192.168.0.242/live/22'
                this.$refs['videotwo'].playerOptions.sources[0].src = 'rtmp://192.168.0.242/live/57'
            }
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    body {
        width: 100%;
        height: 100%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .3s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        transform: translateX(-100px);
        opacity: 0;
    }

    .fade2-enter-active, .fade2-leave-active {
        transition: all .3s;
    }

    .fade2-enter, .fade2-leave-to {
        transform: translateY(10px);
        opacity: 0;
    }

    .fade3-enter-active, .fade3-leave-active {
        transition: all .3s;
    }

    .fade3-enter, .fade3-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }

    .downbtn {
        position: absolute;
        left: 50%;
        bottom: 25%;
    }

    .upbtn {
        position: absolute;
        left: 50%;
        bottom: 0;
    }

    .leftbtn {
        position: absolute;
        left: 19%;
        top: 50%;
    }

    .rightbtn2 {
        position: absolute;
        right: 16%;
        top: 50%;
    }

    .leftbtn2 {
        position: absolute;
        right: 1%;
        top: 50%;
    }

    .btn {
        width: 20px;
        height: 20px;
        z-index: 1;
        cursor: pointer;
        background: #0e2443;
        border: 1px solid #345f92;
        box-shadow: 0 0 10px #2C58A6;
        color: white;
    }

    .rightbtn {
        position: absolute;
        left: 3%;
        top: 50%;
    }

    .swiper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .swiperbox {
        position: relative;
        left: 0;
        top: 0;
        width: 371px;
        height: 210px;
    }

    .swiperbox .videobox {
        position: absolute;
        left: 0;
        top: 6px;
        width: 100%;
        height: 100%;
    }

    .boxbottom {
        width: 1213px;
        height: 227px;
        position: absolute;
        left: 383px;
        bottom: 10px;
        background: #0e2443;
        border: 1px solid #345f92;
        box-shadow: 0 0 10px #2C58A6;
        z-index: 3;
    }

    .boxright {
        width: 300px;
        height: 97%;
        background: #0e2443;
        border: 1px solid #345f92;
        box-shadow: 0 0 10px #2C58A6;
        position: absolute;
        right: 10px;
        top: 20px;
        z-index: 1;
    }

    .boxright .tablebox {
        width: 100%;
        height: 100%;
        /*background-color: cyan;*/
    }

    .boxright .tablebox th {
        border-bottom: none;
        color: #a7c4ec;
        font-weight: 600;
    }

    .boxright .tablebox .toptable {
        width: 100%;
        height: 25px;
    }

    .table {
        background-color: #286aa3;
    }

    .box {
        width: 300px;
        height: 300px;
        /*background-color:yellowgreen;*/
        overflow-x: hidden;
    }

    .box .table td {
        width: 100px;
        display: inline-block;
        text-overflow: ellipsis;
        text-decoration: none;
        list-style: none;
    }

    .table td, .table th {
        text-align: left;
        line-height: 25px;
        word-break: break-all;
        cursor: pointer;
        font-size: 12px;
        color: #a7c4ec;
        transform: scale(0.9);
        border-bottom: 1px solid #254163;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-decoration: none;
        list-style: none;
    }

    .cyan {
        width: 300px;
        height: 97%;
        background: #0e2443;
        border: 1px solid #345f92;
        box-shadow: 0 0 10px #2C58A6;
        position: absolute;
        left: 58px;
        top: 20px;
        z-index: 3;
        overflow-x: hidden;
    }

    .cyan .anquan {
        position: relative;
        left: 0;
        top: 0;
    }

    .cyan::-webkit-scrollbar {
        width: 4px;
        height: 100%;
    }

    .cyan::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
    }

    .cyan::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #EDEDED;
    }

    .box::-webkit-scrollbar {
        width: 4px;
        height: 100%;
    }

    .box::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #535353;
    }

    .box::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #EDEDED;
    }
</style>