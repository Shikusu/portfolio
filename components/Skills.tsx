"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillGroups } from "../constants/skillGroup";
import { marqueeItems } from "../constants/marqueeItems";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-32 px-6 overflow-hidden">
      {/* Marquee */}
      <div className="mb-20 overflow-hidden py-4 border-y border-(--border) bg-(--surface)">
        <div className="flex whitespace-nowrap">
          <div className="marquee-track flex gap-8">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="text-(--muted) text-sm font-mono px-4 py-1"
              >
                ✦ {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold">
            Part of my <span className="gradient-text">skillset</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * gi }}
              className="p-6 rounded-2xl border border-(--border) bg-(--surface)"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{group.emoji}</span>
                <h3 className="text-xl font-bold">{group.title}</h3>
              </div>

              <div className="space-y-5">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground">{skill.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
