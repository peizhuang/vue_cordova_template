(function () {
  function getDeviceObjectForPreview () {
    var rowVlaues = window.location.search.substring(1).split('&')
    var values = {}
    var device = { platform: '' }

    if (rowVlaues) {
      for (var key in rowVlaues) {
        var tmp = rowVlaues[key].split('=')
        values[tmp[0]] = decodeURIComponent(tmp[1])
      }
      device.platform = values.platform
    }

    return device
  }

  if (location && typeof location.href === 'string' && /^https:\/\/preview-.+monaca\.(local||mobi)/.test(location.href)) {
    window.device = getDeviceObjectForPreview()
  }

  if ((navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/iPhone|iPad|iPod/i))) {
    if (typeof location.href === 'string') {
      var relativePath = location.href.split('/www')[1]
      var paths = relativePath.split('/')
      var cordovaJsUrl = ''
      for (var i = 0; i < paths.length - 2; i++) {
        cordovaJsUrl += '../'
      }
      document.write('<script src="' + cordovaJsUrl + 'cordova.js' + '"></script>')
    }
  } else if ((navigator.userAgent.match(/MSIE\s10.0/) && navigator.userAgent.match(/Windows\sNT\s6.2/)) || navigator.userAgent.match(/MSAppHost/)) {
    var elm = document.createElement('script')
    elm.setAttribute('src', 'cordova.js')
    document.getElementsByTagName('head')[0].appendChild(elm)
  };
})()
