type Listener = () => void
type EventMap = Map<string, Set<Listener>>

export class EventEmitter {
  private events: EventMap

  constructor() {
    this.events = new Map()
  }

  on(eventType: string, listener: Listener): void {
    if (this.events.has(eventType)) {
      this.events.get(eventType)!.add(listener)
    } else {
      this.events.set(eventType, new Set([listener]))
    }
  }

  emit(eventType: string): void {
    if (this.events.has(eventType)) {
      this.events.get(eventType)!.forEach((listener) => listener())
    }
  }

  off(eventType: string, listener: Listener): void {
    if (this.events.has(eventType)) {
      this.events.get(eventType)!.delete(listener)
    }
  }
}

const emitter = new EventEmitter()

const helloListener = () => console.log('Hello, world!')
const byeListener = () => console.log('Goodbye!')

emitter.on('greet', helloListener)
emitter.on('greet', byeListener)
emitter.emit('greet')
