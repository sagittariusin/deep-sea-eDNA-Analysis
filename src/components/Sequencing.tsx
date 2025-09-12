import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Zap, Activity, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './ui/Index';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ProcessFlowDiagram from './ProcessFlowDiagram';
import InteractiveDiagram from './InteractiveDiagram';

const Sequencing = () => {
  const sequencingSteps = [
    {
      title: "DNA Fragmentation",
      description: "Breaking DNA into manageable pieces",
      details: "Random or enzymatic fragmentation creates overlapping fragments for comprehensive coverage.",
    },
    {
      title: "Adapter Ligation",
      description: "Adding sequencing adapters to DNA fragments", 
      details: "Universal sequences enable binding to sequencing platforms and primer annealing.",
    },
    {
      title: "Amplification",
      description: "Creating clusters of identical DNA fragments",
      details: "Bridge amplification or emulsion PCR generates clonal clusters for signal detection.",
    },
    {
      title: "Sequencing by Synthesis", 
      description: "Reading DNA sequence through base incorporation",
      details: "Fluorescent nucleotides are incorporated and detected in real-time or in cycles.",
    },
    {
      title: "Base Calling",
      description: "Converting signals to DNA sequence",
      details: "Sophisticated algorithms interpret optical signals to determine nucleotide sequence.",
    }
  ];

  const sequencingTechnologies = [
    { technology: "Sanger", readLength: 800, throughput: 96, accuracy: 99.9, cost: 1000 },
    { technology: "Illumina", readLength: 300, throughput: 20000000, accuracy: 99.5, cost: 10 },
    { technology: "PacBio", readLength: 15000, throughput: 500000, accuracy: 95.0, cost: 50 },
    { technology: "Oxford Nanopore", readLength: 30000, throughput: 4000000, accuracy: 92.0, cost: 20 }
  ];

  const diagramComponents = [
    {
      x: 15, y: 20,
      label: "Sample DNA",
      color: "bg-blue-600",
      hoverColor: "bg-blue-500", 
      description: "High-quality DNA template for sequencing",
      details: "Must be pure and intact, typically >1μg for whole genome sequencing"
    },
    {
      x: 35, y: 35,
      label: "Library Prep",
      color: "bg-purple-600",
      hoverColor: "bg-purple-500",
      description: "DNA fragmentation and adapter addition",
      details: "Creates sequencing-ready library with platform-specific adapters"
    },
    {
      x: 55, y: 20,
      label: "Sequencer", 
      color: "bg-red-600",
      hoverColor: "bg-red-500",
      icon: Search,
      description: "Automated DNA sequencing instrument",
      details: "Uses fluorescence detection and sophisticated optics for base calling"
    },
    {
      x: 75, y: 35,
      label: "Raw Data",
      color: "bg-orange-600",
      hoverColor: "bg-orange-500",
      icon: Activity,
      description: "Fluorescent signal data from sequencer",
      details: "Requires computational processing to convert signals to sequence"
    },
    {
      x: 85, y: 65,
      label: "DNA Sequence",
      color: "bg-green-600", 
      hoverColor: "bg-green-500",
      description: "Final interpreted nucleotide sequence",
      details: "ATCG sequence with quality scores for each base position"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
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
              <Search className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">DNA Sequencing</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Reading the genetic code - determining the precise order of nucleotides
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
              <CardTitle className="text-3xl text-white">The Genomic Revolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                DNA sequencing determines the exact order of nucleotides (A, T, G, C) in DNA molecules. 
                From Sanger's pioneering method to modern next-generation sequencing, this technology 
                has revolutionized biology, medicine, and our understanding of life itself.
              </p>
              
              <div className="grid md:grid-cols-4 gap-6 mt-8">
                <div className="text-center p-6 bg-slate-900 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-blue-400 mb-2">3.2B</div>
                  <div className="text-slate-300 text-sm">Human Genome Bases</div>
                </div>
                <div className="text-center p-6 bg-slate-900 rounded-lg">
                  <Activity className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-indigo-400 mb-2">99.9%</div>
                  <div className="text-slate-300 text-sm">Sanger Accuracy</div>
                </div>
                <div className="text-center p-6 bg-slate-900 rounded-lg">
                  <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-purple-400 mb-2">6TB</div>
                  <div className="text-slate-300 text-sm">Human Genome Data</div>
                </div>
                <div className="text-center p-6 bg-slate-900 rounded-lg">
                  <div className="text-2xl font-bold text-green-400 mb-2">$1000</div>
                  <div className="text-slate-300 text-sm">Current Genome Cost</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <ProcessFlowDiagram
            title="DNA Sequencing Workflow"
            steps={sequencingSteps}
          />
        </motion.div>

        {/* Interactive Components */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <InteractiveDiagram
            title="Sequencing Platform Components"
            components={diagramComponents}
          />
        </motion.div>

        {/* Technology Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-3xl text-white">Sequencing Technologies Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-blue-400 mb-4">Read Length vs Throughput</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sequencingTechnologies} layout="horizontal">
                        <CartesianGrid strokeDasharray="3,3" stroke="#334155" />
                        <XAxis type="number" stroke="#94A3B8" />
                        <YAxis type="category" dataKey="technology" stroke="#94A3B8" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569' }}
                        />
                        <Bar dataKey="readLength" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {sequencingTechnologies.map((tech, index) => (
                    <motion.div
                      key={tech.technology}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-slate-900 rounded-lg"
                    >
                      <h5 className="font-bold text-white mb-2">{tech.technology}</h5>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-slate-400">Accuracy:</span>
                          <span className="text-green-400 ml-2">{tech.accuracy}%</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Cost/Mb:</span>
                          <span className="text-yellow-400 ml-2">${tech.cost}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applications and Future */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Current Applications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-900 rounded-lg">
                  <h4 className="font-bold text-blue-400 mb-2">Clinical Genomics</h4>
                  <p className="text-slate-300 text-sm">
                    Diagnosing genetic diseases, cancer profiling, and personalized medicine
                  </p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg">
                  <h4 className="font-bold text-blue-400 mb-2">Agricultural Genomics</h4>
                  <p className="text-slate-300 text-sm">
                    Crop improvement, livestock breeding, and food safety monitoring
                  </p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg">
                  <h4 className="font-bold text-blue-400 mb-2">Environmental Studies</h4>
                  <p className="text-slate-300 text-sm">
                    Metagenomics, biodiversity assessment, and ecosystem monitoring
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
                <CardTitle className="text-2xl text-white">Future Directions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-900 rounded-lg">
                  <h4 className="font-bold text-indigo-400 mb-2">Single-Cell Sequencing</h4>
                  <p className="text-slate-300 text-sm">
                    Understanding cellular heterogeneity and development at unprecedented resolution
                  </p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg">
                  <h4 className="font-bold text-indigo-400 mb-2">Real-Time Analysis</h4>
                  <p className="text-slate-300 text-sm">
                    Portable sequencers enabling field research and point-of-care diagnostics
                  </p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg">
                  <h4 className="font-bold text-indigo-400 mb-2">Epigenome Mapping</h4>
                  <p className="text-slate-300 text-sm">
                    Direct detection of DNA modifications and chromatin structure
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

export default Sequencing;