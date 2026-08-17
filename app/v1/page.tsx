"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../../v1-original/styles/GlobalStyle";
import theme from "../../v1-original/styles/theme";
import ErrorBoundary from "../../v1-original/components/ErrorBoundary";
import Header from "../../v1-original/components/Header";
import Footer from "../../v1-original/components/Footer";
import Hero from "../../v1-original/components/Hero";
import About from "../../v1-original/components/About";
import WhatIDo from "../../v1-original/components/WhatIDo";
import Experience from "../../v1-original/components/Experience";
import Skills from "../../v1-original/components/Skills";
import Projects from "../../v1-original/components/Projects";
import Contact from "../../v1-original/components/Contact";
import Preloader from "../../v1-original/components/Preloader";

export default function PortfolioV1() {
  const [loading, setLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("home");
      setShowHeader(Boolean(heroSection && window.scrollY > heroSection.offsetHeight));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        {loading && <Preloader />}
        <GlobalStyle />
        <Link className="v1-return" href="/" aria-label="Return to new portfolio"><span>Back to </span>V2 ↗</Link>
        <Header show={showHeader} />
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="whatido"><WhatIDo /></section>
        <section id="skills"><Skills /></section>
        <section id="experience"><Experience /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
        <Footer />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
