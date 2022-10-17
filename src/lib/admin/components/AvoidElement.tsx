import React, { type FC } from 'react'

const Avoid: FC<{ label: string; message: string }> = ({ label, message, children }) => (
  <div className="border-red-700 border-2 p-1 rounded bg-red-50">
    {children}
    <p className="text-red-700">
      Undvik <code>{label}</code>. {message}
    </p>
  </div>
)

const AvoidH1: FC = (props) => {
  return (
    <Avoid label="H1" message="'Titel' visas som H1. Rekommendationen är att ha en H1 per sida. ">
      <h1 {...props} />
    </Avoid>
  )
}

export { AvoidH1 }
