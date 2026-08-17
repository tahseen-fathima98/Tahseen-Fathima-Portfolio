"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Cloud,
  Copy,
  Gauge,
  Layers3,
  Mail,
  Menu,
  MonitorSmartphone,
  Send,
  Server,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import {
  SiGithub,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { BsOpenai } from "react-icons/bs";
import {
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { capabilities, experience, metrics, projects } from "@/data/portfolio";

type ChapterId = "profile" | "capabilities" | "journey" | "work" | "connect";

const chapters: {
  id: ChapterId;
  number: string;
  title: string;
  icon: typeof UserRound;
}[] = [
  { id: "profile", number: "01", title: "Profile", icon: UserRound },
  { id: "capabilities", number: "02", title: "Capabilities", icon: Layers3 },
  { id: "journey", number: "03", title: "Journey", icon: Activity },
  { id: "work", number: "04", title: "Selected work", icon: BriefcaseBusiness },
  { id: "connect", number: "05", title: "Connect", icon: Send },
];

const capabilityVisuals = [
  { icon: MonitorSmartphone, tone: "teal" },
  { icon: Server, tone: "blue" },
  { icon: BrainCircuit, tone: "violet" },
  { icon: Cloud, tone: "sky" },
  { icon: ShieldCheck, tone: "warm" },
] as const;

const techRibbon = [
  { icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
  { icon: SiReact, label: "React", color: "#61dafb" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
  { icon: SiNodedotjs, label: "Node.js", color: "#8cc84b" },
  { icon: SiPostgresql, label: "PostgreSQL", color: "#8ab5d1" },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "#38bdf8" },
  { icon: SiPrisma, label: "Prisma", color: "#d8dbe4" },
  { icon: SiGithub, label: "GitHub Actions", color: "#e6edf3" },
  { icon: SiVercel, label: "Vercel", color: "#ffffff" },
];

const panelVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.985, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      type: "spring",
      stiffness: 110,
      damping: 18,
    },
  }),
};

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return (
    <>
      {display}
      {suffix}
    </>
  );
}

function MagneticButton({
  children,
  href,
  className = "",
  onClick,
}: {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16 });
  const sy = useSpring(y, { stiffness: 180, damping: 16 });
  return (
    <motion.a
      ref={ref}
      href={href}
      className={`magnetic ${className}`}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}

function AmbientBackground({ active }: { active: ChapterId | null }) {
  const prefersReducedMotion = useReducedMotion();
  const colors: Record<ChapterId | "closed", string> = {
    closed: "rgba(112,135,173,.14)",
    profile: "rgba(85,214,190,.18)",
    capabilities: "rgba(166,181,255,.18)",
    journey: "rgba(255,191,105,.16)",
    work: "rgba(105,182,255,.17)",
    connect: "rgba(211,144,255,.14)",
  };
  const wavePaths = Array.from({ length: 15 }, (_, index) => {
    const offset = index * 12;
    return {
      start: `M-180 ${438 + offset} C 80 ${285 + offset}, 250 ${590 - offset * 0.18}, 520 ${438 + offset * 0.35} S 920 ${290 + offset * 0.7}, 1190 ${430 + offset * 0.25} S 1510 ${610 - offset * 0.25}, 1780 ${430 + offset}`,
      middle: `M-180 ${455 + offset} C 90 ${610 - offset * 0.15}, 300 ${275 + offset * 0.55}, 565 ${446 + offset * 0.25} S 920 ${590 - offset * 0.2}, 1215 ${404 + offset * 0.5} S 1510 ${285 + offset * 0.55}, 1780 ${455 + offset}`,
      end: `M-180 ${438 + offset} C 80 ${285 + offset}, 250 ${590 - offset * 0.18}, 520 ${438 + offset * 0.35} S 920 ${290 + offset * 0.7}, 1190 ${430 + offset * 0.25} S 1510 ${610 - offset * 0.25}, 1780 ${430 + offset}`,
    };
  });
  return (
    <div className="ambient" aria-hidden="true">
      <svg className="ambient__mesh" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="meshLine" x1="0" x2="1">
            <stop offset="0" stopColor="#55d6be" stopOpacity="0" />
            <stop offset=".18" stopColor="#55d6be" stopOpacity=".42" />
            <stop offset=".52" stopColor="#7da7dc" stopOpacity=".62" />
            <stop offset=".82" stopColor="#ffbf69" stopOpacity=".36" />
            <stop offset="1" stopColor="#ffbf69" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="waveGlow" x1="0" x2="1">
            <stop offset="0" stopColor="#55d6be" stopOpacity="0" />
            <stop offset=".5" stopColor="#65e6d1" stopOpacity=".8" />
            <stop offset="1" stopColor="#7da7dc" stopOpacity="0" />
          </linearGradient>
          <filter id="meshGlow"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        <g className="ambient__mesh-lines">
          {wavePaths.map((path, index) => (
            <motion.path
              key={index}
              d={path.start}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { d: [path.start, path.middle, path.end] }
              }
              transition={{
                duration: 13 + index * 0.35,
                delay: index * -0.55,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          ))}
        </g>
        <motion.path
          className="ambient__mesh-glow"
          d="M-180 500 C 120 280, 340 615, 650 432 S 1110 270, 1390 445 S 1610 570, 1780 430"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  d: [
                    "M-180 500 C 120 280, 340 615, 650 432 S 1110 270, 1390 445 S 1610 570, 1780 430",
                    "M-180 470 C 90 620, 355 285, 670 458 S 1080 610, 1380 420 S 1600 285, 1780 470",
                    "M-180 500 C 120 280, 340 615, 650 432 S 1110 270, 1390 445 S 1610 570, 1780 430",
                  ],
                }
          }
          transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
        />
      </svg>
      <div className="ambient__constellation ambient__constellation--one" />
      <div className="ambient__constellation ambient__constellation--two" />
      <div className="ambient__particles">
        {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
      </div>
      <motion.div
        className="ambient__orb ambient__orb--one"
        animate={{
          background: colors[active ?? "closed"],
          x: active === "work" ? "20vw" : "0vw",
        }}
        transition={{ duration: 1.1 }}
      />
      <div className="ambient__orb ambient__orb--two" />
      <div className="grid" />
      <div className="noise" />
    </div>
  );
}

