<script lang="ts">
  // https://github.com/jpinho/svelte-react/blob/main/src/utils/ReactAdapter.svelte
  import React from 'react'
  import ReactDOM from 'react-dom'
  import { onDestroy, onMount } from 'svelte'

  export let element: any
  export let children: any = undefined
  let className: string | undefined = undefined
  export { className as class }

  let container: any

  $: {
    if (container != null) {
      render(element, container, children)
    }
  }

  /**
   * Svelte compiles on the server/statically, React renders on the client.
   * Therefore, React stuff need to happen within Svelte (window/dom) zones.
   */
  onMount(() => {
    render(element, container, children)
  })

  onDestroy(() => {
    try {
      container && ReactDOM.unmountComponentAtNode(container)
    } catch (err) {
      console.warn(`react-adapter failed to unmount.`, { err })
    }
  })

  function render(element: any, container: any, children: any) {
    try {
      if (typeof element === 'object') {
        ReactDOM.render(element, container)
      } else {
        const e = React.createElement
        ReactDOM.render(e(element, $$restProps, children), container)
      }
    } catch (err) {
      console.warn(`react-adapter failed to render.`, { err })
    }
  }
</script>

<div bind:this={container} class={className} />
