<template>
    <div>
        <div class="left" v-on:click='substract'>-</div>
        <div class="center">{{count}}</div>
        <div class="right" v-on:click='add'>+</div>
    </div>
</template>

<style>
.left,
.center,
.right {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #ccc;
}
</style>
<script>
export default {
  data: function() {
    return {
      count: 0
    };
  },
  props: ["goodsId", "goodsNumber"],
  created() {
    this.count = this.goodsNumber;
  },
  methods: {
    substract() {
      if (this.count == 1) return;
      this.count--;
      this.notify();
    },
    add() {
      this.count++;
      this.notify();
    },
    notify() {
      const goods = {
          goodsId:this.goodsId,
          goodsNumber:this.count
      };
      this.$emit("changEvent",goods);
    }
  }
};
</script>


