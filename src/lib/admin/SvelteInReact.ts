import React, { useRef, useEffect, type PropsWithChildren } from 'react'
import type { SvelteComponent } from 'svelte'
import type CSS from 'csstype'

type ComponentType = typeof SvelteComponent

type WrapperProps = {
  element?: string
  id?: string
  className?: string
  styles?: CSS.Properties
}

export default (Component: ComponentType, _wrapperProps?: WrapperProps) => {
  let instance: SvelteComponent

  return (props: PropsWithChildren<any>) => {
    const container = useRef<HTMLElement>(null)

    useEffect(() => {
      if (!container.current) {
        console.error('Failed to create Svelte component in React, container is not')
        return
      }
      const onRegex = /on([A-Z]+[a-zA-Z]*)/
      const watchRegex = /watch([A-Z]+[a-zA-Z]*)/

      instance = new Component({ target: container.current, props })

      const watchers: [string, (args: any) => any][] = []
      for (const key in props) {
        const onMatch = key.match(onRegex)
        const watchMatch = key.match(watchRegex)

        if (onMatch && typeof props[key] === 'function') {
          instance?.$on(`${onMatch[1][0].toLowerCase()}${onMatch[1].slice(1)}`, props[key])
        }

        if (watchMatch && typeof props[key] === 'function') {
          watchers.push([`${watchMatch[1][0].toLowerCase()}${watchMatch[1].slice(1)}`, props[key]])
        }
      }

      if (watchers.length) {
        const update = instance.$$.update
        instance.$$.update = function (...args) {
          watchers.forEach(([name, callback]) => {
            const index = instance.$$.props[name]
            if (index != null) {
              const prop = instance.$$.ctx[index]
              prop && callback(prop)
            }
            update(...args)
          })
        }
      }

      return () => instance.$destroy()
    }, [])

    useEffect(() => {
      if (instance != null) {
        instance.$set(props)
      }
    }, [props])

    const wrapperProps = resolveWrapperProps(_wrapperProps)

    return React.createElement(wrapperProps.element, {
      ref: container,
      ...wrapperProps,
    })
  }
}

function resolveWrapperProps(wrapperProps?: WrapperProps) {
  return {
    element: 'span',
    id: 'svelte-wrapper',
    ...wrapperProps,
  }
}
