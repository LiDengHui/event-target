import EventTarget, { Event } from '../lib/main'

const grandparent = new EventTarget('grandparent')
const parent = new EventTarget('parent')
const child = new EventTarget('child')

// 设置父子关系
parent.setParent(grandparent)
child.setParent(parent)

// 为各个节点添加事件监听器
grandparent.addEventListener('click', (event: Event) => {
  console.log('Grandparent received event from', event.target?.name)
})

parent.addEventListener('click', (event: Event) => {
  console.log('Parent received event from', event.target?.name)
})

child.addEventListener('click', (event: Event) => {
  console.log('Child received event from', event.target?.name)
})

// 模拟在 child 节点触发点击事件
const clickEvent = new Event('click')
child.dispatchEvent(clickEvent)
