import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import sahilImg from '../assets/about-image/sahil-chavan.jpg'

const Menu = ({ isOpen, onClose }) => {
    const menuItems = [
        { label: 'HOME', href: '#home' },
        { label: 'PROJECTS', href: '/projects' },
        { label: 'ABOUT', href: '#about' }, // We'll add this section later or link to home for now
        { label: 'CONTACT', href: '#contact' }
    ]

    const navigate = useNavigate()

    const handleLinkClick = (e, href) => {
        e.preventDefault()
        onClose()

        // Route-based links (e.g. /projects)
        if (href.startsWith('/')) {
            navigate(href)
            return
        }

        // Hash-based links (scroll on homepage)
        if (window.lenis) {
            if (href === '#home') {
                window.lenis.scrollTo(0, {
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                })
            } else {
                window.lenis.scrollTo(href, {
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                })
            }
        } else {
            const element = document.querySelector(href)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: '-100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="full-screen-menu"
                >
                    <div className="menu-header">
                        <div className="logo">
                            <div className="logo-icon">
                                <img src={sahilImg} alt="Sahil Chavan" className="logo-img" />
                            </div>
                            <span className="logo-text">SAHIL CHAVAN</span>
                        </div>
                        <div className="close-btn" onClick={onClose}>
                            <span>CLOSE</span>
                            <div className="close-icon">✕</div>
                        </div>
                    </div>

                    <nav className="menu-nav">
                        <ul>
                            {menuItems.map((item, index) => (
                                <motion.li
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                >
                                    <a href={item.href} onClick={(e) => handleLinkClick(e, item.href)}>
                                        {item.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </nav>

                    <div className="menu-footer">
                        <div className="footer-col">
                            <span className="footer-label">INQUIRIES</span>
                            <a href="mailto:sahilsbc751@gmail.com">sahilsbc751@gmail.com</a>
                        </div>
                        <div className="footer-col social">
                            <a href="https://www.instagram.com/sahnoir_" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a>
                            <a href="https://www.youtube.com/@sahil.mp4752" target="_blank" rel="noopener noreferrer">YOUTUBE ↗</a>
                            <a href="#">LINKEDIN ↗</a>
                            <a href="#">BEHANCE ↗</a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Menu
