import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

const useFavorites = () => {
  const { data, isLoading, error, mutate } = useSWR('/api/favorites', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })

  return {
    data,
    error,
    isLoading,
     mutate
  }
}

export default useFavorites
