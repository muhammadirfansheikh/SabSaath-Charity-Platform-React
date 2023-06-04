import { useEffect, useState } from "react"

const ApiStatus = {
  loading: "loading",
  complete: "complete",
  errored: "errored",
}

const useApiCallOnMount = (service, refresh = false) => {
  const [status, setStatus] = useState(ApiStatus.loading)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const getData = async () => {
    try {
      const data = await service()
      setData(data)
      setStatus(ApiStatus.complete)
    } catch (error) {
      setError(error)
      setStatus(ApiStatus.errored)
    }
  }

  useEffect(() => {
    getData()
  }, [refresh])

  return [
    status === ApiStatus.loading,
    data,
    status === ApiStatus.errored,
    error,
  ]
}

export default useApiCallOnMount
