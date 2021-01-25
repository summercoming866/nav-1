const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const simplifyUrl = (url) => {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  //渲染
  $siteList.find("li:not(.last)").remove(); //渲染之前要先清一波之前页面的
  hashMap.forEach((node,index) => {
    const $li = $(`<li>
          
            <div class="site">
              <div class="logo">
                ${node.logo}
              </div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close">
                <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                </svg>
              </div>
            </div>
        
        </li>`).insertBefore($lastLi);
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()
            hashMap.splice(index,1)
            render()
        })
  });
};
const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  {
    logo: "B",

    url: "http://www.bilibili.com",
  },
];
render();

$(".addButton").on("click", () => {
  let url = window.prompt("要添加什么网址呢？");
  if (url.indexOf("http" !== 0)) {
    url = "https://" + url;

    //     const $li = $(`<li>
    //     <a href="${url}">
    //       <div class="site">
    //         <div class="logo">${url[0]}</div>
    //         <div class="link">${url}</div>
    //       </div>
    //     </a>
    //   </li>`).insertBefore($lastLi);
    hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url });
    render();
  }
});
window.onbeforeunload = () => {
  console.log("页面要关闭了");
  const string = JSON.stringify(hashMap);
  console.log(typeof hashMap);
  console.log(hashMap);
  console.log(typeof string);
  console.log(string);
  window.localStorage.setItem("x", string);
};
//监听键盘
$(document).on('keypress',(e)=>{
    const {key}=e
    for(let i=0;i<hashMap.length;i++){
       if(hashMap[i].logo.toLowerCase()===key) {
           window.open(hashMap[i].url)
       }
    }
})