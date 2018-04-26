<template>
    <div class="section">
        <div class="wrapper">
            <div class="bg-wrap">
                <!--购物车头部-->
                <div class="cart-head clearfix">
                    <h2>
                        <i class="iconfont icon-cart"></i>我的购物车</h2>
                    <div class="cart-setp">
                        <ul>
                            <li class="first active">
                                <div class="progress">
                                    <span>1</span>
                                    放进购物车
                                </div>
                            </li>
                            <li>
                                <div class="progress">
                                    <span>2</span>
                                    填写订单信息
                                </div>
                            </li>
                            <li class="last">
                                <div class="progress">
                                    <span>3</span>
                                    支付/确认订单
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--购物车头部-->
                <!--商品列表-->
                <div class="cart-box">
                    <input id="jsondata" name="jsondata" type="hidden">
                    <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                        <tbody>
                            <tr>
                                <th width="48" align="center">
                                    <a>选择</a>
                                </th>
                                <th align="left" colspan="2">商品信息</th>
                                <th width="84" align="left">单价</th>
                                <th width="104" align="center">数量</th>
                                <th width="104" align="left">金额(元)</th>
                                <th width="54" align="center">操作</th>
                            </tr>
                            <tr v-for="item in goodsList">
                                <td width="48" align="center">
                                    <el-switch v-model="item.isSelected" active-color="#0094ff" inactive-color="#eeeeee">
                                    </el-switch>
                                </td>
                                <td align="left" colspan="2">
                                    <img :src="item.img_url" alt="" height="50px" width="50px">
                                    <span>{{item.title}}</span>
                                </td>
                                <td width="84" align="left">{{item.sell_price}}</td>
                                <td width="104" align="center">
                                    <inputNumber :goodsId='item.id' :goodsNumber='item.buycount' v-on:changEvent="getchangedata">
                                    </inputNumber>
                                </td>
                                <td width="104" align="left">{{item.sell_price*item.buycount}}</td>
                                <td width="54" align="center">
                                    <a href="javascript:void(0)" v-on:click='deletegoods(item.id)'>删 除</a>
                                </td>
                            </tr>
                            <tr v-if='goodsList.length==0'>
                                <td colspan="10">
                                    <div class="msg-tips">
                                        <div class="icon warning">
                                            <i class="iconfont icon-tip"></i>
                                        </div>
                                        <div class="info">
                                            <strong>购物车没有商品！</strong>
                                            <p>您的购物车为空，
                                                <a href="/index.html">马上去购物</a>吧！</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th align="right" colspan="8">
                                    已选择商品
                                    <b class="red" id="totalQuantity">{{gettotalcount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                    <span class="red">￥</span>
                                    <b class="red" id="totalAmount">{{gettotalmoney}}</b>元
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--/商品列表-->
                <!--购物车底部-->
                <div class="cart-foot clearfix">
                    <div class="right-box">
                        <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                        <button class="submit" @click="buyNow">立即结算</button>
                    </div>
                </div>
                <!--购物车底部-->
            </div>
        </div>
    </div>
</template>

<script>
import inputNumber from "../subcomponents/inputNumber.vue";
import { getLocalGoods } from "../../comment/localstorage.js";
export default {
  components: {
    inputNumber: inputNumber
  },
  data: function() {
    return {
      goodsList: []
    };
  },
  created: function() {
    this.getGoodsListData();
  },
  methods: {
    getGoodsListData: function() {
      const localGoods = getLocalGoods();
      const tempArr = [];
      for (var key in localGoods) {
        //只把id加进去
        tempArr.push(key);
      }
      if (tempArr.length == 0) return;
      $axios.get(`site/comment/getshopcargoods/${tempArr.join(",")}`).then(
        response => {
          response.data.message.forEach(item => {
            item.buycount = localGoods[item.id];
            item.isSelected = true;
          });
          // console.log(response.data.message);
          this.goodsList = response.data.message;
        },
        err => {
          console.log(err);
        }
      );
    },
    getchangedata(goods) {
      this.goodsList.forEach(item => {
        if (item.id === goods.goodsId) {
          item.buycount = goods.goodsNumber;
        }
      });
      this.$store.commit("updataGoods", {
        goodsId: goods.goodsId,
        goodsNumber: goods.goodsNumber
      });
    },
    deletegoods(goodId) {
      //温馨提示
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //   console.log(1);
          const deleteindex = this.goodsList.findIndex(item => {
            return item.id == goodId;
          });
          //数组删除
          this.goodsList.splice(deleteindex, 1);
          this.$store.commit("deleteGoods", goodId);
        })
        .catch(() => {
          console.log("取消");
        });
    },
    buyNow() {
      const tempArray = [];
      this.goodsList.forEach(item => {
        if (item.isSelected) {
          tempArray.push(item.id);
        }
      });

      if (tempArray.length == 0) {
        this.$message.error("请至少选择一个商品进行结算!");
        return;
      }

      //通过编程式导航触发路由
      this.$router.push({ path: `/order/${tempArray.join(",")}` });

      //判断是否登录
      //发送请求
      // $axios.get('site/account/islogin').then(response=>{
      //     // console.log(response.data);
      //     if(response.data.code=='nologin'){
      //         //跳转登录页面
      //     this.$router.push({path:'/login'})
      //     }else{
      //     this.$router.push({path:`/order/${this.tempArr.join(',')}`})
      //     }
      // },err=>{
      //     console.log(err);
      // })
    }
  },
  computed: {
    gettotalcount() {
      let totalcount = 0;
      this.goodsList.forEach(item => {
        if (item.isSelected) {
          totalcount += item.buycount;
        }
      });
      return totalcount;
    },
    gettotalmoney() {
      let totalcountmoney = 0;
      this.goodsList.forEach(item => {
        if (item.isSelected) {
          totalcountmoney += item.buycount * item.sell_price;
        }
      });
      return totalcountmoney;
    }
  }
};
</script>




