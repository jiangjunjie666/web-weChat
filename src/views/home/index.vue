<template>
  <!-- 微信界面 -->
  <div class="box">
    <div class="chat">
      <Left></Left>
      <!-- /// -->
      <div class="center">
        <div class="search">
          <el-input style="width: 220px; margin: 35px 0 0 20px; background-color: pink" v-model="search" class="w-50 m-2" placeholder="搜索" :prefix-icon="Search" />
          <el-button :icon="Plus" style="width: 35px; margin: 35px 0 0 10px" @click="getPlus" :disabled="search == ''"></el-button>
        </div>
        <!--好友列表 -->
        <el-scrollbar height="510px">
          <Firend v-for="(item, index) in userStore.userFirendsList" :key="item.id" :info="item" :index="index" :modelValue="activeIndex" @update:activeIndex="activeFirend"></Firend>
        </el-scrollbar>
        <!-- 好友列表 -->
      </div>
      <div class="right">
        <div class="head">
          <p>朋友的名字</p>
        </div>
        <div class="liao">
          <el-scrollbar height="350px">
            <div v-for="(component, index) in filteredComponents" :key="index">
              <component :is="component" :message="chatMessage[index]"></component>
            </div>
          </el-scrollbar>
          <UserCard :data="addFirend" :name="search" v-if="openCard" @open="opencard"></UserCard>
        </div>
        <div class="text">
          <div class="icon">
            <ul class="icon_left">
              <li>
                <img src="@/assets/笑脸 (2).png" alt="" />
              </li>
              <li>
                <img src="@/assets/文件夹.png" alt="" />
              </li>
              <li><img src="@/assets/剪刀.png" alt="" /></li>
              <li><img src="@/assets/信息.png" alt="" /></li>
            </ul>
            <ul class="icon_right">
              <li><img src="@/assets/电话.png" alt="" /></li>
              <li><img src="@/assets/摄像头.png" alt="" /></li>
            </ul>
          </div>
          <div class="cen">
            <input type="text" />
          </div>
          <el-button type="primary" class="btn">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import Firend from '@/components/firend/index.vue'
import ChatFir from '@/components/chat/firend.vue'
import ChatMy from '@/components/chat/my.vue'
import { Search, Plus } from '@element-plus/icons-vue'
import Left from '@/components/home/left.vue'
import UserCard from '@/components/userCard/index.vue'
import useUserStore from '@/store/modules/user.js'
import { reqGetUserInfo, reqGetChatRecord } from '@/api/user.js'
import { ElMessage } from 'element-plus'
let userStore = useUserStore()
let search = ref('')
let addFirend = ref({})
let openCard = ref(false)
let activeIndex = ref(0)
let chatMessage = ref([])
//从服务器那边拿到聊天的数据

//计算出渲染的聊天记录数据
const filteredComponents = computed(() => {
  return chatMessage.value.flatMap((message) => {
    if (message.chat_username === JSON.parse(localStorage.getItem('userinfo')).username) {
      return [ChatMy]
    } else if (message.chat_username === 'lyc') {
      return [ChatFir]
    } else {
      return []
    }
  })
})
//拿到要查找的用户信息
const getPlus = async () => {
  let res = await reqGetUserInfo(search.value)
  if (res.code !== 1) {
    ElMessage({
      message: res.message,
      type: 'error'
    })
  }
  addFirend.value = res.data
  openCard.value = true
}
//打开
const opencard = (value) => {
  openCard.value = value
}
//点击某个好友时
const activeFirend = (arr) => {
  //修改高亮值
  console.log(arr)
  activeIndex.value = arr[0]
  //修改聊天记录
  getChat(arr[1])
}
//获取与好友的聊天记录
const getChat = async (firendId = JSON.parse(localStorage.getItem('userFirends'))[0].id) => {
  //需要传入自己的id，好友的id
  let userId = JSON.parse(localStorage.getItem('userinfo')).id
  let res = await reqGetChatRecord(userId, firendId)
  if (res.code !== 1) {
    ElMessage({
      message: res.message,
      type: 'error'
    })
  }
  chatMessage.value = res.data
}
//组件挂载
onMounted(() => {
  getChat()
})
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #f8f3f7, #bdceeb);
  display: flex;
  justify-content: center;
  align-items: center;
  .chat {
    width: 1000px;
    height: 600px;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    // padding: 1px;

    .center {
      width: 300px;
      height: 100%;
      background-color: pink;
      .search {
        width: 100%;
        height: 90px;
        background-color: #f7f7f7;
      }
    }
    .right {
      width: 620px;
      height: 100%;

      .head {
        height: 90px;
        border-top-right-radius: 20px;
        width: 100%;
        background-color: #fffefe;
        border-bottom: 1px solid rgb(236, 232, 232);
        p {
          padding: 38px 0 0 20px;
          font-size: 20px;
        }
      }
      .liao {
        width: 100%;
        height: 350px;
        border-bottom: 1px solid rgb(230, 228, 228);
        border-radius: 0%;
        background-color: #f5f5f5;
        position: relative;
      }
      .text {
        .icon {
          width: 100%;
          height: 30px;
          // background-color: #bdceeb;
          display: flex;
          justify-content: space-between;
          .icon_left {
            display: flex;
            li {
              padding-left: 20px;
              padding-top: 5px;
            }
          }
          .icon_right {
            display: flex;
            li {
              padding-right: 20px;
              padding-top: 5px;
            }
          }
        }
        .cen {
          width: 100%;
          height: 80px;
          // background-color: #2e2e2e;
          input {
            width: 90%;
            height: 90%;
            margin: 2px 0 0 35px;
            padding-left: 10px;
            // 去除输入kuan的样式
            outline: none;
            border: none;
            color: #222121;
            font-size: 20px;
            // word-wrap: break-word; /* CSS2 */
            overflow-wrap: break-word; /* CSS3 */
          }
        }
        .btn {
          padding: 0 30px 0 30px;
          margin: 0px 0px 0 500px;
          background-color: #d2d2d2;
          border: #d2d2d2;
          color: #06ae56;
          font-size: 15px;
        }
      }
    }
  }
}
</style>
