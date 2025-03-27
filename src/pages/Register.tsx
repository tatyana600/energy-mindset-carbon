import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, User } from 'lucide-react';
 
const formSchema = z.object({
   name: z.string().min(2, 'Name must be at least 2 characters'),
   email: z.string().email('Please enter a valid email address'),
   password: z.string().min(6, 'Password must be at least 6 characters'),
   confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
 }).refine((data) => data.password === data.confirmPassword, {
   message: "Passwords don't match",
   path: ["confirmPassword"],
});
 
type FormValues = z.infer<typeof formSchema>;
 
const Register = () => {
   const [showPassword, setShowPassword] = React.useState(false);
   const navigate = useNavigate();
   const { register, error, loading } = useAuth();
 
   const form = useForm<FormValues>({
     resolver: zodResolver(formSchema),
     defaultValues: {
       name: '',
       email: '',
       password: '',
       confirmPassword: '',
     },
   });
 
   const onSubmit = async (values: FormValues) => {
     try {
       await register(values.name, values.email, values.password);
       toast.success('Registration successful!');
       navigate('/dashboard');
     } catch (err) {
       // Error is handled by the auth context
     }
   };
 
   return (
     <div className="min-h-screen flex flex-col">       
       <main className="flex-grow flex items-center justify-center py-20 px-4">
         <Card className="w-full max-w-md shadow-lg animate-fade-in">
           <CardHeader className="space-y-1">
             <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
             <CardDescription className="text-center">
               Enter your information to create an account
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
                   name="name"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Full Name</FormLabel>
                       <FormControl>
                         <Input placeholder="John Doe" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 
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
                 
                 <FormField
                   control={form.control}
                   name="confirmPassword"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Confirm Password</FormLabel>
                       <FormControl>
                         <div className="relative">
                           <Input 
                             type={showPassword ? "text" : "password"} 
                             placeholder="••••••••" 
                             {...field} 
                           />
                         </div>
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 
                 <Button type="submit" className="w-full" disabled={loading}>
                   <User className="mr-2 h-4 w-4" />
                   {loading ? 'Creating account...' : 'Create account'}
                 </Button>
               </form>
             </Form>
           </CardContent>
           <CardFooter className="flex flex-col">
             <div className="text-sm text-center text-muted-foreground">
               <span>Already have an account? </span>
               <Link to="/login" className="text-primary hover:underline font-medium">
                 Log in
               </Link>
             </div>
           </CardFooter>
         </Card>
       </main>
     </div>
   );
};
 
export default Register;