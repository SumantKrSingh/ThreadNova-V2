import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CallIcon from '@mui/icons-material/Call'
import './Store.scss'

const stores = [
  {
    id: 1,
    city: 'New Delhi',
    area: 'Connaught Place',
    address: 'Block A, Connaught Place, New Delhi – 110001',
    hours: '10am – 9pm',
    phone: '+91 11 2345 6789',
    isOpen: true,
    flagship: true,
  },
  {
    id: 2,
    city: 'Mumbai',
    area: 'Bandra West',
    address: 'Hill Road, Bandra West, Mumbai – 400050',
    hours: '11am – 9pm',
    phone: '+91 22 2345 6789',
    isOpen: true,
    flagship: true,
  },
  {
    id: 3,
    city: 'Bangalore',
    area: 'Indiranagar',
    address: '100 Feet Road, Indiranagar, Bangalore – 560038',
    hours: '10am – 8pm',
    phone: '+91 80 2345 6789',
    isOpen: false,
    flagship: false,
  },
  {
    id: 4,
    city: 'Hyderabad',
    area: 'Banjara Hills',
    address: 'Road No. 12, Banjara Hills, Hyderabad – 500034',
    hours: '10am – 8pm',
    phone: '+91 40 2345 6789',
    isOpen: true,
    flagship: false,
  },
  {
    id: 5,
    city: 'Pune',
    area: 'Koregaon Park',
    address: 'Lane 5, Koregaon Park, Pune – 411001',
    hours: '10am – 8pm',
    phone: '+91 20 2345 6789',
    isOpen: false,
    flagship: false,
  },
  {
    id: 6,
    city: 'Chennai',
    area: 'T. Nagar',
    address: 'Pondy Bazaar, T. Nagar, Chennai – 600017',
    hours: '10am – 9pm',
    phone: '+91 44 2345 6789',
    isOpen: true,
    flagship: false,
  },
]

const Store = () => {
  return (
    <div className="stores-page">
      <div className="stores-hero">
        <span className="stores-tag">Find us</span>
        <h1>Our stores</h1>
        <p>Visit Thread~Nova in person and experience our full collection.</p>
      </div>

      <div className="stores-grid">
        {stores.map((store) => (
          <div key={store.id} className="store-card">
            <div className="store-card-top">
              <div className="store-city-info">
                <h2>{store.city}</h2>
                <span className="store-area">{store.area}</span>
              </div>
              <div className="store-badges">
                {store.flagship && <span className="badge flagship">Flagship</span>}
                <span className={`badge ${store.isOpen ? 'open' : 'closed'}`}>
                  {store.isOpen ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>

            <div className="store-info-list">
              <div className="store-info-row">
                <LocationOnIcon style={{ fontSize: '1.6rem', color: '#9b8cff' }} />
                <span>{store.address}</span>
              </div>
              <div className="store-info-row">
                <AccessTimeIcon style={{ fontSize: '1.6rem', color: '#9b8cff' }} />
                <span>{store.hours}</span>
              </div>
              <div className="store-info-row">
                <CallIcon style={{ fontSize: '1.6rem', color: '#9b8cff' }} />
                <span>{store.phone}</span>
              </div>
            </div>

            <a
              href={`https://maps.google.com/?q=${store.address}`}
              target="_blank"
              rel="noreferrer"
              className="store-directions-btn"
            >
              Get directions
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Store
