<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
      @onDestroyed="handleDestroyed"
      @onFocus="handleFocus"
      @onBlur="handleBlur"
      @customAlert="customAlert"
      @customPaste="customPaste"
    />
  </div>
</template>
<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { apiGetArticleItem } from '@src/api/list'
export default {
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref("<p>hello</p>");

    // 模拟 ajax 异步获取内容
    onMounted(() => {      
      getArticle()
    });
    async function getArticle(){
      try{
        const { data } = await apiGetArticleItem({id: '8e0d38a5a9b240bc84e2ee7b5da64ce2'})                
        valueHtml.value = data.content
      }catch(err){
        console.log(err);
      }
    }
    const toolbarConfig = {};
    const editorConfig = { 
      placeholder: "请输入内容...",
      MENU_CONF: {}
    };
    // 上传成功格式
//   {
//     "errno": 0, // 注意：值是数字，不能是字符串
//     "data": {
//         "url": "xxx", // 图片 src ，必须
//         "alt": "yyy", // 图片描述文字，非必须
//         "href": "zzz" // 图片的链接，非必须
//     }
//   }
// 上传失败格式
// {
//     "errno": 1, // 只要不等于 0 就行
//     "message": "失败信息"
// }
    editorConfig.MENU_CONF['uploadImage'] = {
        server: '/api/upload',// 上传图片的配置
    }
//     editorConfig.MENU_CONF['uploadImage'] = {
//     // form-data fieldName ，默认值 'wangeditor-uploaded-image'
//     fieldName: 'your-custom-name',

//     // 单个文件的最大体积限制，默认为 2M
//     maxFileSize: 1 * 1024 * 1024, // 1M

//     // 最多可上传几个文件，默认为 100
//     maxNumberOfFiles: 10,

//     // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
//     allowedFileTypes: ['image/*'],

//     // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
//     meta: {
//         token: 'xxx',
//         otherKey: 'yyy'
//     },

//     // 将 meta 拼接到 url 参数中，默认 false
//     metaWithUrl: false,

//     // 自定义增加 http  header
//     headers: {
//         Accept: 'text/x-json',
//         otherKey: 'xxx'
//     },

//     // 跨域是否传递 cookie ，默认为 false
//     withCredentials: true,

//     // 超时时间，默认为 10 秒
//     timeout: 5 * 1000, // 5 秒
// }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      console.log(editor);
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    const handleChange = (editor) => {
      console.log("change:", editor.children);
    };
    const handleDestroyed = (editor) => {
      console.log("destroyed", editor);
    };
    const handleFocus = (editor) => {
      console.log("focus", editor);
    };
    const handleBlur = (editor) => {
      console.log("blur", editor);
    };
    const customAlert = (info, type) => {
      alert(`【自定义提示】${type} - ${info}`);
    };
    const customPaste = (editor, event, callback) => {
      console.log("ClipboardEvent 粘贴事件对象", event);
      const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
      console.log('html', html);
      // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
      // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

      // 自定义插入内容
      // editor.insertText("<p data-first-child=\"\" data-pid=\"cNhIaGdB\">對孩子好好說話，基本不聽</p><p data-pid=\"fkT6L340\">最後忍住，又吼了孩子</p><p data-pid=\"obeKKlOs\">……</p><p data-pid=\"iFRx2XGo\">這種無奈的情景，很多家長遇到過。好好說話，也努力嚐試了，可孩子就是無動於衷，</p><blockquote data-pid=\"yN1RjqCi\">這是因為孩子不怕我們嗎？ 還是什麼其他原因？ 該怎麼辦呢？ 如何好好說話，也能讓孩子聽進去呢？</blockquote><p data-pid=\"VLUHAmHb\">孩子是否聽話，與是否怕我們是兩回事情。如果孩子是因為害怕我們，才表現出來的“聽話”，其實也不是真正意義上的聽話了。</p><p data-pid=\"PKv4bRu8\">我們好好說話，孩子卻不聽的原因多種多樣。下麵是常見和典型的3種原因，每種原因後麵，都有相應的應對方法，希望有幫助。</p><figure data-size=\"normal\"><img data-size=\"normal\" data-rawwidth=\"1034\" data-rawheight=\"600\" class=\"origin_image zh-lightbox-thumb lazy\" width=\"1034\" data-original=\"http://rajgtbfsj.hb-bkt.clouddn.com/720_368-edca61609eb84e4496f8f279fbf894f2.jpg\"><figcaption>圖源：Unsplash</figcaption></figure><p data-pid=\"yc39kSEI\"><b>01</b></p><p data-pid=\"HlYtafQe\"><b>想要自己做決定</b></p><p data-pid=\"eS7ddZ7s\"><b>想要更多掌控感</b></p><p data-pid=\"kCvsIN7m\">孩子慢慢長大，也慢慢有了主見。他們想要更多掌控感，想要更多「獨立自主」的機會。</p><p data-pid=\"uD8zM652\">比如，他們想要自己決定玩什麼、怎麼玩、做什麼、不做什麼等。一般來講，到了2-3歲的階段，孩子開始出現強烈自主意識，有比較清晰的喜歡、不喜歡，想要自己做決定。</p><p data-pid=\"vD0CInyM\">同時，對於這個階段的孩子，他們的理解、溝通、表達能力仍然非常有限，因此與他們講道理，比較困難。</p><p data-pid=\"ZeYtt0qq\">比如，我們看著晚上睡覺時間快到了，要趕緊帶孩子去洗澡，但是他們覺得洗澡沒有玩玩具有意思，所以就是不想洗。就算我們跟他們說，現在今天出了很多汗，不洗澡就臭臭了，再不洗就沒法及時睡覺了，孩子也很難聽進去。</p><p data-pid=\"cEapoWig\">於是，孩子“不聽話”了。</p><p data-pid=\"Z4hgzivD\"><b>應對</b></p><p data-pid=\"7c2wvJg1\">對於這種類型的“不聽話”，打一頓、吼一頓、講道理等，並不可取。相反，我們可以試試給孩子一些選擇，在“<b>大原則不變的前提下，讓孩子做一些小選擇</b>”。</p><p data-pid=\"wTtq6dMh\">比如，孩子不肯坐在餐椅上吃飯，我們可以試試讓孩子自己選擇用那個盤子、哪個杯子、坐在哪個位置、先吃米飯還是先吃菜、米飯和菜放在哪個盤子裏……</p><p data-pid=\"wGTB7zIJ\">雖然我們仍然要求孩子坐在餐椅上吃飯，但是所有這些選擇會讓孩子感覺自己可以做很多選擇、決定很多事情，讓關注的“焦點”從坐不坐餐椅，變成：孩子仍然要坐餐椅吃飯，同時他們可以決定很多其他的細節，讓他們體會到自己做主的感覺。</p><figure data-size=\"normal\"><img data-size=\"normal\" data-rawwidth=\"1080\" data-rawheight=\"720\" class=\"origin_image zh-lightbox-thumb lazy\" width=\"1080\" data-original=\"http://rajgtbfsj.hb-bkt.clouddn.com/720_430-3d00e98b1bad44d0a6bdce082454a171.jpg\"><figcaption>圖源：Pexels</figcaption></figure><p data-pid=\"IOhv198r\"><b>02</b></p><p data-pid=\"4W8bx-9R\"><b>主觀意願</b></p><p data-pid=\"0i_WqSoh\"><b>選擇忽略大人</b></p><p data-pid=\"A13rOte4\">當我們給孩子的指令太多、太空洞，孩子無所適從，慢慢就開始主觀意願上的關上耳朵，不聽了。</p><p data-pid=\"6jUIMiSo\">我們可以換位思考一下，要是有人給很多指令，讓我們同時做很多事情，又或者給我們的指令非常寬泛，完全搞不清楚到底要我們做什麼，這時候的感受是怎麼樣的。</p><p data-pid=\"gSORTeYT\">也許是崩潰、也許是“麻了”，也許是算了，也許是愛咋樣咋樣了，懶得搭理。</p><p data-pid=\"tcCGzDCx\">其實，孩子們也會有這樣的感受。</p><p data-pid=\"BTVDd5kF\">於是，孩子“不聽話”了。</p><p data-pid=\"duXul2FN\"><b>應對</b></p><p data-pid=\"Ay3q0-me\">想要孩子聽從我們的指令或指導，那我們首先要學會“好好給出指令或指導”。</p><p data-pid=\"boOdkmYq\">比如，靠近孩子、蹲下來，引起孩子的注意，與孩子認真對話。同時，給出的指令或指導要清晰、簡潔、具體，而且僅給予有必要的指令或指導。</p><p data-pid=\"4owG0hMP\">另外，給孩子發指令的時候，其實有個小竅門：相比告訴孩子不要做什麼，孩子更願意聽“<b>讓他們做什麼</b>”。</p><p data-pid=\"x3dnXj3u\"><b>舉個例子：</b></p><p data-pid=\"8EVKgVcB\">與其告訴孩子：“玩具玩好了，不要扔得到處都是”</p><p data-pid=\"KF17-52_\">不如告訴孩子：“玩具玩好了，我們把玩具放進這個框吧”</p><figure data-size=\"normal\"><img data-size=\"normal\" data-rawwidth=\"1080\" data-rawheight=\"720\" class=\"origin_image zh-lightbox-thumb lazy\" width=\"1080\" data-original=\"http://rajgtbfsj.hb-bkt.clouddn.com/720_430-5ed5fbf48d4240c2b589959fcb06c994.jpg\"><figcaption>圖源：Pexels</figcaption></figure><p data-pid=\"AhTGy0Sz\"><b>03</b></p><p data-pid=\"ABakPR0a\"><b>孩子不想要被打攪</b></p><p data-pid=\"bmfGhwhR\">孩子正在玩。</p><p data-pid=\"2ukKMYTp\">他們沉浸在自己的世界裏，比如正在過家家、開party；正在角色扮演，救助小動物；正在拯救世界，打小怪獸；正在搭城堡，整整忙了一上午了，在收尾階段了……</p><p data-pid=\"sOrjUkRg\">孩子玩樂的過程，在我們看起來毫無章法、隨時可以停下來，但對孩子來講可能是個非常連續的、沉浸在裏麵的過程，他們不希望被打攪。</p><p data-pid=\"5dgiipc6\">如果這個時候，我們發指令讓孩子立刻停下去做別的事，很難奏效。</p><p data-pid=\"jJMxnKd4\">於是，孩子“不聽話了”。</p><p data-pid=\"pr47NDzk\"><b>應對</b></p><p data-pid=\"nYQUvgd3\">首先，按照孩子玩的場景，肯定孩子的“傑作”。比如：</p><p data-pid=\"So3RKWtf\">寶寶搭得城堡正漂亮，上麵有好多小房間和漂亮屋頂、還有小花園，太棒了。</p><p data-pid=\"DZ1jMWQ0\">接著，<b>給孩子一個預期</b>，告訴孩子快要停止手裏的事情了，比如：</p><p data-pid=\"2pf1L7Ei\">我們大概10分鍾後，就要洗手去吃飯了。</p><p data-pid=\"ytf2bcvf\">如果孩子對時間還沒有什麼概念，那可以用兒歌來代替，比如告訴孩子等這首兒歌放完了，我們就要收拾玩具去洗手了。</p><p data-pid=\"JaYvtBGg\"><b>提前告知結束時間期限</b>，可以讓孩子在最後的一點時間裏做完手頭能做的，而且對接下來要做的事情有一定心理準備和理解。</p><p data-pid=\"77t6RhoY\">最後，讓孩子<b>重複一遍接下來要做什麼</b>，如果孩子清晰表達出來了，我們可以跟孩子“拉鉤保證”，同時這個重複的環節，能讓我們判斷孩子對接下來要做的事，是不是真的聽懂或者理解了。</p><figure data-size=\"normal\"><img data-size=\"normal\" data-rawwidth=\"994\" data-rawheight=\"638\" class=\"origin_image zh-lightbox-thumb lazy\" width=\"994\" data-original=\"http://rajgtbfsj.hb-bkt.clouddn.com/720_412-17af0698eb234198986e4ba15e7f5e68.jpg\"><figcaption>圖源：freepik photo created by freepik</figcaption></figure><p data-pid=\"YQQEteGy\">“如何跟孩子好好說話，而且還能讓孩子聽得進去”，是很多家長困擾的問題。</p><p data-pid=\"GBIOEsyI\">其實，好好說話，不僅僅是指說話的語氣溫和，好好說話更意味著：<b>了解孩子、理解孩子、以及注意好好說話的方式和方法</b>。</p><p data-pid=\"BijANbo7\">希望今天的分享有幫助。我是珊珊，關注我 <a class=\"member_mention\" href=\"https://www.zhihu.com/people/219039d982f2c98e417015b1150c718b\" data-hash=\"219039d982f2c98e417015b1150c718b\" data-hovercard=\"p$b$219039d982f2c98e417015b1150c718b\">@婦幼博士Dr韓</a>，一起做更好的父母。</p>");

      // 返回 false ，阻止默认粘贴行为
      // event.preventDefault();
      // callback(false); // 返回值（注意，vue 事件的返回值，不能用 return）

      // 返回 true ，继续默认的粘贴行为
      // callback(true)
    };

    return {
      editorRef,
      valueHtml,
      mode: "default", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
    };
  },
};
</script>    