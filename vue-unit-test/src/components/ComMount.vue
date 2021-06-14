<template>
  <div class="mount">
    <span>哈哈哈</span>
    <p class="msg">{{ msg }}</p>
    <h4 id="p-text" class="p-ele" style="color: red;">你好</h4>
    <p class="user-info">姓名：{{ name }} | 年龄：{{ age }}</p>
  </div>
</template>
<script>
export default {
  props: ['name', 'age'],
  data() {
    return {
      msg: 'hello, test'
    }
  }
}
</script>
