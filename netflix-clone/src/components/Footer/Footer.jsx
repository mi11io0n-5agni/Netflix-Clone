import React from 'react'
import { useLocation } from 'react-router-dom'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import './footer.css'

const Footer = () => {
  const location = useLocation()

  const pageName = {
    '/': 'Home',
    '/movies': 'Movies',
    '/tv': 'TV Shows',
    '/latest': 'Latest',
    '/my-list': 'My List'
  }[location.pathname] || (location.pathname.startsWith('/detail') ? 'Detail' : 'Page')

  return (
    <div className="footer_outer_container">
      <div className="footer_inner_container">
        <div className="footer_icons">
          <a href="https://www.facebook.com/netflix" target="_blank" rel="noreferrer" aria-label="Netflix Facebook">
            <FacebookOutlinedIcon />
          </a>
          <a href="https://www.instagram.com/netflix" target="_blank" rel="noreferrer" aria-label="Netflix Instagram">
            <InstagramIcon />
          </a>
          <a href="https://www.youtube.com/@Netflix" target="_blank" rel="noreferrer" aria-label="Netflix YouTube">
            <YouTubeIcon />
          </a>
        </div>

        <div className="footer_data">
          <div>
            <ul>
              <li><a href="https://www.netflix.com/empresas/pt" target="_blank" rel="noreferrer">Audio Descriptions</a></li>
              <li><a href="https://www.netflixinvestor.com" target="_blank" rel="noreferrer">Investor Relations</a></li>
              <li><a href="https://www.netflix.com/privacy" target="_blank" rel="noreferrer">Legal Notices</a></li>
            </ul>
          </div>

          <div>
            <ul>
              <li><a href="https://help.netflix.com" target="_blank" rel="noreferrer">Help Center</a></li>
              <li><a href="https://jobs.netflix.com" target="_blank" rel="noreferrer">Jobs</a></li>
              <li><a href="https://www.netflix.com/privacy#cookie-preferences" target="_blank" rel="noreferrer">Cookie Preferences</a></li>
            </ul>
          </div>

          <div>
            <ul>
              <li><a href="https://www.netflix.com/gift-cards" target="_blank" rel="noreferrer">Gift Cards</a></li>
              <li><a href="https://www.netflix.com/terms-of-use" target="_blank" rel="noreferrer">Terms of Use</a></li>
              <li><a href="https://www.netflix.com/about" target="_blank" rel="noreferrer">Corporate Information</a></li>
            </ul>
          </div>

          <div>
            <ul>
              <li><a href="https://media.netflix.com" target="_blank" rel="noreferrer">Media Center</a></li>
              <li><a href="https://help.netflix.com/legal/privacy" target="_blank" rel="noreferrer">Privacy</a></li>
              <li><a href="https://help.netflix.com/contactus" target="_blank" rel="noreferrer">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer_page_label">Current Page: {pageName}</div>

      <div className="service_code">
        <p>Service Code</p>
      </div>

      <div className="copy_right">&copy; 1997-2026 Netflix, Inc.</div>
    </div>
  )
}

export default Footer
