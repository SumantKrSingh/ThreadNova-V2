export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export interface LoginForm {
  email: string
  password: string
}

export interface SignupForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}
