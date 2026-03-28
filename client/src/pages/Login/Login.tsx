import './Login.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { type LoginForm } from '../../types/user.types'
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { loginUser } from '../../services/auth.service'
import { setUser } from '../../redux/auth/authSlice'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'

const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is rrequired'),
})

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true)
      setError(null)

      const user = await loginUser(data.email, data.password)
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
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome back</h1>
          <p className="login-sub">Log in to your Thread~Nova account</p>
        </div>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <TextField
            label="Email address"
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
                '& fieldset': { borderColor: 'var(--neutral)' },
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
              mb: 3,
              input: { color: 'var(--text)' },
              label: { color: 'var(--text)' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'var(--text)' },
              },
            }}
          ></TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ py: 1.5, fontSize: 13 }}
          >
            {loading ? 'Loging In...' : 'Log in'}
          </Button>
        </form>
        <p className="login-footer">
          Don't have an account?{' '}
          <Link to="/signup" className="signup-link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
