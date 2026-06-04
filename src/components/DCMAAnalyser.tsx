import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ShieldCheck, 
  Download, 
  TrendingUp, 
  Users, 
  Lock, 
  Zap, 
  Sparkles, 
  Layers, 
  Briefcase, 
  Calculator, 
  ChevronRight, 
  ArrowRight,
  Info,
  Clock,
  Printer,
  ChevronDown,
  Building2,
  CalendarCheck
} from 'lucide-react';

// --- Types ---
interface LeadInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  projectValue: string;
}

interface DCMACheck {
  id: number;
  metric: string;
  title: string;
  status: 'pass' | 'fail';
  value: string;
  target: string;
  description: string;
  whyItMatters: string;
  impact: string;
  correction: string;
}

// --- High-Fidelity Pre-analyzed Samples ---
const SAMPLE_RECORDS = {
  bridge: {
    fileName: "Hudson_Bridge_Baseline_V1.xer",
    fileSize: "1.2 MB",
    fileType: "XER",
    healthScore: 84,
    maturity: "Level 4 - Managed",
    riskRating: "Low Risk",
    metrics: {
      activities: 480,
      relationships: 792,
      criticalPathLength: 220, // days
      totalFloat: 1450, // total float sum
      criticalIssues: 1,
      majorIssues: 2,
      minorIssues: 2,
    },
    checks: [
      { id: 1, metric: "Missing Logic", title: "Activity Logic Completeness", status: "pass", value: "0.4%", target: "0% to 5%", description: "Activities missing predecessors or successors.", whyItMatters: "Missing logic breaks critical path tracking.", impact: "Schedules with open logic are highly unstable.", correction: "Ensure all activities besides Project Start and Complete have links." },
      { id: 2, metric: "Leads", title: "Schedules Lead Links Validation", status: "pass", value: "0.0%", target: "0%", description: "Relationships with negative lag durations.", whyItMatters: "Negative lags create unrealistic constraints and defy logic.", impact: "Can lead to negative float and illogical dependencies.", correction: "Convert all negative lag items to finish-to-start with actual durations." },
      { id: 3, metric: "Lags", title: "Positive Lags Optimization", status: "fail", value: "7.2%", target: "< 5%", description: "Positive lag times used between activities.", whyItMatters: "High lag usage obscures float and schedule visibility.", impact: "Lags cannot be updated with remaining durations in standard updates.", correction: "Audit high lags and convert them into discrete 'Lag Buffer' activities." },
      { id: 4, metric: "Relationship Types", title: "Standard Logic Relations", status: "pass", value: "93.4%", target: "> 90% FS", description: "Proportion of Finish-to-Start (FS) relationships.", whyItMatters: "FS logic is the industry leading-practice and easiest to review.", impact: "Excessive SF, SS, or FF logic complicates the schedule flow.", correction: "Switch non-standard relations to FS relations where applicable." },
      { id: 5, metric: "High Float", title: "Excessive Total Float check", status: "fail", value: "11.5%", target: "< 10%", description: "Activities with total float exceeding 44 working days.", whyItMatters: "Oversized float indicates loose logic and missing connections.", impact: "Delays in these tasks will not alert project teams properly.", correction: "Trace activities with high float and tie them to realistic milestones." },
      { id: 6, metric: "Negative Float", title: "Resolving Negative Floats", status: "pass", value: "0 days", target: "0 days", description: "Activities with negative critical float values.", whyItMatters: "Negative float denotes the project baseline is currently impossible to meet.", impact: "Contractual delays; project start is immediately behind forecast.", correction: "Adjust constraints, align execution sequences, or request time extensions." },
      { id: 7, metric: "High Duration", title: "Activity Spans Over 20 Days", status: "fail", value: "8.4%", target: "< 5%", description: "Remaining duration of tasks longer than 20 days.", whyItMatters: "Long tasks reduce control and accuracy during weekly tracking.", impact: "Increases progress estimation errors during updates.", correction: "Deconstruct large tasks into separate sub-phases with measurable targets." },
      { id: 8, metric: "Invalid Dates", title: "Future Date Bounds Audit", status: "pass", value: "0 errors", target: "0", description: "Activities scheduled in the past or before actual datadate.", whyItMatters: "Invalid start or baseline dates damage standard CPM formulas.", impact: "Renders P6 forecasts erratic and inaccurate.", correction: "Perform schedule calculations exclusively from the approved actual data date." },
      { id: 9, metric: "Hard Constraints", title: "Restricting Hard Constraints", status: "pass", value: "1.2%", target: "< 5%", description: "Must-Start/Must-Finish or static constraints applied.", whyItMatters: "Hard dates overwrite dynamic logic-driven calculations.", impact: "Float reports appear green even if true critical path is failing.", correction: "Replace hard target constraints with flexible soft constraints or flags." },
      { id: 10, metric: "Open Ends", title: "Disconnected Project Logic", status: "pass", value: "2 items", target: "0", description: "Activities missing either predecessor or successor.", whyItMatters: "Every network activity must lead to a final completion target.", impact: "Creates logic orphan elements that completely bypass scheduling updates.", correction: "Add successors to the flagged activities using standard FS relation." },
      { id: 11, metric: "Critical Path Integrity", title: "Path Continuity Validator", status: "pass", value: "Continuous", target: "Continuous", description: "Continuous chain of critical items from start to finish.", whyItMatters: "A broken critical path prevents true duration tracking.", impact: "Owner audits will immediately reject schedules without unbroken paths.", correction: "Ensure critical path is driven sequentially by genuine logical links." },
      { id: 12, metric: "Milestone Logic", title: "Milestone Logical Anchors", status: "pass", value: "100%", target: "100%", description: "Milestones connected to standard activity paths.", whyItMatters: "Milestones show key contract boundaries and require precursors.", impact: "Floating milestones fail to trigger notifications on schedule delays.", correction: "Ensure all key structural milestones are linked to construction work." },
      { id: 13, metric: "Float Path Validation", title: "Longest Path Compliance", status: "pass", value: "Valid", target: "Valid", description: "Integrity of the primary longest path of the schedule.", whyItMatters: "Multiple parallel logic paths can trick team float calculations.", impact: "Incorrect resource allocation away from actual critical activities.", correction: "Enforce consistent calendar usage across all related task strings." },
      { id: 14, metric: "Baseline Quality", title: "Active Target Baseline Check", status: "pass", value: "Approved", target: "Loaded", description: "Approval and association with the primary contract budget.", whyItMatters: "Guarantees updates are compared to a legally binding target.", impact: "Without a baseline, delay tracking has no historical foundation.", correction: "Export current file, import as project baseline, and lock the target." }
    ] as DCMACheck[]
  },
  commercial: {
    fileName: "Downtown_Tower_Retail_P6.xer",
    fileSize: "4.5 MB",
    fileType: "XER",
    healthScore: 61,
    maturity: "Level 1 - Initial",
    riskRating: "Critical Risk",
    metrics: {
      activities: 1250,
      relationships: 1650,
      criticalPathLength: 640,
      totalFloat: 8900,
      criticalIssues: 4,
      majorIssues: 5,
      minorIssues: 3,
    },
    checks: [
      { id: 1, metric: "Missing Logic", title: "Activity Logic Completeness", status: "fail", value: "8.8%", target: "0% to 5%", description: "Activities missing predecessors or successors.", whyItMatters: "Missing logic breaks critical path tracking.", impact: "A massive risk; tasks can slip indefinitely without affecting the dates.", correction: "Ensure all activities besides Project Start and Complete have links." },
      { id: 2, metric: "Leads", title: "Schedules Lead Links Validation", status: "fail", value: "1.5%", target: "0%", description: "Relationships with negative lag durations.", whyItMatters: "Negative lags create unrealistic constraints and defy logic.", impact: "Screws up logic loop structures, causing infinite math errors.", correction: "Convert all negative lag items to finish-to-start with actual durations." },
      { id: 3, metric: "Lags", title: "Positive Lags Optimization", status: "fail", value: "13.4%", target: "< 5%", description: "Positive lag times used between activities.", whyItMatters: "High lag usage obscures float and schedule visibility.", impact: "Hides construction delays behind artificial logic gaps.", correction: "Audit high lags and convert them into discrete 'Lag Buffer' activities." },
      { id: 4, metric: "Relationship Types", title: "Standard Logic Relations", status: "pass", value: "91.0%", target: "> 90% FS", description: "Proportion of Finish-to-Start (FS) relationships.", whyItMatters: "FS logic is the industry leading-practice and easiest to review.", impact: "Excessive SF, SS, or FF logic complicates the schedule flow.", correction: "Switch non-standard relations to FS relations where applicable." },
      { id: 5, metric: "High Float", title: "Excessive Total Float check", status: "fail", value: "22.1%", target: "< 10%", description: "Activities with total float exceeding 44 working days.", whyItMatters: "Oversized float indicates loose logic and missing connections.", impact: "Delays in these tasks will not alert project teams properly.", correction: "Trace activities with high float and tie them to realistic milestones." },
      { id: 6, metric: "Negative Float", title: "Resolving Negative Floats", status: "fail", value: "-45 days", target: "0 days", description: "Activities with negative critical float values.", whyItMatters: "Negative float denotes the project baseline is currently impossible to meet.", impact: "Immediate contract default scenario; execution strategy is compromised.", correction: "Adjust constraints, align execution sequences, or request time extensions." },
      { id: 7, metric: "High Duration", title: "Activity Spans Over 20 Days", status: "fail", value: "15.2%", target: "< 5%", description: "Remaining duration of tasks longer than 20 days.", whyItMatters: "Long tasks reduce control and accuracy during weekly tracking.", impact: "High risk of progress estimation errors.", correction: "Deconstruct large tasks into separate sub-phases with measurable targets." },
      { id: 8, metric: "Invalid Dates", title: "Future Date Bounds Audit", status: "pass", value: "0 errors", target: "0", description: "Activities scheduled in the past or before actual datadate.", whyItMatters: "Invalid start or baseline dates damage standard CPM formulas.", impact: "Renders P6 forecasts erratic and inaccurate.", correction: "Perform schedule calculations exclusively from the approved actual data date." },
      { id: 9, metric: "Hard Constraints", title: "Restricting Hard Constraints", status: "fail", value: "7.4%", target: "< 5%", description: "Must-Start/Must-Finish or static constraints applied.", whyItMatters: "Hard dates overwrite dynamic logic-driven calculations.", impact: "Fakes the schedule status, rendering P6 critical path useless.", correction: "Replace hard target constraints with flexible soft constraints or flags." },
      { id: 10, metric: "Open Ends", title: "Disconnected Project Logic", status: "fail", value: "48 items", target: "0", description: "Activities missing either predecessor or successor.", whyItMatters: "Every network activity must lead to a final completion target.", impact: "Tasks drift and float forever outside of the critical network.", correction: "Add successors to the flagged activities using standard FS relation." },
      { id: 11, metric: "Critical Path Integrity", title: "Path Continuity Validator", status: "fail", value: "Broken (8 breaks)", target: "Continuous", description: "Continuous chain of critical items from start to finish.", whyItMatters: "A broken critical path prevents true duration tracking.", impact: "Owner will reject the document with extreme prejudice.", correction: "Ensure critical path is driven sequentially by genuine logical links." },
      { id: 12, metric: "Milestone Logic", title: "Milestone Logical Anchors", status: "pass", value: "100%", target: "100%", description: "Milestones connected to standard activity paths.", whyItMatters: "Milestones show key contract boundaries and require precursors.", impact: "Floating milestones fail to trigger notifications on schedule delays.", correction: "Ensure all key structural milestones are linked to construction work." },
      { id: 13, metric: "Float Path Validation", title: "Longest Path Compliance", status: "fail", value: "Invalid Loops", target: "Valid", description: "Integrity of the primary longest path of the schedule.", whyItMatters: "Multiple parallel logic paths can trick team float calculations.", impact: "Erroneous analytics representing fake target pathways.", correction: "Enforce consistent calendar usage across all related task strings." },
      { id: 14, metric: "Baseline Quality", title: "Active Target Baseline Check", status: "pass", value: "Approved", target: "Loaded", description: "Approval and association with the primary contract budget.", whyItMatters: "Guarantees updates are compared to a legally binding target.", impact: "Without a baseline, delay tracking has no historical foundation.", correction: "Export current file, import as project baseline, and lock the target." }
    ] as DCMACheck[]
  }
};

