const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const config = require('../../config.js');
Page({
  data: {
    productList: [], // 商品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductList();
  },
  
  /**
   * 获取产品数组
   */
  getProductList(){
    wx.showLoading({
      title: '商品加载中...',
    })
    qcloud.request({
      url: config.service.productList,
      success: (res) =>{
        wx.hideLoading();
        if (!res.data.code){
          this.setData({
            productList: res.data.data
          })
        }else{
          wx.showToast({
            title: '商品数据加载失败！',
          })
        }
        
      },
      fail: function (err) {
        wx.hideLoading();
        wx.showToast({
          title: '商品数据加载失败！',
        })
      }
    });
  },
  onTapProduct(res) {
    let id = res.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../detail/detail?id=s' + id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})