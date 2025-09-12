import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TestTube, Beaker, Zap, Droplets, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './ui/Index';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import ProcessFlowDiagram from './ProcessFlowDiagram';
import InteractiveDiagram from './InteractiveDiagram';

type ExtractionStep = {
  title: string;
  description: string;
  details: string;
  icon?: string;
};

type DiagramComponent = {
  x: number;
  y: number;
  label: string;
  color: string;
  hoverColor?: string;
  icon: React.ComponentType<any>;
  description: string;
  details: string;
};

type Connection = {
  from: { x: number; y: number };
  to: { x: number; y: number };
};

type RealWorldMethod = {
  method: string;
  purity: string;
  yield: string;
  time: string;
  cost: string;
};

const DnaExtraction: React.FC = () => {
  const extractionSteps: ExtractionStep[] = [
    {
      title: 'Cell Lysis',
      description: "Breaking open cells to release their contents",
      details:
        'Using detergents and enzymes to disrupt cell membranes and nuclear envelopes, releasing DNA into solution.',
      icon: '1',
    },
    {
      title: 'Protein Removal',
      description: 'Separating proteins from DNA',
      details:
        'Adding salt solutions and proteases to denature and precipitate proteins, leaving DNA in solution.',
      icon: '2',
    },
    {
      title: 'DNA Precipitation',
      description: 'Concentrating and purifying DNA',
      details:
        'Using alcohol (ethanol or isopropanol) to precipitate DNA out of solution as white fibers.',
      icon: '3',
    },
    {
      title: 'DNA Washing',
      description: 'Removing contaminants and salts',
      details: 'Washing DNA pellet with 70% ethanol to remove residual salts and impurities.',
      icon: '4',
    },
    {
      title: 'DNA Resuspension',
      description: 'Preparing pure DNA for analysis',
      details: 'Dissolving clean DNA in sterile water or TE buffer for downstream applications.',
      icon: '5',
    },
  ];

  const diagramComponents: DiagramComponent[] = [
    {
      x: 15,
      y: 25,
      label: 'Sample',
      color: 'bg-blue-600',
      hoverColor: 'bg-blue-500',
      icon: TestTube,
      description: 'Biological sample (blood, tissue, saliva)',
      details: 'Starting material containing cells with DNA in nuclei',
    },
    {
      x: 35,
      y: 25,
      label: 'Lysis Buffer',
      color: 'bg-purple-600',
      hoverColor: 'bg-purple-500',
      icon: Beaker,
      description: 'Chemical solution to break open cells',
      details: 'Contains detergents (SDS), salt (NaCl), and sometimes enzymes (proteinase K)',
    },
    {
      x: 55,
      y: 45,
      label: 'Cell Lysis',
      color: 'bg-red-600',
      hoverColor: 'bg-red-500',
      icon: Zap,
      description: 'Process of breaking open cells',
      details: 'Cells are disrupted, releasing DNA, proteins, and other cellular components',
    },
    {
      x: 75,
      y: 25,
      label: 'Protein Removal',
      color: 'bg-orange-600',
      hoverColor: 'bg-orange-500',
      icon: Droplets,
      description: 'Separation of proteins from DNA',
      details: 'Proteins are denatured and removed using salt precipitation or organic solvents',
    },
    {
      x: 85,
      y: 70,
      label: 'Pure DNA',
      color: 'bg-green-600',
      hoverColor: 'bg-green-500',
      icon: Microscope,
      description: 'Final purified DNA product',
      details: 'High-quality DNA ready for PCR, sequencing, or other molecular applications',
    },
  ];

  const connections: Connection[] = [
    { from: { x: 15, y: 25 }, to: { x: 35, y: 25 } },
    { from: { x: 35, y: 25 }, to: { x: 55, y: 45 } },
    { from: { x: 55, y: 45 }, to: { x: 75, y: 25 } },
    { from: { x: 75, y: 25 }, to: { x: 85, y: 70 } },
  ];

  const realWorldData: RealWorldMethod[] = [
    { method: 'Phenol-Chloroform', purity: '95-98%', yield: 'High', time: '2-3 hours', cost: 'Low' },
    { method: 'Spin Column', purity: '92-95%', yield: 'Medium', time: '30-60 min', cost: 'Medium' },
    { method: 'Magnetic Beads', purity: '90-95%', yield: 'Medium', time: '45-90 min', cost: 'High' },
    { method: 'Salt Precipitation', purity: '85-92%', yield: 'Very High', time: '1-2 hours', cost: 'Very Low' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Link
              to={createPageUrl('Home')}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Overview
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center">
              <TestTube className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">DNA Extraction</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              The foundation of molecular biology - isolating pure DNA from biological samples
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Overview Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-3xl text-white">What is DNA Extraction?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                DNA extraction is the process of isolating deoxyribonucleic acid (DNA) from the cells of an organism.
                The DNA is separated from proteins, lipids, and other cellular components to obtain pure genetic material
                suitable for molecular analysis, including PCR, sequencing, cloning, and genetic testing.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-slate-900 rounded-lg">
                  <div className="text-3xl font-bold text-teal-400 mb-2">99.9%</div>
                  <div className="text-slate-300">Typical Purity</div>
                </div>
                <div className="text-center p-6 bg-slate-900 rounded-lg">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">10-100μg</div>
                  <div className="text-slate-300">DNA Yield per mg tissue</div>
                </div>
                <div className="text-center p-6 bg-slate-900 rounded-lg">
                  <div className="text-3xl font-bold text-blue-400 mb-2">A260/A280</div>
                  <div className="text-slate-300">Quality Measure: 1.8-2.0</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interactive Process Flow */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
          <ProcessFlowDiagram title="DNA Extraction Workflow" steps={extractionSteps} />
        </motion.div>

        {/* Interactive Diagram */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
          <InteractiveDiagram title="DNA Extraction Process Components" components={diagramComponents} connections={connections} />
        </motion.div>

        {/* Real-World Data Comparison */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-16">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-3xl text-white">Method Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-600">
                      <th className="text-left py-3 px-4 text-white font-semibold">Method</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Purity</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Yield</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Time</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {realWorldData.map((method, index) => (
                      <motion.tr
                        key={index}
                        className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <td className="py-3 px-4 text-white font-medium">{method.method}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            {method.purity}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{method.yield}</td>
                        <td className="py-3 px-4 text-slate-300">{method.time}</td>
                        <td className="py-3 px-4 text-slate-300">{method.cost}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Scientific Information */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Key Principles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-bold text-teal-400 mb-2">Cell Membrane Disruption</h4>
                  <p className="text-slate-300 text-sm">
                    Detergents like SDS (sodium dodecyl sulfate) disrupt lipid bilayers by inserting 
                    between phospholipid molecules, causing membrane lysis.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-teal-400 mb-2">Protein Denaturation</h4>
                  <p className="text-slate-300 text-sm">
                    High salt concentrations and pH changes unfold proteins, making them 
                    precipitate out of solution while DNA remains soluble.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-teal-400 mb-2">DNA Precipitation</h4>
                  <p className="text-slate-300 text-sm">
                    Alcohol reduces the dielectric constant of the solution, causing DNA's 
                    negatively charged backbone to aggregate and precipitate.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Quality Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-bold text-cyan-400 mb-2">Spectrophotometric Analysis</h4>
                  <p className="text-slate-300 text-sm">
                    A260/A280 ratio of 1.8-2.0 indicates pure DNA. Lower ratios suggest protein contamination.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-cyan-400 mb-2">Gel Electrophoresis</h4>
                  <p className="text-slate-300 text-sm">
                    Visualizes DNA integrity. High molecular weight DNA appears as a single 
                    band, while degraded DNA shows a smear pattern.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-cyan-400 mb-2">Fluorometric Quantification</h4>
                  <p className="text-slate-300 text-sm">
                    Methods like Qubit provide accurate DNA concentration measurements 
                    by binding fluorescent dyes specifically to DNA.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DnaExtraction;
