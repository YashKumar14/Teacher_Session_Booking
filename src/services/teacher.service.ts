import { Teacher } from '../models/Teacher';

export interface CreateTeacherInput {
  fullName: string;
  email: string;
  specialization: string;
  experience: number;
}

export const createTeacher = async (input: CreateTeacherInput) =>
  Teacher.create({
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    specialization: input.specialization.trim(),
    experience: input.experience,
  });
