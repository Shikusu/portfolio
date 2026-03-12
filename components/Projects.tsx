"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "../constants/projects";
import ParticleCanvas from "./ParticleCanvas";
import { floatingShapes } from "../constants/floatingShapes";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-32 px-6">
      <ParticleCanvas />

      {/* Floating shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.size} ${shape.pos} ${shape.rotate} border ${shape.border} rounded-lg`}
          animate={{ y: [0, -16, 0], rotate: [0, 5, 0] }}
          transition={{
            repeat: Infinity,
            duration: 5 + i,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold">
            Some of my <span className="gradient-text">projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative p-7 rounded-2xl border border-(--border) bg-(--surface) overflow-hidden transition-all duration-300 cursor-pointer block"
              style={{ textDecoration: "none" }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${p.accent}, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{p.emoji}</span>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="text-(--muted) text-sm group-hover:text-foreground transition-colors"
                  >
                    View →
                  </motion.span>
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">
                  {p.title}
                </h3>
                <p className="text-(--muted) text-sm leading-relaxed mb-5">
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-(--border) text-(--muted)"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
