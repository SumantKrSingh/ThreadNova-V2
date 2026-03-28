import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { auth } from './firebase'

export const signupUser = async (name: string, email: string, password: string): Promise<User> => {
  const result = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(result.user, { displayName: name })
  return result.user
}

export const loginUser = async (email: string, password: string): Promise<User> => {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result.user
}

export const logoutUser = async (): Promise<void> => {
  await signOut(auth)
}
