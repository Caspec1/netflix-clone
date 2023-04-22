import { NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import useCurrentUser from '@/hooks/useCurrentUser'
import NavBar from '@/components/NavBar'
import Billboard from '@/components/Billboard'
import MovieList from '@/components/MovieList'
import useMovieList from '@/hooks/useMovieList'
import useFavorites from '@/hooks/useFavorites'
import InfoModal from '@/components/InfoModal'
import useInfoModal from '@/hooks/useInfoModal'

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home (): JSX.Element {
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites()
  const { isOpen, closeModal } = useInfoModal()

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <NavBar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Trending Now' data={movies}/>
        <MovieList title='My List' data={favorites}/>
      </div>
    </>
  )
}
