<template>
  <div>
    <div class="IndexChatPanel" v-for="(c,i) in chatRoomVal" v-if="i===indexNum" :key="i">
      <div class="IndexChatPanelTop">
        <a href="javascript:;" @click="clickValue1"><i class="iconfont icon-icon-arrow-down"></i></a>
        <h1>{{c.name}}</h1>
      </div>
      <div class="IndexChatPanelMain">
        <div :class="v.lx" v-for="(v,i) in c.chattingRecords" :key="i">
          <div :class="v.lx + '-pic'">
            <img :src="'../../../static/images/system/index/'+ v.pic +'.png'" alt="">
          </div>
          <div :class="v.lx +'-msg'">
            {{v.list}}
          </div>
        </div>
      </div>
      <div class="IndexChatPanelInput">
        <input type="text" placeholder="在此输入消息">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["val1", "indexNum", "chatRoomVal"],
    name: "IndexChatPanel",
    methods: {
      clickValue1() {
        this.$emit("chatRoomVal", this.val1 = false);
      },
    }
  }
</script>

<style scoped>
  .IndexChatPanel {
    width: 100%;
    height: 100%;
    background: #212224;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
  }

  .IndexChatPanelTop {
    width: 100%;
    height: 58px;
    box-sizing: border-box;
    border: 1px solid #1a1a1c;
    line-height: 56px;
    background: #282a2c;
    color: #c9d0d5;
    font-size: 22px;
  }

  .IndexChatPanelTop a {
    float: left;
    width: 20px;
    height: 100%;
    color: #c9d0d5;
  }

  .IndexChatPanelTop a i {
    display: block;
    transform: rotate(90deg);
    font-size: 24px;
  }

  .IndexChatPanelTop h1 {
    width: 100%;
    height: 100%;
    font-size: 22px;
    text-align: center;
  }

  .IndexChatPanelMain {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 20px 0;
  }

  .IndexChatPanelMain::-webkit-scrollbar {
    display: none;
  }

  .IndexChatPanelInput {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
  }

  .IndexChatPanelInput input {
    display: block;
    width: 100%;
    height: 40px;
    margin: 10px auto;
    border: none;
    background: #393b3f;
    border-radius: 40px;
    text-indent: 20px;
    font-size: 16px;
    color: #ccc;
  }

  .duifang {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;
  }

  .duifang-pic {
    width: 50px;
    height: 50px;
    float: left;
  }

  .duifang-pic img {
    height: 100%;
    margin: 0 auto;
  }

  .duifang-msg {
    max-width: 250px;
    height: auto;
    float: left;
    box-sizing: border-box;
    padding: 20px;
    background: #0d0e0f;
    white-space: normal;
    word-wrap: break-word;
    margin-left: 15px;
    position: relative;
    border-radius: 10px;
    color: #ccc;
    line-height: 20px;
  }

  .duifang-msg:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-width: 10px 10px 10px 0;
    border-style: solid;
    border-color: transparent #0d0e0f transparent transparent; /*透明 灰 透明 透明 */
    position: absolute;
    top: 9px;
    left: -10px;
  }

  .me {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;
  }

  .me-pic {
    width: 50px;
    height: 50px;
    float: right;
  }

  .me-pic img {
    height: 100%;
    margin: 0 auto;
  }

  .me-msg {
    max-width: 250px;
    height: auto;
    float: right;
    box-sizing: border-box;
    padding: 20px;
    background: #2d2f31;
    white-space: normal;
    word-wrap: break-word;
    margin-right: 15px;
    position: relative;
    border-radius: 10px;
    color: #ccc;
    line-height: 20px;
  }

  .me-msg:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-width: 10px 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent transparent #2d2f31; /*透明 灰 透明 透明 */
    position: absolute;
    top: 9px;
    right: -10px;
  }
</style>
