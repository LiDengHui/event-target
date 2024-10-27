import test from 'ava'
import EventTarget, { Event } from './dist/index.js' // 假设 EventTarget 的定义在同目录的 eventtarget.ts 中

// 测试添加事件监听器和事件冒泡
test('Event should bubble up from child to parent', t => {
  const grandparent = new EventTarget('grandparent')
  const parent = new EventTarget('parent')
  const child = new EventTarget('child')

  // 设置父子关系
  parent.setParent(grandparent)
  child.setParent(parent)

  let grandparentCalled = false
  let parentCalled = false
  let childCalled = false

  // 为各个节点添加事件监听器
  grandparent.addEventListener('click', () => {
    grandparentCalled = true
  })

  parent.addEventListener('click', () => {
    parentCalled = true
  })

  child.addEventListener('click', () => {
    childCalled = true
  })

  // 触发事件
  const clickEvent = new Event('click')
  child.dispatchEvent(clickEvent)

  // 验证事件冒泡是否按照预期发生
  t.true(childCalled, 'Child should receive event')
  t.true(parentCalled, 'Parent should receive event')
  t.true(grandparentCalled, 'Grandparent should receive event')
})

// 测试停止事件冒泡
test('Event propagation should stop at parent', t => {
  const grandparent = new EventTarget('grandparent')
  const parent = new EventTarget('parent')
  const child = new EventTarget('child')

  // 设置父子关系
  parent.setParent(grandparent)
  child.setParent(parent)

  let grandparentCalled = false
  let parentCalled = false
  let childCalled = false

  // 为各个节点添加事件监听器
  grandparent.addEventListener('click', () => {
    grandparentCalled = true
  })

  parent.addEventListener('click', (event) => {
    parentCalled = true
    event.stopPropagation() // 停止冒泡
  })

  child.addEventListener('click', () => {
    childCalled = true
  })

  // 触发事件
  const clickEvent = new Event('click')
  child.dispatchEvent(clickEvent)

  // 验证冒泡是否停止在 parent
  t.true(childCalled, 'Child should receive event')
  t.true(parentCalled, 'Parent should receive event')
  t.false(grandparentCalled, 'Grandparent should not receive event')
})

// 测试移除事件监听器
test('Event listener should be removed correctly', t => {
  const child = new EventTarget('child')
  let childCalled = false

  const listener = () => {
    childCalled = true
  }

  // 添加监听器
  child.addEventListener('click', listener)

  // 移除监听器
  child.removeEventListener('click', listener)

  // 触发事件
  const clickEvent = new Event('click')
  child.dispatchEvent(clickEvent)

  // 验证监听器是否被正确移除
  t.false(childCalled, 'Child event listener should be removed')
})
