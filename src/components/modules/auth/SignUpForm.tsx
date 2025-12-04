"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/server/auth/register.server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const GENDERS = ["MALE", "FEMALE", "OTHER"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const getFieldError = (fieldName: string) => {
    if (state?.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      console.log(error)
      return error?.message || null;
    }
    return null;
  };

  
  // Show toast for general errors
  useEffect(() => {
      console.log(state)
        if (state && state.success && state.message) {
      toast.success(state.message);
      redirect('/'); // Redirect to login page after successful registration
    }
      else if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} encType="multipart/form-data">
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" name="name" type="text" placeholder="John Doe" />
          {getFieldError("name") && <FieldDescription className="text-red-600">{getFieldError("name")}</FieldDescription>}
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" placeholder="m@example.com" />
          {getFieldError("email") && <FieldDescription className="text-red-600">{getFieldError("email")}</FieldDescription>}
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name="password" type="password" />
          {getFieldError("password") && <FieldDescription className="text-red-600">{getFieldError("password")}</FieldDescription>}
        </Field>

        

        {/* Date of Birth */}
        <Field>
          <FieldLabel htmlFor="dob">Date of Birth</FieldLabel>
          <Input id="dob" name="dob" type="date" />
        </Field>

        {/* Phone */}
        <Field>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input id="phone" name="phone" type="text" />
        </Field>

        {/* Blood Group */}
        <Field>
          <FieldLabel htmlFor="bloodGroup">Blood Group</FieldLabel>
          <select name="bloodGroup" id="bloodGroup" className="border rounded px-2 py-1 w-full">
            <option value="">Select Blood Group</option>
            {BLOOD_GROUPS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </Field>

        {/* Gender */}
        <Field>
          <FieldLabel htmlFor="gender">Gender</FieldLabel>
          <select name="gender" id="gender" className="border rounded px-2 py-1 w-full">
            <option value="">Select Gender</option>
            {GENDERS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </Field>

       
      </FieldGroup>

      <FieldGroup className="mt-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>
        <FieldDescription className="px-6 text-center">
          Already have an account?{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
