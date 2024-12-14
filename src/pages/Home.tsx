import React from 'react';
import { FileDown, Edit3, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FileUploader } from '../components/upload/FileUploader';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Visualize Your Thoughts with MindMap
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload, preview, and edit your XMind files with our intuitive platform
          </p>
          <FileUploader />
          <div className="mt-4">
            <Link
              to="/preview"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
            >
              or try a demo
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<ZoomIn className="w-8 h-8 text-indigo-600" />}
            title="Interactive Preview"
            description="Zoom, pan, and explore your mind maps with intuitive controls"
          />
          <FeatureCard
            icon={<Edit3 className="w-8 h-8 text-indigo-600" />}
            title="Easy Editing"
            description="Edit your mind maps directly in the browser"
          />
          <FeatureCard
            icon={<FileDown className="w-8 h-8 text-indigo-600" />}
            title="Export Options"
            description="Export to XMind, PNG, or JPG formats"
          />
        </div>

        {/* Mind Map Preview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <img
            src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1200"
            alt="Mind Map Example"
            className="rounded-lg w-full"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default Home;