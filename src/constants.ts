import { Home as HomeIcon } from '@mui/icons-material';

export const MENU_ITEMS = [`home`, 'about', 'skills', 'projects', 'contact'];

export const SKILLS = [
  { 
    category: "Programming Languages", 
    items: ["C", "C++", "Java", "C#", "SQL", "JavaScript", "HTML", "LaTeX", "CSS", "Python", "PHP", "Dart"] 
  },
  { 
    category: "Frontend", 
    items: ["React", "TypeScript", "Material-UI", "Framer Motion", "Redux"] 
  },
  { 
    category: "Backend", 
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "SpringBoot"] 
  },
  { 
    category: "Tools", 
    items: ["Git", "Jira", "Docker", "Firebase", "Jest", "Pipedream", "Postman"] 
  },
  { 
    category: "Soft Skills", 
    items: ["Conflict resolution", "client support", "complex case management", "communication", "teamwork", "analytical thinking", "problem-solving", "results orientation"] 
  }
];

export const SOCIAL_LINKS = {
  github: "https://github.com/Ginazai",
  linkedin: "https://www.linkedin.com/in/rafaeld-caballero",
  email: "mailto:rafaeldc1300@gmail.com"
};

// Import your projects from existing file
export { projects as PROJECTS } from './assets/data/projects';
