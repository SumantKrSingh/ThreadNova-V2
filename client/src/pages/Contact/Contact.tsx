import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import PinterestIcon from '@mui/icons-material/Pinterest'
import { useState } from 'react'
import './Contact.scss'

const faqs = [
  {
    id: 1,
    q: 'How long does shipping take?',
    a: 'Standard delivery takes 3-5 business days across India. Express delivery available at checkout.',
  },
  {
    id: 2,
    q: 'What is your return policy?',
    a: 'We accept returns within 7 days of delivery. Items must be unused with original tags attached.',
  },
  {
    id: 3,
    q: 'How do I track my order?',
    a: "Once your order ships you'll receive a tracking link via email.",
  },
  {
    id: 4,
    q: 'Do you ship internationally?',
    a: 'Currently we ship within India only. International shipping coming soon!',
  },
]

const storeInfo = [
  { id: 1, label: 'EMAIL', value: 'support@threadnova.in', sub: 'For orders and general queries' },
  { id: 2, label: 'PHONE', value: '+91 98765 43210', sub: 'Mon-Sat, 10am - 6pm IST' },
  {
    id: 3,
    label: 'ADDRESS',
    value: 'Thread~Nova Store,  Connaught Place, New Delhi 110001, India',
    sub: '',
  },
  { id: 4, label: 'BUSINESS HOURS', value: 'Mon - Sat: 10am - 8pm', sub: 'Sunday: 12pm - 6pm' },
]

const textFieldSx = {
  input: { color: 'var(--text)' },
  textarea: { color: 'var(--text)' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'var(--neutral)',
    },
    '&:hover fieldset': {
      borderColor: 'var(--purple)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--purple)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'var(--textLite)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'var(--purple)',
  },
}

const categories = ['Order Issue', 'Product query', 'Returns', 'General', 'Feedback']

const Contact = () => {
  const [selectedCategory, setSelectedCategory] = useState('Order Issue')
  const [open, setOpen] = useState(false)
  const handleSubmit = () => {
    setOpen((p) => !p)
  }

  return (
    <>
      <section className="contact-hero">
        <span className="contact-strip">🌞 Built with MUI TextField + Button + Snackbar</span>
        <span className="contact-tag">GET IN TOUCH</span>
        <h2 className="contact-title">We'd love to hear from you</h2>
        <p className="contact-desc">
          Have a question about an order, need styling advice, or just want to say hi? Fill in the
          form and we'll get back to you within 24 hours.
        </p>
      </section>

      <section className="enquiry-page">
        <div className="enquiry-form">
          <h2 className="enquiry-title">Send us a message</h2>
          <div className="chip-grp">
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? 'filled' : 'outlined'}
                sx={{
                  cursor: 'pointer',
                  borderColor: `var(--muted)`,
                  color: selectedCategory === cat ? `var(--text)` : `var(--muted)`,
                  backgroundColor: selectedCategory === cat ? `var(--purple)` : `transparent`,
                  padding: `1, 2`,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              />
            ))}
          </div>

          <div className="name-row">
            <TextField label="First Name" variant="outlined" fullWidth sx={textFieldSx} />
            <TextField label="Last Name" variant="outlined" fullWidth sx={textFieldSx} />
          </div>

          <div className="feild-row">
            <TextField
              label="Email address"
              type="email"
              variant="outlined"
              fullWidth
              sx={textFieldSx}
            />
            <TextField
              label="Phone number (optional)"
              type="phone number"
              variant="outlined"
              fullWidth
              sx={textFieldSx}
            />
            <TextField
              label="Your Message"
              type="Tell us how we can  help you..."
              variant="outlined"
              fullWidth
              sx={textFieldSx}
            />

            <Button
              variant="outlined"
              fullWidth
              onClick={handleSubmit}
              sx={{
                padding: '0.75rem',
                borderColor: 'var(--grey)',
                color: 'var(--text)',
                fontSize: '1rem',
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'var(--purple)',
                  color: 'var(--purple)',
                },
              }}
            >
              Send message
            </Button>
          </div>

          <span className="note">We typically reply within 24 hours on business days.</span>

          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity="success" onClose={() => setOpen(false)} sx={{ width: '100%' }}>
              Message sent! We'll get back to you within 24 hours.
            </Alert>
          </Snackbar>
        </div>

        <div className="store-info">
          <h2 className="store-title">Store information</h2>
          {storeInfo.map(({ id, label, value, sub }) => (
            <div className="info-card" key={id}>
              <span className="info-label">{label}</span>
              <p className="info-value">{value}</p>
              {sub && <span className="info-sub">{sub}</span>}
            </div>
          ))}

          {/* Follow us */}
          <div className="social-links">
            <span className="social-heading">Follow us</span>
            <div className="social-icons">
              {[InstagramIcon, TwitterIcon, FacebookIcon, PinterestIcon].map((Icon, i) => (
                <div key={i} className="social-icon">
                  <Icon sx={{ color: 'var(--grey)', fontSize: '1.5rem' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="faq">
        <h2 className="faq-title">Frequently asked questions</h2>
        <div className="faq-grid">
          {faqs.map(({ id, q, a }) => (
            <div className="faq-card" key={id}>
              <h4 className="faq-ques">{q}</h4>
              <p className="faq-answ">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Contact
