const copySelf = {
    // 点击按钮复制input，textarea里的内容
    bind (el, {value, modifiers}) {
        el.$value = value
        console.log(value, modifiers)
        if (modifiers.dblclick) {
            el.addEventListener('dblclick', () => handClick(el.$value))
        } else {
            el.addEventListener('click', () => handClick(el.$value))
        }
    },
    inserted () {},
    update () {},
    // 当传进来的值更新
    componentUpdated (el, {value}) {
        el.$value = value
    },
    // 指令与元素解绑的时候，移除事件绑定
    unbind (el, {modifiers}) {
        if (modifiers.dblclick) {
            el.removeEventListener('dblclick', () => handClick(el.$value))
        } else {
            el.removeEventListener('click', () => handClick(el.$value))
        }
    }
}
function handClick (text) {
    console.log(text, 1111)
    const copyTarget = document.createElement('input')
    copyTarget.setAttribute('style', 'position: fixed; top: 0; left: 0; opacity: 0; z-index: -10000')
    copyTarget.value = text
    document.body.appendChild(copyTarget)
    // 复制内容
    copyTarget.select() // select() 方法用于选取文本域中的内容
    document.execCommand('copy')
    document.body.removeChild(copyTarget)
}
export default copySelf


// 超出部分省略号自定义指令
// v-debounce自定义指令