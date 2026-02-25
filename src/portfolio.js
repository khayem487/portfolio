/* Personal portfolio configuration */

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

const uiText = {
  en: {
    nav: {
      skills: "Skills",
      projects: "Projects",
      achievements: "Achievements",
      contact: "Contact"
    },
    section: {
      proficiency: "Proficiency",
      education: "Education",
      projects: "Featured Projects",
      achievements: "Achievements",
      contact: "Contact Me",
      whatIDo: "What I Do"
    },
    actions: {
      contactMe: "Contact me",
      linkedIn: "Message on LinkedIn",
      downloadResume: "Download resume",
      viewCode: "View Code",
      project: "Project"
    },
    recruiterQuickFactsTitle: "Recruiter quick facts",
    skillsFocusTitle: "Current AI focus",
    footerBuiltWith: "Built with React"
  },
  fr: {
    nav: {
      skills: "Compétences",
      projects: "Projets",
      achievements: "Réalisations",
      contact: "Contact"
    },
    section: {
      proficiency: "Niveau",
      education: "Formation",
      projects: "Projets phares",
      achievements: "Réalisations",
      contact: "Me contacter",
      whatIDo: "Ce que je fais"
    },
    actions: {
      contactMe: "Me contacter",
      linkedIn: "Me contacter sur LinkedIn",
      downloadResume: "Télécharger le CV",
      viewCode: "Voir le code",
      project: "Projet"
    },
    recruiterQuickFactsTitle: "Infos clés recruteur",
    skillsFocusTitle: "Focus IA actuel",
    footerBuiltWith: "Construit avec React"
  }
};

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
  title: "Hey, I'm Khayem Ben Ghorbel",
  titleFr: "Salut, je suis Khayem Ben Ghorbel",
  subTitleEn: emoji(
    "Computer Science Engineering student at CY Tech (France), focused on AI, automation, and full-stack development. Currently looking for a 24-month alternance starting September 2026."
  ),
  subTitleFr: emoji(
    "Étudiant ingénieur en informatique à CY Tech (France), spécialisé en IA, automatisation et développement full-stack. Je recherche une alternance de 24 mois à partir de septembre 2026."
  ),
  recruiterQuickFacts: {
    en: [
      "Target roles: AI / Data / Full-stack alternance",
      "Availability: September 2026 · Duration: 24 months",
      "Mobility: France · Base: Cergy"
    ],
    fr: [
      "Postes ciblés : alternance IA / Data / Full-stack",
      "Disponibilité : septembre 2026 · Durée : 24 mois",
      "Mobilité : France · Basé à Cergy"
    ]
  },
  resumeLink: `${process.env.PUBLIC_URL}/CV_Khayem_General_Informatique.pdf`,
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
  titleFr: "Ce que je fais",
  subTitle:
    "AI-first engineering profile: I build practical AI, data, and automation products and ship them end-to-end.",
  subTitleFr:
    "Profil d’ingénieur orienté IA : je construis des produits IA, data et automatisation concrets, jusqu’à la mise en production.",
  focusAreas: [
    "Computer Vision (OpenCV, TensorFlow)",
    "Automation & AI agents (Python, APIs)",
    "LLM workflows and prompt/tool orchestration",
    "Data engineering for model-ready pipelines"
  ],
  focusAreasFr: [
    "Vision par ordinateur (OpenCV, TensorFlow)",
    "Automatisation & agents IA (Python, API)",
    "Workflows LLM et orchestration prompts/outils",
    "Data engineering pour pipelines prêts pour les modèles"
  ],
  skills: [
    emoji("Design AI/ML prototypes (computer vision, automation, LLM workflows) in Python."),
    emoji("Transform models into usable products with APIs, data pipelines, and robust architecture."),
    emoji("Build full-stack interfaces (React / Spring Boot) to deliver measurable business value."),
    emoji("Apply secure coding and DevOps habits to deploy reliable solutions.")
  ],
  skillsFr: [
    emoji("Concevoir des prototypes IA/ML (vision, automatisation, workflows LLM) en Python."),
    emoji("Transformer les modèles en produits exploitables via API, pipelines data et architecture robuste."),
    emoji("Développer des interfaces full-stack (React / Spring Boot) pour générer un impact concret."),
    emoji("Appliquer les bonnes pratiques de sécurité et DevOps pour livrer des solutions fiables.")
  ],
  softwareSkills: [
    {skillName: "Python", fontAwesomeClassname: "fab fa-python"},
    {skillName: "TensorFlow", fontAwesomeClassname: "fas fa-brain"},
    {skillName: "OpenCV", fontAwesomeClassname: "fas fa-camera"},
    {skillName: "LLM / Agents", fontAwesomeClassname: "fas fa-robot"},
    {skillName: "Data Engineering", fontAwesomeClassname: "fas fa-database"},
    {skillName: "React", fontAwesomeClassname: "fab fa-react"},
    {skillName: "Spring Boot", fontAwesomeClassname: "fas fa-leaf"},
    {skillName: "Java", fontAwesomeClassname: "fab fa-java"},
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
      descFr: "Cursus ingénieur orienté logiciel, intelligence artificielle et cybersécurité.",
      descBullets: [
        "Hands-on team projects in application development and data engineering.",
        "Regular participation in hackathons and technical challenges."
      ],
      descBulletsFr: [
        "Projets pratiques en équipe en développement applicatif et data engineering.",
        "Participation régulière à des hackathons et challenges techniques."
      ]
    },
    {
      schoolName: "Faculté des Sciences de Tunis (FST)",
      logo: require("./assets/images/fst.png"),
      subHeader:
        "Diplôme préparatoire aux études d'ingénieur – Ingénierie informatique",
      duration: "2023 – 2025",
      desc: "Preparatory studies in mathematics, physics, algorithms, and programming.",
      descFr: "Classes préparatoires en mathématiques, physique, algorithmique et programmation.",
      descBullets: [
        "Built strong foundations in problem solving and software fundamentals."
      ],
      descBulletsFr: [
        "Consolidation de solides bases en résolution de problèmes et fondamentaux logiciels."
      ]
    }
  ]
};

