import { z } from 'zod';

export const signUpSchema = z.object({
    fullName: z.string().min(2,'Full name must be at least 2 characters'),
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8,'Password must be at least 8 characters'),
    phoneNumber: z.string().min(10,'Please enter a valid phone number'),
    systemRole: z.enum(['FARMER','TRADER','TRANSPORTER','MARKETER','ADMIN']),
});

export const loginSchema = z.object({
    email: z.email('Please enter a valid email address'),
    password: z.string().min(1,'Password is required'),
})

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;