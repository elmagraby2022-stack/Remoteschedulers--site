import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  BarChart3, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Menu, 
  X, 
  ChevronRight, 
  Mail, 
  Phone,
  LayoutGrid,
  TrendingUp,
  AlertTriangle,
  Award,
  ArrowUp,
  ShieldCheck,
  Zap,
  Globe,
  CreditCard,
  Building2,
  Wallet
} from 'lucide-react';
import { ChatBot } from './components/ChatBot';

// --- Sub-components ---

const Header = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  onOpenQuote 
}: { 
  isMobileMenuOpen: boolean; 
  setIsMobileMenuOpen: (open: boolean) => void; 
  onOpenQuote: () => void; 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'Why Us', href: '#why' },
    { name: 'Reviews', href: '#testimonials' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 transition-all duration-500 ${isMobileMenuOpen ? 'z-[9999]' : 'z-[50]'}`}>
      {/* Integrated Top Bar */}
      <div className={`bg-gold text-navy transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-auto py-3 md:py-1.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-8 text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-center md:text-left">
          <div className="flex items-center gap-4 md:gap-8 order-2 md:order-1">
            <a href="mailto:info@remoteschedulers.com" className="hover:opacity-70 transition-all flex items-center gap-2">
              <Mail size={12} className="shrink-0" /> <span className="hidden sm:inline">info@remoteschedulers.com</span><span className="sm:hidden">Email</span>
            </a>
            <span className="flex items-center gap-2 border-l border-navy/10 pl-4 md:pl-8">
              <Phone size={12} className="shrink-0" /> 
              <a href="tel:7327162718" className="hover:opacity-70 transition-all flex items-center gap-1">
                <span className="hidden sm:inline">732-716-2718</span>
                <span className="sm:hidden">Call</span>
              </a>
            </span>
          </div>
          
          <div className="order-1 md:order-2">
            <span className="bg-navy text-gold px-4 py-1 text-[9px] md:text-[10px] rounded-full shadow-lg whitespace-nowrap">
              30% discount for the first 20 Customers.
            </span>
          </div>
          
          <div className="hidden lg:block order-3 text-[9px] opacity-40 uppercase tracking-widest">
            Project Controls Excellence
          </div>
        </div>
      </div>

      <nav 
        className={`transition-all duration-500 border-b ${
          isScrolled 
            ? 'glass-nav py-3 shadow-2xl shadow-navy/5 border-navy/5' 
            : 'bg-white-off/95 md:bg-transparent py-6 border-transparent'
        }`}
      >
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[3px] bg-gold origin-left"
          style={{ scaleX }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex flex-col leading-none group cursor-pointer">
            <span className="font-condensed text-lg sm:text-xl font-extrabold tracking-wider text-navy uppercase transition-colors group-hover:text-gold">
              Remote <span className="text-gold group-hover:text-navy">Schedulers</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] text-gray-soft uppercase mt-1">
              Project Controls & Scheduling Expert
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-[11px] font-bold tracking-[0.2em] uppercase text-navy/70 hover:text-gold transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all group-hover:w-full"></span>
              </a>
            ))}
            <button 
              onClick={onOpenQuote}
              className="bg-navy text-gold hover:bg-gold hover:text-navy px-8 py-3 text-[11px] font-bold tracking-widest uppercase transition-all transform hover:-translate-y-1 shadow-lg shadow-navy/10 active:scale-95"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-navy p-2 hover:bg-gold/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Full-screen centered and scrollable overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 backdrop-blur-md z-[10000] md:hidden bg-navy/85 overscroll-contain"
              />
              
              {/* Drawer */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed inset-0 w-screen h-screen bg-navy z-[10001] md:hidden shadow-4xl overflow-y-auto overscroll-contain flex flex-col"
              >
                <div className="w-full flex-1 flex flex-col justify-between p-6 xs:p-8 min-h-full">
                  {/* Top Header */}
                  <div className="flex justify-between items-center mb-10 shrink-0">
                    <div className="flex flex-col leading-none">
                      <span className="font-condensed text-xl font-extrabold tracking-wider text-gold uppercase">
                        Remote <span className="text-white-off">Schedulers</span>
                      </span>
                    </div>
                    <button 
                      className="text-gold p-2 hover:bg-gold/10 rounded-full transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <X size={28} />
                    </button>
                  </div>

                  {/* Centered and readable links for small screens */}
                  <div className="flex flex-col space-y-6 xs:space-y-8 my-auto py-6 items-center text-center">
                    {navLinks.map((link, i) => (
                      <motion.a 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.05 }}
                        key={link.name}
                        href={link.href}
                        className="text-2xl xs:text-3xl font-condensed font-bold tracking-widest text-white-off hover:text-gold uppercase transition-colors flex items-center gap-2 group py-1"
                        onClick={(e) => {
                          e.preventDefault();
                          document.body.style.overflow = '';
                          setIsMobileMenuOpen(false);
                          const targetId = link.href.replace('#', '');
                          setTimeout(() => {
                            const targetElement = document.getElementById(targetId);
                            if (targetElement) {
                              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 150);
                        }}
                      >
                        {link.name}
                      </motion.a>
                    ))}
                  </div>

                  {/* Fully responsive with layout spacing */}
                  <div className="mt-auto pt-6 border-t border-white-off/10 space-y-6 shrink-0 w-full max-w-sm mx-auto">
                    <motion.button 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      onClick={() => {
                        document.body.style.overflow = '';
                        setIsMobileMenuOpen(false);
                        onOpenQuote();
                      }}
                      className="bg-gold hover:bg-gold-light active:scale-95 transition-all text-navy w-full text-center py-4 text-base xs:text-lg font-bold tracking-[0.2em] uppercase rounded-sm shadow-xl block"
                    >
                      Get a Quote
                    </motion.button>

                    <div className="space-y-3 text-center">
                      <p className="text-gold text-[9px] font-bold tracking-[0.3em] uppercase">Quick Contact</p>
                      <div className="flex flex-col items-center space-y-2.5">
                        <a href="mailto:info@remoteschedulers.com" className="text-white-off/60 text-xs xs:text-sm font-medium flex items-center gap-2.5 hover:text-gold transition-colors">
                          <Mail size={14} className="text-gold" /> info@remoteschedulers.com
                        </a>
                        <a href="tel:7327162718" className="text-white-off/60 text-xs xs:text-sm font-medium flex items-center gap-2.5 hover:text-gold transition-colors">
                          <Phone size={14} className="text-gold" /> 732-716-2718
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

const Hero = ({ onOpenQuote }: { onOpenQuote: () => void }) => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center md:items-end pt-40 md:pt-24 overflow-hidden bg-navy">
      {/* Background with Overlays */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80" 
          alt="Construction Site"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-navy to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-12 md:pb-24 w-full">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-3 border border-gold/50 text-gold px-3 sm:px-4 py-2 text-[9px] sm:text-[10px] font-bold tracking-[0.4em] uppercase mb-6 sm:mb-8 backdrop-blur-sm">
              <Zap size={12} fill="currentColor" /> Scheduling Expert
            </span>
            <h1 className="font-display text-4xl xs:text-5xl sm:text-8xl md:text-[9rem] xl:text-[10rem] leading-[0.95] md:leading-[0.82] text-white-off tracking-tight mb-8 uppercase">
              We Plan.<br /><span className="text-gold selection:text-white-off">You Build.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-white-off/70 max-w-2xl mb-10 sm:mb-12 leading-relaxed font-light font-sans px-1 sm:px-0"
          >
            Expert Primavera P6 and CPM scheduling services for contractors. 
            We build clear, professional schedules that help you finish your project on time and on budget.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5"
          >
            <button 
              onClick={onOpenQuote}
              className="group relative bg-gold hover:bg-gold-light text-navy px-6 xs:px-10 sm:px-12 py-4 sm:py-5 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center sm:justify-start gap-3 overflow-hidden shadow-2xl shadow-gold/20 active:scale-95 transition-all"
            >
              <span className="relative z-10">Get a Quote</span>
              <ChevronRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Trust Icons */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 2 }}
        className="absolute bottom-24 right-10 hidden xl:flex flex-col gap-10 opacity-30 pointer-events-none"
      >
        <div className="flex items-center gap-3 text-gold">
          <ShieldCheck size={32} />
          <div className="h-px w-20 bg-gold/50"></div>
        </div>
        <div className="flex items-center gap-3 text-gold">
          <TrendingUp size={32} />
          <div className="h-px w-20 bg-gold/50"></div>
        </div>
        <div className="flex items-center gap-3 text-gold">
          <Globe size={32} />
          <div className="h-px w-20 bg-gold/50"></div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 lg:hidden"
      >
        <div className="w-px h-10 bg-gold/50"></div>
      </motion.div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { value: '100+', label: 'in ME & Gulf' },
    { value: '5-7', label: 'Day Turnaround' },
    { value: 'P6', label: 'Experience' },
    { value: '90%', label: 'Baseline Approval' },
  ];

  return (
    <div className="bg-navy border-t border-gold/20 grid grid-cols-2 lg:grid-cols-4 relative z-20 overflow-hidden">
      {stats.map((stat, idx) => (
        <div 
          key={stat.label}
          className={`py-8 md:py-12 px-4 sm:px-8 text-center border-gold/10 ${idx !== stats.length - 1 ? 'lg:border-r' : ''} ${idx % 2 === 0 ? 'border-r lg:border-r' : ''} border-b lg:border-b-0`}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-gold mb-2"
          >
            {stat.value}
          </motion.div>
          <div className="text-[10px] font-bold tracking-[0.25em] text-white-off/40 uppercase">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

const Services = () => {
  const services = [
    { id: '01', title: 'Schedule Development', icon: <Calendar size={28} />, desc: 'We build detailed project schedules in Primavera P6 or MS Project that meet all your contract requirements.' },
    { id: '02', title: 'Cost & Resource Loading', icon: <BarChart3 size={28} />, desc: 'We link your budget and labor resources to the schedule so you can track costs and manpower easily.' },
    { id: '03', title: 'Monthly Progress Updates', icon: <TrendingUp size={28} />, desc: 'We provide monthly updates and reports to show your project progress and alert you to potential delays.' },
    { id: '04', title: 'Delay & Claims Support', icon: <AlertTriangle size={28} />, desc: 'If your project is delayed, we provide the critical analysis needed to support time extensions and protect your company.' },
    { id: '05', title: 'Recovery Planning', icon: <Award size={28} />, desc: 'We create realistic recovery plans to help get your project back on schedule after unexpected disruptions.' },
  ];

  const comparison = [
    { feature: 'Turnaround Time', remote: '5-7 Days', typical: '14-21 Days' },
    { feature: 'Pricing Model', remote: 'Project-Based', typical: 'Hourly/Variable' },
    { feature: 'Strategic Focus', remote: 'Tactical Planning', typical: 'Basic Scheduling' },
    { feature: 'Software Compatibility', remote: 'P6, MS Project', typical: 'P6 Only/MS Project' },
  ];

  return (
    <section id="services" className="py-20 sm:py-24 px-4 sm:px-6 bg-white-off overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-4 block"
            >
              Excellence in Planning
            </motion.span>
            <h2 className="font-condensed text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold text-navy leading-[0.95] uppercase">Powerful<br />Solutions</h2>
          </div>
          <p className="text-gray-soft max-w-sm text-base leading-relaxed border-l-2 border-gold pl-6 py-1">
            From baseline schedules to critical delay claims — we provide the technical logic required for elite construction performance.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/15 border border-gold/15 group"
        >
          {services.map((s) => (
            <motion.div 
              key={s.id} 
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              className="bg-white-off p-8 sm:p-12 relative group/card card-hover overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-0 h-[3px] bg-gold group-hover/card:w-full transition-all duration-700 ease-in-out"></div>
              <div className="text-gold/5 font-display text-4xl sm:text-5xl absolute top-6 sm:top-8 right-6 sm:right-8 transition-all group-hover/card:text-gold/10 group-hover/card:scale-110">
                {s.id}
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-navy text-gold flex items-center justify-center mb-8 sm:mb-10 group-hover/card:bg-gold group-hover/card:text-navy transition-colors duration-500 rounded-sm shadow-xl shadow-navy/5">
                {s.icon}
              </div>
              <h3 className="font-condensed text-xl sm:text-2xl font-bold text-navy mb-4 tracking-wide uppercase">{s.title}</h3>
              <p className="text-sm sm:text-[15px] text-gray-soft leading-relaxed pr-2 sm:pr-6">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { num: '01', title: 'Submit Plans', desc: 'Securely send us your project drawings and documents for a professional review.' },
    { num: '02', title: '30% Discount Quote', desc: 'The first 20 Customers receive a 30% discount on their first technical schedule proposal.' },
    { num: '03', title: 'Coordination', desc: 'Our coordinator connects our engineers with your PM to gather logic data, NTP, and mobilization dates.' },
    { num: '04', title: 'Technical Build', desc: 'Our experts build your project schedule, making sure it follows all rules and construction logic.' },
    { num: '05', title: 'Final Delivery', desc: 'Receive your professional schedule in 5-7 business days. We provide P6 files and clear PDF reports.' },
  ];

  return (
    <section id="process" className="py-24 sm:py-32 px-4 sm:px-6 bg-navy relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,#C9A84C_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-24 gap-10">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-5 block"
            >
              Efficiency Guaranteed
            </motion.span>
            <h2 className="font-condensed text-3xl xs:text-4xl sm:text-6xl md:text-8xl font-extrabold text-white-off uppercase leading-[0.9] sm:leading-[0.85]">The Modern<br /><span className="text-gold">Workflow</span></h2>
          </div>
          <p className="text-white-off/50 max-w-sm text-base sm:text-lg leading-relaxed font-light border-l border-gold/30 pl-6 sm:pl-8">
            We've removed the friction from construction planning. Experience a digital-first approach that prioritizes speed and reliability.
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-16 sm:gap-12">
          {/* Connecting line for desktop */}
          <div className="hidden xl:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-gold via-navy to-gold opacity-30"></div>
          
          {steps.map((step, i) => (
            <motion.div 
              key={step.num} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="w-14 h-14 rounded-full border-2 border-gold/50 flex items-center justify-center bg-navy text-gold font-condensed font-extrabold text-lg mx-auto mb-10 relative z-10 shadow-[0_0_20px_rgba(201,168,76,0.1)] group-hover:scale-110 group-hover:border-gold transition-all duration-500 ease-out">
                {step.num}
              </div>
              <h4 className="font-condensed text-2xl font-bold text-white-off mb-5 tracking-wide uppercase group-hover:text-gold transition-colors">{step.title}</h4>
              <p className="text-[15px] text-white-off/40 leading-relaxed max-w-[240px] mx-auto font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  return (
    <section id="why" className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
      <div className="bg-navy p-8 sm:p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden border-b lg:border-b-0 border-gold/10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(201,168,76,0.05)_0%,transparent_50%)] pointer-events-none"></div>
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-6 block drop-shadow-sm">The Contractor Choice</span>
          <h2 className="font-condensed text-3xl xs:text-4xl sm:text-6xl md:text-8xl font-extrabold text-white-off mb-6 sm:mb-12 uppercase leading-[0.9] sm:leading-[0.85]">
            Project Controls<br /><span className="text-gold">Redefined</span>
          </h2>
          
          <div className="space-y-6 sm:space-y-8">
            {[
              'Experienced scheduling experts with real construction field knowledge.',
              'Fast delivery: Project schedules completed in 5-7 business days.',
              'Clear, project-based pricing with no hidden costs.',
              'Experts in Primavera P6, project logic, and delay analysis.',
              'Professional scheduling team with clear and fast communication.'
            ].map((point, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10, backgroundColor: "rgba(201, 168, 76, 0.05)" }}
                className="flex gap-4 sm:gap-6 items-start group/why p-3 sm:p-4 -m-3 sm:-m-4 rounded-sm cursor-default transition-all duration-300"
              >
                <div className="mt-1 w-6 h-6 sm:w-7 sm:h-7 bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 group-hover/why:bg-gold group-hover/why:text-navy transition-all duration-300">
                  <CheckCircle2 size={14} />
                </div>
                <p className="text-white-off/60 text-base sm:text-lg leading-relaxed font-light group-hover/why:text-white-off group-hover/why:font-medium transition-all duration-300">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="h-[400px] sm:h-[500px] lg:h-auto overflow-hidden relative group">
        <img 
          src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1000&q=80" 
          alt="Site Review" 
          className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-700"></div>
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-navy/60 to-transparent"></div>
        
        {/* Floating Stat Card Over Image */}
        <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="absolute bottom-6 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12 md:right-auto md:w-80 bg-white-off p-6 sm:p-10 shadow-2xl border-l-[6px] border-gold backdrop-blur-sm bg-white-off/95"
        >
          <div className="text-gold mb-3 sm:mb-4"><Award size={24} /></div>
          <p className="text-navy font-bold text-base sm:text-lg leading-[1.3] mb-3 sm:mb-4">"Remote Schedulers is the most reliable partner we've used in a decade."</p>
          <div className="flex items-center gap-3">
             <div className="w-6 sm:w-8 h-px bg-gold/30"></div>
             <span className="text-[9px] sm:text-[10px] font-bold text-gray-soft uppercase tracking-widest">VP Operations, Tier 1 GC</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


const Testimonials = () => {
  const reviews = [
    { name: 'Michael R.', role: 'Project Manager', content: 'They delivered our schedule in 4 days. It was perfect and got approved by the GC right away. We now use them for every project.' },
    { name: 'Sarah J.', role: 'Operations Director', content: 'A reliable team that really understands construction. Their monthly reports give us exactly the information we need to stay on track.' },
    { name: 'Ahmed A.', role: 'Principal Engineer', content: 'Their delay analysis was professional and very clear. It helped us secure the time extension we needed on a complex project.' },
  ];

  return (
    <section id="testimonials" className="py-24 sm:py-32 px-4 sm:px-6 bg-white-off relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-5 block"
          >
            Verified Performance
          </motion.span>
          <h2 className="font-condensed text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold text-navy uppercase leading-[0.9] sm:leading-[0.8] tracking-tight">Client<br />Intelligence</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {reviews.map((r, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-[#EDEAE2] p-8 sm:p-12 border-t-[5px] border-gold shadow-2xl hover:shadow-gold/10 transition-all duration-500 relative group overflow-hidden"
            >
              <div className="flex gap-1.5 text-gold mb-8 sm:mb-10 group-hover:scale-105 transition-transform origin-left">
                {[1, 2, 3, 4, 5].map(star => <CheckCircle2 key={star} size={14} className="fill-gold text-gold" />)}
              </div>
              <p className="text-navy text-base sm:text-lg italic leading-[1.6] mb-8 sm:mb-12 font-light">"{r.content}"</p>
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm bg-navy text-gold flex items-center justify-center font-extrabold text-xs sm:text-sm shadow-lg">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-navy text-sm font-extrabold tracking-tight">{r.name}</div>
                  <div className="text-gray-soft text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] mt-0.5">{r.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "How long does it take to get a schedule?", a: "Most project schedules are finished and delivered within 5 to 7 business days, depending on how complex the project is." },
    { q: "Do you help with project delays?", a: "Yes. We specialize in delay analysis to help you document project issues and support requests for more time." },
    { q: "How do you charge for your services?", a: "We provide clear, project-based pricing. The cost depends on the project size and the specific reports your contract requires." }
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 bg-white-off">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
           <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-5 block">Knowledge Base</span>
           <h2 className="font-condensed text-3xl xs:text-4xl sm:text-6xl font-extrabold text-navy uppercase tracking-tight">Technical FAQ</h2>
        </div>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-8 border border-navy/5 bg-navy/[0.02] hover:bg-navy/[0.04] transition-colors">
              <h4 className="text-navy font-bold text-lg mb-3 tracking-tight">{faq.q}</h4>
              <p className="text-gray-soft text-base font-light leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#050C14] py-16 sm:py-24 px-4 sm:px-6 border-t border-gold/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12 sm:gap-16 mb-16 sm:mb-20 pb-16 sm:pb-20 border-b border-white-off/5">
          <div className="col-span-1 sm:col-span-2">
            <div className="logo mb-6 sm:mb-8">
              <span className="font-condensed text-xl sm:text-2xl font-extrabold tracking-widest text-white-off uppercase">
                Remote <span className="text-gold">Schedulers</span>
              </span>
            </div>
            <p className="text-white-off/30 text-sm sm:text-base leading-relaxed max-w-md font-light">
              Engineering professional CPM schedules for global contractors since 2018. 
              Our mission is to translate complex construction logic into clear, defensive, and high-performance plans.
            </p>
            <div className="flex gap-4 sm:gap-6 mt-8 sm:mt-10">
               <div className="w-10 h-10 border border-gold/20 flex items-center justify-center text-gold/40 hover:text-gold hover:border-gold transition-all duration-300 cursor-pointer">
                  <Globe size={18} />
               </div>
               <div className="w-10 h-10 border border-gold/20 flex items-center justify-center text-gold/40 hover:text-gold hover:border-gold transition-all duration-300 cursor-pointer">
                  <ShieldCheck size={18} />
               </div>
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-white-off/5 sm:pt-0 sm:border-0">
            <h5 className="text-gold text-[9px] sm:text-[10px] font-extrabold tracking-[0.4em] uppercase mb-6 sm:mb-8">Navigation</h5>
            <ul className="space-y-4 text-white-off/40 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              {['Services', 'Portfolio', 'Process', 'Why Us'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="hover:text-gold transition-colors inline-block hover:translate-x-1 duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 pt-8 border-t border-white-off/5 sm:pt-0 sm:border-0">
            <h5 className="text-gold text-[9px] sm:text-[10px] font-extrabold tracking-[0.4em] uppercase mb-6 sm:mb-8">Direct Contact</h5>
            <div className="space-y-6 text-white-off/40 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em]">
              <a href="mailto:info@remoteschedulers.com" className="flex items-center gap-3 hover:text-gold transition-colors duration-300 break-all">
                <Mail size={14} className="text-gold/50 shrink-0" /> info@remoteschedulers.com
              </a>
              <a href="tel:7327162718" className="flex items-center gap-3 hover:text-gold transition-colors duration-300 break-all">
                <Phone size={14} className="text-gold/50 shrink-0" /> 732-716-2718
              </a>
              <p className="text-[9px] opacity-40 font-medium italic mt-4 tracking-normal normal-case">Operational Support available Mon-Fri, 9AM - 6PM</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 text-center md:text-left">
          <p className="text-white-off/20 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase">
            &copy; {currentYear} Remote Schedulers Planning Group. All Digital Assets Protected.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-white-off/20 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-gold transition-colors underline underline-offset-4 decoration-gold/0 hover:decoration-gold transition-all duration-500">Privacy Intelligence</a>
            <a href="#" className="hover:text-gold transition-colors underline underline-offset-4 decoration-gold/0 hover:decoration-gold transition-all duration-500">Operational Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const BackToTop = ({ isHidden }: { isHidden: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && !isHidden && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-32 right-8 z-[100] w-14 h-14 bg-gold text-navy rounded-sm shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group overflow-hidden border border-navy/5"
        >
          <ArrowUp size={22} className="relative z-10 transition-transform group-hover:-translate-y-1" />
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- Quote Modal ---

const QuoteModal = ({ 
  isOpen, 
  onClose,
  prefilledData
}: { 
  isOpen: boolean; 
  onClose: () => void;
  prefilledData?: { projectType?: string; challenges?: string; projectSize?: string } | null;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    projectType: 'Commercial',
    projectSize: '',
    challenges: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        company: '',
        email: '',
        projectType: prefilledData?.projectType || 'Commercial',
        projectSize: prefilledData?.projectSize || '',
        challenges: prefilledData?.challenges || ''
      });
      setIsSuccess(false);
    }
  }, [isOpen, prefilledData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          projectType: formData.projectType,
          projectSize: formData.projectSize,
          challenges: formData.challenges,
        }),
      });
      
      const result = await response.json();
      console.log('Submission result:', result);
    } catch (error) {
      console.error('Error submitting quote request:', error);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', company: '', email: '', projectType: 'Commercial', projectSize: '', challenges: '' });
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[30001] overflow-y-auto bg-navy/80 backdrop-blur-xl flex items-start sm:items-center justify-center p-4 md:p-10">
          {/* Backdrop click zone to close on background interaction */}
          <div className="fixed inset-0 cursor-pointer" onClick={onClose} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white-off shadow-4xl border-t-[8px] border-gold p-6 xs:p-8 md:p-12 my-auto z-10"
          >
            {/* Highly visible rounded Close Button with a comfortable tap target for mobile users */}
            <button 
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-navy/5 text-navy/60 hover:text-navy hover:bg-navy/10 transition-all flex items-center justify-center cursor-pointer z-20"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="py-20 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-8"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h3 className="font-condensed text-4xl font-extrabold text-navy uppercase mb-4">Request Logged</h3>
                <p className="text-gray-soft text-lg">Your technical brief is opening in your email client. Our team will review and respond within 24 hours.</p>
                <button
                  onClick={onClose}
                  className="mt-8 px-8 py-3.5 bg-navy text-gold uppercase font-bold text-xs tracking-widest hover:bg-gold hover:text-navy transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-3 block">Strategic Inquiry</span>
                  <h3 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy uppercase leading-none">Get a Quote</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Full Name</label>
                    <input 
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-navy/5 border-b border-navy/10 px-3 py-2.5 focus:outline-none focus:border-gold transition-colors font-medium text-navy text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Company Name</label>
                    <input 
                      required
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-navy/5 border-b border-navy/10 px-3 py-2.5 focus:outline-none focus:border-gold transition-colors font-medium text-navy text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Professional Email</label>
                    <input 
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-navy/5 border-b border-navy/10 px-3 py-2.5 focus:outline-none focus:border-gold transition-colors font-medium text-navy text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Project Type</label>
                    <select 
                      value={formData.projectType}
                      onChange={e => setFormData({...formData, projectType: e.target.value})}
                      className="w-full bg-navy/5 border-b border-navy/10 px-3 py-2.5 focus:outline-none focus:border-gold transition-colors font-medium text-navy text-sm appearance-none"
                    >
                      <option>Commercial</option>
                      <option>Infrastructure</option>
                      <option>Industrial</option>
                      <option>Residential</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 mb-5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Project Size / Budget</label>
                  <input 
                    type="text"
                    placeholder="e.g. $10M / 50,000 SF"
                    value={formData.projectSize}
                    onChange={e => setFormData({...formData, projectSize: e.target.value})}
                    className="w-full bg-navy/5 border-b border-navy/10 px-3 py-2.5 focus:outline-none focus:border-gold transition-colors font-medium text-navy text-sm"
                  />
                </div>

                <div className="space-y-1 mb-8">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-navy/40">Key Challenges / Requirements</label>
                  <textarea 
                    rows={2}
                    value={formData.challenges}
                    onChange={e => setFormData({...formData, challenges: e.target.value})}
                    className="w-full bg-navy/5 border-b border-navy/10 px-3 py-2.5 focus:outline-none focus:border-gold transition-colors font-medium text-navy text-sm resize-none"
                    placeholder="Briefly describe your scheduling needs..."
                  />
                </div>

                {/* Multi-action Bottom Bar supporting clear submission & direct easy cancellation */}
                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  <button 
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-[#ECE9DF] hover:bg-[#E2DDD0] text-navy py-4 font-bold uppercase tracking-[0.2ex] text-[10px] transition-all text-center cursor-pointer"
                  >
                    Cancel & Close
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] bg-navy text-gold py-4 px-6 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs hover:bg-gold hover:text-navy transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Generate Professional Brief</span>
                        <ChevronRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Interactive Contractor Planning & Audit Tools ---

const P6Estimator = ({ onOpenQuoteWithDetails }: { onOpenQuoteWithDetails: (type: string, budget: string, speed: string) => void }) => {
  const [projectType, setProjectType] = useState('Commercial');
  const [projectBudget, setProjectBudget] = useState('Under $2M');
  const [speed, setSpeed] = useState('Standard (5-7 Days)');

  const types = ['Commercial', 'Infrastructure', 'Industrial', 'Residential'];
  const budgets = ['Under $2M', '$2M - $5M', '$5M - $10M', '$10M - $15M', '$15M - $20M', 'Higher than $20M'];
  const speeds = ['Standard (5-7 Days)', 'Express (3-4 Days)'];

  const calculatePrice = () => {
    let basePrice = 2500;
    
    if (projectType === 'Infrastructure') basePrice = 3200;
    if (projectType === 'Industrial') basePrice = 3800;
    if (projectType === 'Residential') basePrice = 1800;

    if (projectBudget === 'Under $2M') basePrice *= 0.55;
    if (projectBudget === '$2M - $5M') basePrice *= 0.75;
    if (projectBudget === '$5M - $10M') basePrice *= 0.9;
    if (projectBudget === '$10M - $15M') basePrice *= 1.25;
    if (projectBudget === '$15M - $20M') basePrice *= 1.6;

    if (speed.includes('Express')) basePrice *= 1.4;

    const originalPrice = Math.round(basePrice);
    const discountedPrice = Math.round(basePrice * 0.7);

    return { original: originalPrice, discounted: discountedPrice };
  };

  const { original, discounted } = calculatePrice();

  return (
    <div className="bg-navy p-6 sm:p-10 border-t-[6px] border-gold shadow-3xl text-white-off">
      <div className="mb-8">
        <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-3 block">DYNAMIC PLANNING SOFTWARE</span>
        <h3 className="font-condensed text-3xl sm:text-4xl font-extrabold uppercase mb-2">Proposal Price Estimator</h3>
        <p className="text-white-off/50 text-sm font-light">Configure your construction planning criteria to check professional flat-rate fee expectations with your 30% first-time customer discount automatically applied.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Type selection */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gold/80 block">Project Category</label>
          <div className="grid grid-cols-2 gap-2">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setProjectType(t)}
                className={`py-3 px-3 text-[11px] font-bold uppercase border transition-all truncate ${
                  projectType === t 
                    ? 'border-gold bg-gold text-navy' 
                    : 'border-white-off/10 hover:border-gold/50 text-white-off/70 bg-navy/20'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Budget selection */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gold/80 block">Estimated Budget / Size</label>
          <div className="grid grid-cols-2 gap-2">
            {budgets.map(b => (
              <button
                key={b}
                onClick={() => setProjectBudget(b)}
                className={`py-3 px-3 text-[11px] font-bold uppercase border transition-all truncate ${
                  projectBudget === b 
                    ? 'border-gold bg-gold text-navy' 
                    : 'border-white-off/10 hover:border-gold/50 text-white-off/70 bg-navy/20'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Speed selection */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gold/80 block">Turnaround Option</label>
          <div className="flex flex-col gap-2">
            {speeds.map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`py-3 px-4 text-[11px] font-bold uppercase border transition-all text-left flex justify-between items-center ${
                  speed === s 
                    ? 'border-gold bg-gold text-navy' 
                    : 'border-white-off/10 hover:border-gold/50 text-white-off/70 bg-navy/20'
                }`}
              >
                <span>{s}</span>
                {s.includes('Express') && <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded-sm font-extrabold uppercase tracking-wider">Priority</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator results */}
      <div className="border-t border-white-off/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/30 p-6 sm:p-8 rounded-sm">
        {projectBudget === 'Higher than $20M' ? (
          <div className="text-center md:text-left flex-1">
            <span className="text-[9px] font-bold tracking-[0.3em] text-gold uppercase block mb-1">Custom Scheduling Scope</span>
            <div className="text-xl sm:text-2xl font-condensed font-extrabold text-white-off uppercase leading-tight mt-2">
              Please reach out by email or phone to discuss further
            </div>
            <p className="text-[11px] text-white-off/50 mt-3 font-sans">
              For projects exceeding $20M, custom baseline constraints and compliance criteria apply. Call <a href="tel:7327162718" className="text-gold font-bold hover:underline">732-716-2718</a> or email <a href="mailto:info@remoteschedulers.com" className="text-gold font-bold hover:underline">info@remoteschedulers.com</a> to finalize details.
            </p>
          </div>
        ) : (
          <div className="text-center md:text-left">
            <span className="text-[9px] font-bold tracking-[0.3em] text-gold uppercase block mb-1">Estimated Setup Fee</span>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-center md:justify-start gap-3 sm:gap-4">
              <span className="text-4xl sm:text-5xl font-condensed font-extrabold text-white-off">${discounted.toLocaleString()}</span>
              <span className="text-lg sm:text-xl font-condensed font-bold text-white-off/30 line-through">${original.toLocaleString()}</span>
              <span className="text-[10px] bg-gold/15 text-gold px-2.5 py-1 font-extrabold rounded-sm uppercase tracking-wider self-center sm:self-auto">30% DISCOUNT APPLIED</span>
            </div>
            <p className="text-[11px] text-white-off/40 mt-2">Professional, CPM-validated fixed-fee baseline proposal. Delivers ready-to-submit .xer files in 5-7 days.</p>
          </div>
        )}

        <button 
          onClick={() => onOpenQuoteWithDetails(projectType, projectBudget, speed)}
          className="w-full md:w-auto bg-gold hover:bg-gold-light text-navy py-5 px-10 text-[11px] font-extrabold uppercase tracking-widest transition-transform transform active:scale-95 duration-300 shadow-xl shadow-gold/10 shrink-0"
        >
          {projectBudget === 'Higher than $20M' ? 'Contact Our Experts' : 'Claim My 30% Off Proposal'}
        </button>
      </div>
    </div>
  );
};

const PlanningTools = ({ onOpenQuoteWithDetails }: { onOpenQuoteWithDetails: (type: string, budget: string, speed: string) => void }) => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white-off overflow-hidden border-t border-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-4 block">Interactive Builder Tools</span>
          <h2 className="font-condensed text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold text-navy uppercase leading-[0.9] sm:leading-[0.8] tracking-tight">Contractor<br />Planner Suite</h2>
        </div>

        <P6Estimator onOpenQuoteWithDetails={onOpenQuoteWithDetails} />
      </div>
    </section>
  );
};

// --- Portfolio Section ---
const Portfolio = () => {
  const [activeSample, setActiveSample] = useState<'bank' | 'tower'>('bank');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportMessage, setExportMessage] = useState('');

  const projects = [
    {
      title: "Cairo Bank in New Capital",
      location: "New Capital",
      type: "High-Rise Commercial",
      challenge: "Coordination of multi-phase sub-structure soil replacement, excavation support timelines, and baseline PC/RC drawing approvals with Department of Defense DCMA logic constraints.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop&q=80",
      highlight: "DCMA logic safety score improved from 65% to 98% with critical path continuity fully preserved."
    },
    {
      title: "ADWAN TOWER",
      location: "Riyadh, Saudi Arabia",
      type: "High-Rise Residential & Multi-Use Tower",
      challenge: "Creating a structural 12-month baseline CPM schedule, optimizing cable stressing sequences for post-tension slabs, and aligning raft concrete casting cycles with weather limits.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
      highlight: "Successfully achieved early milestone authorization, reducing critical schedule buffer risks by 4 weeks."
    },
    {
      title: "Hudson Bridge Project",
      location: "New York, USA",
      type: "Infrastructure Bridge Staging",
      challenge: "Managing structural soil-bearing capacity dependencies, concrete placement sequence timings, and pre-stressed formwork logical buffers.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80",
      highlight: "Eliminated scheduled logic gaps and negative lag issues, achieving 100% compliance matching state regulations."
    }
  ];

  const bankActivities = [
    { id: "CB.A1", name: "Set Up Site", duration: 7, start: "15-Mar-20", finish: "22-Mar-20", wbs: "Set Up", progress: 100, isCritical: true, type: "Milestone" },
    { id: "CB.1.1.A1", name: "Earthing Drawings", duration: 0, start: "17-Mar-20", finish: "17-Mar-20", wbs: "Engineering/Earthing", progress: 100, isCritical: false, type: "Milestone" },
    { id: "CB.1.2.A1", name: "PC Drawings Approved", duration: 14, start: "22-Apr-20", finish: "06-May-20", wbs: "Engineering/Foundation", progress: 100, isCritical: false, type: "Drawing" },
    { id: "CB.1.2.A2", name: "RC Drawings Approved", duration: 18, start: "28-Apr-20", finish: "16-May-20", wbs: "Engineering/Foundation", progress: 100, isCritical: false, type: "Drawing" },
    { id: "CB.1.3.A1", name: "Second Basement Drawings", duration: 25, start: "09-May-20", finish: "03-Jun-20", wbs: "Engineering/Skeleton", progress: 100, isCritical: true, type: "Drawing" },
    { id: "CB.1.3.A3", name: "Ground Floor Drawings", duration: 30, start: "04-Aug-20", finish: "03-Sep-20", wbs: "Engineering/Skeleton", progress: 100, isCritical: true, type: "Drawing" },
    { id: "CB.3.P1.1.1.A1", name: "Excavation Works - Substructure", duration: 33, start: "23-Mar-20", finish: "02-May-20", wbs: "Construction", progress: 100, isCritical: true, type: "Activity" },
    { id: "CB.3.P1.1.2.A2", name: "Soil Replacement & Compaction", duration: 48, start: "15-Mar-20", finish: "12-May-20", wbs: "Construction", progress: 100, isCritical: true, type: "Activity" },
    { id: "CB.3.P1.1.3.1.A1", name: "PC Formwork Installation", duration: 1, start: "13-May-20", finish: "13-May-20", wbs: "Foundation/P.C", progress: 100, isCritical: false, type: "Activity" },
    { id: "CB.3.P1.1.3.1.A2", name: "PC Place Concrete", duration: 1, start: "14-May-20", finish: "14-May-20", wbs: "Foundation/P.C", progress: 100, isCritical: false, type: "Activity" }
  ];

  const towerActivities = [
    { id: "ADT-MI 10", name: "Project Commencement Date", duration: 0, start: "12-Jun-24", finish: "12-Jun-24", wbs: "Milestone", cost: "SAR 0.00", float: 0, isCritical: false, type: "Milestone" },
    { id: "ADT-MO 25", name: "Cleaning & Mobilization Works", duration: 5, start: "12-Jun-24", finish: "17-Jun-24", wbs: "Mobilization", cost: "SAR 150,000.00", float: 0, isCritical: false, type: "Activity" },
    { id: "ADT-CW-EW-UG-1000", name: "Excavation Works - Earth Work", duration: 60, start: "02-Jul-24", finish: "09-Sep-24", wbs: "Substructure", cost: "SAR 2,170,000.00", float: 0, isCritical: true, type: "Activity" },
    { id: "ADT-CW-ST-UG-WT-1090", name: "Shuttering Water Tank Walls", duration: 5, start: "24-Sep-24", finish: "29-Sep-24", wbs: "Water Tank", cost: "SAR 54,088.97", float: 0, isCritical: false, type: "Activity" },
    { id: "ADT-CW-ST-UG-WT-1100", name: "Steel Fixing Water Tank Walls", duration: 9, start: "30-Sep-24", finish: "09-Oct-24", wbs: "Water Tank", cost: "SAR 180,296.57", float: 0, isCritical: false, type: "Activity" },
    { id: "ADT-CW-ST-UG-FD-1100", name: "Steel Fixing Raft Foundation", duration: 20, start: "02-Nov-24", finish: "24-Nov-24", wbs: "Rafts", cost: "SAR 2,017,670.52", float: 0, isCritical: true, type: "Activity" },
    { id: "ADT-CW-ST-UG-FD-1110", name: "Concrete Casting Raft Foundation", duration: 2, start: "25-Nov-24", finish: "26-Nov-24", wbs: "Rafts", cost: "SAR 1,210,602.31", float: 0, isCritical: true, type: "Activity" },
    { id: "ADT-CW-ST-UG-BS1-1130", name: "Water Proofing Retaining Walls", duration: 3, start: "01-Jan-25", finish: "04-Jan-25", wbs: "Basement 3", cost: "SAR 82,350.00", float: 16, isCritical: false, type: "Activity" },
    { id: "ADT-MI 20", name: "Project Completion Milestone", duration: 0, start: "19-Feb-26", finish: "19-Feb-26", wbs: "Milestone", cost: "SAR 0.00", float: 0, isCritical: true, type: "Milestone" }
  ];

  const selectedActivities = activeSample === 'bank' ? bankActivities : towerActivities;

  const filteredActivities = selectedActivities.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.wbs.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'critical') return matchesSearch && a.isCritical;
    if (filterType === 'milestone') return matchesSearch && a.duration === 0;
    if (filterType === 'drawing') return matchesSearch && a.type === "Drawing";
    return matchesSearch;
  });

  const handleMockExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportMessage('Extracting WBS dictionary tree elements...');
    
    const messages = [
      'Extracting WBS dictionary tree elements...',
      'Structuring activity calendar definitions and scheduling offsets...',
      'Validating CPM logic paths and calculating total float values...',
      'DCMA 14-Point Assessment: Pass (100% logic validation green)...',
      'Compiling baseline schedule file packet (.xer / .pdf)...',
      'Ready! Professional schedule sample download generated successfully.'
    ];

    let currentMsgIdx = 0;
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            setExportProgress(0);
            
            // Trigger actual download of a simulated text/log representing the real schedule metadata or guidelines
            const blobContent = `--- REMOTE SCHEDULERS PLANNING GROUP ---
Document Export Match: ${activeSample === 'bank' ? 'Cairo Bank in New Capital Baseline' : 'Adwan Tower Riyadh Baseline Schedule'}
Export Standard: Primavera P6 Baseline Format XML/XER Metadata Layout
Budgeted Cost Target: ${activeSample === 'bank' ? 'Fixed Flat Rate Optimization' : 'SAR 37,548,206.00'}

Activity Listing Preview:
${selectedActivities.map(a => `[${a.id}] ${a.name} | Duration: ${a.duration}d | Start: ${a.start} | Finish: ${a.finish} | critical: ${a.isCritical}`).join('\n')}

This schedule baseline file is validated under DCMA 14-Point schedule logic criteria. 100% compliant.
Thank you for trusting Remote Schedulers! For real-time native .XER exports or Custom P6 Schedulers setup, contact info@remoteschedulers.com.`;

            const blob = new Blob([blobContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${activeSample === 'bank' ? 'Cairo_Bank_Schedule_Baseline' : 'Adwan_Tower_Schedule_Baseline'}_RemoteSchedulers.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 800);
          return 100;
        }
        
        const nextMessageIdx = Math.floor((prev + 18) / 20);
        if (nextMessageIdx > currentMsgIdx && nextMessageIdx < messages.length) {
          currentMsgIdx = nextMessageIdx;
          setExportMessage(messages[currentMsgIdx]);
        }
        
        return prev + 12;
      });
    }, 350);
  };

  return (
    <section id="portfolio" className="py-24 sm:py-32 px-4 sm:px-6 bg-white-off border-t border-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-24 gap-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-4 block">Our Baseline Showcases</span>
            <h2 className="font-condensed text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold text-navy uppercase leading-[0.95]">Case Studies &<br />Portfolios</h2>
          </div>
          <p className="text-gray-soft max-w-sm text-base leading-relaxed border-l-2 border-gold pl-6 py-1">
            Real baseline schedules optimized for premier contractors. Explore project controls and planning logic challenges successfully resolved.
          </p>
        </div>

        {/* Portfolios Cards Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white group/port border border-gold/15 shadow-xl overflow-hidden hover:shadow-gold/10 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="h-64 sm:h-72 overflow-hidden relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover/port:scale-110"
                />
                <div className="absolute inset-0 bg-navy/40 group-hover/port:bg-navy/10 transition-colors duration-500"></div>
                
                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                  <span className="bg-navy text-gold text-[8px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-sm">
                    {p.type}
                  </span>
                  <span className="bg-gold text-navy text-[8px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm">
                    {p.location}
                  </span>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-condensed text-2xl font-bold text-navy mb-4 tracking-wide uppercase group-hover/port:text-gold transition-colors">
                    {p.title}
                  </h3>
                  <div className="mb-6 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-navy/40">Critical Constraint Overcome</p>
                    <p className="text-sm text-gray-soft leading-relaxed">{p.challenge}</p>
                  </div>
                </div>

                <div className="border-t border-navy/5 pt-6 mt-6 bg-gold/5 p-4 rounded-sm border-l-4 border-l-gold">
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-gold mb-1">Impact Highlight</p>
                  <p className="text-xs text-navy font-bold leading-relaxed">{p.highlight}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- DYNAMIC INTERACTIVE SCHEDULE SAMPLES DASHBOARD (PDF/OCR extraction representation) --- */}
        <div id="samples-section" className="bg-navy p-6 sm:p-10 border-t-4 border-gold shadow-3xl text-white-off text-left">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 pb-8 border-b border-white-off/10">
            <div>
              <span className="text-[10px] text-gold tracking-[0.4em] uppercase font-bold block mb-2">Interactive P6 Gantt Viewer</span>
              <h3 className="font-condensed text-2xl sm:text-4xl font-extrabold uppercase text-white-off">Baseline Schedule Samples</h3>
              <p className="text-white-off/50 text-xs sm:text-sm font-light mt-1">Explore real structured schedule baseline sheets compiled automatically. Validate critical path, logic relationships, and float limits.</p>
            </div>
            
            {/* Project Selection Tabs */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              <button 
                onClick={() => { setActiveSample('bank'); setSearchTerm(''); setFilterType('all'); }}
                className={`flex-1 lg:flex-initial py-3 px-6 text-[10px] font-bold uppercase tracking-wider transition-all border ${activeSample === 'bank' ? 'bg-gold text-navy border-gold' : 'border-white-off/15 text-white-off/70 hover:border-gold/50'}`}
              >
                Cairo Bank (New Capital)
              </button>
              <button 
                onClick={() => { setActiveSample('tower'); setSearchTerm(''); setFilterType('all'); }}
                className={`flex-1 lg:flex-initial py-3 px-6 text-[10px] font-bold uppercase tracking-wider transition-all border ${activeSample === 'tower' ? 'bg-gold text-navy border-gold' : 'border-white-off/15 text-white-off/70 hover:border-gold/50'}`}
              >
                Adwan Tower (Riyadh)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Sidebar Controls */}
            <div className="xl:col-span-1 space-y-6">
              <div className="bg-navy/40 p-5 border border-white-off/10 rounded-sm space-y-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold">Schedule Search & Filter</p>
                
                {/* Search Activity */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase text-white-off/60 tracking-wider">Search Keywords / WBS</label>
                  <input
                    type="text"
                    placeholder="Search ID, name or wbs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#112240] border border-white-off/10 text-white-off text-xs px-4 py-3 focus:outline-none focus:border-gold/50 rounded-sm"
                  />
                </div>

                {/* Filter logic types */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase text-white-off/60 tracking-wider">Classification Filter</label>
                  <div className="flex flex-col gap-1.5">
                    {['all', 'critical', 'milestone', activeSample === 'bank' ? 'drawing' : ''].map(type => {
                      if (!type) return null;
                      return (
                        <button
                          key={type}
                          onClick={() => setFilterType(type)}
                          className={`w-full py-2.5 px-3.5 text-left text-[10px] font-bold tracking-wider uppercase border transition-all flex justify-between items-center ${filterType === type ? 'bg-[#112240] border-gold text-gold' : 'border-transparent text-white-off/50 hover:text-white-off/80'}`}
                        >
                          <span>{type} Activities</span>
                          {type === 'critical' && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Instant Simulated Download Wrapper */}
              <div className="bg-[#112240] p-6 border border-white-off/15 rounded-sm space-y-4">
                <div className="text-center">
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-gold mb-1">Baseline Export Sandbox</p>
                  <h4 className="text-sm font-bold uppercase text-white-off">Primavera P6 Raw Metadata</h4>
                  <p className="text-white-off/40 text-[10px] leading-relaxed mt-2">Export CPM logic sequences directly to custom Primavera schedule worksheets matching user PDF guidelines.</p>
                </div>

                {isExporting ? (
                  <div className="space-y-2">
                    <div className="w-full bg-navy h-2 rounded-full overflow-hidden">
                      <div className="bg-gold h-full transition-all duration-300" style={{ width: `${exportProgress}%` }}></div>
                    </div>
                    <p className="text-[9px] font-mono text-center text-gold/80 uppercase tracking-wider block h-8 overflow-hidden">{exportMessage}</p>
                  </div>
                ) : (
                  <button
                    onClick={handleMockExport}
                    className="w-full bg-gold hover:bg-gold-light text-navy py-3 px-5 text-[10px] font-extrabold tracking-widest uppercase transition-transform active:scale-95 duration-200"
                  >
                    Export Sample Schedule File
                  </button>
                )}
              </div>
            </div>

            {/* Live Interactive P6 Spreadsheet Gantt Sheet */}
            <div className="xl:col-span-3 space-y-4">
              <div className="bg-[#112240] border border-white-off/10 overflow-hidden shadow-2xl rounded-sm">
                
                {/* Simulated P6 Table Headers */}
                <div className="bg-navy border-b border-white-off/15 px-6 py-4 grid grid-cols-12 gap-4 text-[10px] font-bold uppercase tracking-wider text-gold select-none">
                  <div className="col-span-3 font-mono">Activity ID</div>
                  <div className="col-span-4 sm:col-span-5">Activity Name</div>
                  <div className="col-span-1 text-center">Orig. Dur</div>
                  <div className="col-span-2 text-right hidden sm:block">Start Date</div>
                  <div className="col-span-2 text-right">Finish Date</div>
                </div>

                {/* Simulated spreadsheet lines */}
                <div className="divide-y divide-white-off/10 max-h-[460px] overflow-y-auto font-mono scrollbar-thin">
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map((act) => (
                      <div 
                        key={act.id} 
                        className={`px-6 py-4 grid grid-cols-12 gap-4 text-xs transition-colors items-center ${act.isCritical ? 'bg-red-500/5 hover:bg-red-500/10' : 'hover:bg-white-off/5'}`}
                      >
                        <div className={`col-span-3 font-bold truncate ${act.isCritical ? 'text-red-500' : 'text-gold/80'}`}>
                          {act.id}
                        </div>
                        <div className="col-span-4 sm:col-span-5 font-sans font-medium text-white-off/90 truncate flex items-center gap-2">
                          {act.isCritical && (
                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0 animate-ping"></span>
                          )}
                          <span className="truncate">{act.name}</span>
                          <span className="opacity-35 text-[9px] uppercase font-mono tracking-wider ml-1 truncate">({act.wbs})</span>
                        </div>
                        <div className="col-span-1 text-center font-semibold text-white-off/50">
                          {act.duration}d
                        </div>
                        <div className="col-span-2 text-right text-[11px] text-white-off/60 hidden sm:block">
                          {act.start}
                        </div>
                        <div className={`col-span-2 text-right text-[11px] font-semibold ${act.isCritical ? 'text-red-400' : 'text-white-off/80'}`}>
                          {act.finish}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-20 text-center text-white-off/30 font-sans text-xs">
                      No baseline activity matched the search criteria or category filter. Try clearing your filters.
                    </div>
                  )}
                </div>

                {/* Static Summary Stats Matching Real Schedules */}
                <div className="bg-[#0f1d3a] px-6 py-4.5 border-t border-white-off/10 flex flex-wrap justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-white-off/50">
                  <div className="flex gap-6 items-center">
                    <div>
                      Total Path Duration: <span className="text-gold font-mono text-xs ml-1">{activeSample === 'bank' ? '265' : '530'} Days</span>
                    </div>
                    {activeSample === 'tower' && (
                      <div className="border-l border-white-off/15 pl-6">
                        Budgeted Total Cost: <span className="text-gold font-mono text-xs ml-1">SAR 37,548,206.00</span>
                      </div>
                    )}
                  </div>
                  <div>
                    Baseline Compliant Status: <span className="text-green-500">● 100% DCMA Verified</span>
                  </div>
                </div>
              </div>

              {/* Gantt View visual mock representation */}
              <div className="bg-[#112240] p-5 border border-white-off/10 rounded-sm">
                <span className="text-[9px] font-extrabold tracking-widest text-gold uppercase block mb-3">CPM Milestone & Relationship Sequence View</span>
                
                <div className="space-y-4">
                  {/* Timeline segment rulers */}
                  <div className="grid grid-cols-6 gap-2 text-center text-[8px] font-bold text-white-off/30 uppercase tracking-widest select-none pb-2 border-b border-white-off/10">
                    <div>Qtr 1</div>
                    <div>Qtr 2</div>
                    <div>Qtr 3</div>
                    <div>Qtr 4</div>
                    <div>Qtr 5</div>
                    <div>Qtr 6</div>
                  </div>

                  {/* Flow items */}
                  <div className="space-y-3 pt-2">
                    {activeSample === 'bank' ? (
                      <>
                        <div className="flex items-center text-xs justify-between gap-4">
                          <span className="w-1/4 font-medium text-white-off/70 truncate">CB.A1 - Site Setup</span>
                          <div className="flex-1 bg-navy/60 h-3 rounded-full overflow-hidden relative">
                            <div className="absolute left-0 w-[15%] h-full bg-red-500"></div>
                          </div>
                        </div>
                        <div className="flex items-center text-xs justify-between gap-4">
                          <span className="w-1/4 font-medium text-white-off/70 truncate">CB.1.2 - Foundation Drawings</span>
                          <div className="flex-1 bg-navy/60 h-3 rounded-full overflow-hidden relative">
                            <div className="absolute left-[15%] w-[20%] h-full bg-gold"></div>
                          </div>
                        </div>
                        <div className="flex items-center text-xs justify-between gap-4">
                          <span className="w-1/4 font-medium text-white-off/70 truncate">CB.1.3 - Skeleton Drawings</span>
                          <div className="flex-1 bg-navy/60 h-3 rounded-full overflow-hidden relative">
                            <div className="absolute left-[30%] w-[55%] h-full bg-red-500"></div>
                          </div>
                        </div>
                        <div className="flex items-center text-xs justify-between gap-4">
                          <span className="w-1/4 font-medium text-white-off/70 truncate">CB.3.P1.1 - Excavation & Mud Works</span>
                          <div className="flex-1 bg-navy/60 h-3 rounded-full overflow-hidden relative">
                            <div className="absolute left-[10%] w-[35%] h-full bg-red-500"></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center text-xs justify-between gap-4">
                          <span className="w-1/4 font-medium text-white-off/70 truncate">ADT-CW-EW - Excavation Works</span>
                          <div className="flex-1 bg-navy/60 h-3 rounded-full overflow-hidden relative">
                            <div className="absolute left-[5%] w-[25%] h-full bg-red-500"></div>
                          </div>
                        </div>
                        <div className="flex items-center text-xs justify-between gap-4">
                          <span className="w-1/4 font-medium text-white-off/70 truncate">ADT-CW-ST - Water Tank Construction</span>
                          <div className="flex-1 bg-navy/60 h-3 rounded-full overflow-hidden relative">
                            <div className="absolute left-[20%] w-[10%] h-full bg-gold"></div>
                          </div>
                        </div>
                        <div className="flex items-center text-xs justify-between gap-4">
                          <span className="w-1/4 font-medium text-white-off/70 truncate">ADT-CW-ST - Steel Fixing Raft</span>
                          <div className="flex-1 bg-navy/60 h-3 rounded-full overflow-hidden relative">
                            <div className="absolute left-[35%] w-[30%] h-full bg-red-500"></div>
                          </div>
                        </div>
                        <div className="flex items-center text-xs justify-between gap-4">
                          <span className="w-1/4 font-medium text-white-off/70 truncate">ADT-CW-ST - Waterproofing Works</span>
                          <div className="flex-1 bg-navy/60 h-3 rounded-full overflow-hidden relative">
                            <div className="absolute left-[55%] w-[15%] h-full bg-gold"></div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Dynamic Gantt Legend */}
                  <div className="flex justify-end gap-6 items-center text-[9px] font-bold uppercase tracking-wider text-white-off/50 border-t border-white-off/10 pt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-sm"></span>
                      <span>Critical Remaining Path</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-gold rounded-sm"></span>
                      <span>Standard Activity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prefilledData, setPrefilledData] = useState<{ projectType?: string; challenges?: string; projectSize?: string } | null>(null);

  const handleOpenQuoteWithDetails = (type: string, budget: string, speed: string) => {
    setPrefilledData({
      projectType: type,
      projectSize: budget,
      challenges: `Priority setup: ${speed}. Please provide a 30% discounted estimate of professional scheduling services for this project.`
    });
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white-off overflow-x-hidden selection:bg-gold selection:text-navy">
      <BackToTop isHidden={isMobileMenuOpen} />
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        onOpenQuote={() => setIsQuoteModalOpen(true)} 
      />
      <Hero onOpenQuote={() => setIsQuoteModalOpen(true)} />
      <Stats />
      <Services />
      <Process />
      <WhyUs />
      <Portfolio />
      <PlanningTools onOpenQuoteWithDetails={handleOpenQuoteWithDetails} />
      <Testimonials />
      <FAQ />
      <Footer />
      <ChatBot isHidden={isMobileMenuOpen} />
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => {
          setIsQuoteModalOpen(false);
          setPrefilledData(null);
        }} 
        prefilledData={prefilledData}
      />
    </div>
  );
}
