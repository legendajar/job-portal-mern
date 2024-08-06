import CategoryCarousel from '@/components/CategoryCarousel/CategoryCarousel'
import HeroSection from '@/components/HeroSection/HeroSection'
import LatestJobs from '@/components/LatestJobs/LatestJobs'
import Footer from '@/components/shared/Footer/Footer'
import Navbar from '@/components/shared/Navbar/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  useGetAllJobs();
  const navigate = useNavigate();
  const {user} = useSelector(store => store.auth)
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/recruiter/companies');
    }
  }, []);
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