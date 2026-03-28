import './Categories.scss'
import { Link } from 'react-router-dom'

function Categories() {
  return (
    <div className="categories">
      <div className="cols">
        <div className="row">
          <img
            src="/images/categ1.webp"
            alt="categ1"
            loading="lazy"
            decoding="async"
            width={450}
            height={300}
          />
          <button>
            <Link to="./products/1" className="Sale">
              Sale
            </Link>
          </button>
        </div>
        <div className="row">
          <img
            src="/images/categ2.webp"
            alt="categ2"
            loading="lazy"
            decoding="async"
            width={450}
            height={300}
          />
          <button>
            <Link to="./products/1" className="sale">
              Sale
            </Link>
          </button>
        </div>
      </div>
      <div className="cols">
        <div className="row">
          <img
            src="/images/categ3.webp"
            alt="categ3"
            loading="lazy"
            decoding="async"
            width={450}
            height={300}
          />
          <button>
            <Link to="./products/1" className="sale">
              Sale
            </Link>
          </button>
        </div>
      </div>
      <div className="cols cols-large">
        <div className="row">
          <div className="cols">
            <div className="row">
              <img
                src="/images/categ4.webp"
                alt="categ4"
                loading="lazy"
                decoding="async"
                width={450}
                height={300}
              />
              <button>
                <Link to="./products/1" className="sale">
                  Sale
                </Link>
              </button>
            </div>
          </div>
          <div className="cols">
            <div className="row">
              <img
                src="/images/categ5.webp"
                alt="categ5"
                loading="lazy"
                decoding="async"
                width={450}
                height={300}
              />
              <button>
                <Link to="./products/1" className="sale">
                  Sale
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <img
            src="/images/categ6.webp"
            alt="categ6"
            loading="lazy"
            decoding="async"
            width={450}
            height={300}
          />
          <button>
            <Link to="./products/1" className="sale">
              Sale
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Categories
