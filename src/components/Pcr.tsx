import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Dna, Thermometer, Timer, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './ui/Index';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ProcessFlowDiagram from './ProcessFlowDiagram';
import InteractiveDiagram from './InteractiveDiagram';

const Pcr = () => {
  const pcrSteps = [
    {
      title: "Denaturation (94-98°C)",
      description: "Separating double-stranded DNA into single strands",
      details: "High temperature breaks hydrogen bonds between base pairs, creating single-stranded DNA templates.",
    },
    {
      title: "Annealing (50-65°C)",
      description: "Primers bind to target sequences",
      details: "Temperature lowered to allow primers to hybridize to complementary sequences on template DNA.",
    },
    {
      title: "Extension (72°C)",
      description: "DNA polymerase synthesizes new strands",
      details: "Taq polymerase extends primers, synthesizing new DNA strands complementary to the template.",
    }
  ];

  const thermalCycleData = [
    { cycle: 0, temperature: 25, copies: 1 },
    { cycle: 1, temperature: 94, copies: 2 },
    { cycle: 2, temperature: 55, copies: 4 },
    { cycle: 3, temperature: 72, copies: 8 },
    { cycle: 10, temperature: 94, copies: 1024 },
    { cycle: 20, temperature: 94, copies: 1048576 },
    { cycle: 30, temperature: 94, copies: 1073741824 }
  ];

  const diagramComponents = [
    {
      x: 20, y: 20,
      label: "Template DNA",
      color: "bg-blue-600",
      hoverColor: "bg-blue-500",
      icon: Dna,
      description: "Original double-stranded DNA containing target sequence",
      details: "Contains the specific region to be amplified, typically 100-3000 base pairs long"
    },
    {
      x: 50, y: 15,
      label: "Primers",
      color: "bg-purple-600", 
      hoverColor: "bg-purple-500",
      description: "Short DNA sequences that bind to template",
      details: "Forward and reverse primers, typically 18-25 nucleotides long, define the target region"
    },
    {
      x: 80, y: 25,
      label: "Taq Polymerase", 
      color: "bg-red-600",
      hoverColor: "bg-red-500",
      icon: Zap,
      description: "Heat-stable enzyme that synthesizes DNA",
      details: "Extracted from Thermus aquaticus, remains active at high temperatures used in PCR"
    },
    {
      x: 35, y: 60,
      label: "dNTPs",
      color: "bg-orange-600",
      hoverColor: "bg-orange-500", 
      description: "Building blocks for new DNA synthesis",
      details: "Deoxynucleoside triphosphates (dATP, dCTP, dGTP, dTTP) provide energy and bases"
    },
    {
      x: 65, y: 75,
      label: "Amplified DNA",
      color: "bg-green-600",
      hoverColor: "bg-green-500",
      icon: Dna,
      description: "Exponentially amplified target sequence", 
      details: "Millions of copies of the target DNA region after 25-35 PCR cycles"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to={createPageUrl('Home')} className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-5 h-5" />
              Back to Overview
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center">
              <Dna className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">PCR</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Polymerase Chain Reaction - The revolutionary DNA amplification technique
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-3xl text-white">The PCR Revolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                Polymerase Chain Reaction (PCR) is a revolutionary molecular biology technique that amplifies 
                specific DNA sequences exponentially. Invented by Kary Mullis in 1983, PCR has become 
                indispensable in research, diagnostics, forensics, and biotechnology.
              </p>
              
              <div className="grid md:grid-cols-4 gap-6 mt-8">
                <div className="text-center p-6 bg-slate-900 rounded-lg">
                  <Thermometer className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-orange-400 mb-2">94-98°C</div>
                  <div className="text-slate-300 text-sm">Denaturation Temp</div>
                </div>
                <div className="text-center p-6 bg-slate-900 rounded-lg">
                  <Timer className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-amber-400 mb-2">2-4 hrs</div>
                  <div className="text-slate-300 text-sm">Total Runtime</div>
                </div>
                <div className="text-center p-6 bg-slate-900 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">25-35</div>
                  <div className="text-slate-300 text-sm">Typical Cycles</div>
                </div>
                <div className="text-center p-6 bg-slate-900 rounded-lg">
                  <div className="text-2xl font-bold text-green-400 mb-2">10⁹</div>
                  <div className="text-slate-300 text-sm">Amplification Factor</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* PCR Cycle Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <ProcessFlowDiagram
            title="PCR Thermal Cycling Process"
            steps={pcrSteps}
          />
        </motion.div>

        {/* Interactive Components */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <InteractiveDiagram
            title="PCR Reaction Components"
            components={diagramComponents}
          />
        </motion.div>

        {/* Amplification Curve */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-3xl text-white">Exponential Amplification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={thermalCycleData}>
                    <CartesianGrid strokeDasharray="3,3" stroke="#334155" />
                    <XAxis dataKey="cycle" stroke="#94A3B8" />
                    <YAxis scale="log" domain={[1, 'dataMax']} stroke="#94A3B8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569' }}
                      labelStyle={{ color: '#E2E8F0' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="copies" 
                      stroke="#F59E0B" 
                      strokeWidth={3}
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-slate-300 text-center">
                DNA copies double with each cycle, resulting in exponential amplification
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applications and Details */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">PCR Applications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-900 rounded-lg">
                  <h4 className="font-bold text-amber-400 mb-2">Medical Diagnostics</h4>
                  <p className="text-slate-300 text-sm">
                    Detecting pathogens, genetic disorders, and viral infections like COVID-19
                  </p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg">
                  <h4 className="font-bold text-amber-400 mb-2">Forensic Analysis</h4>
                  <p className="text-slate-300 text-sm">
                    Amplifying trace DNA evidence for criminal investigations and paternity testing
                  </p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg">
                  <h4 className="font-bold text-amber-400 mb-2">Evolutionary Studies</h4>
                  <p className="text-slate-300 text-sm">
                    Analyzing ancient DNA and studying phylogenetic relationships
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Technical Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-900 rounded-lg">
                  <h4 className="font-bold text-orange-400 mb-2">Primer Design</h4>
                  <p className="text-slate-300 text-sm">
                    Tm: 50-65°C, Length: 18-25 bp, GC content: 40-60%
                  </p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg">
                  <h4 className="font-bold text-orange-400 mb-2">Reaction Conditions</h4>
                  <p className="text-slate-300 text-sm">
                    Template: 10ng-1μg, Primers: 0.1-1μM, dNTPs: 200μM each
                  </p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg">
                  <h4 className="font-bold text-orange-400 mb-2">Quality Control</h4>
                  <p className="text-slate-300 text-sm">
                    Gel electrophoresis, qPCR analysis, sequencing verification
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Pcr;