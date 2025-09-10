import React, { useRef, useState } from 'react';
import { Upload, FileText, Fish, CheckCircle, Loader2, X } from 'lucide-react';

interface SpeciesPrediction {
  name: string;
  scientificName: string;
  phylum: string;
  order: string;
  genus: string;
  class: string;
  family: string;
  species: string;
  description: string;
  confidence: number;
}

const FileUploader: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState<SpeciesPrediction | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // NEW: selected species from dropdown
  const [selectedSpecies, setSelectedSpecies] = useState<string>('');
  // NEW: controls showing the permission popup overlay
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  // Sample prediction data (unchanged)
  const samplePredictions: SpeciesPrediction[] = [
    {
      name: 'Vinciguerria Lanternfish',
      scientificName: 'Vinciguerria CBM:ZF:14736',
      phylum: 'Chordata',
      order: 'Stomiiformes',
      genus: 'Vinciguerria',
      class: 'Actinopterygii',
      family: 'Phosichthyidae',
      species: 'Cbm:zf:14736',
      description: 'A deep-sea lanternfish species that produces bioluminescence for communication and camouflage in the dark ocean depths.',
      confidence: 94.7
    },
    {
      name: 'Pacific Blue Tang',
      scientificName: 'Paracanthurus hepatus',
      phylum: 'Chordata',
      order: 'Perciformes',
      genus: 'Paracanthurus',
      class: 'Actinopterygii',
      family: 'Acanthuridae',
      species: 'P. hepatus',
      description: 'A vibrant blue marine fish commonly found in coral reefs of the Pacific Ocean, known for its distinctive blue coloration and yellow fins.',
      confidence: 97.2
    },
    {
      name: 'Giant Pacific Octopus',
      scientificName: 'Enteroctopus dofleini',
      phylum: 'Mollusca',
      order: 'Octopoda',
      genus: 'Enteroctopus',
      class: 'Cephalopoda',
      family: 'Octopodidae',
      species: 'E. dofleini',
      description: 'The largest octopus species in the world, found in the coastal waters of the Pacific Ocean, capable of remarkable camouflage and problem-solving abilities.',
      confidence: 91.8
    }
  ];

  // Dropdown options (as requested)
  const speciesOptions: string[] = [
    'Homo sapiens (modern humans)',
    'Homo neanderthalensis (Neanderthals)',
    'Homo erectus (early human ancestor)',
    'Homo habilis (early tool user)',
    'Australopithecus afarensis (“Lucy,” early hominin)',
    'Pan troglodytes (chimpanzee)',
    'Gorilla gorilla (western gorilla)',
    'Canis lupus (gray wolf)',
    'Felis catus (domestic cat)',
    'Elephas maximus (Asian elephant)',
    'Gallus gallus domesticus (domestic chicken)',
    'Columba livia (rock pigeon)',
    'Crocodylus niloticus (Nile crocodile)',
    'Delphinus delphis (common dolphin)',
    'Carcharodon carcharias (great white shark)',
    'Octopus vulgaris (common octopus)',
    'Oryza sativa (rice)',
    'Zea mays (maize/corn)',
    'Arabidopsis thaliana (model plant species)',
    'Saccharomyces cerevisiae (baker’s yeast)'
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      // only allow upload if species is exactly 'Homo sapiens (modern humans)'
      if (selectedSpecies !== 'Homo sapiens (modern humans)') {
        setShowPermissionPopup(true);
        return;
      }
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // double-check selection before processing
    if (selectedSpecies !== 'Homo sapiens (modern humans)') {
      setShowPermissionPopup(true);
      // clear the file input so user can try again after selecting
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    processFile(file);
  };

  // When user clicks the 'Select File' control we check selection first
  const handleSelectButtonClick = (e: React.MouseEvent) => {
    if (selectedSpecies !== 'Homo sapiens (modern humans)') {
      // show popup telling user to choose Homo sapiens
      setShowPermissionPopup(true);
      return;
    }
    // open the hidden file input
    inputRef.current?.click();
  };

  const processFile = async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    setPrediction(null);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Randomly select a prediction (unchanged)
    const randomPrediction = samplePredictions[Math.floor(Math.random() * samplePredictions.length)];
    setPrediction(randomPrediction);
    setIsProcessing(false);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setPrediction(null);
    setIsProcessing(false);
    // keep selection as is (user asked earlier whether to reset selection; leaving selection in place)
    if (inputRef.current) inputRef.current.value = '';
  };

  // Close popup and focus the select so user can change it
  const closePopup = () => {
    setShowPermissionPopup(false);
    // small timeout to ensure DOM ready before focusing
    setTimeout(() => selectRef.current?.focus(), 50);
  };

  // INTERACTIVE STYLES: derive booleans for UI
  const uploadAllowed = selectedSpecies === 'Homo sapiens (modern humans)';
  const showGlow = uploadAllowed && !uploadedFile && !isProcessing && !prediction;

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Marine Species Identification
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your marine specimen image or DNA sequence file to identify the species using our advanced AI prediction system.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* ——— Interactive select input ——— */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select scientific name</label>

            <div className="relative">
              {/* Floating container */}
              <div
                className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-shadow duration-200
                  ${selectedSpecies ? 'ring-2 ring-blue-200 border-blue-200' : 'border-gray-200'}
                `}
                onClick={() => selectRef.current?.focus()}
                role="button"
                tabIndex={0}
              >
                {/* left: select or placeholder */}
                <div className="flex-1 min-w-0">
                  {!selectedSpecies ? (
                    <div className="text-sm text-gray-400">Choose a scientific name…</div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                        {selectedSpecies.split('(')[0].trim()}
                      </div>
                      <div className="truncate text-sm text-gray-700">{selectedSpecies}</div>
                    </div>
                  )}
                </div>

                {/* status badge */}
                <div className="ml-4 flex items-center gap-3">
                  <div className={`text-xs font-medium px-2 py-1 rounded ${uploadAllowed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {uploadAllowed ? 'Allowed' : 'Restricted'}
                  </div>

                  {/* clear button */}
                  {selectedSpecies && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedSpecies(''); selectRef.current?.focus(); }}
                      className="p-1 rounded-md hover:bg-gray-100"
                      aria-label="Clear selection"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>

              {/* real native select (visually hidden but accessible) */}
              <select
                ref={selectRef}
                aria-label="Scientific name select"
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="absolute inset-0 w-full opacity-0 pointer-events-auto"
                // keep the select size large so click area matches
              >
                <option value="">-- Choose a scientific name --</option>
                {speciesOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Only <strong>Homo sapiens (modern humans)</strong> enables uploads. Choose it to allow file selection.
            </p>
          </div>

          {/* uploader area — enhanced visuals */}
          {!uploadedFile && !isProcessing && !prediction && (
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
                ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}
                ${showGlow ? 'shadow-lg ring-4 ring-blue-100' : ''}
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className={`w-16 h-16 mx-auto mb-4 ${uploadAllowed ? 'text-blue-600' : 'text-gray-400'}`} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop your file here or click to browse
              </h3>
              <p className="text-gray-500 mb-6">
                Supports images (JPG, PNG) and DNA sequence files (FASTA, TXT)
              </p>

              {/* hidden file input (use ref to open programmatically) */}
              <input
                ref={inputRef}
                type="file"
                onChange={handleFileSelect}
                accept=".jpg,.jpeg,.png,.fasta,.txt,.fa"
                className="hidden"
                id="file-upload"
              />

              {/* Select button now programmatically opens input after checking dropdown */}
              <button
                onClick={handleSelectButtonClick}
                className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200
                  ${uploadAllowed ? 'bg-blue-600 hover:bg-blue-700 text-white shadow' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                `}
                aria-disabled={!uploadAllowed}
              >
                <FileText className={`w-5 h-5 ${uploadAllowed ? '' : 'opacity-60'}`} />
                <span>{uploadAllowed ? 'Select File' : 'Select File (disabled)'}</span>
              </button>

              {/* interactive hint below button */}
              {!uploadAllowed && (
                <div className="mt-4 text-sm text-red-600">Please select <strong>Homo sapiens (modern humans)</strong> to enable upload.</div>
              )}
            </div>
          )}

          {(uploadedFile || isProcessing) && !prediction && (
            <div className="text-center py-12">
              <div className="mb-6">
                {isProcessing ? (
                  <Loader2 className="w-16 h-16 text-blue-600 mx-auto animate-spin" />
                ) : (
                  <FileText className="w-16 h-16 text-green-600 mx-auto" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isProcessing ? 'Analyzing specimen...' : 'File uploaded successfully'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isProcessing
                  ? 'Our AI is processing your file and matching it against our marine species database.'
                  : `File: ${uploadedFile?.name}`
                }
              </p>
              {isProcessing && (
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {prediction && (
            <div className="space-y-6">
              <div className="flex items-center justify-center text-green-600 mb-6">
                <CheckCircle className="w-8 h-8 mr-2" />
                <h3 className="text-2xl font-bold">Species Identified!</h3>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Fish className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {prediction.scientificName}
                    </h4>
                    <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {prediction.confidence}% confidence
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h5 className="font-bold text-gray-900 mb-4">Taxonomic Classification</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phylum:</span>
                      <span className="font-medium">{prediction.phylum}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class:</span>
                      <span className="font-medium">{prediction.class}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order:</span>
                      <span className="font-medium">{prediction.order}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Family:</span>
                      <span className="font-medium">{prediction.family}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Genus:</span>
                      <span className="font-medium">{prediction.genus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Species:</span>
                      <span className="font-medium">{prediction.species}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h5 className="font-bold text-gray-900 mb-4">Description</h5>
                  <p className="text-gray-600 leading-relaxed">
                    {prediction.description}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={resetUpload}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Upload Another File
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Permission popup overlay (shows when upload attempted without correct selection) */}
      {showPermissionPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Select required scientific name</h3>
            <p className="text-sm text-gray-700 mb-4">
              To upload a file you must select <strong>Homo sapiens (modern humans)</strong> from the dropdown.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPermissionPopup(false);
                  // focus the select after closing
                  setTimeout(() => selectRef.current?.focus(), 50);
                }}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FileUploader;
