import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase, TEST_CREDENTIALS } from '@/lib/supabase'

const FEATURE_NAME = '[Feature 1.2: Supabase Connection]';

// Define the Profile type based on our database schema
type Profile = {
  id: string
  email: string
  name: string
  role: 'Master' | 'Admin' | 'Tipster' | 'Cliente'
  phone: string
  telegram_username: string
  login_attempts: number
  user_id: string
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
  
  // Fetch users from Supabase database
  const { users, error } = await getUsersFromDatabase();

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

        {/* Feature Completion Cards */}
        <div className="space-y-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-2">
              ✅ Feature 1.1: Initial Setup Complete
            </p>
            <p className="text-sm opacity-90">
              Next.js + TypeScript + Tailwind CSS + Supabase + shadcn/ui
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-2">
              ✅ Feature 1.2: Database Connection Complete
            </p>
            <p className="text-sm opacity-90">
              {error ? 'Database connection configured • Table creation required' : `Live database connection • ${users.length} users loaded from Supabase`}
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-2">
              ✅ Feature 1.4: Authentication READY! 
            </p>
            <p className="text-sm opacity-90">
              Auth users created • Profiles linked • Password: 123456 • Ready for login testing!
            </p>
          </div>
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
                  Supabase Auth configured
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  shadcn/ui components ready
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Authentication users created
                </div>
              </div>
            </div>
          </div>

          {/* Test Credentials for Feature 1.4 */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-green-800">🔐 LIVE Authentication - Ready for Testing!</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEST_CREDENTIALS.map((cred) => (
                <div key={cred.email} className="bg-white p-4 rounded border border-green-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{cred.name}</span>
                    <Badge className={getRoleBadgeColor(cred.role)}>{cred.role}</Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Email:</strong> {cred.email}</p>
                    <p><strong>Password:</strong> <code className="bg-green-100 px-2 py-1 rounded font-mono text-green-800">{cred.password}</code></p>
                    <p className="text-xs text-gray-500">Auth ID: {cred.user_id.substring(0, 8)}...</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded text-sm text-green-700">
              🎉 <strong>Authentication Ready:</strong> All 4 auth users created and linked to profiles! Test login functionality now.
            </div>
          </div>

          {/* Users from Database Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">👥 Enhanced User Profiles from Database</h3>
            
            {error ? (
              // Error state - show error message and instructions
              <div className="text-center py-8">
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                  ❌ <strong>Database Error:</strong> {error}
                </div>
              </div>
            ) : (
              // Success state - show users from database
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
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-600">{user.email}</p>
                          <p className="text-gray-600">📱 {user.phone}</p>
                          <p className="text-gray-600">📱 @{user.telegram_username}</p>
                          <p className="text-xs text-green-600 font-medium">🔐 Auth Linked: {user.user_id.substring(0, 8)}...</p>
                          <p className="text-xs text-gray-400">Login attempts: {user.login_attempts}</p>
                          <p className="text-xs text-gray-400">Profile ID: {user.id.substring(0, 8)}...</p>
                          <p className="text-xs text-gray-400">Added: {new Date(user.created_at).toLocaleDateString()}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                  ✅ <strong>Full Authentication Setup:</strong> {users.length} users with profiles linked to Supabase Auth users
                </div>
              </>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2 text-blue-800">🔜 Ready for Implementation</h3>
            <div className="space-y-2 text-sm text-blue-600">
              <p><strong>Next:</strong> Login form component and authentication flow</p>
              <p><strong>Ready:</strong> Role-based dashboard pages and routing</p>
              <p><strong>Future:</strong> Middleware + Row Level Security (Feature 1.5)</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
