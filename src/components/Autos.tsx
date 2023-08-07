import {
  useRouteLoaderData,
  Link,
} from 'react-router-dom'

import Wrap from '../util/suspense-wrapper'

export default function Autos() {
  const { promise } = useRouteLoaderData('autos')
  return (
    <Wrap
      promise={promise}
      handler={autos =>
        <>
          <h1>Подбор стеклоочистителей</h1>

          <ul>{autos.map(item => (
            <li key={item.id}>
              <Link to={`auto/${item.id}`}>
                {item.name}
              </Link>
            </li>
          ))}</ul>
        </>
      }
    />
  )
}
