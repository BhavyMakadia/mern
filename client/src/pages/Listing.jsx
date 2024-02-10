import { set } from 'mongoose';
import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
import 'swiper/css/bundle';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
    const [listing,setListing]=useState(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]= useState(false);
    const [copied, setCopied] = useState(false);
   const [contact, setContact] = useState(false); 
  const params = useParams();
  const {currentUser} = useSelector((state) => state.user);
  console.log(currentUser._id,listing?.userRef);
  useEffect(()=>{
    const fetchListing =async ()=>{
        try {
            setLoading(true);
            const res = await fetch(`/api/listing/get/${params.listingId}`);
            const data =await res.json();
            console.log(data);
            if(data.success === false)
            {
              console.log("error");
                setError(true);
                setLoading(false);
             return; 
            }
            console.log("data");
            setListing(data); 
            setLoading(false);
            setError(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
     
     
    }; 
    fetchListing();
  }, [params.listingId]);
  console.log(loading);
    return (
      
      
    <main className='bg-[#90b3b7]'>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>There is some error </p>
      )}
           {listing && !loading && !error && 
           (
            <div>
            <Swiper navigation>
              {listing.imageUrls.map((url) => (
                <SwiperSlide key={url}>
                  <div
                    className='h-[500px]'
                    style={{
                      background: `url(${url}) center no-repeat`,
                     // backgroundSize: 'cover',
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>



            <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-8 my-7 gap-4 border rounded-xl border-gray-300 '>
            <p className='text-5xl font-semibold border border-gray-300 bg-slate-200 rounded-lg p-4'>
            <p className='text-pink-700 '> {listing.name} - ${' '} 
              {listing.offer?listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
              </p>
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-lg '>
              <FaMapMarkerAlt className='text-blue-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-pink-800 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>
            <p className='text-slate-800 bg-slate-300 border border-gray-300 rounded-xl p-4'>
  <span className='font-semibold text-red-900 text-2xl'>Description - </span>
  <p className='text-xl font-semibold text-slate-500'>{listing.description}</p> 
</p>
  <ul className='text-blue-800 font-semibold text-lg flex flex-wrap items-center gap-4 sm:gap-6  border border-gray-300 bg-slate-200 rounded-lg p-4'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-5xl' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-5xl' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-5xl' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-5xl' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact Owner
              </button>
             {currentUser && listing.userRef !== currentUser._id && !contact && (
             <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact Owner
              </button>
            )}
             {contact && <Contact listing={listing}/>} 
          </div>
          </div>   
            
          )
      }
      </main>
  );
}