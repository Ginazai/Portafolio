import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
  Avatar,
  Divider,
  Paper
} from '@mui/material';
import {
  Menu as MenuIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  NavigateNext as NavigateNextIcon,
  Close as CloseIcon,
  Launch as LaunchIcon,
  Code as CodeIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import './react-portfolio.css';
import profileImage from './assets/images/profile.jpg';

const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);
const MotionPaper = motion.create(Paper);
const MotionButton = motion.create(Button);

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  detailedDescription: string;
  features: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce application with payment integration",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com",
    demo: "https://demo.com",
    detailedDescription: "A comprehensive e-commerce platform featuring user authentication, product management, shopping cart functionality, and secure payment processing through Stripe integration. Built with modern web technologies and responsive design principles.",
    features: ["User Authentication", "Payment Integration", "Admin Dashboard", "Real-time Inventory"]
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop",
    tags: ["React", "Firebase", "Material-UI"],
    github: "https://github.com",
    demo: "https://demo.com",
    detailedDescription: "A collaborative task management application that enables teams to organize, prioritize, and track their work efficiently. Features real-time synchronization and intuitive drag-and-drop interface.",
    features: ["Real-time Collaboration", "Drag & Drop", "Team Management", "Progress Tracking"]
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with forecasting",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=300&fit=crop",
    tags: ["React", "API Integration", "Charts"],
    github: "https://github.com",
    demo: "https://demo.com",
    detailedDescription: "An elegant weather dashboard that provides detailed weather information, forecasts, and beautiful visualizations. Integrates with multiple weather APIs to provide accurate and comprehensive data.",
    features: ["5-Day Forecast", "Interactive Charts", "Location Search", "Weather Alerts"]
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Personal portfolio with modern animations",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
    tags: ["React", "Framer Motion", "Responsive"],
    github: "https://github.com",
    demo: "https://demo.com",
    detailedDescription: "A stunning personal portfolio website showcasing projects and skills with smooth animations and modern design patterns. Fully responsive and optimized for all devices.",
    features: ["Smooth Animations", "Responsive Design", "SEO Optimized", "Fast Loading"]
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media metrics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    tags: ["React", "D3.js", "REST API"],
    github: "https://github.com",
    demo: "https://demo.com",
    detailedDescription: "A comprehensive analytics dashboard that aggregates and visualizes social media metrics across multiple platforms. Provides insights and trends to help optimize social media strategy.",
    features: ["Multi-platform Support", "Data Visualization", "Trend Analysis", "Export Reports"]
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "Track workouts and monitor fitness progress",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop",
    tags: ["React Native", "Redux", "SQLite"],
    github: "https://github.com",
    demo: "https://demo.com",
    detailedDescription: "A mobile fitness tracking application that helps users log workouts, track progress, and achieve their fitness goals. Features customizable workout plans and detailed analytics.",
    features: ["Workout Logging", "Progress Charts", "Custom Plans", "Goal Setting"]
  }
];

