import { useRef, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import FadeIn from '../components/FadeIn'
import { getProjectsByCategory, Project } from '../data/projects'
import { ArrowRight } from 'lucide-react'

type ProjectCat = Project['category']

interface ServiceInfo {
  title: string
  heading: string
  desc: string
  hero: string
  expertise: string[]
  projectCat?: ProjectCat
}

const info: Record<string, ServiceInfo> = {
  residential: {
    title: 'Residential Interiors',
    heading: 'Designing Homes That Feel Like You',
    desc: 'Your home should be more than just a place to live—it should reflect your personality, lifestyle, and aspirations. Whether you\'re moving into a new apartment, building your dream villa, renovating an existing home, or creating a weekend retreat, we design spaces that are functional, timeless, and uniquely yours.',
    hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=85',
    expertise: ['Apartments & Flats', 'Villas & Bungalows', 'Luxury Residences', 'Modular Kitchens', 'Bedrooms & Living Spaces', 'Custom Storage Solutions'],
    projectCat: 'residential',
  },
  commercial: {
    title: 'Commercial Interiors',
    heading: 'Spaces Designed for Productivity & Impact',
    desc: 'A well-designed workspace inspires creativity, improves efficiency, and leaves a lasting impression on clients and visitors. From corporate offices and co-working spaces to retail stores, clinics, and fitness studios, we create environments that balance functionality, comfort, and brand identity.',
    hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85',
    expertise: ['Corporate Offices', 'Co-working Spaces', 'Retail Stores', 'Clinics & Healthcare Facilities', 'Fitness Studios & Gyms', 'Reception & Waiting Areas'],
    projectCat: 'commercial',
  },
  hospitality: {
    title: 'Hospitality Interiors',
    heading: 'Creating Experiences Through Design',
    desc: 'In hospitality, every detail contributes to the guest experience. We design inviting and memorable environments that combine aesthetics, comfort, and functionality, ensuring every visitor feels welcomed and inspired.',
    hero: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1800&q=85',
    expertise: ['Cafés & Restaurants', 'Hotels & Resorts', 'Lounges & Clubhouses', 'Spas & Wellness Centres', 'Banquet & Event Spaces', 'Guest Experience Design'],
    projectCat: 'commercial',
  },
  architecture: {
    title: 'Architecture & Space Planning',
    heading: 'Building Strong Foundations for Exceptional Spaces',
    desc: 'Great design begins with thoughtful planning. Our architectural and space planning services focus on creating efficient layouts, striking elevations, and well-balanced spaces that maximize both aesthetics and functionality.',
    hero: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1800&q=85',
    expertise: ['Architectural Planning', 'Floor Plans & Layouts', 'Elevation Design', 'Facade Design', 'Space Optimization', 'Design Development'],
    projectCat: 'architecture',
  },
  visualization: {
    title: '2D & 3D Visualization',
    heading: 'Bringing Ideas to Life Before Execution',
    desc: 'Visualize your future space with confidence through detailed drawings and realistic 3D renderings. Our design process helps you explore layouts, materials, finishes, and design concepts before construction begins.',
    hero: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85',
    expertise: ['Space Planning', 'Concept Development', '2D Drawings', '3D Visualizations', 'Material Selection', 'Design Presentations'],
    projectCat: 'architecture',
  },
  developer: {
    title: 'Developer Solutions',
    heading: 'Enhancing Properties to Maximize Market Appeal',
    desc: 'We collaborate with developers and builders to create thoughtfully designed spaces that elevate property value and attract potential buyers. From show apartments to common amenities, every space is crafted to leave a lasting impression.',
    hero: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85',
    expertise: ['Sample Flats', 'Sales Offices', 'Clubhouses', 'Entrance Lobbies', 'Amenity Spaces', 'Common Area Design'],
    projectCat: 'commercial',
  },
  renovation: {
    title: 'Renovation & Makeovers',
    heading: 'Transforming Existing Spaces with Purpose',
    desc: 'Whether you\'re updating a home, refreshing a workplace, or modernizing an outdated interior, our renovation services breathe new life into existing spaces while preserving what matters most.',
    hero: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1800&q=85',
    expertise: ['Home Renovations', 'Office Refurbishments', 'Kitchen Upgrades', 'Space Reconfiguration', 'Interior Refreshes', 'Styling & Décor Enhancements'],
    projectCat: 'residential',
  },
}

function ExpertiseItem({ label, index }: { label: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <li
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.55s ease ${index * 80}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms`,
        padding: '12px 0',
        borderBottom: '1px solid rgba(184,150,106,0.12)',
        listStyle: 'none',
      }}
    >
      <span style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: '#C9A96E',
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300,
        fontSize: 14,
        color: 'rgba(245,240,232,0.75)',
        letterSpacing: '0.02em',
      }}>{label}</span>
    </li>
  )
}

export default function ServiceCategory() {
  const { category } = useParams<{ category: string }>()
  const slug = category || ''
  const meta = info[slug]
  const projects = meta?.projectCat ? getProjectsByCategory(meta.projectCat) : []

  if (!meta) {
    return (
      <div className="min-h-screen bg-[#3b4a35] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-[#f5f0e8] font-light mb-6">Service Not Found</h1>
          <Link to="/services" className="text-[#b8966a] text-xs tracking-[0.2em] uppercase hover:text-[#d4b896]">
            ← Back to Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#2A3926' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: '56vh', minHeight: 360, overflow: 'hidden', paddingTop: 80 }}>
        <img
          src={meta.hero}
          alt={meta.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(32,46,28,0.55) 0%, rgba(22,32,20,0.72) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
        }}>
          <FadeIn>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 10,
              letterSpacing: '0.44em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              marginBottom: '1rem',
            }}>Our Services</p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(2.4rem, 5.5vw, 4.25rem)',
              color: '#f5f0e8',
              lineHeight: 1.08,
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            }}>{meta.title}</h1>
            <div style={{
              width: 40,
              height: 1,
              background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
              margin: '0 auto',
            }} />
          </FadeIn>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 2rem 32px' }}>

        {/* Back link */}
        <FadeIn>
          <Link
            to="/services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(201,169,110,0.65)',
              textDecoration: 'none',
              marginBottom: '4rem',
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C9A96E')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(201,169,110,0.65)')}
          >
            ← All Services
          </Link>
        </FadeIn>

        {/* Two-column: heading+desc | expertise */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
          marginBottom: '80px',
        }}>
          {/* Left — heading + description */}
          <FadeIn>
            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 10,
                letterSpacing: '0.44em',
                textTransform: 'uppercase',
                color: '#9B7D4E',
                marginBottom: '1.1rem',
              }}>What We Do</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 'clamp(1.85rem, 3.5vw, 2.85rem)',
                color: '#f5f0e8',
                lineHeight: 1.2,
                marginBottom: '1.75rem',
                letterSpacing: '-0.01em',
              }}>{meta.heading}</h2>
              <div style={{
                width: 36,
                height: 1,
                background: '#C9A96E',
                marginBottom: '1.75rem',
                opacity: 0.6,
              }} />
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: 15,
                color: 'rgba(245,240,232,0.58)',
                lineHeight: 1.9,
              }}>{meta.desc}</p>
            </div>
          </FadeIn>

          {/* Right — expertise */}
          <FadeIn delay={0.15}>
            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 10,
                letterSpacing: '0.44em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                marginBottom: '1.5rem',
              }}>Our Expertise</p>
              <ul style={{ padding: 0, margin: 0 }}>
                {meta.expertise.map((item, i) => (
                  <ExpertiseItem key={item} label={item} index={i} />
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 2rem',
        borderTop: '1px solid rgba(201,169,110,0.12)',
      }} />

      {/* Related projects */}
      {projects.length > 0 && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 2rem 80px' }}>
          <FadeIn>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: 10,
              letterSpacing: '0.44em',
              textTransform: 'uppercase',
              color: '#9B7D4E',
              marginBottom: '0.75rem',
            }}>Selected Work</p>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              color: '#f5f0e8',
              lineHeight: 1.1,
              marginBottom: '3rem',
            }}>Related Projects</h3>
          </FadeIn>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
          }}>
            {projects.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.1}>
                <Link
                  to={`/portfolio/${p.id}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                  className="group"
                >
                  <div style={{ overflow: 'hidden', marginBottom: '1.1rem' }}>
                    <img
                      src={p.coverImage}
                      alt={p.name}
                      style={{
                        width: '100%',
                        aspectRatio: '4/3',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.7s ease',
                      }}
                      className="group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#C9A96E',
                    marginBottom: '0.4rem',
                  }}>{p.location}</p>
                  <h4 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: '1.45rem',
                    color: '#f5f0e8',
                    lineHeight: 1.2,
                    marginBottom: '0.5rem',
                  }}>{p.name}</h4>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: 12,
                    color: 'rgba(245,240,232,0.4)',
                    lineHeight: 1.6,
                    marginBottom: '0.9rem',
                  }}>{p.concept}</p>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 300,
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#C9A96E',
                  }}>
                    View Project <ArrowRight size={11} />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{
        textAlign: 'center',
        padding: '80px 1.5rem',
        borderTop: '1px solid rgba(201,169,110,0.10)',
      }}>
        <FadeIn>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            color: '#f5f0e8',
            fontStyle: 'italic',
            lineHeight: 1.2,
            marginBottom: '1.25rem',
          }}>Ready to start your project?</h3>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 13,
            color: 'rgba(245,240,232,0.4)',
            lineHeight: 1.8,
            maxWidth: 380,
            margin: '0 auto 2.5rem',
          }}>Book a free consultation and let's discuss your vision.</p>
          <Link
            to="/quote"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              backgroundColor: '#C9A96E',
              color: '#1C2818',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              padding: '18px 48px',
              textDecoration: 'none',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#ddb97a')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#C9A96E')}
          >
            Book Free Consultation <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        </FadeIn>
      </div>

    </div>
  )
}
