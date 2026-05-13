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

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Payments', href: '#payments' },
    { name: 'Why Us', href: '#why' },
    { name: 'Reviews', href: '#testimonials' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500">
      {/* Integrated Top Bar */}
      <div className={`bg-gold text-navy transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-auto py-3 md:py-1.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-8 text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-center md:text-left">
          <div className="flex items-center gap-4 md:gap-8 order-2 md:order-1">
            <a href="mailto:info@remoteschedulers.com" className="hover:opacity-70 transition-all flex items-center gap-2">
              <Mail size={12} className="shrink-0" /> <span className="hidden sm:inline">info@remoteschedulers.com</span><span className="sm:hidden">Email</span>
            </a>
            <span className="flex items-center gap-2 border-l border-navy/10 pl-4 md:pl-8">
              <Phone size={12} className="shrink-0" /> <span className="hidden sm:inline">+1 (888) 555-0123</span><span className="sm:hidden">Call</span>
            </span>
          </div>
          
          <div className="order-1 md:order-2">
            <span className="bg-navy text-gold px-4 py-1 text-[9px] md:text-[10px] animate-pulse rounded-full shadow-lg whitespace-nowrap">
              30% Discount for First 20 GCs
            </span>
          </div>
          
          <div className="hidden lg:block order-3 text-[9px] opacity-40">
            Precision Planning Group
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
              We Plan. You Build.
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
            <a 
              href="#cta"
              className="bg-navy text-gold hover:bg-gold hover:text-navy px-8 py-3 text-[11px] font-bold tracking-widest uppercase transition-all transform hover:-translate-y-1 shadow-lg shadow-navy/10 active:scale-95"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-navy p-2 hover:bg-gold/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Off-canvas Slide-in */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-navy/60 backdrop-blur-md z-[110] md:hidden"
              />
              
              {/* Drawer */}
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-navy z-[120] md:hidden shadow-4xl flex flex-col p-8 border-l border-gold/20"
              >
                <div className="flex justify-between items-center mb-16">
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

                <div className="flex flex-col space-y-8">
                  {navLinks.map((link, i) => (
                    <motion.a 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      key={link.name}
                      href={link.href}
                      className="text-3xl font-condensed font-bold tracking-widest text-white-off uppercase hover:text-gold transition-colors flex items-center justify-between group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                      <ChevronRight size={20} className="text-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </motion.a>
                  ))}
                </div>

                <div className="mt-auto pt-10 border-t border-white-off/10 space-y-8">
                  <motion.a 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    href="#cta"
                    className="bg-gold text-navy w-full text-center py-5 text-xl font-bold tracking-[0.2em] uppercase rounded-sm shadow-xl block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get a Quote
                  </motion.a>

                  <div className="space-y-4">
                    <p className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase">Quick Contact</p>
                    <div className="flex flex-col space-y-4">
                      <a href="mailto:info@remoteschedulers.com" className="text-white-off/60 text-sm font-medium flex items-center gap-3">
                        <Mail size={16} className="text-gold" /> info@remoteschedulers.com
                      </a>
                      <a href="tel:+18885550123" className="text-white-off/60 text-sm font-medium flex items-center gap-3">
                        <Phone size={16} className="text-gold" /> +1 (888) 555-0123
                      </a>
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

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center md:items-end pt-32 md:pt-24 overflow-hidden bg-navy">
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
              <Zap size={12} fill="currentColor" /> CPM Scheduling Experts
            </span>
            <h1 className="font-display text-7xl sm:text-8xl md:text-[10rem] leading-[0.85] md:leading-[0.82] text-white-off tracking-tight mb-8">
              WE PLAN.<br /><span className="text-gold selection:text-white-off">YOU BUILD.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-white-off/70 max-w-xl mb-10 sm:mb-12 leading-relaxed font-light font-sans px-1 sm:px-0"
          >
            Delivering professional CPM schedules within 5–7 business days. 
            Navigate your build with absolute precision and data-driven planning.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5"
          >
            <a 
              href="#cta"
              className="group relative bg-gold hover:bg-gold-light text-navy px-10 sm:px-12 py-5 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center sm:justify-start gap-3 overflow-hidden shadow-2xl shadow-gold/20 active:scale-95 transition-all"
            >
              <span className="relative z-10">Get a Quote</span>
              <ChevronRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            </a>
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
    { value: '500+', label: 'Projects Worldwide' },
    { value: '5-7', label: 'Day Delivery' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '5+', label: 'Years Experience' },
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
    { id: '01', title: 'CPM Scheduling', icon: <Calendar size={28} />, desc: 'Full Critical Path Method schedules tailored to your scope, built in Primavera P6 or MS Project.' },
    { id: '02', title: 'Cost & Resource Loading', icon: <BarChart3 size={28} />, desc: 'Advanced integration of budget and resource allocation within your schedule for absolute control.' },
    { id: '03', title: 'Schedule Updates', icon: <TrendingUp size={28} />, desc: 'Regular maintenance and progress updates to keep your project on track through every phase.' },
    { id: '04', title: 'Delay Analysis', icon: <AlertTriangle size={28} />, desc: 'Forensic analysis of delays with clear documentation to support claims and protect interests.' },
    { id: '05', title: 'TIA & Narrative Reports', icon: <Award size={28} />, desc: 'Time Impact Analysis and written reports that document delays and impacts for claims.' },
  ];

  const comparison = [
    { feature: 'Turnaround Time', remote: '5-7 Days', typical: '14-21 Days' },
    { feature: 'Pricing Model', remote: 'Fixed per Project (30% Down)', typical: 'Hourly/Variable' },
    { feature: 'Payment Logic', remote: 'Institutional Grade', typical: 'Manual/Unstructured' },
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
            <h2 className="font-condensed text-4xl sm:text-5xl md:text-7xl font-extrabold text-navy leading-[0.95] uppercase">Powerful<br />Solutions</h2>
          </div>
          <p className="text-gray-soft max-w-sm text-base leading-relaxed border-l-2 border-gold pl-6 py-1">
            From baseline schedules to forensic delay claims — we provide the technical logic required for elite construction performance.
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/15 border border-gold/15 mb-24 sm:mb-32 group"
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

        {/* Comparison Table */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-navy p-6 md:p-20 border-t-[6px] border-gold shadow-3xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 p-4 opacity-[0.03] rotate-12 pointer-events-none">
            <LayoutGrid size={240} />
          </div>
          <div className="text-center mb-10 sm:mb-16 relative z-10">
            <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-4 block">Competitive Edge</span>
            <h3 className="font-condensed text-3xl sm:text-4xl md:text-5xl font-extrabold text-white-off uppercase tracking-tight">The Remote Advantage</h3>
          </div>
          
          <div className="relative z-10 overflow-x-auto no-scrollbar">
            <div className="min-w-[450px]">
              <div className="grid grid-cols-3 text-[10px] font-bold tracking-[0.25em] text-gold/60 uppercase mb-6 sm:mb-8 pb-4 border-b border-white-off/10">
                <span className="flex items-center gap-2">Core Feature</span>
                <span className="text-center bg-gold/10 py-1 text-gold">Remote Schedulers</span>
                <span className="text-right">Other Firms</span>
              </div>
              {comparison.map((item) => (
                <div key={item.feature} className="grid grid-cols-3 items-center py-4 sm:py-6 border-b border-white-off/5 group/row hover:bg-white-off/[0.02] transition-colors -mx-4 px-4">
                  <span className="text-white-off/70 font-bold text-xs sm:text-sm group-hover/row:text-white-off transition-colors">{item.feature}</span>
                  <span className="text-center text-gold font-extrabold text-base sm:text-lg font-condensed tracking-wide">{item.remote}</span>
                  <span className="text-right text-white-off/30 text-xs sm:text-sm font-medium">{item.typical}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 sm:mt-16 flex items-center justify-center gap-3">
             <div className="h-px w-6 sm:w-10 bg-gold/30"></div>
             <p className="text-white-off/20 text-[9px] sm:text-[10px] italic font-medium text-center">Standard baseline comparison verified by industry audit data</p>
             <div className="h-px w-6 sm:w-10 bg-gold/30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { num: '01', title: 'Send Your Plans', desc: 'Securely upload drawings, specs, and contract documents through our encrypted client portal.' },
    { num: '02', title: 'Professional Review', desc: 'Our senior schedulers audit your scope and deliver a comprehensive fixed-price quote within 24 hours.' },
    { num: '03', title: 'Technical Build', desc: 'Your logic-driven CPM schedule is engineered using industry best practices in P6 or MS Project.' },
    { num: '04', title: 'Rapid Delivery', desc: 'Receive your submission-ready schedule in 5-7 business days. Guaranteed precision for every project.' },
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
            <h2 className="font-condensed text-5xl sm:text-6xl md:text-8xl font-extrabold text-white-off uppercase leading-[0.85]">The Modern<br /><span className="text-gold">Workflow</span></h2>
          </div>
          <p className="text-white-off/50 max-w-sm text-base sm:text-lg leading-relaxed font-light border-l border-gold/30 pl-6 sm:pl-8">
            We've removed the friction from construction planning. Experience a digital-first approach that prioritizes speed and reliability.
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 sm:gap-16">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-gold via-navy to-gold opacity-30"></div>
          
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

const PaymentInfrastructure = () => {
  const options = [
    {
      title: "Digital Processing",
      method: "PayPal & Credit Cards",
      icon: <Wallet size={28} />,
      desc: "Instant authorization and 30% retainer processing via our secure PayPal gateway. Full buyer protection and digital receipting for corporate records.",
      features: ["Global Acceptance", "Instant Retainers", "Buyer Protection"]
    },
    {
      title: "Direct Logistics",
      method: "Bank Transfer & Wire",
      icon: <Building2 size={28} />,
      desc: "Standard institutional billing for larger contracts. Specialized ACH and SWIFT instructions provided for seamless treasury management.",
      features: ["No Processing Fees", "Direct Treasury", "Custom Invoicing"]
    }
  ];

  return (
    <section id="payments" className="py-24 sm:py-32 px-4 sm:px-6 bg-[#050C14] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase mb-5 block"
          >
            Financial Intelligence
          </motion.span>
          <h2 className="font-condensed text-4xl sm:text-6xl md:text-8xl font-extrabold text-white-off uppercase leading-[0.8] tracking-tight">Flexible<br /><span className="text-gold">Settlements</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {options.map((opt, i) => (
            <motion.div 
              key={opt.method}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white-off/[0.03] border border-white-off/10 p-8 sm:p-12 relative group hover:bg-white-off/[0.05] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700">
                {opt.icon}
              </div>
              
              <div className="mb-8">
                 <div className="text-gold font-bold text-sm tracking-widest uppercase mb-2">{opt.title}</div>
                 <h3 className="text-2xl sm:text-3xl font-extrabold text-white-off font-condensed tracking-wide uppercase">{opt.method}</h3>
              </div>
              
              <p className="text-white-off/40 text-base leading-relaxed mb-10 font-light max-w-md">
                {opt.desc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white-off/5 pt-8">
                {opt.features.map(feat => (
                  <div key={feat} className="flex items-center gap-2 text-[10px] font-bold text-gold uppercase tracking-wider">
                    <CheckCircle2 size={12} className="shrink-0" /> {feat}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 bg-gold/5 border-l-2 border-gold flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-gold/10 flex items-center justify-center text-gold">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-white-off font-extrabold text-sm uppercase tracking-widest mb-1">Encrypted Transactions</h4>
              <p className="text-white-off/30 text-[11px] font-medium uppercase tracking-wider">All logic and financial metadata secured via 256-bit SSL encryption.</p>
            </div>
          </div>
          <a href="#cta" className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] hover:text-white-off transition-colors flex items-center gap-2 group">
            Review Billing Terms <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
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
          <h2 className="font-condensed text-4xl sm:text-6xl md:text-8xl font-extrabold text-white-off mb-8 sm:mb-12 uppercase leading-[0.85]">
            Engineered For<br /><span className="text-gold">Site Teams</span>
          </h2>
          
          <div className="space-y-6 sm:space-y-8">
            {[
              'Certified CPM schedulers with deep industry field expertise.',
              'Rapid turnaround: Baseline schedules delivered in 5-7 business days.',
              'Transparent fixed-price engagement — no hidden hourly overhead.',
              'Advanced mastery of P6, MS Project, and forensic delay modeling.',
              'Strategic US-based coordination for seamless communication.'
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
    { name: 'Mike', role: 'Project Manager', company: 'Civil Construction', content: 'Remote Schedulers turned around our baseline in 4 days and the GC loved it. We\'ve used them on every bid since.' },
    { name: 'Sarah', role: 'Operations Dir', company: 'Urban Build', content: 'Finally found schedulers who actually understand construction logic. Thorough, dependable, and no hand-holding.' },
    { name: 'Ahmed', role: 'Principal Engineer', company: 'General Contracting', content: 'Their delay analysis saved us $180K on a disputed claim. well-documented, and delivered fast. Highly recommended.' },
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
          <h2 className="font-condensed text-4xl sm:text-6xl md:text-7xl font-extrabold text-navy uppercase leading-[0.8] tracking-tight">Client<br />Intelligence</h2>
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
                  <div className="text-gray-soft text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] mt-0.5">{r.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactCTA = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section id="cta" className="py-24 sm:py-32 px-4 sm:px-6 bg-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/[0.03] blur-[150px] pointer-events-none rotate-12"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gold/[0.02] blur-[150px] pointer-events-none -rotate-12"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-5xl sm:text-6xl md:text-9xl text-white-off leading-[0.85] sm:leading-[0.8] mb-8 sm:mb-10 tracking-tighter">
            READY TO <span className="text-gold">NAVIGATE</span><br />YOUR BUILD?
          </h2>
          <p className="text-white-off/50 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 sm:mb-16 font-light leading-relaxed px-4 sm:px-0">
            Submit your site plans for a high-fidelity audit. Our elite scheduling team delivers transparent, fixed-price coordination within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col md:flex-row gap-0 group shadow-3xl bg-white-off/5 border border-gold/20">
            <input 
              type="email" 
              placeholder="Enter your professional email..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 sm:px-8 py-5 sm:py-6 text-white-off focus:outline-none focus:bg-white-off/10 transition-all text-sm sm:text-base font-light placeholder:text-white-off/20"
              required
            />
            <button 
              type="submit"
              className="relative bg-gold hover:bg-gold-light text-navy px-10 sm:px-12 py-5 sm:py-6 font-extrabold tracking-[0.2em] text-[10px] sm:text-[11px] uppercase transition-all overflow-hidden group/btn active:scale-[0.98]"
            >
              <span className="relative z-10">Get Free Audit</span>
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out"></div>
            </button>
          </form>

          <AnimatePresence>
            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-8 sm:mt-10 text-gold font-bold text-sm sm:text-base flex items-center justify-center gap-3 bg-gold/10 py-3 sm:py-4 px-6 sm:px-8 inline-flex mx-auto border border-gold/20 backdrop-blur-sm"
              >
                <CheckCircle2 size={18} className="text-gold" /> 
                <span className="tracking-wide">Submission Received. Briefing follows within 24 hours.</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-16 sm:mt-20 flex flex-wrap justify-center gap-8 sm:gap-12 text-white-off/30 uppercase tracking-[0.4em] text-[9px] sm:text-[10px] font-extrabold">
            <motion.span whileHover={{ color: '#C9A84C' }} className="flex items-center gap-2 sm:gap-3 cursor-default transition-colors"><Clock size={14} /> Rapid Response</motion.span>
            <motion.span whileHover={{ color: '#C9A84C' }} className="flex items-center gap-2 sm:gap-3 cursor-default transition-colors"><ShieldCheck size={14} /> Logic Verified</motion.span>
            <motion.span whileHover={{ color: '#C9A84C' }} className="flex items-center gap-2 sm:gap-3 cursor-default transition-colors"><Globe size={14} /> Global Expertise</motion.span>
          </div>
        </motion.div>
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
              {['Services', 'Process', 'Payments', 'Why Us', 'Contact'].map(link => (
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
              <div className="flex items-center gap-3 border-l border-gold/20 pl-4">
                <Phone size={14} className="text-gold/50 shrink-0" /> +1 (888) 555-0123
              </div>
              <p className="text-[9px] opacity-40 font-medium italic mt-4 tracking-normal normal-case">Operational Support available Mon-Fri, 9AM - 6PM EST</p>
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

const BackToTop = () => {
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
      {isVisible && (
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

export default function App() {
  return (
    <div className="min-h-screen bg-white-off overflow-x-hidden selection:bg-gold selection:text-navy">
      <BackToTop />
      <Header />
      <Hero />
      <Stats />
      <Services />
      <Process />
      <PaymentInfrastructure />
      <WhyUs />
      <Testimonials />
      <ContactCTA />
      <Footer />
      <ChatBot />
    </div>
  );
}
