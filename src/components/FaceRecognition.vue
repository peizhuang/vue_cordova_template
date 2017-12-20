<style lang="less">
  li, ul {
    list-style: none;
  }

  .hidden {
    display: none !important;
  }

  .success {
    color: #67C23A;
  }

  .error {
    color: #F56C6C;
  }

  .face-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: relative;
    background-color: black;
  }

  .mask {
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    z-index: 2;
    height: 100%;
    width: 100%;
    .mask-up, .mask-down {
      flex: 1;
      background-color: rgb(32, 33, 36);
    }
    .mask-info {
      font-size: 1.8em;
      text-align: center;
      padding: 2em;
      color: #eee;
      background-color: black;
    }
  }

  .down-leave-active, .up-leave-active, hidden-leave-active {
    transition: all 1s
  }

  .up-leave-to {
    transform: translateY(-100%);
  }

  .hidden-leave-to {
    opacity: 0;
  }

  .down-leave-to {
    transform: translateY(100%);
  }

  /* ------------------- web -------------------- */

  .web-title {
    padding: 1em;
    color: white;
    background-color: #909399;
  }

  .content {
    display: flex;
    max-width: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 100px;
    }

    .recognition-record {
      position: relative;
      max-width: 680px;
    }

    .recognition-history {
      display: flex;
      box-sizing: border-box;
      flex-flow: column nowrap;
      width: 300px;
      background-color: #ddd;
      padding: .5em;

      .history-content {
        display: flex;
        flex-flow: column nowrap;
        flex: 1;
        margin-bottom: 1em;
        overflow: hidden;
        ul {
          flex: 1;
          overflow: auto;
        }
        .title {
          color: #303133;
          padding-bottom: 1em;
          display: none;
        }
        .item-title {
          color: #606266;
          display: flex;
          flex-flow: row nowrap;
          padding-bottom: .5em;
          display: none;
        }
        .item {
          /* display: flex;
           flex-flow: row nowrap;*/
          color: #202124;
          padding: .5em;
          .name {
            color: #c22515;
            /*font-size: 1.2em;*/
          }
        }
        .status {
          flex: 1;
        }
        .name {
          flex: 2;
        }
        .time {
          flex: 3;
        }
      }
      .action {
        display: flex;
        flex-flow: row;
        justify-content: space-evenly;
        display: none;
      }
    }
  }

  video, #canvas {
    width: 100%;
    height: auto;
  }

  #head, #canvas {
    position: absolute;
    top: 0px;
    left: 0;
  }

  #head {
    display: none;
  }

  /* ------------------- cordova app -------------------- */

  #camera {
    height: 72px;
    width: 72px;
    position: fixed;
    bottom: 1rem;
    right: 5%;
    background: url("../public/assets/image/camera_btn_72_01.png") no-repeat top;
  }

  #revcamera {
    height: 72px;
    width: 72px;
    position: fixed;
    top: 0;
    right: 5%;
    background: url('../public/assets/image/reverse-camera_72_1.png') no-repeat top;
    /* transform: translate(-120%, 0%);
     -webkit-transform: translate(-120%, 0%); */
  }

  .face {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 1px;
    height: 1px;
    border: 1px solid darkorange;
    border-radius: 5px;
    background-color: rgba(255, 69, 0, 0.25);
    display: none;
  }


