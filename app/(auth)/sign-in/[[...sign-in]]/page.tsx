// 'use client';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import Link from 'next/link';
// import { useState } from 'react';
// import { useSignIn } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';

// export default function SignIn() {
//   const { isLoaded, signIn, setActive } = useSignIn();
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isLoaded) return;

//     try {
//       const result = await signIn.create({
//         identifier: email,
//         password,
//       });

//       if (result.status === 'complete') {
//         await setActive({ session: result.createdSessionId });
//         router.push('/dashboard');
//       } else {
//         // More steps required (e.g. MFA)
//         setError('Additional verification required');
//       }
//     } catch (err: any) {
//       setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Invalid email or password');
//     }
//   };

//   const handleOAuth = (strategy: 'oauth_google' | 'oauth_github') => {
//     if (!isLoaded) return;
//     signIn.authenticateWithRedirect({
//       strategy,
//       redirectUrl: '/sso-callback',
//       redirectUrlComplete: '/dashboard',
//     });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <Link href="/" className="inline-block text-2xl font-bold text-foreground mb-4">
//           Content<span className="text-accent">Pro</span>
//         </Link>
//         <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
//         <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
//       </div>

//       {error && (
//         <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
//           {error}
//         </div>
//       )}

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="space-y-2">
//           <Label htmlFor="email" className="text-foreground">Email Address</Label>
//           <Input
//             id="email"
//             type="email"
//             placeholder="you@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="bg-card border-secondary text-foreground placeholder:text-muted-foreground"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <Label htmlFor="password" className="text-foreground">Password</Label>
//             <Link href="/forgot-password" className="text-sm text-accent hover:underline">
//               Forgot password?
//             </Link>
//           </div>
//           <Input
//             id="password"
//             type="password"
//             placeholder="••••••••"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="bg-card border-secondary text-foreground placeholder:text-muted-foreground"
//             required
//           />
//         </div>

//         <Button
//           type="submit"
//           className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
//           size="lg"
//         >
//           Sign In
//         </Button>
//       </form>

//       {/* Divider */}
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-secondary" />
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
//         </div>
//       </div>

//       {/* OAuth Buttons */}
//       <div className="space-y-2">
//         <Button
//           type="button"
//           variant="outline"
//           className="w-full border-secondary text-foreground hover:bg-secondary"
//           onClick={() => handleOAuth('oauth_google')}
//         >
//           Sign in with Google
//         </Button>
//         <Button
//           type="button"
//           variant="outline"
//           className="w-full border-secondary text-foreground hover:bg-secondary"
//           onClick={() => handleOAuth('oauth_github')}
//         >
//           Sign in with GitHub
//         </Button>
//       </div>

//       {/* Footer */}
//       <p className="text-center text-sm text-muted-foreground">
//         Don&apos;t have an account?{' '}
//         <Link href="/sign-up" className="text-accent hover:underline font-medium">
//           Sign up
//         </Link>
//       </p>
//     </div>
//   );
// }

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn forceRedirectUrl="/dashboard" />
    </div>
  )
}