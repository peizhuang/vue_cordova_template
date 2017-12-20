<style lang="less">
  @color: #0c0e19;
  @bgColor: white;
  @cameraColor: black;
  @successColor: #67C23A;
  @infoColor: #909399;
  li {
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
    background-color: @bgColor;
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
      text-align: center;
      padding: 1rem;
      color: #eee;
      background-color: black;
    }
  }

  .down-leave-active, .up-leave-active, hidden-leave-active {
    transition: all .8s
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

  .content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    & > div, & > header {
      z-index: 2;
      background-color: white;
    }
    .content-header {
      background-color: white;
      color: @color;
      display: flex;
      flex-flow: row nowrap;
      min-height: 2.5rem;
      li {
        padding: .6rem;
      }
      .header-left {
        text-align: left;
        flex: 1;
      }
      .header-center {
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 3;
      }
      .header-right {
        text-align: right;
        flex: 1;
      }
    }
    .preview-img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      height: 100vh;
      width: 100vw;
      text-align: center;
      background-color: black;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .camera-view {
      height: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      background-color: @cameraColor;
    }

    .action-group {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .take-groups {
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        .item {
          flex: 1;
          text-align: center;
        }
      }
      .take-groups {
        .from-camera {
          display: inline-block;
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          box-shadow: 0 0 0.2rem 0.8rem #a4a4a4 inset;
          &:active {
            box-shadow: 0 0 0.2rem 1rem #808080 inset;
          }
        }
        .from-album {
          display: inline-block;
          line-height: 3rem;
          width: 3rem;
          height: 3rem;
          background-color: #ddd;
          border-radius: 50%;
          color: white;
          &:active {
            background-color: #bababa;
          }
        }
      }

      .confirm-groups {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        .user-info {
          flex: 1;
        }
        .btns {
          display: flex;
          overflow: hidden;
          .item {
            flex: 1;
            text-align: center;
            padding: .8rem;
          }
          .apply {
            color: @successColor;
            border-bottom: 2px solid @successColor;
          }
          .cancel {
            color: @infoColor;
            border-bottom: 2px solid @infoColor;
          }
        }
      }

    }
  }


</style>
<template>
  <div class="face-container">
    <div class="mask" :class="{'hidden': maskHidden}">
      <transition name="up" v-on:after-leave="maskHiddenHandle">
        <div class="mask-up" v-show="!initComplete"></div>
      </transition>
      <transition name="hidden">
        <div class="mask-info" v-show="!initComplete">
          Loading...
        </div>
      </transition>
      <transition name="down">
        <div class="mask-down" v-show="!initComplete"></div>
      </transition>
    </div>

    <div class="content">
      <header class="content-header">
        <li class="header-left">
          <font-awesome-icon icon="angle-left"/>
          返回
        </li>
        <li class="header-center">选择图片</li>
        <li class="header-right"></li>
      </header>
      <div class="preview-img" :class="{'hidden': !previewImg}">
        <img :src="base64Img" alt="预览图片">
      </div>
      <div class="camera-view">

      </div>
      <div ref="actions" class="action-group">
        <!--<Field class="item" label="用户信息" placeholder="请输入用户信息" v-model="username"></Field>-->
        <!--<my-button class="item" type="primary" @click.native="generateInput" size="large">选择图片</my-button>-->
        <!--  <my-button class="item" type="primary" :disabled="!customerImg" @click.native="detectFace(base64Img)"
                     size="large">图片检测
          </my-button>
          <my-button class="item" type="primary" :disabled="!customerImg || !username" @click.native="signFace"
                     size="large">
            注册人脸
          </my-button>-->
        <div class="take-groups hidden">
          <div class="item empty"></div>
          <div class="item">
            <div class="from-camera"></div>
          </div>
          <div class="item">
            <div class="from-album">
              <font-awesome-icon icon="images" size="lg"/>
            </div>
          </div>
        </div>
        <div class="confirm-groups">
          <Field class="user-info" label="用户信息" placeholder="请输入用户信息"
                 :attr="{ maxlength: 16 }" v-model="username"></Field>
          <div class="btns">
            <div class="item cancel">取消</div>
            <div class="item apply">注册</div>
          </div>
        </div>
      </div>
      <c-crop :img="sourceImg" v-if="sourceImg" @crop-complete="cropComplete"
              @cancel-click="cropCancel"></c-crop>
    </div>
  </div>
