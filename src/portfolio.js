/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

// Splash Screen
const splashScreen = {
  enabled: true,
  animation: splashAnimation,
  duration: 2000
};

// Summary And Greeting Section
const illustration = {
  animated: true
};

const greeting = {
  username: "Khayem Ben Ghorbel",
  title: "Hey there, I'm Khayem Ben Ghorbel",
  subTitle: emoji(
    "Computer Science Engineering student at CY Tech (France). Passionate about AI, automation, web development, and cybersecurity. Always learning, always building."
  ),
  resumeLink:
    "https://drive.google.com/file/d/1BBtKhAiu9eu3ijApj2Aqa0YHQUj6-_6t/view?usp=sharing",
  portfolio_repository: "https://github.com/khayem487",
  githubProfile: "https://github.com/khayem487",
  displayGreeting: true
};

// Social Media Links
const socialMediaLinks = {
  github: "https://github.com/khayem487",
  linkedin: "https://linkedin.com/in/khayem-ben-ghorbel",
  gmail: "khayembg07@gmail.com",
  display: true
};

// Skills Section
const skillsSection = {
  title: "What I Do",
  subTitle: "Full-stack development, AI, automation, and cybersecurity.",
  skills: [
    emoji("Develop efficient and secure software solutions."),
    emoji("Create AI and machine learning models for real-world applications."),
    emoji("Build responsive web applications with React and Spring Boot."),
    emoji("Participate in hackathons and collaborative innovation projects.")
  ],
  softwareSkills: [
    {
      skillName: "Python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "Java",
      fontAwesomeClassname: "fab fa-java"
    },
    {
      skillName: "C++",
      fontAwesomeClassname: "fas fa-code"
    },
    {
      skillName: "Spring Boot",
      fontAwesomeClassname: "fas fa-leaf"
    },
    {
      skillName: "React",
      fontAwesomeClassname: "fab fa-react"
    },
    {
      skillName: "Linux",
      fontAwesomeClassname: "fab fa-linux"
    },
    {
      skillName: "GitHub",
      fontAwesomeClassname: "fab fa-github"
    }
  ],
  display: true
};

// Education Section
const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "CY Tech – Cergy Paris Université",
      logo: require("./assets/images/cytech.png"),
      subHeader: "Diplôme d'ingénieur en informatique",
      duration: "2025 – 2028",
      desc: "Studying advanced computer science, AI, and cybersecurity.",
      descBullets: [
        "Working on academic and team-based development projects.",
        "Participating in hackathons and AI innovation challenges."
      ]
    },
    {
      schoolName: "Faculté des Sciences de Tunis (FST)",
      logo: require("./assets/images/fst.png"),
      subHeader:
        "Diplôme préparatoire aux études d'ingénieur – Ingénierie informatique",
      duration: "2023 – 2025",
      desc: "Preparatory curriculum focused on math, physics, and computer science.",
      descBullets: [
        "Strengthened programming, algorithms, and logic foundations."
      ]
    }
  ]
};

// Top stacks / skills
const techStack = {
  viewSkillBars: true,
  experience: [
    {
      Stack: "Full-stack development",
      progressPercentage: "85%"
    },
    {
      Stack: "AI & Automation",
      progressPercentage: "80%"
    },
    {
      Stack: "Cybersecurity",
      progressPercentage: "70%"
    }
  ],
  displayCodersrank: false
};

// Work experience section
const workExperiences = {
  display: false,
  experience: []
};

// GitHub / Open source section
const openSource = {
  showGithubProfile: "true",
  display: true
};

// Projects section
const bigProjects = {
  title: "Projects",
  subtitle: "Featured work combining AI, automation, and web development.",
  projects: [
    {
      image: require("./assets/images/kernelins.png"),
      projectName: "Facial Recognition Attendance System",
      projectDesc:
        "Real-time facial recognition system using OpenCV and Python for automated attendance tracking developed during an internship at Kernel Solutions & Innovation.",
      footerLink: [
        {
          name: "View Project",
          url: "https://github.com/khayem487/facial-recognition-attendance"
        }
      ]
    },
    {
      image: require("./assets/images/ieeeCS.png"),
      projectName:
        "American Sign Language Recognition (IEEE CS Hackathon - 2nd Place)",
      projectDesc:
        "TensorFlow and OpenCV based model that recognizes ASL gestures in real-time, built for the IEEE Computer Society AI hackathon competition.",
      footerLink: [
        {
          name: "View Project",
          url: "https://github.com/khayem487/ASL-Recognition"
        }
      ]
    },
    {
      image: require("./assets/images/saayaHealthLogo.webp"),
      projectName: "Car Rental Client App",
      projectDesc:
        "Full-stack car rental management platform built with Spring Boot, Java, and Oracle Database.",
      footerLink: [
        {
          name: "View Project",
          url: "https://github.com/khayem487/car-rental-client"
        }
      ]
    },
    {
      image: require("./assets/images/nextuLogo.webp"),
      projectName: "CROUS Notifier Me",
      projectDesc:
        "Python automation tool that checks CROUS meal updates and pushes notifications automatically.",
      footerLink: [
        {
          name: "View Project",
          url: "https://github.com/khayem487/crous_notifier_me"
        }
      ]
    }
  ],
  display: true
};

// Achievements Section
const achievementSection = {
  title: emoji("Achievements And Certifications"),
  subtitle:
    "Highlights from hackathons, certifications, and projects I'm proud of.",
  achievementsCards: [
    {
      title: "IEEE CS Hackathon - 2nd Place",
      subtitle:
        "American Sign Language real-time recognition model built with TensorFlow and OpenCV.",
      image: require("./assets/images/ieeeCS.png"),
      imageAlt: "IEEE Computer Society",
      footerLink: [
        {
          name: "View Project",
          url: "https://github.com/khayem487/ASL-Recognition"
        }
      ]
    },
    {
      title: "Kernel Solutions & Innovation Internship",
      subtitle:
        "Facial recognition attendance platform deployed for automated workforce tracking.",
      image: require("./assets/images/kernelins.png"),
      imageAlt: "Kernel Solutions",
      footerLink: [
        {
          name: "View Project",
          url: "https://github.com/khayem487/facial-recognition-attendance"
        }
      ]
    }
  ],
  display: true
};

// Blog Section
const blogSection = {
  title: "Blogs",
  subtitle:
    "I write about the lessons learned while building AI, automation, and web solutions.",
  displayMediumBlogs: "false",
  blogs: [],
  display: false
};

// Talks Section
const talkSection = {
  title: "Talks",
  subtitle: "Happy to share knowledge through workshops and events.",
  talks: [],
  display: false
};

// Podcast Section
const podcastSection = {
  title: emoji("Podcast"),
  subtitle: "I enjoy talking about technology, automation, and education.",
  podcast: [],
  display: false
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume or reach out directly.",
  downloadLink:
    "https://drive.google.com/file/d/1BBtKhAiu9eu3ijApj2Aqa0YHQUj6-_6t/view?usp=sharing",
  display: true
};

const contactInfo = {
  title: emoji("Contact Me"),
  subtitle:
    "Want to collaborate or learn more about my work? Feel free to reach out!",
  number: "+33 6 51 01 07 92",
  email_address: "khayembg07@gmail.com"
};

// Twitter Section
const twitterDetails = {
  userName: "",
  display: false
};

const isHireable = true;

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
