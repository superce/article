import axios from 'https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js';
function wait(s) {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve();
        }, s * 1000);
    });
}
function onscroll(){
    let init = 0
    const s = document.documentElement.scrollHeight
    window.scrollTo(init, s)
    init = s
}
async function init(){
    axios.post('http://localhost:1000/save', {
        p: []
    }).then(res => {
        console.log(res);
    })
    // const title = document.querySelector('.name-container .s-user-name').innerText
    // const navList = document.querySelectorAll('.s-tabs-nav .s-tab')
    // navList.forEach(item => {
    //     if (item.innerText === '文章') {
    //         item.click()
    //     }
    // })
    // await wait(6)
    // onscroll()
    // await wait(3)
    // const article = document.querySelectorAll('#article .sfi-article')
    // console.log(article.length);
    // let a = []
    // article.forEach(item => {
    //     let title = {
    //         title: item.innerText
    //     }
    //     a.push(title)
    // })
    // console.log(title, a)
}
init()