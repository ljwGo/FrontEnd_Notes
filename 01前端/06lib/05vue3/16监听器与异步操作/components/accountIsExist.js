const accountIsExistComponent = {
  // account输入框的值
  // isSeen提示框是否可见
  // 账户是否存在
  // 提示框的tips
  data(){
    return {
      account: "",
      isSeen: false,
      isExist: false,
      /* 可优化, 下一个属性 */
      // 由于这部分是不变的, 不需要监听(最好不写在data处)
      tips: {
        exist: "用户名已经存在, 请输入其它名字",
        unexist: "用户名可行"
      }
    }
  },
  // 输入框 提示框 外层div
  template: `
    <div>
      <input type="text" v-model="account" @focus="hideTip">
      <span v-if="isSeen">{{ tip }}</span>
    </div>
  `,
  // 防抖
  methods: {
    ajax(){
      if (axios){
        axios({
          url: "http://127.0.0.1:8080/accountIsExist",
          method: "GET",
          params: {
            account: this.account
          }
        }).then(res=>{
          this.isSeen = true;
          this.isExist = res.data;
        }).catch(reason=>{
          console.log("ajax请求失败了!!!")
        })
      }
    },
    hideTip(){
      this.isSeen = false;
    }
  },
  computed: {
    tip(){
      return this.isExist ? this.tips.exist : this.tips.unexist;
    }
  },
  // 监听value的变化, 发送ajax请求, 与服务器数据比对
  watch: {
    account(newValue){
      if (this.debounceAjax){
        this.debounceAjax()
      }else{
        this.ajax()
      }
    }
  },
  created(){
    if (_){
      this.debounceAjax = _.debounce(this.ajax, 500)
    }
  }
}