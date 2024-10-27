// 定义事件监听器类型
export type EventListener = (event: Event) => void

export class Event {
  type: string
  target: EventTarget | null
  propagationStopped: boolean

  constructor(type: string) {
    this.type = type
    this.target = null
    this.propagationStopped = false
  }

  // 停止冒泡
  stopPropagation(): void {
    this.propagationStopped = true
  }
}

export class EventTarget {
  name: string
  listeners: { [key: string]: EventListener[] } // 存储事件类型与监听器的映射
  parent: EventTarget | null

  constructor(name: string) {
    this.name = name
    this.listeners = {}
    this.parent = null
  }

  // 添加事件监听器
  addEventListener(type: string, listener: EventListener): void {
    if (!this.listeners[type]) {
      this.listeners[type] = []
    }
    this.listeners[type].push(listener)
  }

  // 移除事件监听器
  removeEventListener(type: string, listener: EventListener): void {
    if (this.listeners[type]) {
      this.listeners[type] = this.listeners[type].filter((l) => l !== listener)
    }
  }

  // 触发事件，模拟冒泡过程
  dispatchEvent(event: Event): void {
    event.target = this // 设置事件目标

    // 在当前节点执行事件监听器
    if (this.listeners[event.type]) {
      this.listeners[event.type].forEach((listener) => listener(event))
    }

    // 如果冒泡未停止且存在父节点，则冒泡到父节点
    if (this.parent && !event.propagationStopped) {
      this.parent.dispatchEvent(event)
    }
  }

  // 设置父节点
  setParent(parent: EventTarget): void {
    this.parent = parent
  }
}

export default EventTarget;