const skills = [
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

function Portfolio() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const theme = useTheme();
  
  // Framer Motion variants for staggered entrance and hover effects
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.03
      }
    }
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0 },
    hover: { translateY: -6, scale: 1.03 }
  } as any;

  const chipHover = { scale: 1.04 };

  useEffect(() => {
    const options = {
      threshold: [0.1, 0.3, 0.5], // Lower thresholds for better detection of larger sections
      rootMargin: '-64px 0px -35% 0px' // Adjusted for header height and to detect sections earlier
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      // Filter for entries that are intersecting
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // Find the entry with the highest intersection ratio
        const mostVisible = visibleEntries.reduce((max, entry) => {
          return (entry.intersectionRatio > max.intersectionRatio) ? entry : max;
        });

        if (mostVisible.intersectionRatio > 0.1) {
          setCurrentSection(mostVisible.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(callback, options);

    // Observe all sections
    const sections = document.querySelectorAll('[id="home"], [id="about"], [id="skills"], [id="projects"], [id="contact"]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  const menuItems = ['home', 'about', 'skills', 'projects', 'contact'];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Rafael Caballero
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item} onClick={() => scrollToSection(item)}>
            <ListItemText primary={item.charAt(0).toUpperCase() + item.slice(1)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a' }}>
      <AppBar position="fixed" sx={{ bgcolor: 'rgba(10, 10, 10, 0.95)', backdropFilter: 'blur(10px)' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, float: 'left' }}>
              RC
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {menuItems.map((item) => (
              <Button
                key={item}
                color="inherit"
                onClick={() => scrollToSection(item)}
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: currentSection === item ? 700 : 400,
                  borderBottom: currentSection === item ? '2px solid #fff' : 'none'
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, bgcolor: '#1a1a1a' }
        }}
      >
        {drawer}
      </Drawer>

      {/* Hero Section */}
      <Box
          id="home"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            px: { xs: 2, md: 0 }
          }}
        >
          <MotionBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ textAlign: 'center', width: '100%', maxWidth: 900 }}
          >
            <Typography variant="h1" sx={{ color: 'white', fontWeight: 800, mb: 2, fontSize: { xs: '3rem', md: '5rem' } }}>
              Rafael Caballero
            </Typography>
            <Typography variant="h4" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4, fontSize: { xs: '1.5rem', md: '2rem' } }}>
              Full Stack Developer
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, maxWidth: 600, mx: 'auto' }}>
              Building exceptional digital experiences with modern web technologies
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              <MotionButton
                variant="contained"
                size="large"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                sx={{
                  bgcolor: 'white',
                  color: '#667eea'
                }}
                onClick={() => scrollToSection('projects')}
              >
                View Projects
              </MotionButton>

              <MotionButton
                variant="outlined"
                size="large"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                sx={{
                  color: 'white',
                  borderColor: 'white'
                }}
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </MotionButton>
            </Box>
          </MotionBox>
        </Container>
      </Box>

      {/* Breadcrumbs */}
      {/* <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ color: 'white' }}>
          <Link color="inherit" onClick={() => scrollToSection('home')} sx={{ cursor: 'pointer' }}>
            Home
          </Link>
          <Typography color="text.primary" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
          </Typography>
        </Breadcrumbs>
      </Container> */}

      {/* About Section */}
      <Box id="about" sx={{ py: 10, bgcolor: '#1a1a1a' }}>
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" sx={{ color: 'white', fontWeight: 700, mb: 6, textAlign: 'center' }}>
              About Me
            </Typography>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
              <Grid sx={{ width: { xs: '100%', md: '33.333%' } }}>
                <Avatar
                  sx={{
                    width: 250,
                    height: 250,
                    margin: '0 auto',
                    border: '4px solid #667eea'
                  }}
                  src={profileImage}
                />
              </Grid>
              <Grid sx={{ width: { xs: '100%', md: '66.666%' } }}>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  I'm a passionate full-stack developer with a keen eye for creating elegant solutions to complex problems. With expertise in modern web technologies, I specialize in building scalable applications that deliver exceptional user experiences.
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  My journey in web development started with a curiosity about how things work on the internet, and has evolved into a career focused on crafting innovative digital solutions. I'm constantly learning and adapting to new technologies to stay at the forefront of web development.
                </Typography>
              </Grid>
            </Grid>
          </MotionBox>
        </Container>
      </Box>

      {/* Skills Section */}
      <Box id="skills" sx={{ py: 10, bgcolor: '#0a0a0a' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 700, mb: 6, textAlign: 'center' }}>
            Skills & Technologies
          </Typography>
          <MotionBox variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Grid container justifyContent="center" alignItems="center" spacing={4}>
            {skills.map((skillGroup, index) => (
              <Grid key={index} sx={{ width: { xs: '100%', md: '33.333%' } }}>
                <MotionPaper
                  variants={itemVariants}
                  transition={{ duration: 0.32, delay: index * 0.04 }}
                  whileHover="hover"
                  sx={{
                    p: 4,
                    bgcolor: '#1a1a1a',
                    borderRadius: 2,
                    border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'default'
                  }}
                >
                  <Typography variant="h5" sx={{ color: '#667eea', fontWeight: 600, mb: 3 }}>
                    {skillGroup.category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skillGroup.items.map((skill, idx) => (
                      <motion.span key={idx} style={{ display: 'inline-block' }} whileHover={chipHover}>
                        <Chip
                          label={skill}
                          sx={{
                            bgcolor: 'rgba(102, 126, 234, 0.1)',
                            color: 'white',
                            border: '1px solid rgba(102, 126, 234, 0.3)'
                          }}
                        />
                      </motion.span>
                    ))}
                  </Box>
                </MotionPaper>
              </Grid>
            ))}
            </Grid>
          </MotionBox>
        </Container>
      </Box>

      {/* Projects Section */}
      <Box id="projects" sx={{ 
                          py: 10, 
                          bgcolor: '#1a1a1a', 
                          spacing: 5
                          }}>
        <Container maxWidth="lg" sx={{textAlign: 'center'}}>
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 700, mb: 6, textAlign: 'center' }}>
            Featured Projects
          </Typography>
          <MotionBox variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
            {projects.map((project, index) => (
              <Grid key={project.id} sx={{ width: { xs: '100%', sm: '75%', md: '33.33333%', lg: '25%' }}}>
                <MotionCard
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: index * 0.04 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.025, y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setHoveredCard(project.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleProjectClick(project)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.18s',
                    '&:hover': {
                      border: '1px solid rgba(102,126,234,0.9)',
                      boxShadow: '0 14px 40px rgba(102,126,234,0.28)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image}
                    alt={project.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white', fontWeight: 600 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {project.tags.map((tag, idx) => (
                        <Chip
                          key={idx}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(102, 126, 234, 0.1)',
                            color: 'white',
                            fontSize: '0.7rem'
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button size="small" startIcon={<CodeIcon />} sx={{ color: '#667eea' }}>
                      View Details
                    </Button>
                  </CardActions>
                  <AnimatePresence>
                    {hoveredCard === project.id && (
                      <MotionBox
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.10 }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(180deg, rgba(102,126,234,0.9), rgba(102,126,234,0.85))',
                          zIndex: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 12,
                          borderRadius: 'inherit'
                        }}
                      >
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                          {project.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }} onClick={() => handleProjectClick(project)}>
                            View Details
                          </Button>
                        </Box>
                      </MotionBox>
                    )}
                  </AnimatePresence>
                </MotionCard>
              </Grid>
            ))}
            </Grid>
          </MotionBox>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{ py: 10, bgcolor: '#0a0a0a' }}>
        <Container maxWidth="md">
          <MotionBox
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" sx={{ color: 'white', fontWeight: 700, mb: 6, textAlign: 'center' }}>
              Get In Touch
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 6, textAlign: 'center' }}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
              <IconButton
                sx={{
                  bgcolor: '#1a1a1a',
                  color: 'white',
                  '&:hover': { bgcolor: '#667eea', transform: 'scale(1.1)' },
                  transition: 'all 0.3s',
                  width: 60,
                  height: 60
                }}
                href="https://github.com/Ginazai" 
                rel="noreferrer"
                target="_blank"
              >
                <GitHubIcon fontSize="large" />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: '#1a1a1a',
                  color: 'white',
                  '&:hover': { bgcolor: '#0077b5', transform: 'scale(1.1)' },
                  transition: 'all 0.3s',
                  width: 60,
                  height: 60
                }}
                href="https://www.linkedin.com/in/rafaeld-caballero"
                rel="noreferrer"
                target="_blank"
              >
                <LinkedInIcon fontSize="large" />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: '#1a1a1a',
                  color: 'white',
                  '&:hover': { bgcolor: '#ea4335', transform: 'scale(1.1)' },
                  transition: 'all 0.3s',
                  width: 60,
                  height: 60
                }}
                href="mailto:rafaeldc1300@gmail.com"
                rel="noreferrer"
                target="_blank"
              >
                <EmailIcon fontSize="large" />
              </IconButton>
            </Box>
          </MotionBox>
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        sx=
        {{ 
          py: 4, 
          bgcolor: '#000', 
          borderTop: '1px solid rgba(255,255,255,0.1)' 
        }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
            © 2025 Rafael Caballero. All rights reserved.
          </Typography>
        </Container>
      </Box>

      {/* Project Dialog */}
      <Dialog
        open={Boolean(selectedProject)}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#1a1a1a',
            backgroundImage: 'none'
          }
        }}
      >
        {selectedProject && (
          <>
            <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography component="div" variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                {selectedProject.title}
              </Typography>
              <IconButton onClick={handleCloseDialog} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <CardMedia
                component="img"
                height="300"
                image={selectedProject.image}
                alt={selectedProject.title}
                sx={{ borderRadius: 2, mb: 3 }}
              />
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3, lineHeight: 1.8 }}>
                {selectedProject.detailedDescription}
              </Typography>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Key Features
              </Typography>
              <Grid container spacing={1} sx={{ mb: 3 }}>
                {selectedProject.features.map((feature, idx) => (
                  <Grid key={idx} component="div" sx={{ width: { xs: '100%', sm: '50%' } }}>
                    <Chip
                      label={feature}
                      sx={{
                        bgcolor: 'rgba(102, 126, 234, 0.1)',
                        color: 'white',
                        width: '100%',
                        justifyContent: 'flex-start'
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
                Technologies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {selectedProject.tags.map((tag, idx) => (
                  <Chip
                    key={idx}
                    label={tag}
                    sx={{
                      bgcolor: 'rgba(102, 126, 234, 0.2)',
                      color: 'white',
                      border: '1px solid rgba(102, 126, 234, 0.4)'
                    }}
                  />
                ))}
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                href={selectedProject.github}
                target="_blank"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                View Code
              </Button>
              <Button
                variant="contained"
                startIcon={<LaunchIcon />}
                href={selectedProject.demo}
                target="_blank"
                sx={{
                  bgcolor: '#667eea',
                  '&:hover': { bgcolor: '#5568d3' }
                }}
              >
                Live Demo
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default Portfolio;