### Dynamic Pages Fetching Strategy

if they have more than 200 items, fetch 100 dynamic items at build time using generateStaticParams and rest are build time, dynamic fetch client data in server pages and components. Avoid enormous server payload, excessive dom size
make video and record then go for lighthouse check
Hero - First Impression
typescript parallax: { speed: 100, direction: 'up' }
animation: { type: 'fade', duration: 1.2 }
SearchFilter - Functional Focus
typescript parallax: { speed: 0 } // Preserves negative margin
animation: { type: 'slide', direction: 'up' }
Features - Key Selling Points
typescript parallax: { speed: 75, direction: 'up' }
// + Individual card animations with stagger
Testimonials - Social Proof
typescript parallax: { speed: 40, direction: 'right' }
// + Individual testimonial scale animations
InstagramGallery - Visual Impact
typescript parallax: { speed: 50, direction: 'down' }
// + Individual image fade-ins with micro-delays
CallToAction - Conversion Focus
typescript parallax: { speed: 80, direction: 'up' }
// + Nested scale animation for button/text
TrustIndicators - Credibility Finale
typescript parallax: { speed: 30, direction: 'up' }
// + Logo fade-ins with sequential delays
