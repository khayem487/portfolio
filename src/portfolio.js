/* Personal portfolio configuration */

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

// Splash Screen
const splashScreen = {
  enabled: false,
  animation: splashAnimation,
  duration: 1200
};

// Summary And Greeting Section
const illustration = {
  animated: true
};

const greeting = {
  username: "Khayem Ben Ghorbel",
  title: "Hey, I'm Khayem Ben Ghorbel 👋",
  subTitle: emoji(
    "Computer Science Engineering student at CY Tech (France), focused on AI, automation, and full-stack development. Currently looking for a 24-month alternance starting September 2026."
  ),
  resumeLink:
    "https://drive.google.com/file/d/1BBtKhAiu9eu3ijApj2Aqa0YHQUj6-_6t/view?usp=sharing",
  portfolio_repository: "https://github.com/khayem487/portfolio",
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
  subTitle: "Build practical software with a strong data and AI focus.",
  skills: [
    emoji("Develop full-stack applications with React, Java, and Spring Boot."),
    emoji("Design AI/automation workflows in Python with clean, maintainable code."),
    emoji("Work on data-driven projects from preprocessing to model integration."),
    emoji("Apply secure coding and DevOps habits to ship reliable solutions.")
  ],
  softwareSkills: [
    {skillName: "Python", fontAwesomeClassname: "fab fa-python"},
    {skillName: "Java", fontAwesomeClassname: "fab fa-java"},
    {skillName: "C++", fontAwesomeClassname: "fas fa-code"},
    {skillName: "Spring Boot", fontAwesomeClassname: "fas fa-leaf"},
    {skillName: "React", fontAwesomeClassname: "fab fa-react"},
    {skillName: "Linux", fontAwesomeClassname: "fab fa-linux"},
    {skillName: "GitHub", fontAwesomeClassname: "fab fa-github"}
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
      desc: "Engineering curriculum in software, AI, and cybersecurity.",
      descBullets: [
        "Hands-on team projects in application development and data engineering.",
        "Regular participation in hackathons and technical challenges."
      ]
    },
    {
      schoolName: "Faculté des Sciences de Tunis (FST)",
      logo: require("./assets/images/fst.png"),
      subHeader:
        "Diplôme préparatoire aux études d'ingénieur – Ingénierie informatique",
      duration: "2023 – 2025",
      desc: "Preparatory studies in mathematics, physics, algorithms, and programming.",
      descBullets: [
        "Built strong foundations in problem solving and software fundamentals."
      ]
    }
  ]
};

// Top stacks / skills
const techStack = {
  viewSkillBars: true,
  experience: [
    {Stack: "Full-stack development", progressPercentage: "85%"},
    {Stack: "AI & Automation", progressPercentage: "80%"},
    {Stack: "Data projects", progressPercentage: "78%"},
    {Stack: "Cybersecurity fundamentals", progressPercentage: "70%"}
  ],
  displayCodersrank: false
};

// Work experience section
const workExperiences = {
  display: false,
  experience: []
};

// GitHub / Open source section
// Disabled to avoid empty section when profile.json is not generated.
const openSource = {
  showGithubProfile: "false",
  display: false
};

// Projects section
const bigProjects = {
  title: "Featured Projects",
  subtitle: "Concrete builds in AI, automation, and software engineering.",
  projects: [
    {
      image: require("./assets/images/nextuLogo.webp"),
      projectName: "CROUS Notifier Me",
      projectDesc:
        "Python automation tool that monitors CROUS updates and sends notifications to speed up decision making.",
      footerLink: [
        {
          name: "View Code",
          url: "https://github.com/khayem487/crous_notifier_me"
        }
      ]
    },
    {
      image: require("./assets/images/kernelins.png"),
      projectName: "Facial Recognition Attendance",
      projectDesc:
        "Internship project: real-time attendance tracking with OpenCV and Python for operational use.",
      footerLink: [
        {
          name: "View Code",
          url: "https://github.com/khayem487/Facial-Recognition-Attendance"
        }
      ]
    },
    {
      image: require("./assets/images/ieeeCS.png"),
      projectName: "ASL Recognition (Hackathon - 2nd Place)",
      projectDesc:
        "TensorFlow + OpenCV model that recognizes American Sign Language gestures in real time.",
      footerLink: [
        {
          name: "View Code",
          url: "https://github.com/khayem487/asl-recognition"
        }
      ]
    },
    {
      image: require("./assets/images/saayaHealthLogo.webp"),
      projectName: "Car Rental Client Application",
      projectDesc:
        "Full-stack platform with Spring Boot and Oracle Database for vehicle booking and client management.",
      footerLink: [
        {
          name: "View Code",
          url: "https://github.com/khayem487/car-rental-client"
        }
      ]
    }
  ],
  display: true
};

// Achievements Section
const achievementSection = {
  title: emoji("Achievements"),
  subtitle: "Competition and internship highlights.",
  achievementsCards: [
    {
      title: "IEEE CS Hackathon - 2nd Place",
      subtitle:
        "Built an ASL recognition solution with TensorFlow and OpenCV under hackathon constraints.",
      image: require("./assets/images/ieeeCS.png"),
      imageAlt: "IEEE Computer Society",
      footerLink: [
        {name: "Project", url: "https://github.com/khayem487/asl-recognition"}
      ]
    },
    {
      title: "Kernel Solutions Internship",
      subtitle:
        "Delivered a functional facial recognition attendance system for real organizational usage.",
      image: require("./assets/images/kernelins.png"),
      imageAlt: "Kernel Solutions",
      footerLink: [
        {
          name: "Project",
          url: "https://github.com/khayem487/Facial-Recognition-Attendance"
        }
      ]
    }
  ],
  display: true
};

// Blog Section
const blogSection = {
  title: "Blogs",
  subtitle: "Technical notes and build logs.",
  displayMediumBlogs: "false",
  blogs: [],
  display: false
};

// Talks Section
const talkSection = {
  title: "Talks",
  subtitle: "Workshops and technical sharing sessions.",
  talks: [],
  display: false
};

// Podcast Section
const podcastSection = {
  title: emoji("Podcast"),
  subtitle: "Tech conversations and learning notes.",
  podcast: [],
  display: false
};

// Resume section hidden from navbar (download button remains in hero section)
const resumeSection = {
  title: "Resume",
  subtitle: "Download my latest resume.",
  downloadLink:
    "https://drive.google.com/file/d/1BBtKhAiu9eu3ijApj2Aqa0YHQUj6-_6t/view?usp=sharing",
  display: false
};

const contactInfo = {
  title: emoji("Contact Me"),
  subtitle:
    "Open to alternance opportunities (Sept 2026, 24 months). Feel free to reach out.",
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
