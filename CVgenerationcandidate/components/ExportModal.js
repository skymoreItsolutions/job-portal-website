import React, { useState } from 'react';
import { CVData, CVTemplate, ExportOptions } from '../types/cv';
import { X, Download, FileText, File, Code, Printer, Settings, Crown, Zap } from 'lucide-react';

interface ExportModalProps {
  cvData: CVData;
  template: CVTemplate;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ cvData, template, onClose }) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    quality: 'high',
    includeColors: true,
    pageSize: 'A4',
    margins: 'normal'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const formatOptions = [
    { 
      value: 'pdf', 
      label: 'PDF', 
      icon: FileText, 
      description: 'Best for job applications and printing',
      premium: false
    },
    { 
      value: 'docx', 
      label: 'Word Document', 
      icon: File, 
      description: 'Editable format for further customization',
      premium: true
    },
    { 
      value: 'html', 
      label: 'HTML', 
      icon: Code, 
      description: 'Web format for online portfolios',
      premium: true
    },
    { 
      value: 'txt', 
      label: 'Plain Text', 
      icon: FileText, 
      description: 'Simple text format for ATS systems',
      premium: false
    }
  ];

  const qualityOptions = [
    { value: 'standard', label: 'Standard', description: 'Good quality, smaller file size' },
    { value: 'high', label: 'High', description: 'Best quality, larger file size' },
    { value: 'print', label: 'Print Ready', description: 'Optimized for professional printing' }
  ];

  const pageSizeOptions = [
    { value: 'A4', label: 'A4 (210 × 297 mm)', description: 'Standard international' },
    { value: 'Letter', label: 'Letter (8.5 × 11 in)', description: 'Standard US' },
    { value: 'Legal', label: 'Legal (8.5 × 14 in)', description: 'Extended US format' }
  ];

  const marginOptions = [
    { value: 'narrow', label: 'Narrow', description: 'More content, less white space' },
    { value: 'normal', label: 'Normal', description: 'Balanced layout' },
    { value: 'wide', label: 'Wide', description: 'More white space, cleaner look' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const progressInterval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setExportProgress(100);
      
      // Simulate file download
      setTimeout(() => {
        const fileName = `${cvData.personalInfo.firstName}_${cvData.personalInfo.lastName}_CV.${exportOptions.format}`;
        
        // Create a blob and download link (this would be replaced with actual export logic)
        const blob = new Blob(['CV content would be here'], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setIsExporting(false);
        setExportProgress(0);
        onClose();
      }, 500);
      
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const getFormatIcon = (format: string) => {
    const option = formatOptions.find(opt => opt.value === format);
    return option ? option.icon : FileText;
  };

  const isFormatPremium = (format: string) => {
    const option = formatOptions.find(opt => opt.value === format);
    return option?.premium || false;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Export Your CV</h2>
            <p className="text-blue-100">Choose your preferred format and settings</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Export Options */}
            <div className="space-y-6">
              {/* Format Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Export Format
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {formatOptions.map(option => {
                    const Icon = option.icon;
                    const isSelected = exportOptions.format === option.value;
                    const isPremium = option.premium;
                    
                    return (
                      <button
                        key={option.value}
                        onClick={() => !isPremium && setExportOptions({ ...exportOptions, format: option.value as any })}
                        disabled={isPremium}
                        className={`p-4 border rounded-lg text-left transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                            : isPremium
                            ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                            <span className="font-medium">{option.label}</span>
                          </div>
                          {isPremium && (
                            <Crown className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{option.description}</p>
                        {isPremium && (
                          <p className="text-xs text-yellow-600 mt-1">Premium feature</p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quality Settings */}
              {exportOptions.format === 'pdf' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Quality Settings
                  </h3>
                  <div className="space-y-3">
                    {qualityOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => setExportOptions({ ...exportOptions, quality: option.value as any })}
                        className={`w-full p-3 border rounded-lg text-left transition-colors ${
                          exportOptions.quality === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Page Settings */}
              {(exportOptions.format === 'pdf' || exportOptions.format === 'docx') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Page Size</h4>
                    <select
                      value={exportOptions.pageSize}
                      onChange={(e) => setExportOptions({ ...exportOptions, pageSize: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {pageSizeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Margins</h4>
                    <select
                      value={exportOptions.margins}
                      onChange={(e) => setExportOptions({ ...exportOptions, margins: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {marginOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Additional Options */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Options</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeColors}
                      onChange={(e) => setExportOptions({ ...exportOptions, includeColors: e.target.checked })}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <span className="font-medium text-gray-900">Include Colors</span>
                      <p className="text-sm text-gray-600">Keep template colors in the exported file</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Preview & Summary */}
            <div className="space-y-6">
              {/* Export Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium flex items-center gap-2">
                      {React.createElement(getFormatIcon(exportOptions.format), { className: "w-4 h-4" })}
                      {formatOptions.find(opt => opt.value === exportOptions.format)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Template:</span>
                    <span className="font-medium">{template.name}</span>
                  </div>
                  {exportOptions.format === 'pdf' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quality:</span>
                        <span className="font-medium capitalize">{exportOptions.quality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Page Size:</span>
                        <span className="font-medium">{exportOptions.pageSize}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Colors:</span>
                    <span className="font-medium">{exportOptions.includeColors ? 'Included' : 'Black & White'}</span>
                  </div>
                </div>
              </div>

              {/* File Preview */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">File Preview</h4>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="w-16 h-20 bg-white border border-gray-300 rounded mx-auto mb-3 flex items-center justify-center">
                    {React.createElement(getFormatIcon(exportOptions.format), { className: "w-8 h-8 text-gray-600" })}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {cvData.personalInfo.firstName}_{cvData.personalInfo.lastName}_CV.{exportOptions.format}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Estimated size: {exportOptions.quality === 'high' ? '2-3 MB' : '1-2 MB'}
                  </div>
                </div>
              </div>

              {/* Premium Upgrade */}
              {isFormatPremium(exportOptions.format) && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Crown className="w-6 h-6 text-yellow-600" />
                    <h4 className="font-semibold text-gray-900">Premium Feature</h4>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Unlock advanced export formats and customization options with Bolt Premium.
                  </p>
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-colors font-medium">
                    Upgrade to Premium
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {isExporting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Exporting... {exportProgress}%
              </div>
            ) : (
              'Ready to export your professional CV'
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={isExporting}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || isFormatPremium(exportOptions.format)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export CV
                </>
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {isExporting && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
              style={{ width: `${exportProgress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportModal;