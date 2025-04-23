'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ExternalLink, Code2, Monitor, Cpu, Lightbulb, Zap, FileText, Download } from 'lucide-react';
import Link from 'next/link';
import Chatbot from '../components/Chatbot'; // Import your Chatbot component

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentCodeSnippet, setCurrentCodeSnippet] = useState(0);
  
  // Code snippets to display during loading
  const codeSnippets = [
    {
      language: "JavaScript",
      code: `function createPortfolio() {\n  const skills = ['React', 'TypeScript', 'NextJS'];\n  return skills.map(skill => <div>{skill}</div>);\n}`
    },
    {
      language: "Python",
      code: `def analyze_data(data):\n    return {\n        "insights": [x for x in data if x.is_valuable()],\n        "summary": data.get_summary()\n    }`
    },
    {
      language: "TypeScript",
      code: `interface Project {\n  title: string;\n  tech: string[];\n}\n\nconst portfolio: Project[] = [\n  { title: "Himanshu's Work", tech: ["Next.js", "React"] }\n];`
    },
    {
      language: "C++",
      code: `#include <iostream>\n\nint main() {\n  std::cout << "Welcome to my portfolio!" << std::endl;\n  return 0;\n}`
    }
  ];

  // Handle loading animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 500);
            return 100;
          }
          return prev + 1;
        });
        
        if (loadingProgress % 25 === 0 && loadingProgress < 100) {
          setCurrentCodeSnippet(prev => (prev + 1) % codeSnippets.length);
        }
      }, 30);
    }
    
    return () => clearInterval(interval);
  }, [isLoading, loadingProgress]);

  // Handle scroll for parallax effects and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const projects = [
    {
      title: "Mstrymessage",
      description: "MstryMessage allows users to send anonymous messages and feedback to anyone securely.",
      tech: ["TypeScript", "NextJs", "Shadcn", "Zod"],
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
      github: "https://github.com/Himanshu-0p/mstrymessage",
      demo: "#",
      icon: <Code2 className="w-8 h-8 text-blue-400" />
    },
    {
      title: "StellarGraph",
      description: "StellarGraph is an AI-powered application that detects constellations from images using deep learning, graph-based analysis, and a user-friendly GUI.",
      tech: ["Modified GNN-GMN", "PyQt5", "Python"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
      github: "https://github.com/Himanshu-0p/Computer_Vision",
      demo: "#",
      icon: <Code2 className="w-8 h-8 text-blue-400" />
    },
    {
      title: "Guess Number Game",
      description: "Interactive game where users guess a number between 1 and 100, with hints provided for each guess.",
      tech: ["Vite+React", "JavaScript", "Firebase-Auth"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      github: "https://github.com/Himanshu-0p/new-app",
      demo: "#",
      icon: <Code2 className="w-8 h-8 text-blue-400" />
    },
    {
      title: "Few Short KeyWord Detection Model",
      description: "Mode detection of few short keywords in a given audio in multilingual using deep learning techniques.",
      tech: ["Python", "Encoder-Decode Model", "PyQt5"],
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=800&q=80",
      github: "https://github.com/Himanshu-0p/Few-Shot-Keyword-Detection-System",
      demo: "#",
      icon: <Code2 className="w-8 h-8 text-blue-400" />
    }
  ];
  
  const skills = [
    { 
      name: "Frontend Development", 
      level: 90,
      icon: <Monitor className="w-6 h-6 text-blue-400" />,
      techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    { 
      name: "Backend Development", 
      level: 80,
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      techs: ["Node.js", "Firebase", "Express", "MongoDB"]
    },
    { 
      name: "UI/UX Design", 
      level: 85,
      icon: <Lightbulb className="w-6 h-6 text-yellow-400" />,
      techs: ["Figma", "Adobe XD", "Minimalist Design", "User Research"]
    }
    // Extended Reality skill removed
  ];

  // Add mouse position tracking for interactive elements
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="bg-gradient-to-b from-[#0a0a0a] to-[#131313] text-white min-h-screen">
      {/* Enhanced animated background with interactive particles */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 right-0 h-full bg-grid-pattern" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)`,
          backgroundSize: '50px 50px',
          transform: `translateY(${scrollY * 0.1}px)`
        }}></div>
        
        {/* Interactive gradient orbs that follow mouse subtly */}
        <div className="absolute top-40 left-10 w-40 h-40 rounded-full bg-blue-500 opacity-20 blur-3xl"
          style={{
            transform: `translate(${(mousePosition.x - window.innerWidth/2) * 0.02}px, ${(mousePosition.y - window.innerHeight/2) * 0.02}px)`
          }}
        ></div>
        <div className="absolute top-60 right-20 w-56 h-56 rounded-full bg-purple-500 opacity-10 blur-3xl"
          style={{
            transform: `translate(${(mousePosition.x - window.innerWidth/2) * -0.01}px, ${(mousePosition.y - window.innerHeight/2) * -0.01}px)`
          }}
        ></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full bg-indigo-500 opacity-10 blur-3xl"
          style={{
            transform: `translate(${(mousePosition.x - window.innerWidth/2) * 0.015}px, ${(mousePosition.y - window.innerHeight/2) * 0.015}px)`
          }}
        ></div>
      </div>

      {/* Modern glassmorphism header with subtle hover effects */}
      <header className="fixed w-full top-0 bg-black/20 backdrop-blur-md z-50 border-b border-white/5">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/#home" className="text-xl font-bold font-mono relative overflow-hidden group">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 inline-block transform transition-transform duration-300 group-hover:scale-110">
              Himanshu0p
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          
          <div className="flex gap-6">
            {['home', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <Link 
                key={section}
                href={`#${section}`} 
                className={`relative px-2 py-1 transition-all duration-300 overflow-hidden ${activeSection === section ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
              >
                <span className="capitalize relative z-10">{section}</span>
                {activeSection === section ? (
                  <motion.span 
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                  />
                ) : (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                )}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero Section with 3D tilt effect and particle animation */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Subtle particle animation in background */}
        <div className="absolute inset-0 z-0">
          <div id="particles-js" className="absolute inset-0"></div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center z-10 perspective-1000"
        >
          <motion.div
            whileHover={{ rotateX: 5, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_10px_10px_rgba(79,70,229,0.15)]"
            >
              Himanshu Patil
            </motion.h1>
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center justify-center mb-6 px-4 py-2 border border-white/10 rounded-full backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-gray-300">IT Undergrad @ VIT Pune</span>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              I'm passionate about creating cool projects in web development. I love UI design with a minimalist touch. When I'm not coding, I'm diving into research and exploring new ideas.
            </motion.p>
            
            {/* Simplified social links with more reliable hover effects */}
            <motion.div 
              variants={itemVariants} 
              className="flex justify-center gap-6 mb-12"
            >
              {[
                { Icon: Github, href: "https://github.com/Himanshu-0p", label: "GitHub" },
                { Icon: Twitter, href: "https://x.com/HimanshuPa75809", label: "Twitter" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/himanshu-patil-653627318/", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:patilhimanshu1102@gmail.com", label: "Email" },
              ].map(({ Icon, href, label }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-300 hover:text-blue-400"
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </motion.div>
            
            {/* Static CTA button without hover movement */}
            <motion.div variants={itemVariants}>
              <a 
                href="#projects" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium text-white hover:shadow-lg hover:shadow-blue-500/30 transition-colors duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">View My Work</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                
                {/* Button glow effect without movement */}
                <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Enhanced scrolling indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
            className="p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
          </motion.div>
        </div>
      </section>
      
      {/* About Section with resume button and modern card design */}
      <section id="about" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">About Me</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                I'm an IT undergraduate student at VIT Pune with a passion for creating innovative solutions through technology. My journey in tech began with simple web projects, and has evolved into a deep exploration of web development and research-driven development.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                What drives me is the intersection of creativity and technology. I believe in crafting digital experiences that are not just functional, but also intuitive and engaging.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Outside of coding, I enjoy exploring new research papers, staying updated with the latest tech trends, and finding inspiration in minimalist design principles.
              </p>
              
              {/* Modern interest tags with hover effects */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["Web Development", "UI/UX Design", "Research", "Problem Solving"].map((interest, index) => (
                  <motion.span 
                    key={index} 
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      borderColor: "rgba(59, 130, 246, 0.3)"
                    }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
              
              {/* Added Resume button with Google Drive link */}
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  Let's Connect
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
                
                <a 
                  href="https://drive.google.com/file/d/1GSBsLKUQbnAXCODPPLCpR_hplxM7eI4Q/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full font-medium text-white hover:bg-white/15 transition-all duration-300"
                >
                  <FileText size={20} />
                  View Resume
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
            
            {/* Enhanced profile image with animated borders */}
            <div className="md:w-1/2 relative">
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <motion.div 
                  className="absolute inset-4 rounded-full border-2 border-dashed border-purple-500/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Placeholder for profile image */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/80 to-purple-600/80 flex items-center justify-center">
                      <span className="text-4xl font-bold">HP</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Skills Section with modern card design and micro-interactions */}
      <section id="skills" className="py-20 px-6 relative bg-gradient-to-b from-black/0 to-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Skills & Expertise</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
                  }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform-gpu"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      className="p-3 rounded-full bg-white/5"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {skill.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg">{skill.name}</h3>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500 relative"
                      >
                        <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-white shadow-lg shadow-blue-500/50"></div>
                      </motion.div>
                    </div>
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-gray-400">{skill.level}%</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {skill.techs.map((tech, i) => (
                      <motion.span 
                        key={i} 
                        className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300"
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: "rgba(59, 130, 246, 0.2)"
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section with modern card design and hover effects */}
      <section id="projects" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <h2 className="text-3xl font-bold mb-12 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Featured Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="relative p-6 h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm group-hover:bg-blue-600/20 transition-colors duration-300">
                        {project.icon}
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300 group-hover:bg-blue-600/20 group-hover:text-blue-200 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm hover:text-blue-400 transition group"
                      >
                        <Github size={16} />
                        <span className="group-hover:underline">Source</span>
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm hover:text-blue-400 transition group"
                      >
                        <ExternalLink size={16} />
                        <span className="group-hover:underline">Live Demo</span>
                      </a>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Enhanced with better visuals */}
      <section id="contact" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="flex flex-col md:flex-row gap-16 items-center"
          >
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-bold mb-6 inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Get in Touch
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always open to new opportunities and interesting projects. 
                Feel free to reach out if you'd like to collaborate or just say hello!
              </p>
              
              <div className="flex flex-col space-y-4 mb-8">
                <a 
                  href="mailto:patilhimanshu1102@gmail.com" 
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <Mail className="text-blue-400" />
                  <span>patilhimanshu1102@gmail.com</span>
                </a>
                
                <a 
                  href="https://linkedin.com/in/himanshu-patil-653627318/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <Linkedin className="text-blue-400" />
                  <span>linkedin.com/in/himanshu-patil-653627318</span>
                </a>
                
                <a 
                  href="https://github.com/Himanshu-0p" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                >
                  <Github className="text-blue-400" />
                  <span>github.com/Himanshu-0p</span>
                </a>
              </div>
              
              <a
                href="mailto:patilhimanshu1102@gmail.com"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-full text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105"
              >
                <Mail size={20} />
                Send Email
              </a>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6">Send a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Himanshu Patil. All rights reserved.</p>
          </div>
          
          <div className="flex gap-4">
            {[
              { Icon: Github, href: "https://github.com/Himanshu-0p", label: "GitHub" },
              { Icon: Twitter, href: "https://x.com/HimanshuPa75809", label: "Twitter" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/himanshu-patil-653627318/", label: "LinkedIn" },
              { Icon: Mail, href: "mailto:patilhimanshu1102@gmail.com", label: "Email" },
            ].map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Custom cursor effect (optional) */}
      <div className="hidden md:block">
        <div className="custom-cursor-outer fixed pointer-events-none w-8 h-8 rounded-full border border-blue-400 transition-transform duration-200 z-50"></div>
        <div className="custom-cursor-inner fixed pointer-events-none w-2 h-2 rounded-full bg-blue-400 transition-transform duration-150 z-50"></div>
      </div>

      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100]">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          style={{ 
            scaleX: scrollY / (document.body.scrollHeight - window.innerHeight),
            originX: 0,
            originY: 0
          }}
        />
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {scrollY > 500 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors duration-300 z-40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot */}
      <Chatbot />

      {/* Script for custom cursor effect */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', () => {
            const outer = document.querySelector('.custom-cursor-outer');
            const inner = document.querySelector('.custom-cursor-inner');
            
            if (outer && inner) {
              document.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                
                // Move both cursors
                outer.style.transform = \`translate(\${clientX - 16}px, \${clientY - 16}px)\`;
                inner.style.transform = \`translate(\${clientX - 4}px, \${clientY - 4}px)\`;
                
                // Check if hovering over interactive elements
                const isHovering = e.target.closest('a, button, input, textarea, [role="button"]');
                
                if (isHovering) {
                  outer.style.transform = \`translate(\${clientX - 16}px, \${clientY - 16}px) scale(1.5)\`;
                  inner.style.transform = \`translate(\${clientX - 4}px, \${clientY - 4}px) scale(0.5)\`;
                }
              });
            }
          });
        `
      }} />

      {/* Add custom styles */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 15s linear infinite;
        }
      `}</style>
    </main>
  );
}
                      