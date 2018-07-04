<template>
  <div id="app">
    <router-view/>
    <div class="area">
      <p>{{area}}</p>
    </div>
  </div>
</template>

<script>
import 'whatwg-fetch'
export default {
  name: 'App',
  created () {
    window.token = location.href.split('token=')[1]
    //  window.root = 'http://oo.chafanbao.com'
    window.root = `http://${location.host}`
    if (!window.token) {
      alert('站点信息缺失')
    }
  },
  methods: {
    request () {
      fetch(`${window.root}/api/v1/area/?token=${window.token}`, {
        method: 'GET',
        credentials: 'include'
      })
        .then((res) => {
          return res.json()
        })
        .then((data)=> {
          this.area = data.body.area.name
        })
    }
  },
  data () {
    return {
      area: ''
    }
  },
  mounted () {
    this.request()
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }

  .area {
    text-align: center;
    width: 100%;
    margin: 65px auto 20px;
  }

  .area p {
    font-size: 12px;
    color: #ccc;
  }
</style>
