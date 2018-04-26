//定义一个键值
var key = 'goodsInfo';


//取到localstorage里面的东西
//封装成函数
const getLocalGoods = function () {
    //获取到本地存储数据
    //转换成对象
    //并且返回
    let LocalGoods = JSON.parse(localStorage.getItem(key) || '{}')
    return LocalGoods;
}

//获取本地存储的最新的商品总数
const getLocalGoodsCount = function () {
    //调用获取的函数
    //得到存在本地的键值对
    let LocalGoodsCount = getLocalGoods()
    //计算对应值的总数
    let totalCount = 0
    for (var key in LocalGoodsCount) {
        //这里的key就是每一个键
        totalCount += LocalGoodsCount[key];
    }
    //返回
    return totalCount;
}

//将新增的数据 保存在本地
//以参数的形式将数据传递进来
//{goodsId:"91",count:3}
const addLocalGoods = function (goods) {

    //调用获取本地存储的函数
    const LocalGoods = getLocalGoods();

    // console.log(LocalGoods);

    //判断传入来的参数的键是否存在
    if (LocalGoods[goods.goodsId]) {
        //如果存在
        LocalGoods[goods.goodsId] += goods.count
    } else {
        LocalGoods[goods.goodsId] = goods.count

    }
    //添加完成后保存在本地
    localStorage.setItem(key, JSON.stringify(LocalGoods));

    //将最新的总数量放回回去
    return getLocalGoodsCount();
}
//修改
const updateLocalgoods = function (goods) {
    //获取
    let LocalStorage = getLocalGoods()
    console.log(goods);


    LocalStorage[goods.goodsId] = goods.goodsNumber

    //保存在本地
    localStorage.setItem(key, JSON.stringify(LocalStorage))
    //返回数量
    return getLocalGoodsCount();
}

//删除
const deleteLocalGoods = function (goodsId) {
    console.log(goodsId,"-------");
    
    //获取
    var LocalGoods = getLocalGoods();
    //删除
    delete LocalGoods[goodsId];
    //重新保存
    localStorage.setItem(key,JSON.stringify(LocalGoods));
    
    return getLocalGoodsCount();

}

//将局部的函数导出
export {
    addLocalGoods,
    getLocalGoodsCount,
    getLocalGoods,
    updateLocalgoods,
    deleteLocalGoods
}