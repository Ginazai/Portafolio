import { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
  Avatar,
  Divider,
  Paper,
  CssBaseline
} from '@mui/material';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectCard } from './components/ProjectCard';
import { SKILLS, PROJECTS, MENU_ITEMS, SOCIAL_LINKS } from './constants';
import profileImage from './assets/images/profile.png';
import './portfolio.css';

const MotionBox = motion(Box as any);
const MotionButton = motion(Button as any);
const MotionPaper = motion(Paper as any);

function Portfolio() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const toggleTheme = () => setMode(m => (m === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => {
    let t = createTheme({
      palette: {
        mode,
        primary: { main: '#667eea' },
        background: { default: mode === 'dark' ? '#0d0d0d' : '#ffffff' }
      }
    });
    t = responsiveFontSizes(t);
    return t;
  }, [mode]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  // Track current section with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((max, entry) => 
            entry.intersectionRatio > max.intersectionRatio ? entry : max
          );
          if (mostVisible.intersectionRatio > 0.1) {
            setCurrentSection(mostVisible.target.id);
          }
        }
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: '-64px 0px -35% 0px' }
    );

    const sections = document.querySelectorAll('[id]');
    sections.forEach(section => observer.observe(section));
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navigation */}
      <Navbar
        currentSection={currentSection}
        onMenuClick={() => setMobileOpen(!mobileOpen)}
        onSectionClick={scrollToSection}
        menuItems={MENU_ITEMS}
        onThemeToggle={toggleTheme}
        mode={mode}
      />

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, bgcolor: 'background.paper' }
        }}
      >
        <Box onClick={() => setMobileOpen(false)} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>Rafael Caballero</Typography>
          <Divider />
          <List>
            {MENU_ITEMS.map(item => (
              <ListItem key={item} onClick={() => scrollToSection(item)}>
                <ListItemText primary={item.charAt(0).toUpperCase() + item.slice(1)} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* HERO SECTION */}
      <Box
        id="home"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{ textAlign: 'center' }}
          >
            <Typography variant="h1" sx={{ color: 'text.primary', fontWeight: 800, mb: 2, fontSize: { xs: '3rem', md: '5rem' } }}>
              Rafael Caballero
            </Typography>
            <Typography variant="h4" sx={{ color: 'text.secondary', mb: 4, fontSize: { xs: '1.5rem', md: '2rem' } }}>
              Full Stack Developer
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, maxWidth: 600, mx: 'auto' }}>
              Building exceptional digital experiences with modern web technologies
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              <MotionButton
                variant="contained"
                size="large"
                whileHover={{ scale: 1.05, y: -4 }}
                sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
                onClick={() => scrollToSection('projects')}
              >
                View Projects
              </MotionButton>
              <MotionButton
                variant="outlined"
                size="large"
                whileHover={{ scale: 1.03, y: -3 }}
                sx={{ color: 'text.primary', borderColor: 'divider' }}
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </MotionButton>
            </Box>
          </MotionBox>
        </Container>
      </Box>

      {/* ABOUT SECTION */}
      <Box id="about" sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ color: 'text.primary', fontWeight: 700, mb: 6, textAlign: 'center' }}>
            About Me
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 4 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Avatar
                sx={{ width: 250, height: 250, border: '4px solid #667eea' }}
                src={profileImage}
              />
            </Box>
            <Box sx={{ width: '100%', maxWidth: { md: '60%' } }}>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, fontSize: '1.1rem', lineHeight: 1.8 }}>
                I'm a passionate full-stack developer with a keen eye for creating elegant solutions to complex problems. 
                With expertise in modern web technologies, I specialize in building scalable applications that deliver 
                exceptional user experiences.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8 }}>
                My journey in web development started with a curiosity about how things work on the internet, and has 
                evolved into a career focused on crafting innovative digital solutions.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* SKILLS SECTION */}
      <Box id="skills" sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ color: 'text.primary', fontWeight: 700, mb: 6, textAlign: 'center' }}>
            Skills & Technologies
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {SKILLS.map((skillGroup, index) => (
              <Box key={index} sx={{ width: { xs: '100%', sm: '48%', md: '31%' } }}>
                <MotionPaper
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  sx={{
                    p: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
                    height: '100%',
                    '&:hover': {
                      border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
                      boxShadow: (theme: Theme) => `0 10px 30px ${theme.palette.primary.main}35`
                    }
                  }}
                >
                  <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 600, mb: 3 }}>
                    {skillGroup.category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skillGroup.items.map((skill, idx) => (
                      <Chip
                        key={idx}
                        label={skill}
                        sx={{ color: 'text.primary', bgcolor: 'transparent', border: (theme: Theme) => `1px solid ${theme.palette.primary.main}` }}
                      />
                    ))}
                  </Box>
                </MotionPaper>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* PROJECTS SECTION */}
      <Box id="projects" sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 700, mb: 6, textAlign: 'center' }}>
            Featured Projects
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {PROJECTS.map((project, index) => (
              <Box key={project.id} sx={{ width: { xs: '100%', sm: '48%', md: '31%' } }}>
                <ProjectCard project={project} index={index} />
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CONTACT SECTION */}
      <Box id="contact" sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ color: 'text.primary', fontWeight: 700, mb: 6, textAlign: 'center' }}>
            Get In Touch
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 6, textAlign: 'center' }}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <IconButton
              sx={{
                bgcolor: 'background.paper',
                color: 'text.primary',
                '&:hover': { bgcolor: 'primary.main', transform: 'scale(1.1)' },
                transition: 'all 0.3s',
                width: 60,
                height: 60
              }}
              href={SOCIAL_LINKS.github}
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
              href={SOCIAL_LINKS.linkedin}
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
              href={SOCIAL_LINKS.email}
              target="_blank"
            >
              <EmailIcon fontSize="large" />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
    </ThemeProvider>
  );
}

export default Portfolio;