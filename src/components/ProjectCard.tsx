import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
} from '@mui/material';
import {
  Code as CodeIcon,
  Close as CloseIcon,
  GitHub as GitHubIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import type { Theme } from '@mui/material/styles';
import type { Project } from '../types';

const MotionCard = motion(Card as any);

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02, y: -4 }}
        onClick={() => setOpen(true)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
          cursor: 'pointer',
          '&:hover': {
            border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
            boxShadow: (theme: Theme) => `0 14px 40px ${theme.palette.primary.main}33`
          }
        }}
      >
        <CardMedia component="img" height="200" image={project.image} alt={project.title} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 600, mb: 2 }}>
            {project.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            {project.description}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {project.tags.slice(0, 3).map((tag, idx) => (
              <Chip
                key={idx}
                label={tag}
                size="small"
                sx={{ bgcolor: 'transparent', color: 'text.primary', fontSize: '0.7rem', border: (theme: Theme) => `1px solid ${theme.palette.primary.main}` }}
              />
            ))}
          </Box>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button size="small" startIcon={<CodeIcon />} sx={{ color: 'primary.main' }}>
            View Details
          </Button>
        </CardActions>
      </MotionCard>

      {/* Project Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { bgcolor: 'background.paper', backgroundImage: 'none' } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 600 }}>
            {project.title}
          </Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: 'text.primary' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CardMedia
            component="img"
            height="300"
            image={project.image}
            alt={project.title}
            sx={{ borderRadius: 2, mb: 3 }}
          />
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.8 }}>
            {project.detailedDescription}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
            Key Features
          </Typography>
          <Grid container spacing={1} sx={{ mb: 3 }}>
            {project.features.map((feature, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <Chip
                  label={feature}
                  sx={{
                    bgcolor: 'transparent',
                    color: 'text.primary',
                    width: '100%',
                    justifyContent: 'flex-start',
                    border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>
            Technologies
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {project.tags.map((tag, idx) => (
              <Chip
                key={idx}
                label={tag}
                sx={{
                  bgcolor: 'transparent',
                  color: 'text.primary',
                  border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`
                }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            href={project.github}
            target="_blank"
            sx={{
              color: 'text.primary',
              borderColor: (theme: Theme) => theme.palette.divider,
              '&:hover': { borderColor: (theme: Theme) => theme.palette.text.primary, bgcolor: 'action.hover' }
            }}
          >
            View Code
          </Button>
          <Button
            variant="contained"
            startIcon={<LaunchIcon />}
            href={project.demo}
            target="_blank"
            sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            Live Demo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
