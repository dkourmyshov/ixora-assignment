import {
  useRouteLoaderData,
  useParams,
  Link,
  Await
} from 'react-router-dom'

import Wrap from '../util/suspense-wrapper'

export default function Models() {
  const { autoId } = useParams()
  const { promise: autosPromise } = useRouteLoaderData('autos')
  const { promise: modelsPromise } = useRouteLoaderData('models')

  const promise = Promise.all([autosPromise, modelsPromise])

  return (
    <Wrap
      promise={promise}
      handler={([autos, models]) => {
        const autoName = autos.find(item => item.id === parseInt(autoId)).name

        return <div>
          <h1>
            Подбор стеклоочистителей <span className="highlight">{autoName}</span>
          </h1>
          <ul>{models.map(item => (
            <li key={item.id}>
              <Link to={`model/${item.id}`}>{item.name}</Link>
            </li>
          ))}</ul>
        </div>
      }}
    />
  )
}
