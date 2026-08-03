import logoLight from '../../assets/logo-light.png'
import logoDark from '../../assets/logo-dark.png'
import './LoadingScreen.css'

export default function LoadingScreen({ theme = 'dark' }) {
  const logo = theme === 'dark' ? logoDark : logoLight
  return (
    <div className="loading-screen" role="status" aria-label="Loading Ulugbek IELTS Words">
      <div className="loading-screen__mark">
        <img src={logo} alt="" className="loading-screen__logo" />
        <div className="loading-screen__ring" />
      </div>
      <p className="loading-screen__title">Ulugbek IELTS Words</p>
      <p className="loading-screen__caption">Preparing your vocabulary</p>
    </div>
  )
}
