import React from 'react';

const Hero: React.FC = () => {
  const speciesImages = [
    { id: 1, name: 'Jellyfish', image: 'https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=200', position: 'top-20 left-20' },
    { id: 2, name: 'Coral', image: 'https://images.pexels.com/photos/64219/dolphin-marine-mammals-water-sea-64219.jpeg?auto=compress&cs=tinysrgb&w=200', position: 'top-32 right-32' },
    { id: 3, name: 'Fish', image: 'https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg?auto=compress&cs=tinysrgb&w=200', position: 'bottom-40 left-16' },
    { id: 4, name: 'Seahorse', image: 'https://images.pexels.com/photos/2739666/pexels-photo-2739666.jpeg?auto=compress&cs=tinysrgb&w=200', position: 'bottom-20 right-20' },
    { id: 5, name: 'Whale', image: 'https://images.pexels.com/photos/4666751/pexels-photo-4666751.jpeg?auto=compress&cs=tinysrgb&w=200', position: 'top-1/2 right-12' }
  ];

  const BarcodePattern: React.FC = () => (
    <div className="flex space-x-px">
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className={`w-1 bg-gradient-to-b from-red-500 to-blue-500 ${
            Math.random() > 0.5 ? 'h-4' : 'h-2'
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Welcome Text */}
        <div className="text-center mb-8">
          <p className="text-blue-800 font-medium mb-4">Welcome to Marine DNA Systems</p>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8">
            <span className="bg-teal-400 text-white px-4 py-2 rounded-lg inline-block transform -rotate-1">
              Identifying
            </span>
            <span className="block mt-4">marine species</span>
            <span className="block">through DNA barcodes</span>
          </h1>
        </div>

        {/* Description */}
        <div className="text-center max-w-3xl mx-auto mt-12">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
            MarineDNA features advanced molecular techniques for identifying marine life through 
            DNA analysis, supporting ocean conservation and biodiversity research with 
            comprehensive species databases and cutting-edge sequencing technology.
          </p>
          <p className="text-teal-600 font-medium">
            Explore our legacy database at <span className="text-orange-500">v3.marinedna.org</span>
          </p>
        </div>

        {/* Floating Species Images with DNA Barcodes */}
        <div className="absolute inset-0 pointer-events-none">
          {speciesImages.map((species, index) => (
            <div key={species.id} className={`absolute ${species.position} hidden lg:block`}>
              <div className="relative group">
                {/* Connecting Line */}
                <svg 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-gray-300"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${index * 30}deg)`
                  }}
                >
                  <path 
                    d="M 50 50 Q 80 30 110 50" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeDasharray="5,5" 
                    fill="none"
                    className="animate-pulse"
                  />
                </svg>
                
                {/* Species Image */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg transform hover:scale-110 transition-transform duration-300">
                    <img 
                      src={species.image} 
                      alt={species.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* DNA Barcode */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-2 shadow-md">
                    <BarcodePattern />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;