import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'

const FEATURE_NAME = '[Feature 1.2: Supabase Connection]';

type Profile = {
  id: string
  email: string
  name: string
  role: 'Master' | 'Admin' | 'Tipster' | 'Cliente'
  created_at: string
}

function getRoleBadgeColor(role: string) {
  switch (role) {
    case 'Master': return 'bg-purple-600 text-white'
    case 'Admin': return 'bg-red-600 text-white'
    case 'Tipster': return 'bg-blue-600 text-white'
    case 'Cliente': return 'bg-green-600 text-white'
    default: return 'bg-gray-600 text-white'
  }
}

async function getUsersFromDatabase(): Promise<{ users: Profile[], error: string | null }> {
  console.log(`${FEATURE_NAME} Fetching users from Supabase database...`);
  
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error(`${FEATURE_NAME} Database error:`, error);
      return { users: [], error: error.message };
    }

    if (!profiles || profiles.length === 0) {
      console.warn(`${FEATURE_NAME} No profiles found in database`);
      return { users: [], error: 'No users found in database' };
    }

    console.log(`${FEATURE_NAME} Successfully fetched ${profiles.length} users from database`);
    return { users: profiles, error: null };
    
  } catch (error) {
    console.error(`${FEATURE_NAME} Unexpected error:`, error);
    return { users: [], error: 'Failed to connect to database' };
  }
}

export default async function Home() {
  console.log(`${FEATURE_NAME} Starting homepage render...`);
  
  const { users, error } = await getUsersFromDatabase();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 pt-24">
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

        {/* Feature 1.2: Users from Database */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-6 rounded-lg shadow-lg mb-8">
          <p className="text-lg font-semibold mb-2">
            🎉 Feature 1.2: Supabase Connection + Real Database Users
          </p>
          <p className="text-sm opacity-90">
            {error ? 'Database connection configured • Table creation required' : `Live database connection • ${users.length} users loaded from Supabase`}
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

          {/* Users from Database Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">👥 Users from Supabase Database</h3>
            
            {error ? (
              <div className="text-center py-8">
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                  ❌ <strong>Database Error:</strong> {error}
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {users.map((user) => (
                    <Card key={user.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between text-base">
                          <span className="text-gray-800">{user.name}</span>
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {user.role}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-400 mt-1">ID: {user.id.substring(0, 8)}...</p>
                        <p className="text-xs text-gray-400">Added: {new Date(user.created_at).toLocaleDateString()}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                  ✅ <strong>Database Connection:</strong> Successfully loaded {users.length} users from Supabase
                </div>
              </>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-blue-800">🔜 Coming Next</h3>
            <p className="text-sm text-blue-600">
              Feature 1.3: Role-Based Placeholder Pages
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
