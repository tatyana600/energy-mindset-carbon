import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
 
const formSchema = z.object({
   email: z.string().email('Please enter a valid email address'),
   password: z.string().min(6, 'Password must be at least 6 characters'),
 });
 
 type FormValues = z.infer<typeof formSchema>;
 
 const Login = () => {
   const [showPassword, setShowPassword] = React.useState(false);
   const navigate = useNavigate();
   const location = useLocation();
   const { login, error, loading } = useAuth();
   const from = (location.state as any)?.from?.pathname || '/dashboard';
 
   const form = useForm<FormValues>({
     resolver: zodResolver(formSchema),
     defaultValues: {
       email: '',
       password: '',
     },
   });
 
   const onSubmit = async (values: FormValues) => {
     try {
       await login(values.email, values.password);
       toast.success('Successfully logged in!');
       navigate(from);
     } catch (err) {
       // Error is handled by the auth context
     }
   };
 
   return (
     <div className="min-h-screen flex flex-col">
       <Navbar />
       
       <main className="flex-grow flex items-center justify-center py-20 px-4">
         <Card className="w-full max-w-md shadow-lg animate-fade-in">
           <CardHeader className="space-y-1">
             <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
             <CardDescription className="text-center">
               Enter your credentials to access your account
             </CardDescription>
           </CardHeader>
           <CardContent>
             <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 {error && (
                   <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm mb-4">
                     {error}
                   </div>
                 )}
                 
                 <FormField
                   control={form.control}
                   name="email"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Email</FormLabel>
                       <FormControl>
                         <Input placeholder="name@example.com" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 
                 <FormField
                   control={form.control}
                   name="password"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Password</FormLabel>
                       <FormControl>
                         <div className="relative">
                           <Input 
                             type={showPassword ? "text" : "password"} 
                             placeholder="••••••••" 
                             {...field} 
                           />
                           <Button
                             type="button"
                             variant="ghost"
                             size="icon"
                             className="absolute right-0 top-0 h-full px-3"
                             onClick={() => setShowPassword(!showPassword)}
                           >
                             {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                             <span className="sr-only">
                               {showPassword ? "Hide password" : "Show password"}
                             </span>
                           </Button>
                         </div>
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 
                 <Button type="submit" className="w-full" disabled={loading}>
                   <LogIn className="mr-2 h-4 w-4" />
                   {loading ? 'Logging in...' : 'Login'}
                 </Button>
               </form>
             </Form>
           </CardContent>
           <CardFooter className="flex flex-col space-y-4">
             <div className="text-sm text-center text-muted-foreground">
               <span>Don't have an account? </span>
               <Link to="/register" className="text-primary hover:underline font-medium">
                 Sign up
               </Link>
             </div>
             {/* Demo account info */}
             <div className="text-xs text-center text-muted-foreground border-t pt-4">
               <p>Demo Account</p>
               <p>Email: demo@example.com</p>
               <p>Password: password</p>
             </div>
           </CardFooter>
         </Card>
       </main>
       
       <Footer />
     </div>
   );
};
 
export default Login;