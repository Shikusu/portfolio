"use client";
import { motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import { floatingShapes } from "../constants/floatingShapes";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Particle network background */}
      <ParticleCanvas />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-violet-600 animate-[blob_7s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 bg-cyan-500 animate-[blob_7s_ease-in-out_3s_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10 bg-amber-400 animate-[blob_7s_ease-in-out_6s_infinite]" />
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

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border, #ffffff20) 1px, transparent 1px), linear-gradient(90deg, var(--border, #ffffff20) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-(--border) bg-(--surface) text-sm text-(--muted) mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for work
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-6xl md:text-8xl font-extrabold leading-none mb-6"
        >
          Yahallo <span className="wave-hand">👋</span>
          <br />
          <span className="text-5xl md:text-7xl text-(--muted) ">I'm Shii</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-(--muted) text-lg max-w-xl mx-auto mb-10"
        >
          Desktop, mobile or web — I build things I find interesting, fix things
          that annoy me, and write code instead of sleeping at 2am.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-4 rounded-full text-white font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 bg-linear-to-br from-violet-600 to-cyan-500"
          >
            View my work →
          </a>
          <a
            href="#about"
            className="px-8 py-4 rounded-full border border-(--border) text-foreground text-sm hover:border-(--accent) transition-all duration-300 hover:scale-105"
          >
            About me
          </a>
        </motion.div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-(--muted) text-xs"
      >
        <span>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-linear-to-b from-(--muted) to-transparent"
        />
      </motion.div>
    </section>
  );
}