</style>
<template>
  <div class="face-container">
    <div class="mask" :class="{'hidden': maskHidden}">
      <transition name="up" v-on:after-leave="maskHiddenHandle">
        <div class="mask-up" v-show="!canPlay"></div>
      </transition>
      <transition name="hidden">
        <div class="mask-info" v-show="!canPlay">
          Loading...
        </div>
      </transition>
      <transition name="down">
        <div class="mask-down" v-show="!canPlay"></div>
      </transition>
    </div>
    <div v-if="!isWebview">
      <h2 class="web-title">Erathink 实时人脸识别系统</h2>
      <div class="content">
        <div class="recognition-record" v-loading="recognitioning"
             element-loading-text="人脸识别中..."
             element-loading-background="rgba(0, 0, 0, 0.6)">
          <video id="video" preload autoplay loop muted></video>
          <canvas id="canvas"></canvas>
          <canvas id="head" :width="imgWidth" :height="imgHeight"></canvas>
          <img :src="this.img" alt="">
        </div>
        <div ref="history" class="recognition-history">
          <div class="history-content">
            <li class="title"><h3>历史识别记录</h3></li>
            <!-- <li class="item-title">
                 <span class="status"><h4>状态</h4></span>
                 <span class="name"><h4>姓名</h4></span>
                 <span class="time"><h4>时间</h4></span>
             </li>-->
            <ul ref="historyItems">
              <li class="item" v-for="item in history">
                <span class="name">{{item.user_info}}</span>，欢迎您！
                <!--<span class="status"
                      :class="[item.status === true ? 'success' : 'error']">
                    {{item.status === true ? '成功' : '失败'}}
                </span>
                <span class="name">{{item.status === true ? item.user_info : '无'}}</span>
                <span class="time">{{item.time}}</span>-->
              </li>
            </ul>
          </div>
          <div class="action">
            <Button @click.native="stopRecognition = !stopRecognition" :class="[]">
              {{stopRecognition ? '继续识别' : '停止识别'}}
            </Button>
            <Button @click.native="history = []" type="warning">清除记录</Button>
          </div>
        </div>
      </div>
    </div>
    <div id="controls" v-else>
      <!--<div id="camera"></div>-->
      <div id="revcamera"></div>
      <div id="face0" class="face"></div>
      <div id="face1" class="face"></div>
      <div id="face2" class="face"></div>
      <div id="face3" class="face"></div>
      <div id="face4" class="face"></div>
    </div>
  </div>
