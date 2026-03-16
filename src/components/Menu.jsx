import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import sahilImg from '../assets/about-image/sahil-chavan.jpg'

const Menu = ({ isOpen, onClose }) => {
    const menuItems = [
        { label: 'HOME', href: '#home' },
        { label: 'PROJECTS', href: '/projects' },
        { label: 'ABOUT', href: '/about' },
        { label: 'CONTACT', href: '/contact' }
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
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="full-screen-menu"
                >
                    <div className="menu-block-layout">
                        {/* Header Block */}
                        <div className="menu-header-block">
                            <div className="logo">
                                <span className="logo-text">SAHIL CHAVAN</span>
                            </div>
                            <div className="close-btn" onClick={onClose}>
                                <span>CLOSE</span>
                                <div className="close-icon">✕</div>
                            </div>
                        </div>

                        {/* Navigation Grid Blocks */}
                        <nav className="menu-nav-blocks">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    className="nav-block-cell"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                >
                                    <a 
                                        href={item.href} 
                                        className="nav-block-link"
                                        onClick={(e) => handleLinkClick(e, item.href)}
                                    >
                                        <div className="nav-block-content">
                                            <span className="nav-index">{(index + 1).toString().padStart(2, '0')}</span>
                                            <h2>{item.label}</h2>
                                        </div>
                                    </a>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Footer Grid Blocks */}
                        <div className="menu-footer-blocks">
                            <div className="footer-block-cell contact-cell">
                                <span className="footer-label">INQUIRIES</span>
                                <a href="mailto:sahilsbc751@gmail.com" className="footer-email-link">SAHILSBC751@GMAIL.COM</a>
                            </div>
                            <div className="footer-block-cell social-cell">
                                <span className="footer-label">SOCIALS</span>
                                <div className="social-links-row">
                                    <a href="https://www.instagram.com/sahnoir_" target="_blank" rel="noopener noreferrer">IG</a>
                                    <a href="https://www.youtube.com/@sahil.mp4752" target="_blank" rel="noopener noreferrer">YT</a>
                                    <a href="#">LI</a>
                                    <a href="#">BE</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Menu
