<template>
<div>

    <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for='item in goodsdata.catelist' :key='item.id'>
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for='subitem in item.subcates' :key='subitem.id'>
                                                {{subitem.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for='subitem in item.subcates' :key='subitem.id'>{{subitem.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
            
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel :interval="5000" arrow="always" height='341px'>
                                <el-carousel-item v-for="item in goodsdata.sliderlist" :key="item.id">
                                <img :src="item.img_url" alt="" >
                                </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for='(item,index) in goodsdata.toplist'>
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src='item.img_url'>
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time|gettime()}}</span>
                                </div>
                            </li>
 
                        </ul>
                    </div>
                </div>
            </div>
    </div>

    <div v-for="item in goodsgroup" :key="item.level1cateid" class="section">
        <div class="main-tit">
            <h2>{{item.catetitle}}</h2>
            <p>
                <a href="/goods/43.html" v-for='subitem in item.level2catelist' :key='subitem.subcateid'>{{subitem.subcatetitle}}</a>
                <a href="/goods/40.html">更多
                    <i>+</i>
                </a>
            </p>
        </div>
        <div class="wrapper clearfix">
            <div class="wrap-box">
                <ul class="img-list">
                    <li v-for='subitem in item.datas' :key='subitem.artID'>
                        <router-link :to="'/getgoodsdetail/'+subitem.artID" class="">
                            <div class="img-box">
                                <img v-lazy="subitem.img_url">
                            </div>
                            <div class="info">
                                <h3>{{subitem.artTitle}}</h3>
                                <p class="price">
                                    <b>{{subitem.sell_price}}</b>元</p>
                                <p>
                                    <strong>库存 {{subitem.stock_quantity}}</strong>
                                    <span>市场价：
                                        <s>{{subitem.market_price}}</s>
                                    </span>
                                </p>
                            </div>
                        </router-link>
                    </li>

                </ul>
            </div>
        </div>
    </div>



</div>
</template>

<style scoped> 
 .el-carousel__item img {
        width: 100%;
        height: 100%;
    }
</style>

<script>
    //导入axios
    // import axios from 'axios'
    export default{
         data:function(){
            return{
                goodsdata:{},
                goodsgroup:[]
            }
        },
          methods:{
            getgoods:function(){
                $axios.get('site/goods/gettopdata/goods').then(response=>{
                    // console.log(response.data)
                    this.goodsdata=response.data.message
                },err=>{
                    console.log(err);
                })
            },
            getMoreGoods:function(){
                $axios.get('site/goods/getgoodsgroup').then(response=>{
                    console.log(response.data.message)
                    this.goodsgroup=response.data.message
                },err=>{
                    console.log(err);
                })
            }
        },
        created:function(){
            //调用发送请求的函数
            this.getgoods();
            this.getMoreGoods();
        },
      
       

    }
</script>

