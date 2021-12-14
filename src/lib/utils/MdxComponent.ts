import React, { PropsWithChildren, ReactNode, useEffect, useRef } from 'react'
import Html from '$lib/components/Html.svelte'

type Props = {
  name: string
}

function MdxComponent(props: PropsWithChildren<Props>): ReactNode {
  const divRef = useRef<HTMLDivElement>()
  const componentRef = useRef<Html>()

  useEffect(() => {
    console.log('MdxComponent', 'props', props)
    // const { children, ...rest } = props
    // const children = Array.isArray(c)
    //   ? c.map((a) => {
    //       const { name, components, children } = a.props
    //       console.log('name', name, 'components', components, 'children', children)
    //       return new Html({ props: { children } })
    //     })
    //   : c

    // console.log('MdxComponent', 'new children', children)
    const component = new Html({
      props,
      target: divRef.current,
    })

    componentRef.current = component

    return () => {
      component.$destroy()
    }
  }, [divRef])

  useEffect(() => {
    componentRef.current.$set(props)
  }, [props])

  return React.createElement('div', { ref: divRef })
}

export default MdxComponent
