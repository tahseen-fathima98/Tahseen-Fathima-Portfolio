import React from "react";
import styles from "../styles/ExperienceSection.module.css";
import { FaBriefcase } from "react-icons/fa";

interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
}

const experiences: Experience[] = [
  {
    title: "Frontend Developer — Founding Team",
    company: "FinnAI",
    duration: "Dec 2024 – Present",
    location: "Remote",
    description:
      "Part of the founding team building an AI-powered hiring platform from the ground up using React, TypeScript, and Tailwind. Led the frontend architecture and helped ship the first version. Working closely with backend and AI engineers to shape features. Also building an internal dashboard (Pillar Bridge) where I’m handling both backend and frontend — integrating filters, export options, and automating manual workflows. More updates coming as the product grows.",
  },
  {
    title: "Freelance Website Developer",
    company: "BrandOverMoon",
    duration: "Jan - Apr 2022",
    location: "Remote, India",
    description:
      "Created clean, responsive websites for clients. Handled both design and development. Regularly collaborated with clients to refine features and update their company’s main site.",
  },
  {
    title: "Junior Front End Developer",
    company: "Makos Infotech",
    duration: "Sep - Dec 2021",
    location: "Remote, India",
    description:
      "Redesigned and developed the company’s official site using PHP. Contributed to other in-development projects. Started as an intern and was promoted to full-time based on performance.",
  },
  {
    title: "Front End Developer Intern",
    company: "BrandsOverMoon",
    duration: "July - Sep 2021",
    location: "Remote, India",
    description:
      "Helped revamp the official website, improved SEO, and added interactivity. Assisted in backend features for a more dynamic experience. Also designed UI/UX posts for social media.",
  },
  {
    title: "Web Development Intern",
    company: "TechEra",
    duration: "Mar - May 2021",
    location: "Remote, India",
    description:
      "Supported the completion and enhancement of the company website. Also mentored students during web development courses.",
  },
  {
    title: "Frontend Developer Intern",
    company: "The Renal Project",
    duration: "Nov 2020 - Feb 2021",
    location: "Remote, India",
    description:
      "Maintained and updated the company’s main site using HTML, CSS, Sass, JavaScript, and jQuery. Focused on making the site mobile-friendly, SEO-optimized, and compatible across browsers.",
  },
  {
    title: "Frontend Developer Intern",
    company: "Tata Steel",
    duration: "Nov 2019 - Feb 2020",
    location: "Jamshedpur, India",
    description:
      "Designed and built a help center website using .Net. Ensured the design was clean, responsive, and easy to navigate across devices and browsers.",
  },
];

const ExperienceSection = () => {
  return (
    <section className={styles.experienceSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Experience</h2>
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`${styles.timelineItem} ${
                index % 2 === 0 ? styles.left : styles.right
              }`}
            >
              <div className={styles.timelineContent}>
                <span className={styles.date}>{exp.duration}</span>
                <h3 className={styles.title}>
                  <FaBriefcase className={styles.icon} />
                  {exp.title}
                </h3>
                <h4 className={styles.company}>{exp.company}</h4>
                <h5 className={styles.location}>{exp.location}</h5>
                <p className={styles.description}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
        <a
          href="/pdf/Tahseen-Fathima Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.resumeButton}
        >
          View Resume
        </a>
      </div>
    </section>
  );
};

export default ExperienceSection;
