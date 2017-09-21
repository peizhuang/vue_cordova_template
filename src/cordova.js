/**
 * Created by san on 2017/9/15.
 */
const event = {
  /**
   * 设置cordova 加载完毕事件
   * @param callback function 加载完成回调
   */
  onReady (callback) {
    document.addEventListener('deviceready', () => {
      window.cordova_ready = true
      if (callback) {
        if (typeof callback !== 'function') console.error('onDeviceReady callback is not a function')
        else callback()
      }
      if (window.cordovaLog) console.log('deviceready')
    }, false)
  },

  /**
   * 添加 应用回到后台 时触发
   * @param callback function 回调方法
   */
  onPause (callback) {
    document.addEventListener('pause', () => {
      if (callback) {
        if (typeof callback !== 'function') console.error('pause callback is not a function')
        else callback()
      }
      if (window.cordovaLog) console.log('app pause')
    }, false)
  },

  /**
   * 添加 应用恢复 事件
   * @param callback function 回调方法
   */
  onResume (callback) {
    document.addEventListener('resume', () => {
      if (callback) {
        if (typeof callback !== 'function') console.error('resume callback is not a function')
        else callback()
      }
      if (window.cordovaLog) console.log('app resume')
    }, false)
  },

  /**
   * 添加 后退 按钮事件
   * @param callback
   * platform: android、windows
   */
  onBackKeyDown (callback) {
    document.addEventListener('backbutton', () => {
      if (callback) {
        if (typeof callback !== 'function') console.error('backbutton callback is not a function')
        else callback()
      }
      if (window.cordovaLog) console.log('back button tap')
    }, false)
  },

  /**
   * 添加 菜单 按钮事件
   * @param callback
   * platform: android
   */
  onMenuKeyDown (callback) {
    document.addEventListener('menubutton', () => {
      if (callback) {
        if (typeof callback !== 'function') console.error('menubutton callback is not a function')
        else callback()
      }
      if (window.cordovaLog) console.log('menu button tap')
    }, false)
  },

  /**
   * 添加 搜索 按钮事件
   * @param callback
   * platform: android
   */
  onSearchKeyDown (callback) {
    document.addEventListener('searchbutton', () => {
      if (callback) {
        if (typeof callback !== 'function') console.error('searchbutton callback is not a function')
        else callback()
      }
      if (window.cordovaLog) console.log('search button tap')
    }, false)
  },

  /**
   * 添加 音量减 按钮事件
   * @param callback
   * platform: android
   */
  onVolumeDownKeyDown (callback) {
    document.addEventListener('volumedownbutton', () => {
      if (callback) {
        if (typeof callback !== 'function') console.error('volumedownbutton callback is not a function')
        else callback()
      }
      if (window.cordovaLog) console.log('volumedown button tap')
    }, false)
  },

  /**
   * 添加 音量加 按钮事件
   * @param callback
   * platform: android
   */
  onVolumeUpKeyDown (callback) {
    document.addEventListener('volumeupbutton', () => {
      if (callback) {
        if (typeof callback !== 'function') console.error('volumeupbutton callback is not a function')
        else callback()
      }
      if (window.cordovaLog) console.log('volumeup button tap')
    }, false)
  }
}

export default {
  event
}