function ProfilePanel() {
  return (
    <div className="profile-console">
      <motion.section className="profile-about" variants={panelVariants} custom={0} initial="hidden" animate="visible">
        <span className="eyebrow">About me</span>
        <p>Full stack developer with 5+ years of experience building scalable web applications that solve real problems.</p>
        <p>Passionate about clean code, performance, and creating delightful user experiences.</p>
      </motion.section>
      <div className="profile-stats">
        {[
          ["5+", "Years experience"],
          ["20+", "Projects delivered"],
          ["10+", "Clients served"],
        ].map(([value, label], index) => (
          <motion.div className="profile-stat panel-card" key={label} variants={panelVariants} custom={index + 1} initial="hidden" animate="visible">
            <strong>{value}</strong><span>{label}</span>
          </motion.div>
        ))}
      </div>
      <motion.aside className="profile-availability panel-card" variants={panelVariants} custom={4} initial="hidden" animate="visible">
        <span className="eyebrow">Availability</span>
        <p>Available for new opportunities and exciting projects worldwide.</p>
        <a href="#chapter-connect">Let&apos;s connect <ArrowRight /></a>
      </motion.aside>
    </div>
  );
}

function CapabilitiesPanel() {
  return (
    <div className="capabilities-console">
      <span className="eyebrow">Core capabilities</span>
      <div className="capability-list">
        {capabilities.map((item, index) => {
          const visual = capabilityVisuals[index] ?? capabilityVisuals[0];
          const VisualIcon = visual.icon;
          return (
            <motion.article
              className={`capability panel-card capability--${visual.tone}`}
              key={item.title}
              variants={panelVariants}
              custom={index + 1}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4 }}
            >
              <div className="capability__icon">
                <VisualIcon />
              </div>
              <div className="capability__body">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
              <div className="tags capability__tags">
                {item.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

function JourneyPanel() {
  const [selected, setSelected] = useState(0);
  const journeyExperience = [
    {
      ...experience[0],
      summary:
        "Leading end-to-end development for Finn’s digital platform, building scalable systems and delightful user experiences that drive real impact.",
      points: [
        "Improved website performance with ~40% faster load times through advanced optimization and code splitting.",
        "Built and maintained 20+ shared components used across multiple products for design consistency and speed.",
        "Integrated OpenAI API to power intelligent features, enhancing automation and user insights.",
        "Developed a GDPR-compliant Pillar Bridge dashboard ensuring data privacy, security and regulatory compliance.",
        "Implemented CI/CD workflows using GitHub Actions and deployed seamlessly via Vercel.",
      ],
    },
    {
      ...experience[1],
      summary:
        "Delivered complete full-stack products for international clients, from interface architecture through deployment.",
    },
    {
      ...experience[2],
      company: "Early Frontend Roles",
      role: "Frontend Developer",
      period: "2019 — 2021",
      place: "Internships and early product roles",
      points: experience.slice(2).map((item) => item.points[0]),
      projects: undefined,
      summary:
        "Built a strong frontend foundation across product teams, internships and early client projects.",
    },
  ];
  return (
    <div className="journey-layout">
      <motion.nav
        className="timeline"
        variants={panelVariants}
        custom={0}
        initial="hidden"
        animate="visible"
        aria-label="Career timeline"
      >
        <div className="timeline__line">
          <motion.span
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8 }}
          />
        </div>
        {journeyExperience.map((item, index) => (
          <button
            key={item.period}
            className={selected === index ? "active" : ""}
            onClick={() => setSelected(index)}
          >
            <span className="timeline__dot" />
            <strong>{item.company}</strong>
            <small>{item.period}</small>
          </button>
        ))}
        <button className="journey-explore" onClick={() => setSelected(0)}>
          Explore my journey <ArrowUpRight />
        </button>
      </motion.nav>
      <AnimatePresence mode="wait">
        <motion.article
          className="experience-detail panel-card"
          key={selected}
          initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35 }}
        >
          <div className="experience-detail__head">
            <div>
              <h2>{journeyExperience[selected].company}</h2>
              <span className="eyebrow">
                {journeyExperience[selected].period}
              </span>
            </div>
            <svg
              className="growth-chart"
              viewBox="0 0 120 60"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="growthBar" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stopColor="#55d6be" stopOpacity=".18" />
                  <stop offset="1" stopColor="#55d6be" stopOpacity=".85" />
                </linearGradient>
              </defs>
              {[34, 26, 19, 12, 5].map((height, index) => (
                <motion.rect
                  key={index}
                  x={12 + index * 21}
                  width="11"
                  rx="2"
                  fill="url(#growthBar)"
                  initial={{ height: 0, y: 52 }}
                  animate={{ height: 52 - height, y: height }}
                  transition={{
                    delay: 0.25 + index * 0.09,
                    type: "spring",
                    stiffness: 120,
                    damping: 16,
                  }}
                />
              ))}
              <motion.path
                d="M8 44 L34 32 L58 25 L82 16 L112 6"
                fill="none"
                stroke="#ffbf69"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.35 }}
              />
              <motion.path
                d="M104 6 L112 6 L112 14"
                fill="none"
                stroke="#ffbf69"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15 }}
              />
            </svg>
          </div>
          <p className="experience-summary">
            {journeyExperience[selected].summary}
          </p>
          <ul>
            {journeyExperience[selected].points.map((point) => (
              <li key={point}>
                <Check />
                {point}
              </li>
            ))}
          </ul>
          {journeyExperience[selected].projects && (
            <div className="role-projects">
              {journeyExperience[selected].projects.map((project) => (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  key={project.name}
                  whileHover={{ y: -4 }}
                >
                  <span>{project.responsibility}</span>
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.highlights.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <strong>
                    Visit project <ArrowUpRight />
                  </strong>
                </motion.a>
              ))}
            </div>
          )}
          <div className="experience-pillars" aria-label="Core strengths">
            <span>Impact</span>
            <span>Innovation</span>
            <span>Reliability</span>
          </div>
        </motion.article>
      </AnimatePresence>
      <div className="journey-side">
        <div className="metrics">
          {metrics.slice(1).map((metric, index) => {
            const MetricIcon = [Gauge, Boxes, Copy][index] ?? Gauge;
            return (
              <motion.div
                className="metric panel-card"
                key={metric.label}
                variants={panelVariants}
                custom={index + 2}
                initial="hidden"
                animate="visible"
              >
                <div className="metric__head">
                  <strong>
                    <Counter value={metric.value} suffix={metric.suffix} />
                  </strong>
                  <MetricIcon className="metric__icon" />
                </div>
                <span>{metric.label}</span>
              </motion.div>
            );
          })}
          <motion.div
            className="metric metric--openai panel-card"
            variants={panelVariants}
            custom={5}
            initial="hidden"
            animate="visible"
          >
            <div className="metric__head">
              <strong>OpenAI</strong>
              <BsOpenai className="metric__icon" />
            </div>
            <span>In production</span>
          </motion.div>
        </div>
        <div className="technology-ribbon panel-card">
          <span>Technology ribbon</span>
          <div>
            {techRibbon.map(({ icon: TechIcon, label, color }) => (
              <i key={label}>
                <b style={{ color }}>
                  <TechIcon />
                </b>
                <small>{label}</small>
              </i>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkPanel() {
  return (
    <div className="projects-grid">
      {projects.map((project, index) => (
        <motion.article
          className={`project panel-card project--${project.tone}`}
          key={project.title}
          variants={panelVariants}
          custom={index}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -8 }}
        >
          <div className="project__visual">
            <span>{project.number}</span>
            <div className="project__screen">
              <div />
              <div />
              <div />
            </div>
          </div>
          <span className="eyebrow">{project.type}</span>
          <h2>{project.title}</h2>
          <p>{project.copy}</p>
          <div className="tags">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="project__links">
            <a href={project.live} target="_blank" rel="noreferrer">
              Live project <ArrowUpRight />
            </a>
            <a href={project.code} target="_blank" rel="noreferrer">
              Source <SiGithub />
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function ConnectPanel() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("sending");
    setMessage("");
    const form = new FormData(formElement);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error ||
            "The message could not be delivered. Please try again or email me directly.",
        );
      setStatus("sent");
      setMessage("Thank you — your message has been sent successfully.");
      formElement.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "The message could not be delivered. Please try again or email me directly.",
      );
    }
  };
  return (
    <div className="connect-grid">
      <motion.section
        className="connect-copy"
        variants={panelVariants}
        custom={0}
        initial="hidden"
        animate="visible"
      >
        <span className="eyebrow">Have a project or opportunity?</span>
        <h2>
          Let&apos;s build something <em>meaningful.</em>
        </h2>
        <p>
          I&apos;m open to remote and international opportunities where
          thoughtful design, reliable engineering and intelligent automation
          meet.
        </p>
        <div className="socials">
          <a href="mailto:sawa.seido08@gmail.com">
            <Mail /> Email
          </a>
          <a
            href="https://linkedin.com/in/tahseen-fathima"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href="https://github.com/tahseen-fathima98"
            target="_blank"
            rel="noreferrer"
          >
            <SiGithub /> GitHub
          </a>
        </div>
      </motion.section>
      <motion.form
        className="contact-form panel-card"
        onSubmit={submit}
        variants={panelVariants}
        custom={1}
        initial="hidden"
        animate="visible"
      >
        <label>
          <span>Your name</span>
          <input name="name" required placeholder="Name" />
        </label>
        <label>
          <span>Your email</span>
          <input
            name="email"
            required
            type="email"
            placeholder="you@company.com"
          />
        </label>
        <label>
          <span>Subject</span>
          <input name="subject" required placeholder="A new opportunity" />
        </label>
        <label>
          <span>Message</span>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Tell me a little about it..."
          />
        </label>
        <input
          className="contact-form__website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowUpRight />
        </button>
        <p
          className={`form-status form-status--${status}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      </motion.form>
    </div>
  );
}

const content: Record<ChapterId, () => ReactNode> = {
  profile: ProfilePanel,
  capabilities: CapabilitiesPanel,
  journey: JourneyPanel,
  work: WorkPanel,
  connect: ConnectPanel,
};

function Chapter({
  chapter,
  active,
  onOpen,
}: {
  chapter: (typeof chapters)[number];
  active: boolean;
  onOpen: () => void;
}) {
  const Icon = chapter.icon;
  const Content = content[chapter.id];
  return (
    <motion.section
      className={`chapter ${active ? "chapter--active" : ""}`}
      layout
      transition={{ layout: { type: "spring", stiffness: 95, damping: 18 } }}
    >
      <button
        id={`${chapter.id}-trigger`}
        className="chapter__trigger"
        onClick={onOpen}
        aria-expanded={active}
        aria-controls={`${chapter.id}-content`}
      >
        <span className="chapter__number">{chapter.number}</span>
        <span className="chapter__title">{chapter.title}</span>
        <Icon className="chapter__icon" />
        <span className="chapter__toggle">
          {active ? <X /> : <span>+</span>}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            id={`${chapter.id}-content`}
            role="region"
            aria-labelledby={`${chapter.id}-trigger`}
            className="chapter__content"
            initial={{
              height: 0,
              opacity: 0,
              y: -18,
              rotateX: -22,
              scaleX: 0.965,
              scaleY: 0.9,
              filter: "blur(8px)",
              transformPerspective: 1800,
            }}
            animate={{
              height: "auto",
              opacity: 1,
              y: 0,
              rotateX: 0,
              scaleX: 1,
              scaleY: 1,
              filter: "blur(0px)",
              transformPerspective: 1800,
            }}
            exit={{
              height: 0,
              opacity: 0,
              y: -12,
              rotateX: -16,
              scaleX: 0.975,
              scaleY: 0.92,
              filter: "blur(7px)",
              transformPerspective: 1800,
            }}
            transition={{
              height: { duration: 0.62, ease: [0.2, 0.7, 0.2, 1] },
              opacity: { duration: 0.34, delay: 0.06 },
              rotateX: { duration: 0.52, ease: [0.2, 0.7, 0.2, 1] },
              scaleX: { duration: 0.52, ease: [0.2, 0.7, 0.2, 1] },
              scaleY: { duration: 0.52, ease: [0.2, 0.7, 0.2, 1] },
              filter: { duration: 0.38 },
              y: { duration: 0.48, ease: [0.2, 0.7, 0.2, 1] },
            }}
          >
            <div className="chapter__content-inner">
              <Content />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState<ChapterId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useTransform(mouseX, (v) => `${v}px`);
  const glowY = useTransform(mouseY, (v) => `${v}px`);
  const activeNumber = useMemo(
    () => (active ? chapters.findIndex((item) => item.id === active) + 1 : 0),
    [active],
  );
  const displayedChapter = activeNumber;

  useEffect(() => {
    const update = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menuOpen) {
        setMenuOpen(false);
        return;
      }
      setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const openChapter = (id: ChapterId, forceOpen = false) => {
    const shouldClose = !forceOpen && active === id;
    setActive(shouldClose ? null : id);
    setMenuOpen(false);
    if (!shouldClose && window.matchMedia("(max-width: 740px)").matches)
      window.setTimeout(
        () =>
          document
            .getElementById(`chapter-${id}`)
            ?.scrollIntoView({ behavior: "smooth", block: "start" }),
        120,
      );
  };

  return (
    <main className={`site theme--${active ?? "closed"}`}>
      <AmbientBackground active={active} />
      <motion.div
        className="cursor-glow"
        style={{ left: glowX, top: glowY }}
        aria-hidden="true"
      />
      <header className="header">
        <a className="logo" href="#top" aria-label="Tahseen Fathima home">
          <Image src="/tf-logo.png" width={46} height={46} alt="" priority />
        </a>
        <div className="availability">
          <span /> Available for global opportunities
        </div>
        <nav
          className={menuOpen ? "nav nav--open" : "nav"}
          aria-label="Main navigation"
        >
          {chapters.map((item) => (
            <button key={item.id} onClick={() => openChapter(item.id, true)}>
              {item.title}
            </button>
          ))}
        </nav>
        <div className="header__actions">
          <MagneticButton href="/Tahseen-Fathima-Resume.pdf" className="resume">
            Résumé <ArrowDownToLine />
          </MagneticButton>
          <MagneticButton
            href="#chapter-connect"
            className="contact"
            onClick={() => openChapter("connect", true)}
          >
            Contact me <ArrowUpRight />
          </MagneticButton>
        </div>
        <button
          className="menu"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero__intro">
          <span className="hero__hello">Hello, I&apos;m</span>
          <h1>Tahseen Fathima</h1>
          <h2>Full Stack Developer</h2>
          <p>Frontend-to-Backend Engineer</p>
          <div className="hero__proof">
            <span className="hero__proof-item">
              <i className="hero__proof-mark" aria-hidden="true" />
              5+ years building digital products
            </span>
            <span className="hero__proof-item">
              <i className="hero__proof-mark" aria-hidden="true" />
              AI integrations in production
            </span>
          </div>
        </div>
        <div
          className="chapter-progress"
          aria-label={
            activeNumber ? `Chapter ${activeNumber} of 5` : "No chapter open"
          }
        >
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" />
            <circle
              cx="60"
              cy="60"
              r="52"
              pathLength="1"
              strokeDasharray={`${displayedChapter / 5} 1`}
            />
          </svg>
          <div className="chapter-progress__readout">
            <strong>
              0{displayedChapter}
              <small>/ 05</small>
            </strong>
            <span>{activeNumber ? "Current chapter" : "Choose a chapter"}</span>
          </div>
        </div>
      </section>

      <div className="chapters">
        <div className="chapters__label" aria-hidden="true">
          <strong>
            0{displayedChapter} <small>/ 05</small>
          </strong>
          <span>Dimensional chapter system</span>
        </div>
        {chapters.map((chapter) => (
          <div key={chapter.id} id={`chapter-${chapter.id}`}>
            <Chapter
              chapter={chapter}
              active={active === chapter.id}
              onOpen={() => openChapter(chapter.id)}
            />
          </div>
        ))}
      </div>

      <section className="archive-teaser">
        <span className="archive-teaser__version">V1</span>
        <div className="archive-teaser__copy">
          <span className="eyebrow">Portfolio · Old version</span>
          <h2>Explore the old version of my portfolio.</h2>
        </div>
        <a className="archive-teaser__link" href="/v1">View old version <ArrowUpRight /></a>
      </section>

      <footer>
        <span>© {new Date().getFullYear()} Tahseen Fathima</span>
        <span>Designed with intent · Built with care</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
