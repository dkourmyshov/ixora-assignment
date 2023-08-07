import {
  useRouteLoaderData,
  useParams,
  Link,
  Await
} from 'react-router-dom'

import Wrap from '../util/suspense-wrapper'

export default function Modifs() {
  const { autoId, modelId } = useParams()
  const { promise: autosPromise } = useRouteLoaderData('autos')
  const { promise: modelsPromise } = useRouteLoaderData('models')
  const { promise: modifsPromise } = useRouteLoaderData('modifs')

  const promise = Promise.all([autosPromise, modelsPromise, modifsPromise])

  return (
    <Wrap
      promise={promise}
      handler={([autos, models, modifs]) => {
        const autoName = autos.find(item => item.id === parseInt(autoId)).name
        const modelName = models.find(item => item.id === parseInt(modelId)).name

        return <div>
          <h1>Подбор стеклоочистителей <span className="highlight">{autoName} {modelName}</span></h1>
          <ul>{modifs.map(item => (
            <li key={item.id}>
              <Link to={`modif/${item.id}`}>{item.name}</Link>
            </li>
          ))}</ul>
        </div>
      }}
    />
  )
}
