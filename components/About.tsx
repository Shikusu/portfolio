"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ParticleCanvas from "./ParticleCanvas";
import { floatingShapes } from "../constants/floatingShapes";
import { facts } from "../constants/facts";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto">
      <ParticleCanvas />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full blur-3xl opacity-10 bg-violet-600 animate-[blob_8s_ease-in-out_infinite]" />

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
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Avatar / visual */}
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="relative w-72 h-72 mx-auto"
          >
            <div
              className="absolute inset-0 blob"
              style={{
                background: "linear-gradient(135deg, #7c3aed55, #06b6d455)",
              }}
            />
            <div
              className="absolute inset-4 blob flex items-center justify-center text-8xl"
              style={{ background: "#6a706e", animationDelay: "2s" }}
            >
              <Image
                src="/dev-ing.png"
                alt="Avatar"
                width={200}
                height={200}
                className="rounded-full object-cover"
              />
            </div>
          </motion.div>

          {/* Floating badges */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-4 -right-4 bg-(--surface2) border border-(--border) px-3 py-2 rounded-xl text-sm"
          >
            Likes challenges
          </motion.div>
          <motion.div
            animate={{ y: [6, -6, 6] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute bottom-8 -left-4 bg-(--surface2) border border-(--border) px-3 py-2 rounded-xl text-sm"
          >
            Candy lover
          </motion.div>
        </div>

        {/* Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Building tools, apps, and ideas that{" "}
            <span className="gradient-text">keep me curious</span>
          </h2>
          <p className="text-(--muted) leading-relaxed mb-6">
            I'm a developer who enjoys building practical tools, apps, and
            systems that solve real problems. I work across multiple stacks —
            from web and mobile apps to backend services and small game
            experiments.
          </p>

          <p className="text-(--muted) leading-relaxed mb-10">
            I like understanding how things work under the hood and turning
            ideas into working software. Whether it's automating tasks,
            designing a database, building a UI, or experimenting with new
            technologies, I'm always exploring ways to build smarter and improve
            what already exists.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {facts.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                whileHover={{ scale: 1.05, borderColor: "var(--accent)" }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-(--border) bg-(--surface) text-sm cursor-default transition-colors"
              >
                <span>{f.emoji}</span>
                <span className="text-(--muted) text-xs">{f.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