// Top stacks / skills
const techStack = {
  title: "Proficiency",
  titleFr: "Niveau",
  viewSkillBars: true,
  experience: [
    {
      stackEn: "AI & Automation",
      stackFr: "IA & Automatisation",
      progressPercentage: "88%"
    },
    {
      stackEn: "Data engineering & analytics",
      stackFr: "Data engineering & analytique",
      progressPercentage: "82%"
    },
    {
      stackEn: "Full-stack development",
      stackFr: "Développement full-stack",
      progressPercentage: "80%"
    },
    {
      stackEn: "Cybersecurity fundamentals",
      stackFr: "Fondamentaux cybersécurité",
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
  showGithubProfile: "false",
  display: false
};

// Projects section
const bigProjects = {
  title: "AI-First Projects",
  titleFr: "Projets IA en priorité",
  subtitle:
    "Concrete AI, automation, and software engineering builds with clear outcomes.",
  subtitleFr:
    "Projets concrets en IA, automatisation et ingénierie logicielle avec des résultats clairs.",
  projects: [
    {
      image: require("./assets/images/project-crous.svg").default,
      projectName: "CROUS Notifier Me",
      projectNameFr: "CROUS Notifier Me",
      projectDesc:
        "Python automation tool that monitors CROUS updates and sends notifications to speed up decision making.",
      projectDescFr:
        "Outil d’automatisation Python qui surveille les mises à jour CROUS et envoie des notifications rapidement.",
      impactPoints: [
        "Automates repetitive checks and notifies as soon as updates are detected",
        "Built with a lightweight Python workflow for reliability",
        "Practical tool created from a real student need"
      ],
      impactPointsFr: [
        "Automatise les vérifications répétitives et alerte dès qu’un changement est détecté",
        "Conçu en Python avec un workflow léger et fiable",
        "Outil né d’un besoin concret étudiant"
      ],
      footerLink: [
        {
          name: "View Code",
          nameFr: "Voir le code",
          url: "https://github.com/khayem487/crous_notifier_me"
        }
      ]
    },
    {
      image: require("./assets/images/project-attendance.svg").default,
      projectName: "Facial Recognition Attendance",
      projectNameFr: "Pointage par reconnaissance faciale",
      projectDesc:
        "Internship project: real-time attendance tracking with OpenCV and Python for operational use.",
      projectDescFr:
        "Projet de stage : suivi de présence en temps réel avec OpenCV et Python pour un usage opérationnel.",
      impactPoints: [
        "Real-time face detection and attendance logging",
        "Developed during internship at Kernel Solutions & Innovation",
        "Transforms a manual attendance step into a software workflow"
      ],
      impactPointsFr: [
        "Détection faciale en temps réel et journalisation des présences",
        "Développé pendant un stage chez Kernel Solutions & Innovation",
        "Transforme une tâche manuelle de pointage en workflow logiciel"
      ],
      footerLink: [
        {
          name: "View Code",
          nameFr: "Voir le code",
          url: "https://github.com/khayem487/Facial-Recognition-Attendance"
        }
      ]
    },
    {
      image: require("./assets/images/project-asl.svg").default,
      projectName: "ASL Recognition (Hackathon - 2nd Place)",
      projectNameFr: "Reconnaissance ASL (Hackathon - 2e place)",
      projectDesc:
        "TensorFlow + OpenCV model that recognizes American Sign Language gestures in real time.",
      projectDescFr:
        "Modèle TensorFlow + OpenCV qui reconnaît en temps réel des gestes de langue des signes américaine.",
      impactPoints: [
        "Awarded 2nd place in an IEEE Computer Society hackathon",
        "Real-time recognition pipeline with computer vision",
        "Focused on accessibility-oriented AI use cases"
      ],
      impactPointsFr: [
        "2e place dans un hackathon IEEE Computer Society",
        "Pipeline de reconnaissance en temps réel avec vision par ordinateur",
        "Cas d’usage IA orienté accessibilité"
      ],
      footerLink: [
        {
          name: "View Code",
          nameFr: "Voir le code",
          url: "https://github.com/khayem487/asl-recognition"
        }
      ]
    },
    {
      image: require("./assets/images/project-car-rental.svg").default,
      projectName: "Car Rental Client Application",
      projectNameFr: "Application de gestion de location de voitures",
      projectDesc:
        "Full-stack platform with Spring Boot and Oracle Database for vehicle booking and client management.",
      projectDescFr:
        "Plateforme full-stack avec Spring Boot et Oracle Database pour réservation et gestion client.",
      impactPoints: [
        "End-to-end web architecture (backend + database + client flow)",
        "Spring Boot + Java + Oracle stack",
        "Covers booking and customer management use cases"
      ],
      impactPointsFr: [
        "Architecture web de bout en bout (backend + base de données + parcours client)",
        "Stack Spring Boot + Java + Oracle",
        "Couvre les besoins de réservation et de gestion client"
      ],
      footerLink: [
        {
          name: "View Code",
          nameFr: "Voir le code",
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
  titleFr: emoji("Réalisations"),
  subtitle: "Competition and internship highlights.",
  subtitleFr: "Moments clés en hackathons et en stage.",
  achievementsCards: [
    {
      title: "IEEE CS Hackathon - 2nd Place",
      titleFr: "Hackathon IEEE CS - 2e place",
      subtitle:
        "Built an ASL recognition solution with TensorFlow and OpenCV under hackathon constraints.",
      subtitleFr:
        "Conception d’une solution de reconnaissance ASL avec TensorFlow et OpenCV dans un contexte hackathon.",
      image: require("./assets/images/ieeeCS.png"),
      imageAlt: "IEEE Computer Society",
      footerLink: [
        {
          name: "Project",
          nameFr: "Projet",
          url: "https://github.com/khayem487/asl-recognition"
        }
      ]
    },
    {
      title: "Kernel Solutions Internship",
      titleFr: "Stage Kernel Solutions",
      subtitle:
        "Delivered a functional facial recognition attendance system for real organizational usage.",
      subtitleFr:
        "Réalisation d’un système de pointage fonctionnel par reconnaissance faciale pour un usage réel.",
      image: require("./assets/images/kernelins.png"),
      imageAlt: "Kernel Solutions",
      footerLink: [
        {
          name: "Project",
          nameFr: "Projet",
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
  downloadLink: `${process.env.PUBLIC_URL}/CV_Khayem_General_Informatique.pdf`,
  display: false
};

const contactInfo = {
  title: emoji("Contact Me"),
  titleFr: emoji("Me contacter"),
  subtitle:
    "Open to alternance opportunities (Sept 2026, 24 months). Feel free to reach out.",
  subtitleFr:
    "Disponible pour des opportunités d’alternance (septembre 2026, 24 mois). N’hésitez pas à me contacter.",
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
  uiText,
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
