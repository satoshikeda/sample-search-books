<template>
  <div class="hello">
    <input type="text" v-model="query" placeholder="foo" />
    <p>{{ error }}</p>
    <button @click="clickSearchButton">search</button>
    <ul>
      <li v-for="book of books">{{ book.volumeInfo.title }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      query: '',
      error: '',
      books: []
    }
  },
  methods: {
    clickSearchButton() {
      if (this.query.length > 20) {
        this.error = 'Plz input 20 characters or less'
        return
      }

      this.error = ''

      axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: this.query
        }
      }).then(res=>{
        console.log(JSON.stringify(res, null, 2))
        this.books = res.data.items
      })
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
