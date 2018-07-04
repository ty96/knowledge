<template>
  <div>
    <img class="banner" src="../assets/banner.png" ref="image"/>
    <div class="search">
      <img src="../assets/search.png"/>
      <input v-model="search" placeholder="搜索相关内容" @input="request"/>
    </div>
    <div>
      <router-link
        tag="div"
        class="item"
        v-for="(item, index) in data" :key="index"
        :to="`${item.article_type ? '/list/' : '/article/'}${item.id}?token=${token}`"
      >
        <div class="title">
          <h1>{{item.title}}</h1>
          <p>{{item.description || item.author}}</p>
        </div>
        <img :src="root + item.picture"/>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        data: [],
        root: window.root,
        token: window.token,
        search: ''
      }
    },
    methods: {
      request () {
        fetch(`${window.root}/api/v1/articles/?keyword=${this.search}&token=${window.token}`, {
          method: 'GET',
          credentials: 'include'
        })
          .then((res) => {
            return res.json()
          })
          .then((data)=> {
            this.data = data.body.article_list
            this.shareSettings('工业油必知必会')
          })
      },
      shareSettings (title, image) {
        window.wx.onMenuShareTimeline({
          title: title,
          link: location.href,
          imgUrl: image || this.$refs.image.src
        })
        window.wx.onMenuShareAppMessage({
          title: title,
          desc: '',
          link: location.href,
          imgUrl: image || this.$refs.image.src,
          type: 'link',
          dataUrl: ''
        });
      }
    },
    mounted () {
      this.request()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .banner {
    width: 100%;
    display: block;
  }

  .item {
    width: 100%;
    height: 75px;
    background: #f7f7f7;
    padding-left: 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .item .title {
    margin-top: 10px;
    display: inline-block;
  }

  .title h1 {
    color: #333;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
  }

  .title p {
    color: #999;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item img {
    width: 27%;
    height: 75px;
    float: right;
    display: inline-block;
  }

  .search {
    width: 100%;
    height: 55px;
    position: relative;
    padding: 14px 20px 15px;
    box-sizing: border-box;
    background: #fff;
  }

  .search img {
    width: 16px;
    position: absolute;
    left: 28px;
    top: 17px;
  }

  .search input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    margin: auto;
    height: 26px;
    outline: hidden;
    background: #f2f2f2;
    border-radius: 13px;
    border: hidden;
    padding-left: 32px;
    color: #999999;
  }

  .search input::-webkit-input-placeholder {
    color: #999999;
  }
</style>
