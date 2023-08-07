import {
  useRouteLoaderData,
  useParams,
  Link,
  Await
} from 'react-router-dom'

import Wrap from '../util/suspense-wrapper'

export default function Params() {
  const { autoId, modelId, modifId } = useParams()
  const { promise: autosPromise } = useRouteLoaderData('autos')
  const { promise: modelsPromise } = useRouteLoaderData('models')
  const { promise: modifsPromise } = useRouteLoaderData('modifs')
  const { promise: paramsPromise } = useRouteLoaderData('params')

  const promise = Promise.all(
    [autosPromise, modelsPromise, modifsPromise, paramsPromise])

  return (
    <Wrap
      promise={promise}
      handler={([autos, models, modifs, params]) => {
        const autoName = autos.find(item => item.id === parseInt(autoId)).name
        const modelName = models.find(item => item.id === parseInt(modelId)).name
        const modifName = modifs.find(item => item.id === parseInt(modifId)).name
        const { length1, length2, length3, fasten } = params[0]

        return <div>
          <h1>Стеклоочистители для <span className="highlight">{autoName} {modelName}</span> <span className="modif">{modifName}</span> </h1>
          <p>Длина щетки со стороны водителя (см) &mdash; {length1}</p>
          <p>Длина щетки со стороны пассажира (см) &mdash; {length2}</p>
          {length3 && <p>Длина задней щётки (см) &mdash; {length3}</p>}
          <p>Тип крепления &mdash; {fasten}</p>
        </div>
      }}
    />
  )
}
