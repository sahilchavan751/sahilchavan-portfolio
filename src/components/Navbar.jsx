import sahilImg from '../assets/about-image/sahil-chavan.jpg'

const Navbar = ({ onMenuOpen }) => {
    return (
        <nav className="navbar navbar--light">
            <div className="logo">
                <div className="logo-icon">
                    <img src={sahilImg} alt="Sahil Chavan" className="logo-img" />
                </div>
                <span className="logo-text">SAHIL CHAVAN — 21</span>
            </div>
            <div className="menu-trigger" onClick={onMenuOpen}>
                <span className="menu-btn-text">MENU</span>
                <div className="hamburger">
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
