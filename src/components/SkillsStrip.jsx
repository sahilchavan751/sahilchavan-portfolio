import React from 'react'

const SkillsStrip = () => {
    const skills = [
        'EDITING', 'FILMMAKER', 'WEB-DEV', 'SOFTWARE DEV', '.NET WPF',
        'C#', 'REACT', 'GSAP', 'FIREBASE', 'CINEMATOGRAPHY',
        'UI/UX', 'POST-PRODUCTION'
    ]

    // Quadruple the list to ensure seamless infinite loop
    const repeatedSkills = [...skills, ...skills, ...skills, ...skills]

    return (
        <section className="skills-strip-section">
            <div className="skills-strip-container">
                <div className="skills-track">
                    {repeatedSkills.map((skill, index) => (
                        <div key={index} className="skill-item">
                            <span className="skill-text">{skill}</span>
                            <span className="skill-dot"></span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SkillsStrip
