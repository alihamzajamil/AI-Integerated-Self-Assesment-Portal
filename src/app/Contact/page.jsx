import React from 'react';
import ContactForm from "@/components/forms/ContactForm";
import ContactDetails from "@/components/forms/ContactDetails";

const page = () => {
  return (
    <section className="my-14 p-6 container mx-auto px-4 md:grid md:grid-cols-3 gap-4">

      <section className="py-10 md:mb-0 mb-8 col-span-1 bg-slate-900 px-8" >
        <ContactDetails />
      </section>

      <section className="col-span-2" >
        <h2 className="text-[30px] px-3 font-semibold mb-8" >Get in touch!</h2>
        <ContactForm />
      </section>

    </section>
  )
}

export default page