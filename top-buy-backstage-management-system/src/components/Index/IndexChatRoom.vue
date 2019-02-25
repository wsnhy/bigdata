<template>
  <div class="chatroomMain">
    <a href="javascript:;" class="ChatControls" @click="clickValue"></a>
    <div class="chatroomMainSeek">
      <input type="text" placeholder="搜索员工"/>
    </div>
    <ul class="chatroomMainCon">
      <li v-for="(c,i) in chatRoom" :key="i" :data="c" @click="room=true;getIndex(i)">
        <div class="pic">
          <img :src="'../../../static/images/system/index/'+c.pic+'.png'" alt="">
        </div>
        <div class="chatroomMainConInfo">
          <h1>{{c.name}}</h1>
          <h2>{{c.status}}</h2>
        </div>
        <span>{{c.unread}}</span>
      </li>
    </ul>
    <index-chat-panel
      v-if="room"
      v-on:chatRoomVal="chatValBtn1($event)"
      :val1="IndexChatRoomBtn1"
      :indexNum="this.num"
      :chatRoomVal="chatRoom"
    ></index-chat-panel>
  </div>
</template>

<script>
  import IndexChatPanel from "./IndexChatPanel";

  export default {
    components: {IndexChatPanel},
    props: ["val", "chatRoom"],
    name: "IndexChatRoom",
    data() {
      return {
        room: false,
        num: 0
      }
    },
    methods: {
      clickValue() {
        this.$emit("chatRoomVal", this.val = !this.val);
      },
      chatValBtn1(msg) {
        this.room = msg;
      },
      getIndex(index) {
        this.num = index;
      }
    }
  }
</script>

<style scoped>

  .chatroomMain {
    width: 350px;
    height: 100%;
    background: #282a2c;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    z-index: 999999;
  }

  .ChatControls {
    position: absolute;
    top: 150px;
    left: -36px;
    display: block;
    width: 36px;
    height: 131px;
    background: url(../../../static/images/system/index/ChatControls.png) no-repeat top left;

  }

  .chatroomMainSeek {
    width: 100%;
    height: 75px;
    border-bottom: 1px solid #1a1a1c;
    box-sizing: border-box;
    padding: 16px 15px 15px;
  }

  .chatroomMainSeek input {
    width: 100%;
    height: 100%;
    display: block;
    border: 1px solid #1a1a1c;
    background: #323437;
    border-radius: 10px;
    color: #aaaeb3;
    font-size: 14px;
    text-indent: 20px;
  }

  .chatroomMainCon {
    flex: 1;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .chatroomMainCon::-webkit-scrollbar {
    display: none;
  }

  .chatroomMainCon li {
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #1a1a1c;
    line-height: 80px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .chatroomMainCon li .pic {
    width: 50px;
    height: 50px;
    padding-top: 15px;
    padding-right: 10px;
    float: left;
  }

  .chatroomMainCon li .pic img {
    height: 50px;
    margin: 0 auto;
    max-width: 50px;
  }

  .chatroomMainConInfo {
    float: left;
    overflow: hidden;
    padding-top: 15px;
  }

  .chatroomMainConInfo h1 {
    font-size: 18px;
    line-height: 22px;
    color: #c9d0d5;
  }

  .chatroomMainConInfo h2 {
    font-size: 16px;
    line-height: 22px;
    color: #24b8e9;
  }

  .chatroomMainCon li span {
    float: right;
    width: 25px;
    height: 25px;
    background: #1dc4e9;
    color: #151156;
    border-radius: 50%;
    line-height: 25px;
    text-align: center;
    margin-top: 22.5px;
  }
</style>
