"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { socials } from "../constants/socials";
import ParticleCanvas from "./ParticleCanvas";
import { floatingShapes } from "../constants/floatingShapes";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <ParticleCanvas />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-violet-600 animate-[blob_7s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 bg-cyan-500 animate-[blob_7s_ease-in-out_3s_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10 bg-amber-400 animate-[blob_7s_ease-in-out_6s_infinite]" />

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

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Let's <span className="gradient-text">work together</span>
          </h2>
          <p className="text-(--muted) text-lg mb-12 max-w-xl mx-auto">
            Have a project in mind? I'd love to hear about it. Drop me a message
            and let's create something amazing together
          </p>

          {/* Email button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="mailto:ShickyWinner@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-5 rounded-2xl text-white font-semibold text-lg mb-12 bg-linear-to-br from-violet-600 to-cyan-500 hover:shadow-lg hover:shadow-violet-500/25 transition-shadow duration-300"
          >
            Directly email me
          </motion.a>

          {/* Socials */}
          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-(--border) bg-(--surface) text-sm text-(--muted) hover:text-foreground hover:border-(--accent) transition-all duration-300"
              >
                <s.icon size={16} />
                <span>{s.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
