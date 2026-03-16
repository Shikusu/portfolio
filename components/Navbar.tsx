"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { label: "About me", href: "#about" },
  { label: "Some of my projects", href: "#projects" },
  { label: "My skills", href: "#skills" },
  { label: "My contacts", href: "#contact" },
];

const sections = ["about", "projects", "skills", "contact"];

export default function Navbar() {
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header className="fixed top-0 left-0 right-0 z-40 px-6">
        {/* Animated backdrop */}
        <motion.div
          className="absolute inset-0 backdrop-blur-md"
          style={{ opacity: bgOpacity }}
        >
          <div className="absolute inset-0 bg-(--surface)/80" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-(--border) to-transparent"
            style={{ opacity: borderOpacity }}
          />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();

              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            initial={{ opacity: 1, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-lg font-bold "
          >
            <Image
              src="/portrait.svg"
              alt="Logo"
              width={24}
              height={24}
              className="rounded-full object-contain invert"
            />
            <span>Shii</span>
          </motion.a>

          {/* Desktop nav */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center gap-1"
          >
            {links.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = active === id;
              return (
                <button
                  key={href}
                  onClick={() => handleNav(href)}
                  className="relative px-4 py-2 text-sm rounded-full transition-colors duration-200 cursor-pointer"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-(--surface) border border-(--border)"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive
                        ? "text-foreground"
                        : "text-(--muted) hover:text-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </motion.nav>

          {/* CTA + mobile toggle */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 "
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNav("#contact");
              }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs font-semibold text-white bg-linear-to-br from-violet-600 to-cyan-500 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
            >
              Wanna work together?
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-px bg-foreground origin-center transition-colors"
              />
              <motion.span
                animate={
                  menuOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                className="block w-5 h-px bg-foreground"
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
                }
                className="block w-5 h-px bg-foreground origin-center"
              />
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={
          menuOpen
            ? { opacity: 1, y: 0, pointerEvents: "auto" }
            : { opacity: 0, y: -12, pointerEvents: "none" }
        }
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="fixed top-16 left-4 right-4 z-30 rounded-2xl border border-(--border) bg-(--surface)/95 backdrop-blur-xl p-4 md:hidden"
      >
        <nav className="flex flex-col gap-1">
          {links.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = active === id;
            return (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-(--border)/50 text-foreground"
                    : "text-(--muted) hover:text-foreground hover:bg-(--border)/30"
                }`}
              >
                {label}
              </button>
            );
          })}
          <div className="mt-2 pt-3 border-t border-(--border)">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNav("#contact");
              }}
              className="block text-center px-4 py-3 rounded-xl text-sm font-semibold text-white bg-linear-to-br from-violet-600 to-cyan-500"
            >
              Wanna work together?
            </a>
          </div>
        </nav>
      </motion.div>
    </>
  );
}
