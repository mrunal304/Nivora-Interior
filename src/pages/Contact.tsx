import FadeIn from '../components/FadeIn'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react'

export default function Contact() {
  return (
    <div className="bg-[#1c2b1a] pt-20">
      <section className="py-28 px-6 text-center max-w-3xl mx-auto">
        <FadeIn>
          <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Reach Out</p>
          <h1 className="font-serif text-5xl md:text-7xl text-[#f5f0e8] font-light mb-6">Let's Talk</h1>
          <p className="text-[#f5f0e8]/45 font-light leading-relaxed">
            Every great project begins with a conversation. Reach out and let's explore what's possible for your space.
          </p>
        </FadeIn>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <FadeIn direction="right">
            <div className="space-y-8">
              <div>
                <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-8">Contact Details</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 border border-[#b8966a]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={14} className="text-[#b8966a]" />
                    </div>
                    <div>
                      <p className="text-[#f5f0e8] font-light mb-1">Location</p>
                      <p className="text-[#f5f0e8]/40 text-sm font-light">Mumbai | Pune, Maharashtra</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 border border-[#b8966a]/30 flex items-center justify-center shrink-0">
                      <Phone size={14} className="text-[#b8966a]" />
                    </div>
                    <div>
                      <p className="text-[#f5f0e8] font-light mb-1">Phone</p>
                      <a href="tel:+917276687805" className="text-[#f5f0e8]/40 text-sm font-light hover:text-[#b8966a] transition-colors duration-300">
                        +91 72766 87805
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 border border-[#b8966a]/30 flex items-center justify-center shrink-0">
                      <Mail size={14} className="text-[#b8966a]" />
                    </div>
                    <div>
                      <p className="text-[#f5f0e8] font-light mb-1">Email</p>
                      <a href="mailto:hello@nivorainteriors.com" className="text-[#f5f0e8]/40 text-sm font-light hover:text-[#b8966a] transition-colors duration-300">
                        hello@nivorainteriors.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 border border-[#b8966a]/30 flex items-center justify-center shrink-0">
                      <MessageCircle size={14} className="text-[#b8966a]" />
                    </div>
                    <div>
                      <p className="text-[#f5f0e8] font-light mb-2">WhatsApp</p>
                      <a
                        href="https://wa.me/917276687805?text=Hello%2C%20I%20am%20interested%20in%20your%20interior%20design%20services."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs tracking-[0.15em] uppercase px-6 py-3 hover:bg-[#20bc5c] transition-all duration-300"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#b8966a]/10 pt-8">
                <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-4">Studio Hours</p>
                <div className="space-y-2 text-sm font-light text-[#f5f0e8]/40">
                  <p>Monday – Saturday: 10:00 AM – 7:00 PM</p>
                  <p>Sunday: By appointment only</p>
                </div>
              </div>

              <div className="border border-[#b8966a]/15 p-6">
                <p className="text-[#f5f0e8]/40 text-sm font-light italic leading-relaxed">
                  "We respect your privacy. No spam, just great design."
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn delay={0.2} direction="left">
            <div>
              <p className="text-[#b8966a] text-[10px] tracking-[0.4em] uppercase mb-8">Send a Message</p>
              <form
                onSubmit={e => { e.preventDefault(); window.location.href = '/thank-you' }}
                className="space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[#f5f0e8]/40 text-xs tracking-[0.15em] uppercase block mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full bg-transparent border border-[#b8966a]/20 text-[#f5f0e8] placeholder-[#f5f0e8]/20 px-4 py-3 text-sm font-light focus:outline-none focus:border-[#b8966a] transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-[#f5f0e8]/40 text-xs tracking-[0.15em] uppercase block mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 00000 00000"
                      className="w-full bg-transparent border border-[#b8966a]/20 text-[#f5f0e8] placeholder-[#f5f0e8]/20 px-4 py-3 text-sm font-light focus:outline-none focus:border-[#b8966a] transition-colors duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#f5f0e8]/40 text-xs tracking-[0.15em] uppercase block mb-2">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-transparent border border-[#b8966a]/20 text-[#f5f0e8] placeholder-[#f5f0e8]/20 px-4 py-3 text-sm font-light focus:outline-none focus:border-[#b8966a] transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="text-[#f5f0e8]/40 text-xs tracking-[0.15em] uppercase block mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help you?"
                    className="w-full bg-transparent border border-[#b8966a]/20 text-[#f5f0e8] placeholder-[#f5f0e8]/20 px-4 py-3 text-sm font-light focus:outline-none focus:border-[#b8966a] transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="text-[#f5f0e8]/40 text-xs tracking-[0.15em] uppercase block mb-2">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your project or enquiry..."
                    className="w-full bg-transparent border border-[#b8966a]/20 text-[#f5f0e8] placeholder-[#f5f0e8]/20 px-4 py-3 text-sm font-light focus:outline-none focus:border-[#b8966a] transition-colors duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#b8966a] text-[#1c2b1a] text-xs tracking-[0.25em] uppercase py-4 hover:bg-[#d4b896] transition-all duration-300 font-medium flex items-center justify-center gap-3"
                >
                  Send Message <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </FadeIn>
        </div>

        {/* Or get a quote */}
        <FadeIn className="mt-24 border-t border-[#b8966a]/10 pt-20 text-center">
          <p className="text-[#f5f0e8]/40 font-light mb-6">
            Looking to start a project? Get your free layout consultation.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 border border-[#b8966a] text-[#b8966a] text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#b8966a] hover:text-[#1c2b1a] transition-all duration-300"
          >
            Get a Free Quote <ArrowRight size={13} />
          </Link>
        </FadeIn>
      </section>
    </div>
  )
}
