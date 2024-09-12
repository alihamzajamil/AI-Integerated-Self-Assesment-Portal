import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PricingTable from "@/components/pricing/Pricing";
import ContactForm from "@/components/forms/ContactForm";
import ContactDetails from "@/components/forms/ContactDetails";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {
  return (
    <main>
      <Carousel orientation="horizontal">
        <CarouselContent>
          <CarouselItem style={{ position: 'relative', width: '100%', height: '70vh' }}>
            <Image
              src='/images/hero-image.jpg'
              alt="slide 1"
              layout="fill"
              objectFit="cover" /></CarouselItem>
          <CarouselItem style={{ position: 'relative', width: '100%', height: '70vh' }}>
            <Image
              src='/images/assessment.jpg'
              alt="slide 2"
              layout="fill"
              objectFit="cover"
            /></CarouselItem>
          <CarouselItem style={{ position: 'relative', width: '100%', height: '70vh' }}>

            <Image
              src='/images/assessment1.jpg'
              alt="slide 3"
              layout="fill"
              objectFit="cover"
            /></CarouselItem>
        </CarouselContent>
      </Carousel>

      <section id="about" className="p-6 container mx-auto px-4 my-12">
        <div className="md:flex items-center justify-between">
          <div className="w-[50%] pt-8 pl-6">
            <div className="sm:mb-4" >
              <h1 className="text-[46px] text-slate-950 leading-[3.5rem] font-bold">
                Effortless Creation of Engaging Online Assessments
              </h1>
              <p className="text-[20px] text-gray-500 max-w-[80%] pt-4">
                Empowering Educators and Businesses with Automated Quiz
                Generation
              </p>
            </div>
            <div className="mt-8 flex">
              <Button variant='default' >
                <Link href={"/sign-up"}>
                  Sign Up Free
                </Link>
              </Button>
              <Button className="mx-3" variant='default' >
                <Link href={"/create"}>
                  Create Quiz
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:mt-4" >
            <Image
              src="/images/about-section.jpg"
              width={570}
              height={570}
              alt="Hero Image"
            />
          </div>
        </div>
      </section>

      <section className="p-6 container mx-auto px-4">
        <PricingTable />
      </section>

      <section className="my-14 p-6 container mx-auto px-4 md:grid md:grid-cols-3 gap-4">

        <section className="py-10 md:mb-0 mb-8 col-span-1 bg-slate-900 px-8" >
          <ContactDetails />
        </section>

        <section className="col-span-2" >
          <h2 className="text-[30px] px-3 font-semibold mb-8" >Get in touch!</h2>
          <ContactForm />
        </section>

      </section>

    </main >
  );
}
