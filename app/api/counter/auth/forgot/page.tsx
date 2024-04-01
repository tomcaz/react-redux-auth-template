'use client'
import { X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

const SignIn = () => {
  const router = useRouter()
  const [username, setUsername] = useState('');
  const [error, setError] = useState<String>('');
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/profile/reset", {
      method: "POST",
      body: JSON.stringify({username}),
    });
    setIsLoading(false)
    if (response?.status === 200) {
      setError('You will be receiving an email to reset your password.')
    }
  }

  return (
    <>
      <form onSubmit={e => handleSignIn(e)}>
        <div className="grid place-content-center mt-32 bg-white pt-10 pb-10">
          <div className='flex flex-col w-96 items-center'>
            <span className='text-3xl font-bold'>Forgot Password</span>
            <span className='mt-5 w-20 h-1 bg-gradient-to-br from-orange-200 to-purple-600'></span>
            <span className='text-xs text-center mt-10 leading-5 font-medium'>
              Ohh !!! Did you remember it?<Link href="/api/auth/signIn" className='text-pink-500'>
                Login</Link>
              <br />
              Or <Link href="/api/auth/signUp" className='text-purple-600'>
                Need an account?</Link>
            </span>
            <div className="form-control w-full max-w-xs mt-10 border-b-2">
              <input type="text" placeholder="Email Address" name='username'
                className="w-full max-w-xs focus:outline-none h-10"
                onChange={e => setUsername(e.target.value)} />
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
                      Reset Password
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