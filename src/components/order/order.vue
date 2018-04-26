<template>
    <div>

        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
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
                                <li class="active">
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
                    <div class="cart-box">
                        <el-form :model="orderInfo" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名：" prop="accept_name" label-width='150px'>
                                        <el-input v-model="orderInfo.accept_name" style="width:600px"></el-input>
                                    </el-form-item>

                                    <el-form-item label="所属区域：" prop="area" label-width='150px'>
                                        <v-distpicker @selected="areaselected" :province="orderInfo.area.province.value" :city="orderInfo.area.city.value" :area="orderInfo.area.area.value"></v-distpicker>
                                    </el-form-item>

                                    <el-form-item label="详细地址：" prop="address" label-width='150px'>
                                        <el-input v-model="orderInfo.address" style="width:600px"></el-input>
                                    </el-form-item>

                                    <el-form-item label="电话号码：" prop="mobile" label-width='150px'>
                                        <el-input v-model="orderInfo.mobile" style="width:600px"></el-input>
                                    </el-form-item>

                                    <el-form-item label="电子邮箱：" prop="email" label-width='150px'>
                                        <el-input v-model="orderInfo.email" style="width:600px"></el-input>
                                    </el-form-item>

                                    <el-form-item label="邮政编码：" prop="post_code" label-width='150px'>
                                        <el-input v-model="orderInfo.post_code" style="width:150px"></el-input>
                                    </el-form-item>
                                </div>

                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio v-model="orderInfo.payment_id" label="1">在线支付</el-radio>
                                        <em>手续费：0.00元</em>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio-group v-model="orderInfo.express_id" @change="expressChange">
                                            <el-radio label="1">顺丰快递(20元)</el-radio>
                                            <el-radio label="2">圆通快递(10元)</el-radio>
                                            <el-radio label="3">韵达快递(8元)</el-radio>
                                        </el-radio-group>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for='item in goodsList'>
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price*item.buycount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea name="message" class="input" style="height:35px;" v-model="orderInfo.message"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderInfo.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{allMoney}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <a id="btnSubmit" class="btn submit" @click='goToOrder'>确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import { getLocalGoods } from "../../comment/localstorage";
export default {
  components: {
    VDistpicker: VDistpicker
  },
  created() {
    this.decisionGoods();
  },
  data: function() {
    return {
      goodsList: [],
      totalCount: 0, //总件数
      totalPrice: 0, //总金额
      orderInfo: {
        //shu这些数据就是要提交到后台去的
        accept_name: "饼子", //收货人姓名
        address: "中粮商务公园3栋1304", //详细地址
        mobile: "13812345678", //手机号码
        email: "huangwei@itcast.cn", //电子邮箱
        post_code: "518000", //邮政编码
        area: {
          //所属区域
          province: { code: "440000", value: "广东省" },
          city: { code: "440300", value: "深圳市" },
          area: { code: "440306", value: "宝安区" }
        },
        payment_id: "1", //支付方式，暂时只支持在线支付
        express_id: "1", //1.顺丰 2.圆通 3.韵达
        expressMoment: 20, //运费，默认20元
        message: "请快点发货", //留言
        goodsAmount: 0, //纯粹的商品总价格，不含运费
        goodsids: "", //结算的商品id，多个之间用，分割
        cargoodsobj: {} //本地存储的要结算的商品对象
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" }
        ],
        address: [{ required: true, message: "请选择地址", trigger: "blur" }],
        mobile: [
          { required: true, message: "请选择手机号码", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        post_code: [{ message: "请输入邮编", trigger: "blur" }]
      },
      area: [{ required: true, message: "请选择区域", trigger: "blur" }]
    };
  },
  computed: {
    allMoney: function() {
      return this.totalPrice + this.orderInfo.expressMoment;
    }
  },

  methods: {
    decisionGoods: function() {
      this.orderInfo.goodsids = this.$route.params.ids;
      //   console.log(this.$route.params.ids);
      //   console.log(this.orderInfo.goodsids);
      //   this.orderInfo.goodsids = 333;
      //获取本地一共有多少
      const localGoods = getLocalGoods();

      //要就算的(id-->数量)
      const tempGoodsObj = {};
      const tempIds = this.$route.params.ids.split(",");
      //循环数组
      tempIds.forEach(item => {
        tempGoodsObj[item] = localGoods[item];
        // console.log(tempGoodsObj);
      });
      this.orderInfo.cargoodsobj = tempGoodsObj;

      $axios
        .get(`site/validate/order/getgoodslist/${this.$route.params.ids}`)
        .then(
          response => {
            console.log(response.data.message);
            let tempTotalCount = 0;
            let tempTotalPrcie = 0;
            this.goodsList = response.data.message;
            response.data.message.forEach(item => {
              item.buycount = localGoods[item.id];
              tempTotalCount += item.buycount;
              tempTotalPrcie += item.buycount + item.sell_price;
            });
            this.totalCount = tempTotalCount;
            this.totalPrice = tempTotalPrcie;

            this.orderInfo.goodsAmount = tempTotalPrcie;
          },
          err => {
            console.log(err);
          }
        );
    },
    expressChange: function(express_id) {
      switch (express_id) {
        case "1":
          this.orderInfo.expressMoment = 20;
          break;
        case "2":
          this.orderInfo.expressMoment = 10;
          break;
        case "3":
          this.orderInfo.expressMoment = 8;
          break;

        default:
          break;
      }
    },
    areaselected: function(data) {
      // console.log(data);
      this.orderInfo.area = data;
    },
    goToOrder: function() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(this.orderInfo);
          $axios.post("site/validate/order/setorder", this.orderInfo).then(
            response => {
              console.log(response.data);
              if (response.data.status == 0) {
                //获取到支付id
                const payId = response.data.message.orderid;
                console.log(payId);
                //跳转页面
                this.$router.push({
                    path:`/payfor/${payId}`
                })

                //在本地删除已经下了订单
                //将订单的id字符串转换成数组
                const tempArr= this.orderInfo.goodsids.split(',')
                // console.log(tempArr);
                //循环  删除  更新buycount 
                tempArr.forEach(item=>{
                    //调用main里面删除的方法
                    this.$store.commit('deleteGoods',item)
                })
                
              }
            },
            err => {
              console.log(err);
            }
          );
        }
      });
    }
  }
};
</script>
