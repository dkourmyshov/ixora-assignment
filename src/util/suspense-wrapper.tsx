import React from 'react'
import { Await } from 'react-router-dom'

export default function Wrap({promise, handler}) {
  return (
    <React.Suspense fallback={<p>Загружаются данные...</p>}>
      <Await
        resolve={promise}
        errorElement={<p>Произошла ошибка, попробуйте перезагрузить страницу</p>}
      >{handler}</Await>
    </React.Suspense>
  )
}
