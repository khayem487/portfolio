/* Personal portfolio configuration */

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

const uiText = {
  en: {
    nav: {
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      achievements: "Achievements",
      contact: "Contact"
    },
    section: {
      proficiency: "Proficiency",
      education: "Education",
      projects: "Featured Projects",
      experience: "Professional experience",
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
      experience: "Expérience",
      achievements: "Réalisations",
      contact: "Contact"
    },
    section: {
      proficiency: "Niveau",
      education: "Formation",
      projects: "Projets phares",
      experience: "Expérience professionnelle",
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
    "Second-year Computer Science Engineering student at CY Tech, focused on AI, Python, and software development. Seeking a 4–6 month internship from March 2027, followed by a 12-month work-study placement (contrat de professionnalisation) from September 2027."
  ),
  subTitleFr: emoji(
    "Élève ingénieur en 2e année à CY Tech, orienté IA, Python et développement logiciel. Je recherche un stage de 4 à 6 mois dès mars 2027, puis une alternance en contrat de professionnalisation de 12 mois dès septembre 2027."
  ),
  recruiterQuickFacts: {
    en: [
      "Target roles: AI / Data / Software engineering",
      "Internship: March 2027 · 4–6 months",
      "Work-study: September 2027 · 12 months · contrat de professionnalisation",
      "Mobility: France · Base: Cergy"
    ],
    fr: [
      "Domaines : IA / Data / Développement logiciel",
      "Stage : mars 2027 · 4 à 6 mois",
      "Alternance : septembre 2027 · 12 mois · contrat de professionnalisation",
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
  linkedin: "https://www.linkedin.com/in/khayem-bg/",
  gmail: "khayembg07@gmail.com",
  display: true
};

// Skills Section
const skillsSection = {
  title: "What I Do",
  titleFr: "Ce que je fais",
  subTitle:
    "I build AI and automation prototypes, from document processing and data pipelines to usable software.",
  subTitleFr:
    "Je conçois des prototypes IA et d’automatisation, du traitement documentaire aux pipelines de données et aux applications.",
  focusAreas: [
    "Computer Vision (OpenCV, MediaPipe, scikit-learn)",
    "Automation & AI agents (Python, APIs)",
    "LLM workflows and prompt/tool orchestration",
    "Data engineering for model-ready pipelines"
  ],
  focusAreasFr: [
    "Vision par ordinateur (OpenCV, MediaPipe, scikit-learn)",
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
    {skillName: "scikit-learn", fontAwesomeClassname: "fas fa-brain"},
    {skillName: "OpenCV", fontAwesomeClassname: "fas fa-camera"},
    {skillName: "LLM / Agents", fontAwesomeClassname: "fas fa-robot"},
    {skillName: "Data Engineering", fontAwesomeClassname: "fas fa-database"},
    {skillName: "PostgreSQL", fontAwesomeClassname: "fas fa-database"},
    {skillName: "Docker", fontAwesomeClassname: "fab fa-docker"},
    {skillName: "MCP / n8n", fontAwesomeClassname: "fas fa-project-diagram"},
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
  viewSkillBars: false,
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
  display: true,
  experience: [
    {
      company: "One Tech Business Solutions",
      role: "AI & Automation Intern — R&D",
      roleFr: "Stagiaire IA et automatisation — R&D",
      date: "June–August 2026 · Tunis, Tunisia · 2 months",
      dateFr: "Juin–août 2026 · Tunis, Tunisie · 2 mois",
      desc: "Built a functional Python proof of concept for AI-assisted analysis of public calls for tenders.",
      descFr: "Développement d’un prototype fonctionnel en Python pour assister l’analyse d’appels d’offres publics.",
      descBullets: [
        "Document collection and extraction, requirements analysis, and structured Go/No-Go decision support.",
        "Orchestration of agents and tools, database integration, and workflow automation.",
        "Iterative development with the R&D team, testing, technical documentation, and demonstration."
      ],
      descBulletsFr: [
        "Collecte et extraction documentaire, analyse des exigences et aide à la décision Go/No-Go structurée.",
        "Orchestration d’agents et d’outils, intégration d’une base de données et automatisation des workflows.",
        "Développement itératif avec l’équipe R&D, tests, documentation technique et démonstration."
      ]
    }
  ]
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
      image: require("./assets/images/project-tender.svg").default,
      projectName: "AI-assisted Tender Analysis",
      projectNameFr: "Analyse d’appels d’offres par agents IA",
      projectDesc: "Summer 2026 internship at One Tech Business Solutions: a functional prototype for public tender monitoring and decision support.",
      projectDescFr: "Stage été 2026 chez One Tech Business Solutions : un prototype fonctionnel de veille et d’aide à la décision sur les appels d’offres publics.",
      impactPoints: [
        "My work: Python collection, document extraction/OCR, and PostgreSQL integration",
        "Agent and tool orchestration for traceable Go/No-Go analysis; MCP and n8n workflows",
        "Structured outputs, duplicate prevention, tests, and technical documentation"
      ],
      impactPointsFr: [
        "Ma contribution : collecte Python, extraction documentaire/OCR et intégration PostgreSQL",
        "Orchestration d’agents et d’outils pour une analyse Go/No-Go traçable ; workflows MCP et n8n",
        "Sorties structurées, prévention des doublons, tests et documentation technique"
      ],
      footerLink: [
        {
          name: "Workflow walkthrough",
          nameFr: "Démonstration du workflow",
          url: `${process.env.PUBLIC_URL}/stage-demo/`
        },
        {name: "Internship details", nameFr: "Détails du stage", url: "#experience"}
      ]
    },
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
        "Computer vision pipeline for ASL gesture recognition using OpenCV, MediaPipe, and a scikit-learn Random Forest classifier.",
      projectDescFr:
        "Pipeline de reconnaissance de gestes ASL avec OpenCV, MediaPipe et un classifieur Random Forest scikit-learn.",
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
        "Built an ASL gesture recognition solution using computer vision under hackathon constraints.",
      subtitleFr:
        "Conception d’une solution de reconnaissance de gestes ASL par vision par ordinateur dans un contexte hackathon.",
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
    "Seeking an AI, data, or software internship from March 2027 (4–6 months), followed by a 12-month contrat de professionnalisation from September 2027. Let’s discuss your team’s projects.",
  subtitleFr:
    "À la recherche d’un stage en IA, data ou développement dès mars 2027 (4 à 6 mois), puis d’une alternance en contrat de professionnalisation de 12 mois dès septembre 2027. Échangeons sur les projets de votre équipe.",
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