</template>
<script>
  import 'mint-ui/lib/style.css'
  import {MessageBox, Header, Toast, Indicator, Button, Field} from 'mint-ui'
  import img from '../assets/head.png'
  import CCrop from './common/CCrop.vue'
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  export default {
    data () {
      return {
        initComplete: false,
        maskHidden: false,
        closeNotice: false,
        sourceImg: '',
        base64Img: img,
        previewImg: '',

        input: null,

        username: '',
        bdAccessToken: null
      }
    },
    computed: {
      customerImg () {
        return this.base64Img !== img
      }
    },
    created () {
    },
    mounted () {
      window.addEventListener('orientationchange', this.orientationChange)
      location.href.indexOf('file:') === 0 ? document.addEventListener('deviceready', this.cordovaInit, false) : this.initComplete = true
    },
    methods: {

      maskHiddenHandle () {
        this.maskHidden = true
      },

      cordovaInit () {
        this.initComplete = true
      },

      orientationChange () {
      },

      generateInput () {
        if (this.input) {
          this.input.click()
          return
        }
        let input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.style.display = 'none'
        input.setAttribute('accept', 'image/jpeg, image/png, image/jpg')
        this.$refs.actions.appendChild(input)
        input.addEventListener('change', this.openAlbumH5)
        input.click()
        this.input = input
      },

      openAlbumH5 (event) {
        let input = event.target
        if (input.files && input.files[0]) {
          this.sourceImg = (window.URL) ? window.URL.createObjectURL(input.files[0]) : window.webkitURL.createObjectURL(input.files[0])
        }
        this.input.value = ''
      },

      cropCancel () {
        this.sourceImg = ''
      },

      cropComplete (src) {
        this.base64Img = src
        this.sourceImg = ''
      },

      getAccessToken () {
        this.$axios.post('/face/getAccess', null)
          .then((res) => {
            this.bdAccessToken = res.data.access_token
            console.log('access 获取成功，', res)
          })
          .catch(() => {
            MessageBox({
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
        Indicator.open({
          text: '正在检测人脸质量...',
          spinnerType: 'fading-circle'
        })
        this.$axios.post(`/face/detect`,
          {
            face: base64URI.replace(/data:image\/\S+;base64,/, '')
          })
          .then((res) => {
            if (res) {
              Toast({
                message: '验证通过，该图片可以放心使用',
                duration: 1500,
                iconClass: 'fa fa-check success'
              })
            }
            Indicator.close()
          })
          .catch(err => {
            Indicator.close()
            MessageBox({
              message: err.error_msg || '对不起，该图片质量检测未通过，请更换图片!',
              showCancelButton: false,
              confirmButtonText: '确定'
            }).then(action => {
              /*  if (action === 'cancel') {
               return
               } */
            })
          })
      },

      recognitionFace (base64URI) {
        if (!base64URI) base64URI = this.base64Img
        this.recognitioning = true
        Indicator.open({
          text: '识别中...',
          spinnerType: 'fading-circle'
        })
        this.$axios.post(`/face/recognition`,
          this.$qs.stringify({
            groups: 'gold',
            face: base64URI.replace(/data:image\/\S+;base64,/, '')
          }))
          .then((res) => {
            if (res) {
              let time = new Date()
              if (res.result) {
                this.history.push(Object.assign(res.result[0] || {}, {
                  time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
                  status: true
                }))
              }
              Toast({
                message: `人脸识别成功`,
                iconClass: 'fa fa-check success'
              })
            }
            this.recognitioning = false
            Indicator.close()
          })
          .catch(err => {
            let time = new Date()
            this.history.push({time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`})
            Indicator.close()
            MessageBox({
              message: err.error_msg || '对不起，你的人脸识别未通过!',
              showCancelButton: true,
              confirmButtonText: '重新识别'
            }).then(action => {
              if (action === 'cancel') {
                this.recognitioning = false
                return
              }
              this.base64Img = ''
              this.faceImg = ''
              this.recognitioning = false
            })
          })
      },

      signFace () {
        Indicator.open({
          text: '正在注册人脸信息...',
          spinnerType: 'fading-circle'
        })
        this.$axios.post(`/face/add`,
          {
            name: this.username || 'pzxie',
            groups: 'gold',
            face: this.base64Img.replace(/data:image\/\S+;base64,/, '')
          })
          .then((res) => {
            if (res) {
              Toast({
                message: '恭喜您，人脸注册成功',
                iconClass: 'fa fa-check success'
              })
            }
            Indicator.close()
          })
          .catch(err => {
            Indicator.close()
            MessageBox({
              message: err.error_msg || '对不起，你的人脸注册未通过!',
              showCancelButton: true,
              confirmButtonText: '重新注册'
            }).then(action => {
              if (action === 'cancel') {
                return
              }
              this.signFace()
            })
          })
      }

    },
    components: {
      'myButton': Button,
      Field,
      CCrop,
      myHeader: Header,
      FontAwesomeIcon
    }
  }
</script>
