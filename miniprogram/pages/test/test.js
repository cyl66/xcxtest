//index.js
const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
    resData: "",
    imgUrl: ""
  },

  onAddData: function() {
    db.collection("foodball")
      .add({
        data: {
          name: "陈运林",
          age: 100,
          date: new Date("2018-09-12"),
          like: ["梅西", "C罗", "恒大"],
          location: new db.Geo.Point(80, 80)
        }
      })
      .then(res => {
        console.log(res);
        wx.showToast({
          title: "新增数据成功"
        });
      })
      .catch(err => {
        console.log("新增数据失败：" + err);
        wx.showToast({
          title: "新增数据失败"
        });
      });
  },

  onGetData: function() {
    db.collection("foodball")
      .get()
      .then(res => {
        console.log(res);
        wx.showToast({
          title: "读取数据成功"
        });
        this.setData({
          resData: JSON.stringify(res.data, null, 8)
        });
      })
      .catch(err => {
        console.log("读取数据失败：" + err);
        wx.showToast({
          title: "读取数据失败"
        });
      });
  },

  onQueryData: function() {
    const _ = db.command;
    db.collection("foodball")
      .where({
        age: _.gt(24)
      })
      .get()
      .then(res => {
        console.log(res);
        wx.showToast({
          title: "查询数据成功"
        });
        this.setData({
          resData: JSON.stringify(res.data, null, 8)
        });
      })
      .catch(err => {
        console.log("查询数据失败：" + err);
        wx.showToast({
          title: "查询数据失败"
        });
      });
  },

  onUpdataData: function() {
    db.collection("foodball")
      .doc("W5is6UM76sQH94Gr")
      .update({
        data: {
          age: 888
        }
      })
      .then(res => {
        console.log(res);
        console.log("成功更新" + res.stats.updated + "条数据");
        wx.showToast({
          title: "更新数据成功"
        });
      })
      .catch(err => {
        console.log("更新数据失败：" + err);
        wx.showToast({
          title: "更新数据失败"
        });
      });
  },

  onRemoveData: function() {
    db.collection("foodball")
      .doc("W5is6UM76sQH94Gr")
      .remove()
      .then(res => {
        console.log(res);
        console.log("成功删除" + res.stats.removed + "条数据");
        wx.showToast({
          title: "删除数据成功"
        });
      })
      .catch(err => {
        console.log("删除数据失败：" + err);
        wx.showToast({
          title: "删除数据失败"
        });
      });
  },

  chooseImage: function() {
    wx.chooseImage({
      success: res => {
        console.log(res.tempFilePaths);
        if (res.tempFilePaths[0]) {
          // this.setData({
          //   imgUrl: res.tempFilePaths[0]
          // });
          wx.cloud.uploadFile({
            cloudPath: "mememe2.png",
            filePath: res.tempFilePaths[0],
            success: res => {
              console.log(res.fileID);
              this.setData({
                imgUrl: res.fileID
              });
            },
            fail: err => {
              console.log(err);
            }
          });
        }
      }
    });
  },

  downloadFile: function() {
    wx.cloud.downloadFile({
      fileID: "cloud://cyl-f6382e.c7c2-cyl-f6382e/me.png",
      success: res => {
        console.log(res);
        console.log(res.tempFilePath);
      }
    });
  },

  useCloudFun: function() {
    wx.cloud.callFunction({
      name: 'add',
      data: {
        a: 100,
        b: 500
      }
    })
    .then(res => {
      console.log(res.result)
    })
    .catch( err => {
      console.log(err)
    }
    )
  }
});
