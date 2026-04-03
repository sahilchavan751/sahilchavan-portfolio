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
            '.hero, .footer-zoom-wrapper'
        )

        const triggers = []

        lightSections.forEach((section) => {
            const isHero = section.classList.contains('hero');
            
            const st = ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: "bottom top",
                onEnter: () => {
                    nav.classList.remove('navbar--light');
                    nav.classList.add('navbar--dark');
                },
                onLeave: () => {
                    nav.classList.remove('navbar--dark');
                    nav.classList.add('navbar--light');
                },
                onEnterBack: () => {
                    nav.classList.remove('navbar--light');
                    nav.classList.add('navbar--dark');
                },
                onLeaveBack: () => {
                    // Only revert to light if it's NOT the hero section 
                    // (since nothing is above the hero to revert to)
                    if (!isHero) {
                        nav.classList.remove('navbar--dark');
                        nav.classList.add('navbar--light');
                    }
                },
            });
            triggers.push(st);
        })

        return () => {
            triggers.forEach(t => t.kill())
        }
    }, [])

    return (
        <nav className="navbar navbar--dark" ref={navRef}>
            <div className="logo">
            </div>
            <div className="menu-trigger" onClick={onMenuOpen}>
                <img
                    className="hamburger-icon"
                    src="/svg/hambuger.svg"
                    alt="Menu"
                    width="45"
                    height="45"
                />
            </div>
        </nav>
    )
}

export default Navbar
