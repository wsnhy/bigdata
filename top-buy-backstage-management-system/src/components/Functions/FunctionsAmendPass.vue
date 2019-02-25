<template>
  <div class="FunctionsAmendPass">
    <h1>账号密码修改</h1>
    <div>
      <h2>请输入新密码:</h2>
      <input type="password"/>
    </div>
    <div>
      <h2>请再输入一次:</h2>
      <input type="password"/>
    </div>
    <div>
      <button>提交</button>
    </div>
    <div>
      <textarea readonly>说明:
        请输入6-16位的密码，可以是字母、数字、特殊字符，特殊字符包括 ! @ # $ % & * - _ +
      </textarea>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FunctionsAmendPass"
  }
</script>

<style scoped>
  .FunctionsAmendPass {
    width: 100%;
    height: 100%;
    padding: 50px;
  }

  .FunctionsAmendPass h1 {
    font-size: 26px;
    line-height: 26px;
    color: #ccc;
    margin-bottom: 50px;
  }

  .FunctionsAmendPass > div {
    overflow: hidden;
    margin-bottom: 30px;
    margin-left: 30px;
  }

  .FunctionsAmendPass > div h2 {
    font-size: 18px;
    line-height: 20px;
    float: left;
    color: #ccc;
  }

  .FunctionsAmendPass > div input {
    font-size: 16px;
    border: none;
    background: #ccc;
    float: left;
    margin-left: 20px;
    text-indent: 10px;
  }

  .FunctionsAmendPass > div button {
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    background: #ccc;
    outline: none;
    cursor: pointer;
  }

  .FunctionsAmendPass > div textarea {
    width: 630px;
    height: 100px;
    border: none;
    resize: none;
    padding: 10px;
    background: #ccc;
    font-size: 18px;
  }
</style>
