import type { Project } from '../../types.ts';

export const projects: Project[] = [
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