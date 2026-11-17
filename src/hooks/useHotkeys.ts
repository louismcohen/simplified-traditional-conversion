import { useEffect } from 'react'

type HandlerMap = Record<string, (event: KeyboardEvent) => void>

/** Bind keys when not typing in an input. Keys are lowercase; use ' ' for Space. */
export function useHotkeys(handlers: HandlerMap, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
      const handler = handlers[key]
      if (!handler) return
      event.preventDefault()
      handler(event)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handlers, enabled])
}
