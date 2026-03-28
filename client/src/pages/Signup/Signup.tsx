import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './Signup.scss'
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Link, useNavigate } from 'react-router-dom'
import { type SignupForm } from '../../types/user.types'
import { useForm } from 'react-hook-form'
import { signupUser } from '../../services/auth.service'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import { setUser } from '../../redux/auth/authSlice'
import Button from '@mui/material/Button'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter your email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password must match')
    .required('Required'),
})

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data: SignupForm) => {
    try {
      setLoading(true)
      setError(null)

      const user = await signupUser(data.name, data.email, data.password)
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      )
      navigate('/')
    } catch {
      setError(`Invalid email or password. Please try again`)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="signup-title">Sign In </h1>
          <p className="signup-sub">Sign in to your Thread~Nova account</p>
        </div>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
          <TextField
            label="Enter user name"
            type="text"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{
              mb: 2,
              input: { color: 'var(--text)' },
              label: { color: 'var(--text)' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'var(--text)' },
              },
            }}
          ></TextField>

          <TextField
            label="Enter email address"
            type="email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              mb: 2,
              input: { color: 'var(--text)' },
              label: { color: 'var(--text)' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'var(--text)' },
              },
            }}
          ></TextField>

          <TextField
            label="Enter password"
            type="password"
            fullWidth
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              mb: 2,
              input: { color: 'var(--text)' },
              label: { color: 'var(--text)' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'var(--text)' },
              },
            }}
          ></TextField>

          <TextField
            label="Confirm password"
            type="password"
            fullWidth
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{
              mb: 2,
              input: { color: 'var(--text)' },
              label: { color: 'var(--text)' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'var(--text)' },
              },
            }}
          ></TextField>

          <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ py: 1.5 }}>
            {loading ? 'Creating account....' : 'Sign Up'}
          </Button>
        </form>
        <p className="signup-footer">
          Already have an account?
          <Link to="/login" className="login-link">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
