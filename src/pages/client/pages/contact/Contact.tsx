import React from 'react'
import './contact.scss'

export default function Contact() {
    return (



        <div className="container-xxl py-5">
  <div className="container-contact">
    <h1 className="text-center mb-5 wow fadeInUp thongtinlienhe" data-wow-delay="0.1s">
        Thông tin Liên hệ
    </h1>
    <div className="row g-4">
      <div className="col-12">
        <div className="row gy-4">
          <div className="col-md-4 wow fadeIn" data-wow-delay="0.1s">
            <div className="d-flex align-items-center bg-light rounded p-4">
              <div
                className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3"
                style={{ width: 45, height: 45 }}
              >
                <i className="fa fa-map-marker-alt text-primary" />
              </div>
              <span>Quận Tân Bình, TP.HCM</span>
            </div>
          </div>
          <div className="col-md-4 wow fadeIn" data-wow-delay="0.3s">
            <div className="d-flex align-items-center bg-light rounded p-4">
              <div
                className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3"
                style={{ width: 45, height: 45 }}
              >
                <i className="fa fa-envelope-open text-primary" />
              </div>
              <span>info@example.com</span>
            </div>
          </div>
          <div className="col-md-4 wow fadeIn" data-wow-delay="0.5s">
            <div className="d-flex align-items-center bg-light rounded p-4">
              <div
                className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3"
                style={{ width: 45, height: 45 }}
              >
                <i className="fa fa-phone-alt text-primary" />
              </div>
              <span>+012 345 6789</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <iframe
          className="position-relative rounded w-100 h-100"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.538559316476!2d106.68313515!3d10.777395199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f385570472f%3A0x1787491df0ed8d6a!2zRGluaCDEkOG7mWMgTOG6rXA!5e0!3m2!1svi!2s!4v1710340164667!5m2!1svi!2s"
          frameBorder={0}
          style={{ minHeight: 400, border: 0 }}
          
          aria-hidden="false"
          tabIndex={0}
        />
      </div>
      <div className="col-md-6">
        <div className="wow fadeInUp" data-wow-delay="0.5s">
          <p className="mb-4">
            Hãy liên hệ với chúng tôi bằng cách điền thông tin bên dưới và chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
          </p>
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                  />
                  <label htmlFor="name">Your Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Your Email"
                  />
                  <label htmlFor="email">Your Email</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    placeholder="Subject"
                  />
                  <label htmlFor="subject">Subject</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a message here"
                    id="message"
                    style={{ height: 150 }}
                    defaultValue={""}
                  />
                  <label htmlFor="message">Message</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>




    )
}
