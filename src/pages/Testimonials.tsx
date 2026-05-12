import FadeIn from '../components/FadeIn'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const testimonials = [
  {
    text: 'NIVORA completely transformed our apartment in Bandra. What struck us most was how well Shweta understood what we wanted before we could even articulate it ourselves. The final space feels like us — calm, warm, and beautifully considered.',
    name: 'Priya & Rohan Khanna',
    location: 'Bandra West, Mumbai',
    project: 'Residential — 3BHK Apartment',
  },
  {
    text: 'Our café has become one of the most photographed spots in Pune. Every corner was designed with intention. The team was professional, transparent, and genuinely talented. What they delivered exceeded everything we imagined.',
    name: 'Aditya Shinde',
    location: 'FC Road, Pune',
    project: 'Commercial — Café Interior',
  },
  {
    text: 'The process felt effortless from start to finish. We were kept informed at every stage, timelines were honoured, and the final result exceeded our expectations in every way. Our home now feels like a sanctuary.',
    name: 'Meera & Vikram Patel',
    location: 'Koregaon Park, Pune',
    project: 'Residential — 4BHK Villa',
  },
  {
    text: 'Shweta has an extraordinary ability to translate a vague feeling into a very precise space. We came to her with mood boards and half-formed ideas, and she turned them into a home that is exactly what we wanted — and more.',
    name: 'Ananya & Siddharth Mehta',
    location: 'Juhu, Mumbai',
    project: 'Residential — Penthouse',
  },
  {
    text: 'Our showroom went from generic to extraordinary. The design draws people in from the street and makes them linger. We\'ve had multiple clients mention how beautiful the space is before they even look at the products.',
    name: 'Kavya Nair',
    location: 'Worli, Mumbai',
    project: 'Commercial — Luxury Showroom',
  },
  {
    text: 'The attention to detail is remarkable — from the way the light falls in the afternoon to the texture of every surface. It is clear that NIVORA treats every project as if it were their own home. Highly recommended.',
    name: 'Rajesh & Sunita Joshi',
    location: 'Aundh, Pune',
    project: 'Residential — 3BHK Apartment',
  },
  {
    text: 'Working with NIVORA on our co-working space was an excellent decision. They understood exactly what a creative workspace should feel like — productive but never sterile, professional but warm.',
    name: 'Nikhil Desai',
    location: 'Hinjewadi, Pune',
    project: 'Commercial — Co-working Space',
  },
  {
    text: 'The turnkey process was seamless. We handed over the keys and came back to a completed home that required no corrections, no touch-ups, and no follow-ups. That kind of reliability is rare.',
    name: 'Swati & Arjun Kulkarni',
    location: 'Powai, Mumbai',
    project: 'Residential — Studio Apartment',
  },
  {
    text: 'Shweta has a quiet confidence that puts you immediately at ease. She knows exactly what she is doing, communicates it clearly, and delivers without drama. Our office is now something our team is genuinely proud of.',
    name: 'Mihir Raval',
    location: 'BKC, Mumbai',
    project: 'Commercial — Corporate Office',
  },
]

export default function Testimonials() {
  return (
    <div className="bg-[#f5f0e8] pt-20 min-h-screen">
      {/* Header */}
      <section className="py-28 px-6 text-center max-w-3xl mx-auto">
        <FadeIn>
          <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Client Stories</p>
          <h1 className="font-serif text-5xl md:text-7xl text-[#1c2b1a] font-light mb-6">What Clients Say</h1>
          <p className="text-[#3a3a3a]/50 font-light leading-relaxed">
            Every project is a relationship. These are the words of people who trusted us with their spaces.
          </p>
        </FadeIn>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={(i % 3) * 0.1} className="break-inside-avoid">
              <div className="bg-[#ede8df] p-8 border-l-2 border-[#b8966a]/30 hover:border-[#b8966a] transition-all duration-500">
                <p className="font-serif text-lg text-[#1c2b1a]/80 leading-relaxed font-light mb-8">
                  "{t.text}"
                </p>
                <div>
                  <p className="text-[#1c2b1a] text-sm font-light tracking-wide">{t.name}</p>
                  <p className="text-[#3a3a3a]/40 text-xs tracking-wider mt-1">{t.location}</p>
                  <p className="text-[#b8966a] text-[10px] tracking-[0.2em] uppercase mt-2">{t.project}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center mt-24">
          <div className="bg-[#1c2b1a] py-20 px-6">
            <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Your Turn</p>
            <h2 className="font-serif text-4xl text-[#f5f0e8] font-light mb-6">
              Ready to create your story?
            </h2>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-[#b8966a] text-[#1c2b1a] text-xs tracking-[0.2em] uppercase px-12 py-5 hover:bg-[#d4b896] transition-all duration-300 font-medium"
            >
              Book Free Consultation <ArrowRight size={13} />
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
