<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goodsdetail.imglist" :key="item.id" v-if='goodsdetail.imglist'>
                                                    <div class="small-img">
                                                        <img :src="item.thumb_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec" v-if='goodsdetail.goodsinfo'>
                                <h1>{{goodsdetail.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsdetail.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsdetail.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{goodsdetail.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">{{goodsdetail.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number size="small" v-model="goodsCount" :min="1" :max="goodsdetail.goodsinfo.stock_quantity"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsdetail.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="doaddcar" class="add" ref="addToShopCartRef">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click='isshow=false' href="javascript:;" :class={selected:!isshow}>商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click='isshow=true' href="javascript:;" :class={selected:isshow}>商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div v-show='!isshow' v-if="goodsdetail.goodsinfo" class="tab-content entry" style="display: block;">
                                <div v-html='goodsdetail.goodsinfo.content'></div>
                            </div>
                            <div v-show='isshow' class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model='commentval' id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click='getcomment'>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="comment.message.length==0" v-if="comment.message" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for='item in comment.message'>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time|gettime('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[3, 5, 7,9]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="comment.totalcount">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for='item in goodsdetail.hotgoodslist' :key='item.id'>
                                        <div class="img-box">
                                            <router-link :to='"/getgoodsdetail/"+ item.id' class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to='"/getgoodsdetail/"+ item.id' class="">{{item.title}}</router-link>
                                            <span>{{item.add_time|gettime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
            <div class='animateImg' v-show='isshowimg' v-if='goodsdetail.imglist' ref='animateImgRef'>
                <img :src="goodsdetail.imglist[0].thumb_path" alt="" width="100%" height="100%">
            </div>
        </transition>
    </div>
</template>

<style scoped>
@import "../../statics/site/js/jqimgzoom/css/magnifier.css";

.animateImg {
  position: absolute;
  width: 30px;
  height: 30px;
  left: 30px;
  top: 100px;
  /* transition: all 0.5s */
}
</style>

<script>
import { Affix } from "iview";
import "../../statics/site/js/jqimgzoom/js/magnifier.js";
export default {
  components: {
    Affix:Affix
  },
  data: function() {
    return {
      goodsdetail: {},
      goodsCount: 1,
      pageIndex: 1,
      pageSize: 3,
      comment: {},
      isshow: false,
      commentval: "",
      isshowimg: false,
      addToShopCartRefOffset: null,
      ShopCartRefOffset: null
    };
  },
  created: function() {
    this.getdetaildata();
    this.getgoodscomment();
  },
  mounted: function() {
    setTimeout(() => {
      //获取加入购物车的偏移量
      this.addToShopCartRefOffset = $(this.$refs.addToShopCartRef).offset();
      $(this.$refs.animateImgRef).offset({
        left: this.addToShopCartRefOffset.left,
        top: this.addToShopCartRefOffset.top
      });

      //购物车的偏移量
      this.ShopCartRefOffset = $("#buycarId").offset();
    }, 200);
  },
  methods: {
    //得到商品数据
    getdetaildata: function() {
      $axios.get(`site/goods/getgoodsinfo/${this.$route.params.goodsId}`).then(
        response => {
          this.goodsdetail = response.data.message;
          console.log(this.goodsdetail);
        },
        err => {
          console.log(err);
        }
      );
    },
    //获取评论
    getgoodscomment: function() {
      $axios
        .get(
          `site/comment/getbypage/goods/${
            this.$route.params.goodsId
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(response => {
          this.comment = response.data;
          console.log(2);
        });
    },
    //获取评论  发送请求
    getcomment() {
      $axios
        .post(
          `site/validate/comment/post/goods/${this.$route.params.goodsId}`,
          {
            commenttxt: this.commentval
          }
        )
        .then(
          response => {
            if (response.data.status == 0) {
              this.$message("评论成功");
              type: "success";
            } else {
              this.$message("评论失败");
            }

            this.commentval = "";
            //获取评论
            this.pageIndex = 1;
            this.getGoodsCommentData();
            console.log(1);
          },
          err => {
            console.log(err);
          }
        );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getgoodscomment();
      this.pageIndex = 1;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getgoodscomment();
    },
    doaddcar() {
      //加入购物车的点击事件
      this.isshowimg = true;
      //准备载荷
      const goods={
          goodsId:this.$route.params.goodsId,
          count:this.goodsCount
          
      }

      //调用增加的函数
      this.$store.commit('addGoods',goods)

    },
    beforeEnter(el) {
      el.style.left = `${this.addToShopCartRefOffset.left}px`;
      el.style.top = `${this.addToShopCartRefOffset.top}px`;
      el.style.transform = "scale(1)";
    },
    enter(el, done) {
      el.offsetWidth;
      //   el.style.left
      el.style.transition = "all 0.5s";                                                                                                                                                                                                                                                                          
      el.style.transform = "scale(0.5)";
      el.style.left = `${this.ShopCartRefOffset.left}px`;
      el.style.top = `${this.ShopCartRefOffset.top}px`;
      done();
    },
    afterEnter(el) {
      this.isshowimg = false;
    }
  },

  updated() {
    setTimeout(() => {
      $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });
    }, 200);
  },
  //监听$route的变化
  watch: {
    $route: function() {
      //重新发送请求
      this.getdetaildata();
      this.getgoodscomment();
      this.isshow = false;
    }
  }
};
</script>