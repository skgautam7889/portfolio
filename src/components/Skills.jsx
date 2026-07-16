
import {
    FaGlobe,
    FaReact,
    FaNode,
    FaPhp,
    FaPython,
    FaGit,
    FaBriefcase,
    FaProjectDiagram,
    FaUsers,
    FaCode,
    FaMobileAlt,
    FaPaintBrush,
    FaDownload,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaWhatsapp,
    FaGraduationCap,
} from 'react-icons/fa';
import {
    SiNextdotjs,
    SiTypescript,
    SiLaravel,
    SiMysql,
    SiPostgresql,
    SiMongodb,
    SiDocker,
    SiHtml5,
} from 'react-icons/si';

import data from '../data/portfolio.json';
import SectionTitle from './common/SectionTitle';
import { useRef } from 'react';

const Skills = () => {
    const { skills } = data;
    const iconMap = {
        FaGlobe,
        FaReact,
        FaNode,
        FaPhp,
        FaPython,
        FaGit,
        FaBriefcase,
        FaProjectDiagram,
        FaUsers,
        FaCode,
        FaMobileAlt,
        FaPaintBrush,
        FaDownload,
        FaEnvelope,
        FaPhone,
        FaMapMarkerAlt,
        FaWhatsapp,
        FaGraduationCap,
        SiNextdotjs,
        SiTypescript,
        SiLaravel,
        SiMysql,
        SiPostgresql,
        SiMongodb,
        SiDocker,
        SiHtml5,
    };
    const cardRefs = useRef([]);
    return (
        <section id="skills" className="section section-alt">
            <div className="container">
                <SectionTitle title="My Skills" subtitle="Technologies & tools I work with" />
                {skills?.categories?.map((category, idx) => (
                    <div key={idx} className="mb-4">
                        <h4 style={{ color: 'var(--color-text-primary)', marginBottom: '20px' }}>{category.name}</h4>
                        <div className="row g-4 stagger-children">
                            {category.skills?.map((skill, skillIdx) => {
                                const Icon = iconMap[skill.icon] || FaCode;
                                return (
                                    <div
                                        key={skillIdx}
                                        className="col-6 col-md-4 col-lg-3"
                                        ref={(el) => (cardRefs.current[idx * 10 + skillIdx] = el)}
                                    >
                                        <div className="card card--skill card--3d">
                                            <div className="skill-icon">
                                                <Icon />
                                            </div>
                                            <h5 className="card-title">{skill.name}</h5>
                                            <div className="skill-bar">
                                                <div className="skill-bar-fill" style={{ width: `${skill.percentage || 0}%` }} />
                                            </div>
                                            <span className="skill-percent">{skill.percentage || 0}%</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Skills
