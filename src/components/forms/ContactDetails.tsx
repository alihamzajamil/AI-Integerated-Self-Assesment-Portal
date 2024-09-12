import React from 'react';
import { FaPhone, FaEnvelope, FaAddressBook } from 'react-icons/fa';

const ContactDetails = () => {
    return (
        <section className='h-full px-10 flex flex-col items justify-center' >
            <div className='mt-5 flex items-center text-white text-xl' >
                <FaPhone />
                <div className='ml-3' >+92 300 xyzxyzx</div>
            </div>
            <div className='mt-5 flex items-center text-white text-xl' >
                <FaAddressBook />
                <div className='ml-3' >Address Goes here</div>
            </div>
            <div className='mt-5 flex items-center text-white text-xl' >
                <FaEnvelope />
                <div className='ml-3' >assessment@portal.com</div>
            </div>
        </section>
    )
}

export default ContactDetails