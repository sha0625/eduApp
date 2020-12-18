<template>
  <form @submit.prevent class="p-10">
    <div class="form-group">
      <!-- <label for="content">留言</label> -->
      <textarea v-model="msg.content" id="content" required
        class="form-control" style="width:300px" rows="5" placeholder="请输入留言信息..."
      ></textarea>
    </div>
    <div class="clearfix">
      <div class="pull-right">
        <span v-show="allowToSubmit">
          <slot name="opt"><!-- 操作按钮插槽 --></slot>
        </span>
        <span v-show="!allowToSubmit">
          <button disabled>
            <i class="fa fa-pencil-square-o m-r-5"></i>
            请填写内容
          </button>
        </span>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  props: {
    msg: { type: Object, required: true, twoWay: true }
  },
  computed: {
    allowToSubmit () {
      let { content } = this.msg
      return  content
    }
  }
}
</script>
<style>
.p-10 {
  padding: 10px;
}
</style>
