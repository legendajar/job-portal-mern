import CategoryCarousel from '@/components/CategoryCarousel/CategoryCarousel'
import HeroSection from '@/components/HeroSection/HeroSection'
import LatestJobs from '@/components/LatestJobs/LatestJobs'
import Footer from '@/components/shared/Footer/Footer'
import Navbar from '@/components/shared/Navbar/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs'


const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home