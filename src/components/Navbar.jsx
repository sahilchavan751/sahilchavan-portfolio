import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import sahilImg from '../assets/about-image/sahil-chavan.jpg'

gsap.registerPlugin(ScrollTrigger)

const Navbar = ({ onMenuOpen }) => {
    const navRef = useRef(null)

    useEffect(() => {
        const nav = navRef.current
        if (!nav) return

        // Define which sections have WHITE/LIGHT backgrounds (need dark navbar)
        const lightSections = document.querySelectorAll(
            '.hero, .process-section, .about-horizontal-section, .tech-grid-section, .footer-zoom-wrapper'
        )

        const triggers = []

        lightSections.forEach((section) => {
            const st = ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: "bottom top",
                onEnter: () => {
                    nav.classList.remove('navbar--light')
                    nav.classList.add('navbar--dark')
                },
                onLeave: () => {
                    nav.classList.remove('navbar--dark')
                    nav.classList.add('navbar--light')
                },
                onEnterBack: () => {
                    nav.classList.remove('navbar--light')
                    nav.classList.add('navbar--dark')
                },
                onLeaveBack: () => {
                    nav.classList.remove('navbar--dark')
                    nav.classList.add('navbar--light')
                },
            })
            triggers.push(st)
        })

        return () => {
            triggers.forEach(t => t.kill())
        }
    }, [])

    return (
        <nav className="navbar navbar--light" ref={navRef}>
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