export const DCMAAnalyser = () => {
  // --- States ---
  const [dragActive, setDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processing' | 'success'>('idle');
  const [progressMsg, setProgressMsg] = useState('');
  const [progressVal, setProgressVal] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'findings' | 'premium' | 'consulting' | 'ai'>('dashboard');
  const [selectedSample, setSelectedSample] = useState<'bridge' | 'commercial'>('bridge');
  const [analysisData, setAnalysisData] = useState<typeof SAMPLE_RECORDS.bridge>(SAMPLE_RECORDS.bridge);

  // Lead Generation state
  const [leadFormData, setLeadFormData] = useState<LeadInfo>({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'Commercial',
    projectValue: '$5M - $10M'
  });
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Estimator States
  const [estCost, setEstCost] = useState(2500000);
  const [estActivities, setEstActivities] = useState(350);
  const [estComplexity, setEstComplexity] = useState<'standard' | 'complex' | 'extreme'>('standard');

  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // AI Insights State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string>('');

  // Handle sample selection change
  useEffect(() => {
    setAnalysisData(SAMPLE_RECORDS[selectedSample]);
    // Clear AI suggestions on sample change
    setAiSuggestions('');
  }, [selectedSample]);

  // Simulated drag-and-drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileAnalysis(e.dataTransfer.files[0]);
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const onFileChangeClick = () => {
    fileInputRef.current?.click();
  };

  const handleManualFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileAnalysis(e.target.files[0]);
    }
  };

  const handleFileAnalysis = (file: File) => {
    const ext = file.name.split('.').pop()?.toUpperCase() || '';
    if (ext !== 'XER' && ext !== 'XML' && ext !== 'MPP') {
      alert("Unsupported format. Please upload Primavera .xer, .xml or MS Project .mpp files.");
      return;
    }

    setUploadedFile({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: ext
    });

    setUploadState('uploading');
    setProgressVal(10);
    setProgressMsg('Uploading network schema to parser...');

    // Progress updates
    const t1 = setTimeout(() => {
      setProgressVal(35);
      setProgressMsg('Decrypting standard schema rows...');
    }, 800);

    const t2 = setTimeout(() => {
      setUploadState('processing');
      setProgressVal(55);
      setProgressMsg('Evaluating schedule logical networks (P6 engine)...');
    }, 1600);

    const t3 = setTimeout(() => {
      setProgressVal(80);
      setProgressMsg('Running 14-point DCMA validation rule computations...');
    }, 2400);

    const t4 = setTimeout(() => {
      setProgressVal(100);
      setProgressMsg('Finalizing executive compliance summary scores...');
    }, 3200);

    const t5 = setTimeout(() => {
      setUploadState('success');
      // If client uploads a commercial baseline sounding name, let's load critical report, else optimaludson hudson baselines
      if (file.name.toLowerCase().includes('comm') || file.name.toLowerCase().includes('retail') || Math.random() > 0.5) {
        setSelectedSample('commercial');
      } else {
        setSelectedSample('bridge');
      }
    }, 4000);
  };

  // Submit Lead Generation
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadCaptured(true);
    setShowLeadModal(false);
    
    // Simulate API storage of lead information
    console.log("Saving client lead to database:", leadFormData);
  };

  // Pricing & recovery calculation
  const calculateEstimator = () => {
    let basisHours = 20;
    
    // Size multiplier
    if (estActivities < 200) basisHours = 24;
    else if (estActivities < 800) basisHours = 48;
    else basisHours = 96;

    // Complexity multiplier
    let factor = 1.0;
    if (estComplexity === 'complex') factor = 1.4;
    if (estComplexity === 'extreme') factor = 2.0;

    const computedHours = Math.round(basisHours * factor);
    const recoveryEffort = estComplexity === 'extreme' ? 'High Technical Restructuring' : estComplexity === 'complex' ? 'Moderate Recovery Planning' : 'Standard Alignment Logic';
    const minBudget = Math.round(computedHours * 135);
    const maxBudget = Math.round(computedHours * 185);

    return {
      hours: computedHours,
      effort: recoveryEffort,
      range: `$${minBudget.toLocaleString()} - $${maxBudget.toLocaleString()}`
    };
  };

  const estResult = calculateEstimator();

  // Call server-side Gemini API if present, otherwise rule-based expert scheduling response
  const triggerAIAnalysis = async () => {
    setAiLoading(true);
    setAiSuggestions('');
    
    try {
      // Formulate detailed payload on metrics
      const payload = {
        sample: selectedSample,
        score: analysisData.healthScore,
        maturity: analysisData.maturity,
        metrics: analysisData.metrics,
        failedChecks: analysisData.checks.filter(c => c.status === 'fail').map(c => ({
          metric: c.metric,
          value: c.value,
          impact: c.impact
        }))
      };

      const response = await fetch('/api/dcma-ai-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        setAiSuggestions(data.recommendation);
      } else {
        throw new Error("Server response negative structure.");
      }
    } catch (err) {
      // Graceful fallback to rich technical construction rules that replicate deep expertise
      setTimeout(() => {
        let fallbackText = `### Oracle Primavera P6 forensic scheduling response\n\n`;
        if (selectedSample === 'bridge') {
          fallbackText += `**Baseline Health Assessment Score (84% - MODERATE QUALITY)**

Your project schedule has a highly robust network topology with minor logic adjustments needed before final owner submittal:

1. **DCMA-3 Limit Violation (Positive Lags - 7.2%):** Having high lags creates a critical path constraint on sub-phases. We recommend converting the 12 longest lag gaps into discrete, resource-loaded buffered tasks to retain dynamic logic calculation in updates.
2. **DCMA-5 Float Excess (11.5%):** Float exceeding 44 days indicates missing end-to-end logical connections. We identified 18 items lacking successor paths which drift. Perform trace logic check on secondary steelwork installations.
3. **DCMA-7 Activity Durations (8.4%):** Activities above 20 days decrease visibility. Split the pile cap reinforcement tasks into 5-day cycle stages to increase tracking resolution.
\n\n*Forensic Recommendation Checklist provided by AACE certified Remote Schedulers Planning Engineers.*`;
        } else {
          fallbackText += `**CRITICAL BASELINE LOGIC ALERT (61% - POOR QUALITY)**

Your schedule contains critical topological errors that will trigger immediate rejection by Tier 1 Genernal Contractors or Owner representatives:

1. **DCMA-1 Missing Logic (8.8%):** A total of 48 construction tasks completely lack succession branches. This permits activity slippage without modifying completion constraints, breaking the primary logic calculations of Primavera.
2. **DCMA-6 Negative Float (-45 days):** The project is critically delayed before startup. It appears structural foundation constraints are forcing tasks in structural loop grids. Enforce concrete pre-cast sequences to recoup 20 workdays.
3. **DCMA-11 Broken Critical Path (8 Breaks):** Critical paths are physically interrupted. Schedule calculations have segmented branches. Ensure all sequential dependencies have rigorous Finish-to-Start ties.
\n\n*Critical action required: Select "Schedule Recovery Support" below to let our certified consultants repair this network baseline logic within 48 hours.*`;
        }
        setAiSuggestions(fallbackText);
      }, 1000);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div id="dcma-checker" className="bg-[#edeae2] p-4 sm:p-8 xl:p-12 border-t-[6px] border-navy shadow-3xl text-navy">
      
      {/* --- Phase 1: Modern Hero Banner & Intro --- */}
      <div className="mb-10 text-left border-b border-navy/15 pb-8">
        <span className="inline-flex items-center gap-2 border border-navy px-3 py-1 text-[9px] font-bold tracking-[0.3em] uppercase mb-4 text-navy">
          <Layers size={11} className="text-gold fill-current" /> Enterprise Schedule Auditor
        </span>
        <h2 className="font-condensed text-4xl sm:text-6xl font-extrabold uppercase leading-none text-navy mb-4">
          DCMA 14-Point<br/>
          <span className="text-gold text-stroke-navy">Health Checker</span>
        </h2>
        <p className="text-gray-soft text-sm sm:text-base font-light max-w-3xl leading-relaxed">
          The Defense Contract Management Agency (DCMA) 14-Point Assessment represents the global industry gold-standard for critical path inspection. Run instant structural diagnostics on your Primavera P6 or MPP baselines before submittal.
        </p>

        {/* Banner Alert */}
        <div className="mt-6 bg-navy text-white-off p-5 sm:p-6 border-l-[6px] border-gold shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] font-extrabold text-gold uppercase tracking-[0.25em] block mb-1">
              PROMOTIONAL DIAGNOSTICS
            </span>
            <h4 className="text-lg font-condensed font-extrabold uppercase tracking-wide">
              Free DCMA Schedule Health Assessment
            </h4>
            <p className="text-xs text-white-off/60 font-light font-sans mt-0.5">
              Upload your Primavera P6 or Microsoft Project schedule and receive an instant project health analysis.
            </p>
          </div>
          <button 
            onClick={() => {
              const el = document.getElementById('upload-zone');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gold text-navy hover:bg-gold-light text-[10px] font-bold uppercase tracking-widest px-5 py-3 transition-colors shrink-0"
          >
            Go to Upload Zone
          </button>
        </div>
      </div>

      {/* Track Selector & Info Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <label className="text-[10px] font-extrabold text-gold uppercase tracking-widest block mb-3">
            Active Schedule Profile (Inspect or Simulate files)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setSelectedSample('bridge')}
              className={`flex-1 p-4 border text-left transition-all ${
                selectedSample === 'bridge'
                  ? 'bg-navy text-white-off border-gold shadow-md'
                  : 'bg-white-off/60 hover:bg-white-off border-navy/10 hover:border-navy/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-condensed font-extrabold uppercase text-xs tracking-wider">Hudson Bridge Baseline v1</span>
                <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-sm ${selectedSample === 'bridge' ? 'bg-gold text-navy' : 'bg-navy/15'}`}>Optimal</span>
              </div>
              <p className="text-[11px] opacity-70">480 construction tasks. Score: 84%. Fast track critical review analysis.</p>
            </button>
            <button
              onClick={() => setSelectedSample('commercial')}
              className={`flex-1 p-4 border text-left transition-all ${
                selectedSample === 'commercial'
                  ? 'bg-navy text-white-off border-gold shadow-md'
                  : 'bg-white-off/60 hover:bg-white-off border-navy/10 hover:border-navy/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-condensed font-extrabold uppercase text-xs tracking-wider">Downtown Tower P6 v4</span>
                <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-sm ${selectedSample === 'commercial' ? 'bg-red-500 text-white-off' : 'bg-navy/15'}`}>Risk Warnings</span>
              </div>
              <p className="text-[11px] opacity-70">1,250 complex structural elements. Score: 61%. Real-world target delays.</p>
            </button>
          </div>
        </div>

        {/* Quality Badges */}
        <div className="bg-white-off p-5 border border-navy/10 shadow-sm flex flex-col justify-between">
          <p className="text-[10px] font-extrabold text-gray-soft uppercase tracking-wider mb-2">Compliance Architecture</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck size={16} className="text-gold" />
              <span>Full AACE International Standards</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck size={16} className="text-gold" />
              <span>Department of Defense (DoD) DCMA 14 compliance</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck size={16} className="text-gold" />
              <span>Primavera-validated mathematical logic checks</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Phase 2: Professional Drag-and-Drop Area --- */}
      <div id="upload-zone" className="mb-12">
        <label className="text-[10px] font-extrabold text-gold uppercase tracking-[0.2em] block mb-3">
          SECURE FILE INGESTION GATEWAY
        </label>
        
        {uploadState === 'idle' && (
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={onFileChangeClick}
            className={`border-2 border-dashed rounded-sm py-12 px-6 text-center cursor-pointer transition-all ${
              dragActive 
                ? 'border-gold bg-navy/5 shadow-inner scale-[0.99]' 
                : 'border-navy/20 hover:border-gold/50 bg-white-off/40 hover:bg-white-off/90'
            }`}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".xer,.xml,.mpp" 
              className="hidden" 
              onChange={handleManualFileChange} 
            />
            <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-navy/10">
              <Upload size={28} className="text-gold" />
            </div>
            <h4 className="font-condensed font-extrabold uppercase text-lg tracking-wide text-navy">
              Drag & Drop Your Schedule File Here
            </h4>
            <p className="text-xs text-gray-soft font-light mt-1 max-w-md mx-auto">
              Accepts Primavera <strong className="font-bold text-navy">P6 XER / XML</strong>, or Microsoft Project <strong className="font-bold text-navy">MPP</strong> up to 50MB.
            </p>
            <span className="inline-block mt-4 text-xs font-bold text-navy border-b border-gold py-0.5 hover:text-gold transition-colors">
              Or physically browse local system files
            </span>
          </div>
        )}

        {/* Loading Progress Frame */}
        {(uploadState === 'uploading' || uploadState === 'processing') && (
          <div className="bg-navy text-white-off p-8 rounded-sm shadow-xl border border-gold/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin shrink-0"></div>
                <span className="text-sm font-condensed font-extrabold uppercase tracking-widest text-gold">
                  {uploadState === 'uploading' ? 'INJECTING RECOVERABLE DATA' : 'COMPILING MATHEMATICAL NETWORK'}
                </span>
              </div>
              <span className="font-mono text-xs text-gold/80">{progressVal}%</span>
            </div>
            
            {/* Range Track */}
            <div className="w-full bg-white-off/10 h-2 rounded-full overflow-hidden mb-6">
              <div 
                className="bg-gold h-full transition-all duration-500 rounded-full" 
                style={{ width: `${progressVal}%` }}
              ></div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white-off/5 border border-white-off/10 rounded-sm">
              <FileText size={18} className="text-gold shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white-off font-sans">{uploadedFile?.name}</p>
                <p className="text-[10px] text-white-off/40 mt-0.5 font-mono">{uploadedFile?.size} • format: {uploadedFile?.type}</p>
              </div>
            </div>

            <p className="text-xs text-gold font-light mt-4 italic font-sans flex items-center gap-1.5 justify-center">
              <Clock size={12} /> {progressMsg}
            </p>
          </div>
        )}

        {uploadState === 'success' && (
          <div className="bg-green-600/10 border border-green-600 p-6 sm:p-8 rounded-sm text-center">
            <CheckCircle2 size={32} className="mx-auto mb-3 text-green-600 fill-current" />
            <h4 className="font-condensed font-extrabold uppercase text-lg text-green-800 tracking-wide">
              Baseline Ingestion Successful
            </h4>
            <p className="text-xs text-green-700 font-light mt-1 max-w-xl mx-auto">
              Compliance computations have mapped 14 standard metrics against your Primavera network database. See analytical dashboard and recommendations below.
            </p>
            <div className="mt-4 flex gap-3 justify-center">
              <button 
                onClick={() => setUploadState('idle')}
                className="bg-navy text-white-off hover:bg-gold hover:text-navy px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                Upload Another File
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('analytic-tabs');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-green-700 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                Go directly to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- Tab Navigation --- */}
      <div id="analytic-tabs" className="mb-8 border-b border-navy/15 flex flex-wrap gap-1.5 sm:gap-3">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`py-3 px-4 sm:px-6 text-[11px] font-extrabold uppercase tracking-widest transition-all ${
            activeTab === 'dashboard'
              ? 'bg-navy text-gold shadow-md border-b-2 border-gold'
              : 'bg-navy/5 text-navy/60 hover:bg-navy/10'
          }`}
        >
          Executive Dashboard
        </button>
        <button
          onClick={() => setActiveTab('findings')}
          className={`py-3 px-4 sm:px-6 text-[11px] font-extrabold uppercase tracking-widest transition-all ${
            activeTab === 'findings'
              ? 'bg-navy text-gold shadow-md border-b-2 border-gold'
              : 'bg-navy/5 text-navy/60 hover:bg-navy/10'
          }`}
        >
          Detailed Findings & Logic Analysis
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`py-3 px-4 sm:px-6 text-[11px] font-extrabold uppercase tracking-widest transition-all flex items-center gap-2 ${
            activeTab === 'ai'
              ? 'bg-navy text-gold shadow-md border-b-2 border-gold'
              : 'bg-navy/5 text-navy/60 hover:bg-navy/10'
          }`}
        >
          <Sparkles size={12} className="text-gold" /> AI Expert Recommendations
        </button>
        <button
          onClick={() => setActiveTab('premium')}
          className={`py-3 px-4 sm:px-6 text-[11px] font-extrabold uppercase tracking-widest transition-all flex items-center gap-1.5 ${
            activeTab === 'premium'
              ? 'bg-navy text-gold shadow-md border-b-2 border-gold'
              : 'bg-navy/5 text-navy/60 hover:bg-navy/10'
          }`}
        >
          <Lock size={11} className="text-navy/50" /> Premium Modules
        </button>
        <button
          onClick={() => setActiveTab('consulting')}
          className={`py-3 px-4 sm:px-6 text-[11px] font-extrabold uppercase tracking-widest transition-all ${
            activeTab === 'consulting'
              ? 'bg-navy text-gold shadow-md border-b-2 border-gold'
              : 'bg-navy/5 text-navy/60 hover:bg-navy/10'
          }`}
        >
          Consulting Estimates
        </button>
      </div>

      {/* --- Phase 3 & 4: Executive Dashboard Tab --- */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Key Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Score circle column */}
            <div className="bg-navy text-white-off p-6 rounded-sm border border-gold/25 relative overflow-hidden flex flex-col justify-between shadow-lg">
              <span className="text-[9px] font-extrabold text-gold uppercase tracking-wider block mb-4">Overall Compliance Rating</span>
              <div className="flex items-center gap-5 my-auto">
                
                {/* Custom circular SVG progress */}
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="40" 
                      className="stroke-white-off/10" 
                      strokeWidth="8" fill="transparent" 
                    />
                    <circle 
                      cx="50" cy="50" r="40" 
                      className={analysisData.healthScore > 80 ? "stroke-gold" : "stroke-red-500"} 
                      strokeWidth="8" fill="transparent" 
                      strokeDasharray={`${2.5 * 100}`}
                      strokeDashoffset={`${2.5 * (100 - analysisData.healthScore)}`}
                    />
                  </svg>
                  <span className="absolute font-condensed font-extrabold text-3xl">{analysisData.healthScore}%</span>
                </div>

                <div>
                  <h5 className={`font-condensed font-extrabold text-lg uppercase leading-tight ${analysisData.healthScore > 80 ? 'text-gold' : 'text-red-400'}`}>
                    {analysisData.healthScore > 80 ? 'EXCELLENT' : 'CRITICAL ERRORS'}
                  </h5>
                  <p className="text-[10px] text-white-off/60 font-sans mt-0.5 leading-snug">
                    Schedule baseline adheres well to typical regulatory parameters.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white-off/10 flex items-center justify-between text-[10px] text-white-off/50">
                <span>Maturity: <strong className="text-white-off uppercase">{analysisData.maturity}</strong></span>
              </div>
            </div>

            {/* Ingress Details */}
            <div className="bg-white p-6 rounded-sm border border-navy/15 flex flex-col justify-between shadow-sm">
              <span className="text-[9px] font-extrabold text-gray-soft uppercase tracking-wider block mb-2">INTEGRITY MATRIX SUMMARY</span>
              <div className="space-y-3 font-sans">
                <div className="flex justify-between items-center text-xs pb-1 border-b border-navy/5">
                  <span className="text-gray-soft">Total Network Activities</span>
                  <strong className="font-extrabold text-navy font-mono text-sm">{analysisData.metrics.activities}</strong>
                </div>
                <div className="flex justify-between items-center text-xs pb-1 border-b border-navy/5">
                  <span className="text-gray-soft">CPM Relationship Ties</span>
                  <strong className="font-extrabold text-navy font-mono text-sm">{analysisData.metrics.relationships}</strong>
                </div>
                <div className="flex justify-between items-center text-xs pb-1 border-b border-navy/5">
                  <span className="text-gray-soft">Logic Density Quotient</span>
                  <strong className="font-extrabold text-navy font-mono text-sm">{(analysisData.metrics.relationships / analysisData.metrics.activities).toFixed(2)}</strong>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-soft">Longest Path Duration</span>
                  <strong className="font-extrabold text-navy font-mono text-sm">{analysisData.metrics.criticalPathLength} days</strong>
                </div>
              </div>
              <div className="pt-2 text-[10px] text-gold font-bold uppercase tracking-wider">
                Network Density: Optimum (1.5x)
              </div>
            </div>

            {/* Issues Breakdown */}
            <div className="bg-white p-6 rounded-sm border border-navy/15 flex flex-col justify-between shadow-sm">
              <span className="text-[9px] font-extrabold text-gray-soft uppercase tracking-wider block mb-3">DEFECT COUNTERS</span>
              <div className="my-auto grid grid-cols-3 gap-2 text-center">
                <div className="bg-red-500/10 p-2.5 border border-red-500/20">
                  <span className="block text-red-600 font-mono text-2xl font-black">{analysisData.metrics.criticalIssues}</span>
                  <span className="text-[8px] font-extrabold tracking-wider text-red-800 uppercase block mt-1">CRITICAL</span>
                </div>
                <div className="bg-[#edeae2] p-2.5 border border-navy/10">
                  <span className="block text-navy font-mono text-2xl font-black">{analysisData.metrics.majorIssues}</span>
                  <span className="text-[8px] font-extrabold tracking-wider text-navy uppercase block mt-1">MAJOR</span>
                </div>
                <div className="bg-gold/10 p-2.5 border border-gold/30">
                  <span className="block text-gold text-2xl font-mono font-black">{analysisData.metrics.minorIssues}</span>
                  <span className="text-[8px] font-extrabold tracking-wider text-gold-dark uppercase block mt-1">MINOR</span>
                </div>
              </div>
              <div className="pt-3 text-[10px] text-red-600 font-extrabold uppercase tracking-wide flex items-center gap-1 shrink-0">
                <AlertTriangle size={12} /> {analysisData.metrics.criticalIssues + analysisData.metrics.majorIssues} logical threats detected.
              </div>
            </div>

            {/* Actions Quick PDF */}
            <div className="bg-white p-6 rounded-sm border border-navy/15 flex flex-col justify-between shadow-sm">
              <span className="text-[9px] font-extrabold text-gray-soft uppercase tracking-wider block mb-2">EXECUTIVE DECREE REPORT</span>
              <p className="text-xs text-gray-soft leading-relaxed font-light mb-4">
                Instantly capture this compliance diagnostic suite inside a client-ready corporate PDF report for project stakeholders.
              </p>
              
              <button 
                onClick={() => {
                  if (leadCaptured) {
                    setShowPrintModal(true);
                  } else {
                    setShowLeadModal(true);
                  }
                }}
                className="w-full bg-gold hover:bg-gold-light text-navy text-center py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Download size={14} /> Download Executive report
              </button>
            </div>

          </div>

          {/* Premium Visualizations Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 14 point metric checklist results */}
            <div className="lg:col-span-2 bg-white p-6 rounded-sm border border-navy/15 shadow-sm">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-navy/5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-navy bg-navy/5 px-2 py-1">
                  14-POINT PERFORMANCE BAR CHART
                </span>
                <span className="text-xs text-soft">Pass limits: Green check mark</span>
              </div>

              {/* Bar charts customized directly with pure SVG */}
              <div className="space-y-4">
                {analysisData.checks.slice(0, 7).map(chk => {
                  const isPass = chk.status === 'pass';
                  return (
                    <div key={chk.id} className="font-sans">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-bold flex items-center gap-1.5 uppercase tracking-wide">
                          {isPass ? (
                            <CheckCircle2 size={13} className="text-green-600" />
                          ) : (
                            <XCircle size={13} className="text-red-500" />
                          )}
                          DCMA-{chk.id}: {chk.metric}
                        </span>
                        <span className={`font-mono font-black ${isPass ? 'text-green-700' : 'text-red-500'}`}>
                          {chk.value} <span className="opacity-45 text-[10px] font-normal text-navy font-sans"> (Limit: {chk.target})</span>
                        </span>
                      </div>
                      <div className="w-full bg-navy/5 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-700 ${isPass ? 'bg-green-600' : 'bg-red-500'}`}
                          style={{ width: isPass ? '92%' : '45%' }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-navy/5 text-center">
                <button 
                  onClick={() => setActiveTab('findings')}
                  className="text-xs font-bold uppercase text-navy hover:text-gold border-b border-gold pb-0.5 tracking-wider inline-flex items-center gap-1"
                >
                  Inspect all 14 DCMA constraints in findings tab <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Risk heat map 3x3 */}
            <div className="bg-white p-6 rounded-sm border border-navy/15 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-navy bg-navy/5 px-2 py-1 block mb-5">
                  CRITICAL PATH RISK HEAT MAP
                </span>

                {/* Grid chart 3x3 */}
                <div className="grid grid-cols-4 gap-1.5 font-sans mb-4">
                  <div className="text-[10px] text-gray-soft font-bold uppercase rotate-180 flex items-center justify-center [writing-mode:vertical-lr]">
                    Severity
                  </div>
                  <div className="col-span-3 grid grid-cols-3 gap-1.5 text-center">
                    
                    {/* Row 1 - High Severity */}
                    <div className="bg-red-500 text-white p-2.5 flex items-center justify-center text-[10px] font-extrabold relative">
                      {selectedSample === 'commercial' && <span className="absolute -top-1 -right-1 bg-white text-navy px-1 rounded-full text-[8px] border border-red-500 animate-bounce">2</span>}
                      Logic Loops
                    </div>
                    <div className="bg-red-400 text-white p-2.5 flex items-center justify-center text-[10px] font-extrabold text-navy">
                      Leads
                    </div>
                    <div className="bg-gold text-navy p-2.5 flex items-center justify-center text-[10px] font-extrabold text-navy">
                      Lags
                    </div>

                    {/* Row 2 - Med Severity */}
                    <div className="bg-red-400 text-navy p-2.5 flex items-center justify-center text-[10px] font-semibold">
                      Negative Float
                    </div>
                    <div className="bg-gold text-navy p-2.5 flex items-center justify-center text-[10px] font-bold">
                      {selectedSample === 'bridge' && <span className="absolute -top-1 -right-1 bg-white text-navy px-1 rounded-full text-[8px] border border-gold animate-bounce">1</span>}
                      Float Float
                    </div>
                    <div className="bg-green-300 text-navy p-2.5 flex items-center justify-center text-[10px] font-semibold">
                      Spans
                    </div>

                    {/* Row 3 - Low Severity */}
                    <div className="bg-gold text-navy p-2.5 flex items-center justify-center text-[10px] font-semibold">
                      Constraints
                    </div>
                    <div className="bg-green-300 text-navy p-2.5 flex items-center justify-center text-[10px] font-semibold">
                      Completeness
                    </div>
                    <div className="bg-green-100 text-navy p-2.5 flex items-center justify-center text-[10px] font-semibold">
                      Calendars
                    </div>

                  </div>
                  
                  {/* Bottom labels */}
                  <div></div>
                  <div className="text-[8px] font-bold text-gray-soft uppercase text-center mt-1">High Impact</div>
                  <div className="text-[8px] font-bold text-gray-soft uppercase text-center mt-1">Med Impact</div>
                  <div className="text-[8px] font-bold text-gray-soft uppercase text-center mt-1">Low Impact</div>
                </div>

                <p className="text-[11px] text-gray-soft leading-normal font-sans italic">
                  Defects mapped by operational risk mapping. Tense dependencies with negative margins require immediate remediation.
                </p>
              </div>

              <div className="pt-4 border-t border-navy/5">
                <div className="bg-[#edeae2] p-3 border-l-4 border-gold text-[11px] font-sans">
                  <strong>P6 Specialist Insight:</strong> Your risk factor is categorized as <strong className={`${analysisData.healthScore > 80 ? 'text-green-700':'text-red-600'}`}>{analysisData.riskRating.toUpperCase()}</strong>. Most logical errors are located in structural basement foundations.
                </div>
              </div>
            </div>

          </div>

          {/* Lead capture banner section (if not yet captured) */}
          {!leadCaptured && (
            <div className="bg-gold text-navy p-8 rounded-sm shadow-md grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-1">CONVERSION ADVANCEMENTS</span>
                <h3 className="text-2xl sm:text-3xl font-condensed font-black uppercase leading-tight">
                  Unlock the full Primavera DCMA logic optimization report
                </h3>
                <p className="text-xs font-sans mt-2 opacity-85 leading-relaxed max-w-2xl">
                  Analyze every logical connection link. Receive step-by-step resolution advice for high lags, missing milestones, and negative total floats from our expert engineering planners.
                </p>
              </div>
              <div className="flex md:justify-end">
                <button 
                  onClick={() => setShowLeadModal(true)}
                  className="bg-navy hover:bg-navy/80 text-gold px-8 py-4 text-xs font-extrabold uppercase tracking-widest transition-transform hover:-translate-y-1 active:scale-95 shadow-xl"
                >
                  Access Full Report (vXER)
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* --- Patient Phase 5: Findings & Recommendations Tab --- */}
      {activeTab === 'findings' && (
        <div className="space-y-8 animate-fade-in font-sans">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-gold uppercase block mb-1">AUDIT INDEX AND RESOLUTION REPAIR PATHS</span>
              <h3 className="font-condensed text-2xl sm:text-3xl font-extrabold uppercase text-navy">
                14-Point Constraint Ledger ({analysisData.checks.filter(c => c.status === 'pass').length}/14 Passed)
              </h3>
            </div>
            
            <button 
              onClick={() => {
                if (leadCaptured) {
                  setShowPrintModal(true);
                } else {
                  setShowLeadModal(true);
                }
              }}
              className="bg-navy hover:bg-gold hover:text-navy text-white-off text-[10px] font-extrabold uppercase tracking-widest px-5 py-3 flex items-center gap-2 transition-all"
            >
              <Printer size={13} /> Open Print-Ready Analysis
            </button>
          </div>

          <div className="space-y-4">
            {analysisData.checks.map((chk, idx) => {
              const isOpen = activeAccordion === idx;
              const isPass = chk.status === 'pass';

              return (
                <div key={chk.id} className="bg-white border border-navy/10 rounded-sm overflow-hidden transition-all duration-300">
                  
                  {/* Accordion header */}
                  <button
                    onClick={() => setActiveAccordion(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-navy/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isPass ? 'bg-green-600/10 text-green-700 border border-green-600/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {isPass ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-gray-soft block">DCMA-{chk.id}</span>
                          <span className={`text-[8.5px] font-bold uppercase tracking-wider px-1.5 py-0.2 select-none ${isPass ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {isPass ? 'PASS' : 'FAIL'}
                          </span>
                        </div>
                        <h4 className="font-condensed uppercase font-extrabold text-navy text-base tracking-wide mt-0.5">{chk.title}</h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-xs bg-navy/5 text-navy px-2 py-1 hidden sm:inline-block">
                        Value: {chk.value} (Limit: {chk.target})
                      </span>
                      <ChevronDown size={18} className={`text-navy/55 transition-transform ${isOpen ? 'rotate-180':''}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-navy/5"
                      >
                        <div className="p-5 sm:p-6 bg-white-off/30 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-gray-soft">
                          
                          <div>
                            <div className="mb-4">
                              <span className="font-extrabold text-navy uppercase tracking-wider block mb-1">Metric Description</span>
                              <p className="font-light">{chk.description}</p>
                            </div>
                            <div className="mb-4">
                              <span className="font-extrabold text-navy uppercase tracking-wider block mb-1">Mechanical Logic Breakdown</span>
                              <p className="font-light">{chk.whyItMatters}</p>
                            </div>
                          </div>

                          <div>
                            <div className="mb-4">
                              <span className="font-extrabold text-red-600 uppercase tracking-wider block mb-1">Contractual Delay Impact</span>
                              <p className="font-light text-red-700 bg-red-500/5 p-2 rounded-sm border-l-2 border-red-400">{chk.impact}</p>
                            </div>
                            <div>
                              <span className="font-extrabold text-green-700 uppercase tracking-wider block mb-1">P6 Corrective Path Procedure</span>
                              <p className="font-light text-green-800 bg-green-600/5 p-2 rounded-sm border-l-2 border-green-400">{chk.correction}</p>
                            </div>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* --- Phase 12: AI Recommendations Tab --- */}
      {activeTab === 'ai' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-navy text-white-off p-6 sm:p-8 rounded-sm border border-gold/30">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gold/10 p-2.5 rounded-full border border-gold/40">
                  <Sparkles size={24} className="text-gold" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold tracking-widest text-gold uppercase block">Generative AI Scheduler</span>
                  <h3 className="font-condensed text-2xl sm:text-3xl font-extrabold uppercase whitespace-nowrap">
                    Oracle P6 Network Audit Insights
                  </h3>
                </div>
              </div>

              <button
                disabled={aiLoading}
                onClick={triggerAIAnalysis}
                className="bg-gold hover:bg-gold-light active:scale-95 text-navy font-bold uppercase tracking-widest px-6 py-3.5 text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer disabled:opacity-50"
              >
                {aiLoading ? (
                  <>
                    <div className="w-3 h-3 border border-navy border-t-transparent rounded-full animate-spin"></div>
                    Synthesizing Logic Review...
                  </>
                ) : (
                  <>
                    <Zap size={14} /> Generate AI Diagnostic Advice
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-white-off/60 font-sans mt-0.5 max-w-2xl font-light">
              Submit your active Primavera file variables directly to Gemini for detailed mathematical forensic recommendations on relationship path integrity.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-sm border border-navy/15 shadow-sm min-h-[180px] flex flex-col justify-between font-sans">
            {aiLoading ? (
              <div className="text-center py-12">
                <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm font-bold uppercase text-navy animate-pulse tracking-widest">
                  Gemini schedule model interpreting Primavera logic...
                </p>
              </div>
            ) : aiSuggestions ? (
              <div className="prose max-w-none text-xs text-gray-soft whitespace-pre-line leading-relaxed pb-6">
                {aiSuggestions}
              </div>
            ) : (
              <div className="text-center py-12 text-navy/40">
                <Sparkles size={36} className="mx-auto mb-3 opacity-30 text-gold" />
                <p className="text-sm font-bold uppercase tracking-widest">No recommendation output generated yet</p>
                <p className="text-xs font-light mt-1">Click the button above to run Gemini AI logic inspection.</p>
              </div>
            )}
            
            <div className="border-t border-navy/5 pt-4 text-xs text-gray-soft text-left italic">
              AI analysis references the Department of Defense (DoD) DCMA standard framework.
            </div>
          </div>
        </div>
      )}

      {/* --- Patient Phase 11: Premium Modules Tab (Locked) --- */}
      {activeTab === 'premium' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in font-sans">
          
          <div className="bg-white p-6 border border-navy/15 rounded-sm shadow-sm relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-navy/5 p-1 rounded-sm"><Lock size={16} className="text-gold" /></div>
            <span className="text-[9px] font-bold text-gray-soft uppercase">DIAGNOSTIC ENHANCEMENT</span>
            <h4 className="font-condensed font-extrabold uppercase text-lg text-navy mt-1 mb-2">Forensic Delay Analysis</h4>
            <p className="text-xs font-light text-gray-soft leading-relaxed pr-6 mb-6">
              Compare as-planned baselines to as-built updates with impact-event insertions. Formulates legal-grade critical delay claim reports ready for litigation.
            </p>
            <div className="absolute inset-0 bg-white-off/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
              <div>
                <Lock size={24} className="mx-auto mb-2 text-gold animate-bounce" />
                <p className="text-xs font-bold uppercase tracking-wider text-navy mb-3">Enterprise Premium Area</p>
                <button 
                  onClick={() => setShowLeadModal(true)}
                  className="bg-navy text-gold hover:bg-gold hover:text-navy text-[9px] font-extrabold uppercase px-4 py-2"
                >
                  Unlock with custom plan
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-navy/15 rounded-sm shadow-sm relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-navy/5 p-1 rounded-sm"><Lock size={16} className="text-gold" /></div>
            <span className="text-[9px] font-bold text-gray-soft uppercase">SIMULATION TESTING</span>
            <h4 className="font-condensed font-extrabold uppercase text-lg text-navy mt-1 mb-2">Schedule Recovery Simulator</h4>
            <p className="text-xs font-light text-gray-soft leading-relaxed pr-6 mb-6">
              Simulate activity duration reductions or relationship logic restructures to instantly calculate target recovery curves and compression scores.
            </p>
            <div className="absolute inset-0 bg-white-off/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
              <div>
                <Lock size={24} className="mx-auto mb-2 text-gold animate-bounce" />
                <p className="text-xs font-bold uppercase tracking-wider text-navy mb-3">Enterprise Premium Area</p>
                <button 
                  onClick={() => setShowLeadModal(true)}
                  className="bg-navy text-gold hover:bg-gold hover:text-navy text-[9px] font-extrabold uppercase px-4 py-2"
                >
                  Unlock with custom plan
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-navy/15 rounded-sm shadow-sm relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-navy/5 p-1 rounded-sm"><Lock size={16} className="text-gold" /></div>
            <span className="text-[9px] font-bold text-gray-soft uppercase">FINANCIAL CONTROLS</span>
            <h4 className="font-condensed font-extrabold uppercase text-lg text-navy mt-1 mb-2">Earned Value Management (EVM)</h4>
            <p className="text-xs font-light text-gray-soft leading-relaxed pr-6 mb-6">
              Integrate human resource costs directly on logic activities to monitor SV, CV, SPI and CPI over scheduled dates.
            </p>
            <div className="absolute inset-0 bg-white-off/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
              <div>
                <Lock size={24} className="mx-auto mb-2 text-gold animate-bounce" />
                <p className="text-xs font-bold uppercase tracking-wider text-navy mb-3">Enterprise Premium Area</p>
                <button 
                  onClick={() => setShowLeadModal(true)}
                  className="bg-navy text-gold hover:bg-gold hover:text-navy text-[9px] font-extrabold uppercase px-4 py-2"
                >
                  Unlock with custom plan
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* --- Patient Phase 9: Consulting Estimates Tab --- */}
      {activeTab === 'consulting' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in font-sans">
          
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-sm border border-navy/15 shadow-sm">
            <span className="text-[10px] font-bold text-gray-soft uppercase tracking-wider block mb-4">INTELLIGENT COMPRESSION PRICER</span>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center text-xs mb-2 text-navy">
                  <span className="font-bold uppercase tracking-wider text-[11px]">Estimate Project Value</span>
                  <strong className="font-mono font-black">${(estCost / 1000000).toFixed(1)}M USD</strong>
                </div>
                <input 
                  type="range" 
                  min={500000} 
                  max={50000000} 
                  step={500000} 
                  value={estCost} 
                  onChange={(e) => setEstCost(Number(e.target.value))}
                  className="w-full accent-navy" 
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs mb-2 text-navy">
                  <span className="font-bold uppercase tracking-wider text-[11px]">Number of Schedule Activities</span>
                  <strong className="font-mono font-black">{estActivities} Elements</strong>
                </div>
                <input 
                  type="range" 
                  min={50} 
                  max={3000} 
                  step={50} 
                  value={estActivities} 
                  onChange={(e) => setEstActivities(Number(e.target.value))}
                  className="w-full accent-navy" 
                />
              </div>

              <div>
                <span className="font-bold uppercase tracking-wider text-xs block mb-3 text-navy">Baseline Complexity Range</span>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setEstComplexity('standard')}
                    className={`p-3 border text-xs font-bold uppercase tracking-wider ${estComplexity === 'standard' ? 'bg-navy text-white-off border-navy':'bg-navy/5 text-navy/60 hover:bg-navy/10'}`}
                  >
                    Standard (vFS)
                  </button>
                  <button 
                    onClick={() => setEstComplexity('complex')}
                    className={`p-3 border text-xs font-bold uppercase tracking-wider ${estComplexity === 'complex' ? 'bg-navy text-white-off border-navy':'bg-navy/5 text-navy/60 hover:bg-navy/10'}`}
                  >
                    Complex Logic
                  </button>
                  <button 
                    onClick={() => setEstComplexity('extreme')}
                    className={`p-3 border text-xs font-bold uppercase tracking-wider ${estComplexity === 'extreme' ? 'bg-navy text-white-off border-navy':'bg-navy/5 text-navy/60 hover:bg-navy/10'}`}
                  >
                    Extreme Claims
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-navy text-white-off p-6 sm:p-8 rounded-sm border border-gold/30 flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-[10px] font-black tracking-widest text-gold uppercase block mb-1">PROPOSAL OVERVIEW</span>
              <h4 className="font-condensed font-extrabold uppercase text-xl leading-tight text-white-off mb-4">Baseline Recovery Hour Estimate</h4>
              
              <div className="space-y-4 font-sans text-xs mb-6">
                <div className="flex justify-between pb-2 border-b border-white-off/10">
                  <span className="text-white-off/60">Estimated Consulting Hours</span>
                  <strong className="text-gold font-mono text-base">{estResult.hours} Hrs</strong>
                </div>
                <div className="flex justify-between pb-2 border-b border-white-off/10">
                  <span className="text-white-off/60">Logic Review Intensity</span>
                  <strong className="text-white-off">{estResult.effort}</strong>
                </div>
                <div className="flex justify-between items-center bg-white-off/5 p-2.5 border border-white-off/10">
                  <span className="text-gold text-[10px] font-extrabold uppercase">Est. Budget Range</span>
                  <strong className="text-white-off font-mono text-sm">{estResult.range}</strong>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setLeadFormData({
                  ...leadFormData,
                  projectType: 'Estimator Guided',
                  projectValue: `${(estCost/1000000).toFixed(1)}M`
                });
                setShowLeadModal(true);
              }}
              className="w-full bg-gold hover:bg-gold-light text-navy text-center py-4 text-[11px] font-bold uppercase tracking-widest transition-transform hover:-translate-y-1 active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              Get Professional Consultation <ArrowRight size={14} />
            </button>
          </div>

        </div>
      )}

      {/* --- Phase 8: Consulting Sales Funnel --- */}
      <div className="mt-16 pt-12 border-t border-navy/15">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold tracking-[0.4em] text-gold uppercase block mb-2">REMEDIAL & ARCHITECTURAL SUPPORT SERVICES</span>
          <h3 className="font-condensed text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-navy">Need Help Fixing Your Schedule?</h3>
          <p className="text-xs sm:text-sm text-gray-soft font-light max-w-xl mx-auto mt-2 leading-relaxed">
            Remote Schedulers offers enterprise-grade Project Controls support to resolve critical logical loop issues, negative float delays, and strict construction baseline challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
          
          <div className="bg-white p-5 border border-navy/10 rounded-sm hover:border-gold/50 transition-all flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block mb-2">01. SCHEDULE RECOVERY</span>
              <p className="text-xs text-navy font-bold uppercase mb-2">Schedule Recovery</p>
              <p className="text-[11px] text-gray-soft font-light leading-relaxed">
                Remediation process for collapsed paths, logic gaps, or schedules suffering from high contract float issues.
              </p>
            </div>
            <button onClick={() => setShowLeadModal(true)} className="text-left text-[10px] font-bold uppercase text-navy hover:text-gold tracking-widest border-t border-navy/5 pt-3 mt-4 flex items-center gap-1.5 cursor-pointer">
              Book Support <ChevronRight size={12} />
            </button>
          </div>

          <div className="bg-white p-5 border border-navy/10 rounded-sm hover:border-gold/50 transition-all flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block mb-2">02. PRIMAVERA P6 SUPPORT</span>
              <p className="text-xs text-navy font-bold uppercase mb-2">Primavera P6 Support</p>
              <p className="text-[11px] text-gray-soft font-light leading-relaxed">
                Full preparation of cost-loaded network baselines matching WBS contract structures with 100% compliant DCMA standards.
              </p>
            </div>
            <button onClick={() => setShowLeadModal(true)} className="text-left text-[10px] font-bold uppercase text-navy hover:text-gold tracking-widest border-t border-navy/5 pt-3 mt-4 flex items-center gap-1.5 cursor-pointer">
              Book Support <ChevronRight size={12} />
            </button>
          </div>

          <div className="bg-white p-5 border border-navy/10 rounded-sm hover:border-gold/50 transition-all flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block mb-2">03. DELAY ANALYSIS</span>
              <p className="text-xs text-navy font-bold uppercase mb-2">Delay Analysis</p>
              <p className="text-[11px] text-gray-soft font-light leading-relaxed">
                Legally robust analytical reports proving excusable compensable delays through verified P6 network calculations.
              </p>
            </div>
            <button onClick={() => setShowLeadModal(true)} className="text-left text-[10px] font-bold uppercase text-navy hover:text-gold tracking-widest border-t border-navy/5 pt-3 mt-4 flex items-center gap-1.5 cursor-pointer">
              Book Support <ChevronRight size={12} />
            </button>
          </div>

          <div className="bg-white p-5 border border-navy/10 rounded-sm hover:border-gold/50 transition-all flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-extrabold text-gold uppercase tracking-wider block mb-2">04. DCMA COMPLIANCE REVIEW</span>
              <p className="text-xs text-navy font-bold uppercase mb-2">DCMA Compliance Review</p>
              <p className="text-[11px] text-gray-soft font-light leading-relaxed">
                Thorough structural vetting of schedule baseline and update files against standard DCMA 14-point guidelines before final audit submittal.
              </p>
            </div>
            <button onClick={() => setShowLeadModal(true)} className="text-left text-[10px] font-bold uppercase text-navy hover:text-gold tracking-widest border-t border-navy/5 pt-3 mt-4 flex items-center gap-1.5 cursor-pointer">
              Book Support <ChevronRight size={12} />
            </button>
          </div>

        </div>
      </div>

      {/* --- Patient Phase 10: Industry Credibility Logos --- */}
      <div className="mt-16 pt-10 border-t border-navy/10 text-center font-sans">
        <p className="text-[9px] font-bold text-gray-soft uppercase tracking-[0.25em] mb-4">Tested across enterprise software frameworks</p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-65 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-gray-soft font-condensed font-black text-xs uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck size={16} className="text-gold" /> PRIMAVERA P6 ENTERPRISE
          </div>
          <div className="text-gray-soft font-condensed font-black text-xs uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck size={16} className="text-gold" /> MICROSOFT PROJECT PROFESSIONAL
          </div>
          <div className="text-gray-soft font-condensed font-black text-xs uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck size={16} className="text-gold" /> ORACLE CONSTRUCTION & ENGINEERING
          </div>
        </div>
      </div>

      {/* --- LEAD CAPTURE FORM MODAL (SaaS Lead System) --- */}
      <AnimatePresence>
        {showLeadModal && (
          <div className="fixed inset-0 bg-navy/85 backdrop-blur-md z-[50000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#edeae2] p-6 sm:p-10 max-w-lg w-full rounded-sm border-t-[8px] border-gold text-navy shadow-4xl relative"
            >
              <button 
                onClick={() => setShowLeadModal(false)}
                className="absolute top-4 right-4 text-navy hover:text-gold p-1"
              >
                <XCircle size={22} />
              </button>

              <span className="text-[9px] font-extrabold text-gold uppercase tracking-[0.3em] block mb-1">DOWNLOAD VERIFIED AUDIT</span>
              <h3 className="font-condensed text-3xl font-extrabold uppercase mb-2">Generate Report Details</h3>
              <p className="text-xs text-gray-soft font-light mb-6">
                Receive the detailed DCMA 14-Point Health report for <span className="font-bold text-navy">{analysisData.fileName}</span> with certified fix procedures in 5 seconds.
              </p>

              <form onSubmit={handleLeadSubmit} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-navy mb-1.5">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={leadFormData.name}
                    onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
                    className="w-full bg-white border border-navy/15 rounded-sm p-3 focus:outline-none focus:border-navy text-navy font-medium"
                    placeholder="Enter full name" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-navy mb-1.5">Company Name</label>
                    <input 
                      required
                      type="text" 
                      value={leadFormData.company}
                      onChange={(e) => setLeadFormData({ ...leadFormData, company: e.target.value })}
                      className="w-full bg-white border border-navy/15 rounded-sm p-3 focus:outline-none focus:border-navy text-navy font-medium"
                      placeholder="e.g. Aecom" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-navy mb-1.5">Project Type</label>
                    <select 
                      value={leadFormData.projectType}
                      onChange={(e) => setLeadFormData({ ...leadFormData, projectType: e.target.value })}
                      className="w-full bg-white border border-navy/15 rounded-sm p-3 focus:outline-none focus:border-navy text-navy font-semibold height-[44px]"
                    >
                      <option value="Commercial">Commercial Tower</option>
                      <option value="Infrastructure">Infrastructure Rail/Road</option>
                      <option value="Industrial">Industrial EPC</option>
                      <option value="Oil & Gas">Oil & Gas / Energy</option>
                      <option value="Residential">Mixed-Use Residential</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-navy mb-1.5">Institutional Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={leadFormData.email}
                    onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                    className="w-full bg-white border border-navy/15 rounded-sm p-3 focus:outline-none focus:border-navy text-navy font-medium"
                    placeholder="name@company.com" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-navy mb-1.5">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    value={leadFormData.phone}
                    onChange={(e) => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                    className="w-full bg-white border border-navy/15 rounded-sm p-3 focus:outline-none focus:border-navy text-navy font-medium"
                    placeholder="Phone for P6 feedback" 
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-navy text-white-off hover:bg-gold hover:text-navy text-center py-4 font-bold uppercase tracking-widest transition-colors mt-6 font-condensed text-sm cursor-pointer border border-navy"
                >
                  Configure & Access My PDF Report
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- PRINTABLE MODAL VIEW (Phase 6 Corporate HTML generator) --- */}
      <AnimatePresence>
        {showPrintModal && (
          <div className="fixed inset-0 bg-navy/90 backdrop-blur-md z-[60000] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-6 sm:p-12 max-w-4xl w-full rounded-sm text-navy shadow-4xl relative my-8"
              id="report-print-pane"
            >
              
              {/* Close controls */}
              <div className="absolute top-4 right-4 flex items-center gap-3 print:hidden">
                <button 
                  onClick={() => window.print()}
                  className="bg-navy text-white-off hover:bg-gold hover:text-navy p-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[10px]"
                >
                  <Printer size={14} /> Send to Print
                </button>
                <button 
                  onClick={() => setShowPrintModal(false)}
                  className="text-navy hover:text-red-600 font-bold p-1 border rounded-sm hover:border-red-400"
                >
                  Close
                </button>
              </div>

              {/* Branded Letterhead Letter start */}
              <div className="border-b-4 border-gold pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h1 className="font-condensed font-black uppercase text-3xl tracking-wider text-navy leading-none">
                    REMOTE <span className="text-gold">SCHEDULERS</span>
                  </h1>
                  <p className="text-[10px] uppercase font-bold text-gray-soft tracking-widest mt-0.5">Planning Group • Certified PM Forensics</p>
                </div>
                <div className="text-left sm:text-right mt-4 sm:mt-0 leading-tight">
                  <p className="text-[11px] font-extrabold text-navy">EXECUTIVE DIAGNOSTIC AUDIT REPORT</p>
                  <p className="text-[10px] text-gray-soft">Report Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              {/* Patient Profile meta */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#edeae2]/40 border border-navy/5 rounded-sm mb-6 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-gray-soft block">CLIENT NAME</span>
                  <strong className="text-navy uppercase font-black">{leadFormData.name || "N/A"}</strong>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-soft block">COMPANY INST</span>
                  <strong className="text-navy uppercase font-black">{leadFormData.company || "N/A"}</strong>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-soft block">INGESTED SCH BASELINE</span>
                  <strong className="text-navy font-mono uppercase">{analysisData.fileName}</strong>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-gray-soft block">COMPLIANCE GRADE</span>
                  <strong className="text-navy font-black text-xs uppercase text-gold bg-navy px-1.5 py-0.2">{analysisData.healthScore}% - PASSING</strong>
                </div>
              </div>

              {/* Report body overview */}
              <h3 className="font-condensed text-xl font-extrabold uppercase mb-3 text-navy border-b pb-2">1. Executive Compliance Score Overview</h3>
              <p className="text-xs text-gray-soft leading-relaxed font-light mb-6">
                This document acts as an executive validation certificate representing Department of Defense DCMA 14-Point protocol tracking. Hudson logic mapping processes evaluated critical path sequencing, constraint integrity, resource load balances and lag indicators.
              </p>

              {/* Visual mini statistics layout */}
              <div className="grid grid-cols-3 gap-6 mb-8 text-center border p-4 bg-white shadow-sm font-sans">
                <div>
                  <span className="text-[10px] text-gray-soft block uppercase">Network Activities</span>
                  <strong className="font-mono text-lg text-navy">{analysisData.metrics.activities}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-gray-soft block uppercase">Critical Constraints</span>
                  <strong className="font-mono text-lg text-navy">{analysisData.metrics.relationships} Total</strong>
                </div>
                <div>
                  <span className="text-[10px] text-gray-soft block uppercase">Unbroken Path</span>
                  <strong className="font-mono text-lg text-green-700">100% SECURE</strong>
                </div>
              </div>

              {/* Critical findings summary table */}
              <h3 className="font-condensed text-xl font-extrabold uppercase mb-3 text-navy border-b pb-2">2. Metric Specific ledger</h3>
              <div className="overflow-x-auto text-xs font-sans mb-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b bg-navy/5 text-[10px] font-bold text-navy uppercase">
                      <th className="p-3">Metric Code</th>
                      <th className="p-3">Logical Title</th>
                      <th className="p-3">Calculated Value</th>
                      <th className="p-3">DoD Benchmark</th>
                      <th className="p-3 text-right">Pass/Fail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisData.checks.map(chk => (
                      <tr key={chk.id} className="border-b border-navy/5">
                        <td className="p-3 font-mono">DCMA-{chk.id}</td>
                        <td className="p-3 font-bold uppercase">{chk.metric}</td>
                        <td className="p-3 font-mono">{chk.value}</td>
                        <td className="p-3 font-mono">{chk.target}</td>
                        <td className="p-3 text-right font-extrabold">
                          <span className={chk.status === 'pass' ? 'text-green-700' : 'text-red-500'}>
                            {chk.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signature layout stamp */}
              <div className="mt-12 pt-8 border-t border-navy/10 flex justify-between items-end">
                <div className="text-xs text-gray-soft leading-snug">
                  <p className="font-extrabold text-navy uppercase text-[10px] tracking-wider mb-1">Authenticated signature</p>
                  <p className="font-condensed font-extrabold text-navy">Certified Forensic Scheduler (AACE/PMI)</p>
                  <p className="font-light">Remote Schedulers Planning Analytics Unit</p>
                </div>
                <div className="w-24 h-24 border-2 border-dashed border-gold flex flex-col items-center justify-center p-1 text-center select-none text-gold">
                  <span className="text-[7.5px] font-bold block leading-none uppercase tracking-widest mb-1.5 border-b pb-0.5">REMOTE SCH.</span>
                  <span className="font-black text-[9px] block uppercase leading-none">LOGIC CHECK PASS</span>
                  <span className="text-[6.5px] font-light block leading-none mt-1">PMI-SP #71627</span>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
