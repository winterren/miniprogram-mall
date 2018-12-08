const qcloud = require('../../vendor/wafer2-client-sdk/index.js');
const config = require('../../config.js');
// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: "未登录",
      avatarUrl: "", // 头像 URL 地址
    }, // 虚拟数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo: userInfo
        })
      },
      error: () => { }
    })
    qcloud.setLoginUrl(config.service.loginUrl);
    qcloud.login({
      success: res=>{
        console.log('suc');
        console.log(res);
      },
      fail: res=>{
        console.log('fail');
        console.log(res);
      }
    })
    
  },
  checkSession({ success, error }) {
    wx.checkSession({
      success: () => {
        this.getUserInfo({ success, error })
      },
      fail: () => {
        error && error()
      }
    })
  },
  doCloudLogin(suc,err){
    qcloud.login({
      success: res=>{
        if(res){
          let userInfo =res;
          suc && suc({
            userInfo
          })
        }else{
          // 如不是首次登陆，不会返回用户信息，请求用户信息借口获取
          getUserInfo({success,error})
        }
      }
    })
  },
  getUserInfo({suc,err}){
    qcloud.request({
      url:config.service.requestUrl,
      login:true,
      success:result=>{
        let data = result.data
        if (!data.data){
          let userInfo = data.data
          suc && suc({
            userInfo
          }) 
        } else {
          err && err
        }
      },
      fail:()=>{
        err&&err()
      }
    })
  },
  checkSession({ success, error }) {
    wx.checkSession({
      success: () => {
        this.getUserInfo({ success, error })
      },
      fail: () => {
        error && error()
      }
    })
  },
  onTapLogin: function () {
    qcloud.setLoginUrl(config.service.loginUrl)
    qcloud.login({
      success: result => {
        console.log('success')
        console.log(result)
        this.setData({
          userInfo: result
        })
      },
      fail: result => {
        console.log('fail')
        console.log(result)
      }
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