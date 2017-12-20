<style lang="less">
    .cropper-view-box, .cropper-face {
        border-radius: 50%;
    }

    .user-profile-crop {
        background-color: white;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        img {
            max-width: 100%; /* This rule is very important, please do not ignore this! */
        }
    }

</style>

<template>
    <div class="user-profile-crop">
        <img :src="img" alt="" ref="cropImg">
        <div style="position: absolute;bottom: 1em;right: 1em">
            <el-btn color="primary" @click="$emit('cancel-click')">cancel</el-btn>
            <slot></slot>
            <el-btn color="primary" @click="cropAvatar" type="primary">apply</el-btn>
        </div>
    </div>
</template>

<script>
  import '../../../node_modules/cropperjs/dist/cropper.css'
  import Cropper from 'cropperjs'
  import {Button} from 'mint-ui'
  export default {
    mounted () {
      this.initCrop()
    },
    destroyed () {
      this.crop && this.crop.destroy()
    },
    data () {
      return {
        crop: null,
        croppable: false
      }
    },
    props: {
      img: {
        type: String,
        require: true
      }
    },
    methods: {
      initCrop () {
          /* eslint-disable no-new */
        this.crop = new Cropper(this.$refs.cropImg, {
          aspectRatio: 1,
          viewMode: 1,
          ready: () => {
            this.croppable = true
          }
        })
      },
      cropAvatar () {
        let croppedCanvas
        let roundedCanvas
        if (!this.croppable) {
          return
        }
        // Crop
        croppedCanvas = this.crop.getCroppedCanvas()
        // Round
        roundedCanvas = this.getRoundedCanvas(croppedCanvas)
        // Show
        const data = roundedCanvas.toDataURL('image/jpeg', 0.2)
        this.$emit('crop-complete', data)
      },

      getRoundedCanvas (sourceCanvas) {
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d')
        let width = sourceCanvas.width
        let height = sourceCanvas.height
        canvas.width = width
        canvas.height = height
        context.imageSmoothingEnabled = true
        context.drawImage(sourceCanvas, 0, 0, width, height)
        context.globalCompositeOperation = 'destination-in'
        context.beginPath()
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
        context.fill()
        return canvas
      },
      getHeadCanvas (sourceCanvas) {
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d')
        let width = sourceCanvas.width
        let height = sourceCanvas.height
        canvas.width = width
        canvas.height = height
        context.imageSmoothingEnabled = true
        context.drawImage(sourceCanvas, 0, 0, width, height)
        context.globalCompositeOperation = 'destination-in'
        context.beginPath()
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
        context.fill()
        return canvas
      }

        /* getRectCanvas (sourceCanvas) {
         let canvas = document.createElement('canvas')
         let context = canvas.getContext('2d')
         let width = sourceCanvas.width
         let height = sourceCanvas.height
         canvas.width = width
         canvas.height = height
         context.imageSmoothingEnabled = true
         context.drawImage(sourceCanvas, 0, 0, width, height)
         context.globalCompositeOperation = 'destination-in'
         context.beginPath()
         context.rect(0, 0, width, height)
         context.fill()
         return canvas
         } */
    },
    components: {
      elBtn: Button
    },
    watch: {
      img (nurl, ourl) {
        this.crop.replace(nurl)
      }
    }
  }
</script>
