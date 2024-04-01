'use client'
import { NoUserExist, UserNotActivated, UserNotVerified, invalidUsernameOrPassword } from '@/lib/constants'
import { LogIn, X } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

const SignIn = () => {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<String>('');
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await signIn('credentials', { username, password, redirect: false })
    setIsLoading(false)
    if (response?.status === 200) {
      router.replace('/profile')
    } else if (invalidUsernameOrPassword.indexOf(response?.error || '') >= 0) {
      setError('Invalid Username or Password')
    } else if (NoUserExist.indexOf(response?.error || '') >= 0) {
      setError('User does not exist. Please register first.')
    } else if (response?.error === UserNotActivated) {
      setError('Please wait our email to allow login using your account.')
    } else if (response?.error === UserNotVerified) {
      setError('Please check your email to verify email address.')
    } console.log(response?.error)
  }

  return (
    <>
      <form onSubmit={e => handleSignIn(e)}>
        <div className="grid place-content-center mt-32 bg-white pt-10 pb-10">
          <div className='flex flex-col w-96 items-center'>
            <span className='text-3xl font-bold'>Login</span>
            <span className='mt-5 w-20 h-1 bg-gradient-to-br from-orange-200 to-purple-600'></span>
            <span className='text-xs text-center mt-10 leading-5 font-medium'>
              Welcome back! Login to access the Agne Store.
              <br />
              Did you <Link href="/api/auth/forgot" className='text-pink-500'>
                Forgot your Password?</Link>
              <br />
              Or <Link href="/api/auth/signUp" className='text-purple-600'>
                Need an account?</Link>
            </span>
            <div className="form-control w-full max-w-xs mt-10 border-b-2">
              <input type="text" placeholder="Email Address" name='username'
                className="w-full max-w-xs focus:outline-none h-10"
                onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="form-control w-full max-w-xs mt-10 border-b-2">
              <input type="password" placeholder="Password" name='password'
                className="w-full max-w-xs focus:outline-none"
                onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="form-control w-full max-w-xs mt-10">
              <button className={
                isLoading ?
                  'btn' :
                  'btn bg-gradient-to-br from-pink-400 to-purple-600 text-white'
              } type='submit' disabled={isLoading}>
                {
                  isLoading ?
                    <>
                      <span className="loading loading-spinner"></span>
                      Loading...
                    </>
                    :
                    <>
                      <LogIn />Login
                    </>
                }
              </button>
            </div>
          </div>
        </div>
      </form>
      {
        error !== '' &&
        <div className="toast toast-center toast-top">
          <div className="alert alert-warning pl-10 cursor-pointer" onClick={() => setError('')}>
            {error} <X />
          </div>
        </div>
      }</>
  )
}

export default SignIn