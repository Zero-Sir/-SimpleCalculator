// pages/cal/cal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenData: "0",
    id0: "0",
    id1: "1",
    id2: "2",
    id3: "3",
    id4: "4",
    id5: "5",
    id6: "6",
    id7: "7",
    id8: "8",
    id9: "9",
    iddot: '.',
    idclear: 'clear',
    idback: 'back',
    idcpl: '%',
    iddev: '÷',
    idmul: '*',
    idsub: '-',
    idadd: '+',
    idequal: 'equal',
    oper1: "",  // 操作数1
    //oper2: "",   // 操作数2没用到
    op: "",   // 操作符
    logs: []    //记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  operation: function (event) {
    var id = event.target.id;
    var data = this.data.screenData;
    if (!isNaN(id)) {    // 数字
      if (data == "0") {
        data = id
      } /*else if (data == "-0") {
        this.setData({ "screenData": data })
      } */else {
        data += id
      }
    }else{    // 非数字
      switch (id) {
        case this.data.idback:  // 退格←
          //if (data == "0"){ return;}
          data = data.substring(0, data.length - 1);
          var oper = Number(data);
          if (data == "") {
            data = "0";
          } else if (this.data.op != "" && oper != NaN) {
            this.setData({ "oper1": "", "op": "" });
          }
          break;
        case this.data.idclear:   // 清空
          data = "0";
          this.setData({ "oper1": "", "op": "" });
          break;
        case this.data.iddot:   // 小数点
          if (this.data.oper1 == "" && data.indexOf(".") != -1) {  //非法输入 .
            break;
          } else if (this.data.oper1 != "") {
            temp_oper2 = data.substring(data.indexOf(this.data.op), data.length - 1)
            if (temp_oper2.indexOf(".") != -1 || temp_oper2.length == 0) {   // 非法输入
              break;
            }
          }
          data += id;
          break;
        case this.data.idsub:
          if (data == "0" || data == "－") {
            data = id
          } else if (this.data.op != "") {
            data += id
          } else {
            this.setData({ "oper1": Number(data), "op": id });
            data += id
          }
          break;
        case this.data.idadd:
        case this.data.idcpl:
        case this.data.iddev:
        case this.data.idmul:   // 取余、除法、乘法:第一个操作数都可以为0
          if (this.data.op == "") {   //已经输入操作符不可再输入
            this.setData({ "oper1": Number(data), "op": id });
            data += id;
          }
          break;
        case this.data.idequal:
          if (this.data.op != "") {
            if (data.length == data.indexOf(this.data.op) + 1) {   //无第二个操作数
              break;
            }
            var oper2 = Number(data.substring(data.indexOf(this.data.op) + 1, data.length))
            var res = Number(this.data.oper1);
            console.log(res + this.data.op + oper2);
            switch (this.data.op) {
              case this.data.idadd: res += oper2;
                break;
              case this.data.idsub: res -= oper2;
                break;
              case this.data.idcpl: res %= oper2;
                break;
              case this.data.iddev: if (oper2 == 0) { return; }
                res /= oper2;
                break;
              case this.data.idmul: res *= oper2;
                break;
            }
            //存储历史记录
            this.data.logs.push(data + "=" + res);
            wx.setStorageSync("calclogs", this.data.logs);

            data = String(res)
            this.setData({ "oper1": "", "op": "" });
          }
      };
    }
    this.setData({ "screenData": data })
  },

  history: function() {
    wx.navigateTo({
      url: '../history/history'
    })
  }
})