</template>
<script>
  import 'tracking/build/tracking-min'
  import 'tracking/build/data/face-min'
  import 'element-ui/lib/theme-chalk/index.css'
  import {MessageBox, Notification, Loading, Button} from 'element-ui';
  export default {
    data () {
      return {
        canPlay: false,
        maskHidden: false,
        img: '',
        imgWidth: 100,
        imgHeight: 100,
        videoHeightRatio: 1,
        videoWidthRatio: 1,

        isWebview: true,

        MAX_FACES: 5,
        faceEls: [],
        enableFaceUpdate: false,
        snapping: false,
        canvas: null,
        ctx: null,
        faceImg: '',
        recognitioning: false,

        stopRecognition: false,
        history: [],
        username: '',
        bdAccessToken: null
      }
    },
    created () {
      //      document.addEventListener('deviceready',init, false);
    },
    mounted () {
      window.addEventListener('orientationchange', this.orientationChange);
      document.addEventListener('deviceready', this.cordovaInit, false)

      this.isWebview = location.href.indexOf('file:') === 0 ? true : false

      this.$nextTick(() => {
        if (!this.isWebview) this.webInit()
      })
    },
    methods: {

      webInit () {
        try {
          console.log('web init')
          var video = document.getElementById('video');
          var canvas = document.getElementById('canvas');
          var head = document.getElementById('head')
          var context = canvas.getContext('2d');
          var headContext = head.getContext('2d');
          var tracker = new tracking.ObjectTracker('face');

          video.oncanplay = () => {
            this.canPlay = true
            var videoStyle = window.getComputedStyle(video)
            video.width = parseInt(videoStyle.width)
            video.height = parseInt(videoStyle.height)
            canvas.width = parseInt(videoStyle.width)
            canvas.height = parseInt(videoStyle.height)
            this.videoWidthRatio = video.videoWidth / video.width
            this.videoHeightRatio = video.videoHeight / video.height
            this.$refs.history.style.height = videoStyle.height
          }
          tracker.setInitialScale(4);
          tracker.setStepSize(2);
          tracker.setEdgesDensity(0.1);
          tracking.track('#video', tracker, {camera: true});
          let timer = null
          tracker.on('track', (event) => {
            if (timer) return
            timer = setTimeout(() => {
              context.clearRect(0, 0, canvas.width, canvas.height);
              event.data.forEach((rect) => {
                this.imgWidth = rect.width
                this.imgHeight = rect.height
                this.$nextTick(() => {
                  headContext.clearRect(0, 0, video.width, video.height);
                  if (this.stopRecognition) return
                  headContext.drawImage(video,
                    rect.x * this.videoWidthRatio < 20 ? 0 : Math.floor(rect.x * this.videoWidthRatio) - 20,
                    rect.y * this.videoHeightRatio < 20 ? 0 : Math.floor(rect.y * this.videoHeightRatio) - 20,
                    Math.floor(rect.width * this.videoWidthRatio) + 20, Math.floor(rect.height * this.videoHeightRatio) + 20,
                    0, 0, rect.width, rect.height);
                  let base64URI = head.toDataURL()
                  if (!this.stopRecognition && this.maskHidden) {
                    this.recognitionFace(base64URI)
                    this.img = base64URI
                  }
                })

                context.strokeStyle = '#a64ceb';
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Helvetica';
                context.fillStyle = "#fff";
                context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
              });
              timer = null
            }, 500)
          });
        } catch (e) {
          alert(e)
        }
      },

      maskHiddenHandle () {
        this.maskHidden = true
      },

      cordovaInit () {
        this.$el.style.background = 'transparent'
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.$nextTick(() => {
          this.cordovaApp()
        })
      },

      cordovaApp () {
        console.log('app init')
        for (let i = 0; i < this.MAX_FACES; i++) {
          this.faceEls.push(document.getElementById('face' + i));
        }

        /* let snap = document.getElementById('camera');
         snap.addEventListener('click', this.snapshot, false); */

        let rev = document.getElementById('revcamera');
        rev.addEventListener('click', this.reverseCamera, false);

        window.ezar.initializeVideoOverlay(
          () => {
            window.ezar.getFrontCamera().start(() => {
              this.canPlay = true
              setTimeout(
                () => {
                  window.ezar.watchFaces(this.onFaces, this.err);
                  this.enableFaceUpdate = true;
                }, 1500)
            }, this.err);
          }, this.err);
      },

      onFaces (faces) {
        let faceCnt, face, faceEl;

        if (this.snapping && this.faceImg) return;

        if (!this.enableFaceUpdate || !faces || faces.length == 0) {
          faceCnt = 0;
        } else {
          faceCnt = Math.min(faces.length, this.MAX_FACES);
        }

        for (let i = 0; i < faceCnt; i++) {
          face = faces[i];
          faceEl = this.faceEls[i];

          faceEl.style.width = (face.right - face.left) + "px";
          faceEl.style.height = (face.bottom - face.top) + "px";
          faceEl.style.left = face.left + "px";
          faceEl.style.top = face.top + "px";
          faceEl.style.display = "block";
        }

        for (let i = faceCnt; i < this.MAX_FACES; i++) {
          let faceEl = this.faceEls[i];
          faceEl.style.display = "none";
        }

        if (faceCnt === 1 && !this.faceImg && !this.recognitioning) {
          this.faceImg = 11
          document.querySelector('#face0').style.display = 'none'
          setTimeout(() => {
            window.ezar.snapshot(
              (base64Img) => {
                base64Img = base64Img.replace('data:image/1', 'data:image/png')
                let img = new Image()

                img.onload = () => {
                  let heightRatio = img.height / window.innerHeight
                  let widthRatio = img.width / window.innerWidth
                  this.canvas.height = parseInt((faces[0].bottom - faces[0].top) * heightRatio)
                  this.canvas.width = parseInt((faces[0].right - faces[0].left) * widthRatio)
                  this.$nextTick(() => {
                    this.ctx.drawImage(img, parseInt(faces[0].left * widthRatio), parseInt(faces[0].top * heightRatio), parseInt((faces[0].right - faces[0].left) * widthRatio), parseInt((faces[0].bottom - faces[0].top) * heightRatio), 0, 0, this.canvas.width, this.canvas.height)
                    let base64URI = this.canvas.toDataURL()
                    this.faceImg = base64URI
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                    this.recognitionFace(base64URI)
                  })
                }

                img.src = base64Img
              },
              (err) => {
                this.showControls(true);
                this.snapping = false;
              },
              {
                "saveToPhotoAlbum": false
              }
            )
          }, 10)
        }
      },

      err (msg) {
        //wrap alert in timeout to make it a macro task
        //android: https://www.chromestatus.com/features/5647113010544640
        setTimeout(
          () => {
            alert("Error: " + msg);
          }, 0);
      },

      orientationChange () {
        this.enableFaceUpdate = false;
        for (var i = 0; i < this.MAX_FACES; i++) {
          this.faceEls[i].style.display = "none";
        }
        setTimeout(() => {
          this.enableFaceUpdate = true;
        }, 2000);
      },

      snapshot () {
        console.log('snapshot');

        this.snapping = true;

        this.showControls(false);

        setTimeout(() => {
          window.ezar.snapshot(
            () => {
              this.showControls(true);
              this.snapping = false;
            },
            (err) => {
              this.showControls(true);
              this.snapping = false;
            },
            {"saveToPhotoAlbum": true});
        }, 10);
      },

      showControls (aBool) {
        let style = aBool ? 'block' : 'none';
        setTimeout(() => {
          document.getElementById('controls').style.display = style;
        }, 10);
      },

      reverseCamera () {
        this.faceImg = ''
        console.log('reverse camera');
        let newCamera =
          window.ezar.getActiveCamera().getPosition() == 'BACK' ?
            window.ezar.getFrontCamera() : window.ezar.getBackCamera();
        newCamera.start();
      },

      base64URItoBlob(base64URI) {
        let byteString = atob(base64URI.split(',')[1]);
        let mimeString = base64URI.split(',')[0].split(':')[1].split(';')[0];
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: mimeString});
      },

      getAccessToken () {
        this.$axios.post('/face/getAccess', null)
          .then((res) => {
            this.bdAccessToken = res.data.access_token
            console.log('access 获取成功，', res)
          })
          .catch(err => {
            MessageBox({
              title: '授权管理',
              message: '对不起，access 获取失败',
              showCancelButton: true,
              confirmButtonText: '重新获取'
            }).then(action => {
              if (action === 'cancel') {
                return
              }
              this.getAccessToken()
            })
          })
      },

      detectFace (base64URI) {
        // todo 检测图片加载动画
        this.$axios.post(`/face/detect`,
          {
            face: base64URI.replace(/data:image\/\S+;base64,/, '')
          })
          .then((res) => {
            if (res) {
              Notification({
                showClose: true,
                message: '验证通过，该图片可以放心使用',
                type: 'success'
              })
            }
          })
          .catch(err => {
            Notification({
              showClose: true,
              message: err.error_msg || '对不起，该图片质量检测未通过，请更换图片!',
              type: 'error'
            })
          })
      },

      recognitionFace (base64URI) {
        if (this.stopRecognition) return
        if (!base64URI) base64URI = this.img
        this.recognitioning = true
        this.$axios.post(`/face/recognition`,
          this.$qs.stringify({
            groups: 'gold',
            face: base64URI.replace(/data:image\/\S+;base64,/, '')
          }))
          .then((res) => {
            if (res) {
              let time = new Date()
              if (res.result && res.result[0] && res.result[0].user_info) {
                this.history.push(Object.assign(res.result[0] || {}, {
                  time: `${time.getHours()}:${(time.getMinutes() < 10 ? '0' : '') + time.getMinutes()}:${(time.getSeconds() < 10 ? '0' : '') + time.getSeconds()}`,
                  status: true
                }))
                this.$nextTick(() => {
                  this.$refs.historyItems.scrollTop = this.$refs.historyItems.scrollHeight
                })
              }
              /* Notification({
               showClose: true,
               message: `人脸识别成功—— ${res.result[0].user_info || '未命名'}`,
               type: 'success'
               })*/
            }
          })
          .catch(() => {
            /*  let time = new Date()
             this.history.push({time: `${time.getHours()}:${(time.getMinutes() < 10 ? '0' : '') + time.getMinutes()}:${(time.getSeconds() < 10 ? '0' : '') + time.getSeconds()}`})
             Notification({
             showClose: true,
             message: '人脸识别失败',
             type: 'error'
             })*/
          })
          .finally(() => {
            this.recognitioning = false
          })
      },

      signFace () {
        // todo 注册人脸加载动画
        this.$axios.post(`/face/add`,
          {
            name: this.username || 'pzxie',
            groups: 'gold',
            face: this.img.replace(/data:image\/\S+;base64,/, '')
          })
          .then((res) => {
            if (res) {
              Notification({
                showClose: true,
                message: '人脸信息注册成功',
                type: 'success'
              })
            }
          })
          .catch(err => {
            Notification({
              showClose: true,
              message: err.error_msg || '对不起，你的人脸注册未通过!',
              type: 'error'
            })
          })
      }
    },
    components: {
      Button
    }
  }
</script>
