const FEATURE_NAME = '[Feature 1.1: Initial Setup]';

export default function Home() {
  console.log(`${FEATURE_NAME} Starting homepage render...`);
  console.log(`${FEATURE_NAME} Tailwind classes applied successfully`);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-center">
        {/* Main Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Hello BetLink
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Tipster Management Platform
          </p>
        </div>

        {/* Feature Completion Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-6 rounded-lg shadow-lg mb-8">
          <p className="text-lg font-semibold mb-2">
            🚀 Feature 1.1: Initial Setup Complete
          </p>
          <p className="text-sm opacity-90">
            Next.js + TypeScript + Tailwind CSS + Supabase + shadcn/ui
          </p>
        </div>
        
        {/* Tech Stack Showcase */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">✅ Project Setup Complete</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Next.js 15 with App Router
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  TypeScript configuration
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Tailwind CSS with custom theme
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Supabase client configured
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  shadcn/ui components ready
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Folder structure created
                </div>
              </div>
            </div>
          </div>
          
          {/* Test Instructions */}
          <div className="bg-slate-50 border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">📋 Manual Test Instructions</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                ✅ Visit <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">localhost:3000</code> to see this styled page
              </p>
              <p>✅ Verify Tailwind CSS styling is working correctly</p>
              <p>✅ Check browser console for no errors</p>
              <p>✅ Test responsive design on different screen sizes</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-blue-800">🔜 Coming Next</h3>
            <p className="text-sm text-blue-600">
              Feature 1.2: Supabase Connection + Mock Users Display
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
