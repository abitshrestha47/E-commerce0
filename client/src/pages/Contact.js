import React from 'react'
import Layout from '../components/Layout/Layout'
import {BiMailSend,BiPhoneCall,BiSupport} from 'react-icons/bi';

const Contact = () => {
  return (
    <Layout title={'Contact Us'}>
      <div className='row contactus'>
        <div className='col-md-6'>
          <img></img>
        </div>
        <div className='col-md-4'>
          <h1 className='bg-dark p-2 text-white text-center'>CONTACT US</h1>
          <p className='text-justify mt-2'>
            any query and info about product feel free to call anytime we 24x7 available
          </p>
          <p className='mt-3'>
            <BiMailSend/>:www.xyz.com
          </p>
          <p className='mt-3'>
            <BiPhoneCall/>:02234234234  
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact