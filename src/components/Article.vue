<template>
  <div>
    <h1 class="title">{{data.title}}</h1>
    <img class="banner" :src="root + data.picture"/>
    <div class="content" ref="content"></div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        data: {},
        root: window.root,
        token: window.token,
        aid: this.$route.params.id
      }
    },
    methods: {
      request () {
        fetch(`${window.root}/api/v1/article/${this.aid}/?token=${window.token}`, {
          method: 'GET',
          credentials: 'include'
        })
          .then((res) => {
            return res.json()
          })
          .then((data)=> {
            this.data = data.body.article
            this.$refs.content.innerHTML = this.data.content
          })
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
    margin: 10px auto;
  }

  .title {
    font-size: 24px;
    padding: 10px;
  }

  .content {
    padding: 10px;
  }

</style>
