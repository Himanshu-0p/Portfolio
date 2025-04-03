'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ExternalLink, Code2 } from 'lucide-react';
import Link from 'next/link';
import Chatbot from '@/components/Chatbot';

export default function Home() {
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

  return (
    <main className="bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white min-h-screen">
      {/* Header (Original) */}
      <header className="fixed w-full top-0 bg-[#0a0a0a]/80 backdrop-blur-sm z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold font-mono text-gray-100">
            Himanshu0p
          </Link>
          <div className="flex gap-6">
            <Link href="#about" className="hover:text-gray-300 transition">About</Link>
            <Link href="#projects" className="hover:text-gray-300 transition">Projects</Link>
            <Link href="#contact" className="hover:text-gray-300 transition">Contact</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          >
            Himanshu Patil
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            I'm an IT undergrad student at VIT Pune. I love creating cool projects in extended reality and web development. I'm also passionate about UI design, with a minimalist touch. When I'm not coding, I'm diving into research and exploring new ideas.
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center gap-6">
            {[
              { Icon: Github, href: "https://github.com/Himanshu-0p" },
              { Icon: Twitter, href: "https://x.com/HimanshuPa75809" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/himanshu-patil-653627318/" },
              { Icon: Mail, href: "mailto:patilhimanshu1102@gmail.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-110"
              >
                <Icon size={24} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section (Original) */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl bg-[#1a1a1a] hover:bg-[#252525] transition-all duration-300"
                >
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative p-6 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      {project.icon}
                      <h3 className="text-xl font-bold">{project.title}</h3>
                    </div>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        className="flex items-center gap-2 text-sm hover:text-gray-300 transition group"
                      >
                        <Github size={16} />
                        <span className="group-hover:underline">Source</span>
                      </a>
                      <a
                        href={project.demo}
                        className="flex items-center gap-2 text-sm hover:text-gray-300 transition group"
                      >
                        <ExternalLink size={16} />
                        <span className="group-hover:underline">Live Demo</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Get in Touch
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              I'm always open to new opportunities and interesting projects. 
              Feel free to reach out if you'd like to collaborate or just say hello!
            </p>
            <a
              href="mailto:patilhimanshu1102@gmail.com"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-full text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              <Mail size={20} />
              Say Hello
            </a>
          </motion.div>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </main>
  );
}