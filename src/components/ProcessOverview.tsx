import React from 'react';
import { ArrowRight } from 'lucide-react';

const ProcessOverview: React.FC = () => {
  const processes = [
    {
      number: '01.',
      title: 'Sample Collection:',
      titleColor: 'text-teal-500',
      description: 'The process begins with collecting marine specimens from various ocean depths and environments. This step requires careful preservation techniques to ensure that genetic material remains intact for subsequent molecular analysis.'
    },
    {
      number: '02.',
      title: 'DNA Extraction:',
      titleColor: 'text-orange-500',
      description: 'Using specialized protocols, DNA is extracted from marine tissue samples. The PCR amplifies target gene regions, creating numerous copies to facilitate detailed examination of genetic markers specific to marine species.'
    },
    {
      number: '03.',
      title: 'Sequencing:',
      titleColor: 'text-blue-500',
      description: 'The amplified DNA undergoes high-throughput sequencing, where the order of nucleotides is determined. This sequence represents the unique genetic fingerprint of the marine species and is essential for accurate identification.'
    },
    {
      number: '04.',
      title: 'Database Matching:',
      titleColor: 'text-red-500',
      description: 'Finally, the obtained sequence is matched against reference libraries in our marine DNA database. This comparison allows for the identification of the specimen by finding the closest genetic matches in our comprehensive collection.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium mb-4">
            Overview
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
            Process of identifying marine species via standardized DNA genetic markers.
          </h2>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {processes.map((process, index) => (
            <div key={index} className="relative">
              <div className="mb-6">
                <div className="text-lg font-bold text-gray-400 mb-2">
                  {process.number}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${process.titleColor}`}>
                  {process.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {process.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Through this method, unknown marine samples are identified to species present in the reference library.
              </h3>
            </div>
            <div className="flex-shrink-0">
              <button className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 group">
                <span>Identify Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessOverview;