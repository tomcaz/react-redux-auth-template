'use client'
import ValidatedError from '@/components/validated-error'
import { isNotEmailAddress, isEmpty, isLessThan, isLengthOutOfRange, isNotValidPassword, isNotEqual, isNotPostalCode } from '@/lib/validator'
import { LogIn, MapPin } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'

const contactUs = 'Unable to create your account. Please contact to us';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [error, setError] = useState<String[]>([])
    const [showError, setShowError] = useState(false)
    const [saved, setSaved] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        if (error.length === 1 && error[0] === contactUs) {
            setShowError(false)
            setError([])
        }
        if (error.length === 0) {
            const data = {
                username: username.toLowerCase(), fullName, password, address, postalCode, country: 'Canada'
            }
            setLoading(true)
            const response = await fetch("/profile/create", {
                method: "POST",
                body: JSON.stringify(data),
            });
            setLoading(false)
            if (response.status === 200) {
                setSaved(true)
            } else {
                setError([contactUs]);
                setShowError(true)
            }
        } else {
            setShowError(true)
        }
    }

    return (
        <form onSubmit={e => handleSignUp(e)}>
            <div className={`place-content-center mt-32 pt-10 pb-10 ${!saved && 'bg-white'}`}>
                <div className='flex flex-col w-full items-center'>
                    <span className='text-3xl font-bold'>Register</span>
                    <span className='mt-5 w-40 h-1 bg-gradient-to-br from-orange-200 to-purple-600'></span>
                    {
                        saved ?
                            <div className='shadow p-20 w-full max-w-md mt-20 rounded-lg bg-white'>
                                User account has been created. Please check your email to verify your email address.
                                Once it is done, we will email you again when you can use your account. Thanks again.</div>
                            :
                            <>


                                <span className='text-xs text-center mt-10 leading-5 font-medium'>
                                    Returning Member? <Link href="/api/auth/signIn" className='text-purple-600'>
                                        Login</Link>
                                </span>
                                <div className='flex items-end flex-col w-full max-w-lg'>
                                    <div className='flex items-center w-auto h-20'>
                                        <label className='font-bold pr-16'>Name:</label>
                                        <div className="flex-initial w-64 flex flex-col">
                                            <input type="text" placeholder="Just Name" name='fullname'
                                                className="focus:outline-none h-10 border-b-2" maxLength={66}
                                                onChange={e => setFullName(e.target.value)} />
                                            <ValidatedError {...{
                                                error,
                                                setError,
                                                validations: [
                                                    {
                                                        fun: isEmpty,
                                                    },
                                                    {
                                                        fun: isLengthOutOfRange,
                                                        parameters: [3, 66]
                                                    }
                                                ],
                                                elementLabel: "Name",
                                                valueToValidate: fullName,
                                                showError
                                            }} />
                                        </div>
                                    </div>
                                    <div className="flex items-center w-auto h-20">
                                        <label className='font-bold pr-16'>User Name:</label>
                                        <div className="flex-initial w-64 flex flex-col">
                                            <input type="email" placeholder="someone@gmail.com" name='username'
                                                className="focus:outline-none h-10 border-b-2" maxLength={66}
                                                onChange={e => setUsername(e.target.value)} />
                                            <ValidatedError {...{
                                                error,
                                                setError,
                                                validations: [
                                                    {
                                                        fun: isNotEmailAddress
                                                    }
                                                ],
                                                elementLabel: "User Name",
                                                valueToValidate: username,
                                                showError
                                            }} />
                                        </div>
                                    </div>
                                    <div className="flex items-center w-auto h-24">
                                        <label className='font-bold pr-16'>Password:</label>
                                        <div className="flex-initial w-64 flex flex-col">
                                            <input type="password" placeholder="Password" name='password'
                                                className="focus:outline-none h-10 border-b-2"
                                                onChange={e => setPassword(e.target.value)} />
                                            <ValidatedError {...{
                                                error,
                                                setError,
                                                validations: [
                                                    {
                                                        fun: isNotValidPassword
                                                    }
                                                ],
                                                elementLabel: "Password",
                                                valueToValidate: password,
                                                showError
                                            }} />
                                        </div>
                                    </div>
                                    <div className="flex items-center w-auto h-20">
                                        <label className='font-bold pr-16'>Confirm Password:</label>
                                        <div className="flex-initial w-64 flex flex-col">
                                            <input type="password" placeholder="Confirm Password" name='confirmPassword'
                                                className="focus:outline-none h-10 border-b-2"
                                                onChange={e => setConfirmPassword(e.target.value)} />
                                            <ValidatedError {...{
                                                error,
                                                setError,
                                                validations: [
                                                    {
                                                        fun: isNotEqual,
                                                        parameters: [password],
                                                        secondLabel: 'Password'

                                                    }
                                                ],
                                                elementLabel: "Confirm Password",
                                                valueToValidate: confirmPassword,
                                                showError,
                                                secondValue: password
                                            }} />
                                        </div>
                                    </div>
                                    <div className="flex items-center w-auto h-20">
                                        <label className='font-bold pr-16'>Home Address for Delivery:</label>
                                        <div className="flex-initial w-64 flex flex-col">
                                            <input type="text" placeholder="Address for your deliver" name='address'
                                                className="focus:outline-none h-10 border-b-2"
                                                onChange={e => setAddress(e.target.value)} />
                                            <ValidatedError {...{
                                                error,
                                                setError,
                                                validations: [
                                                    {
                                                        fun: isEmpty,
                                                    }
                                                ],
                                                elementLabel: "Home Addres",
                                                valueToValidate: address,
                                                showError
                                            }} />
                                        </div>
                                    </div>
                                    <div className="flex items-center w-auto h-20">
                                        <label className='font-bold pr-16'>Postal Code:</label>
                                        <div className="flex-initial w-64 flex flex-col">
                                            <input type="text" placeholder="V1L2E3" name='postalCode'
                                                className="focus:outline-none h-10 border-b-2" maxLength={7}
                                                onChange={e => setPostalCode(e.target.value)} />
                                            <ValidatedError {...{
                                                error,
                                                setError,
                                                validations: [
                                                    {
                                                        fun: isNotPostalCode,
                                                    }
                                                ],
                                                elementLabel: "Postal Code",
                                                valueToValidate: postalCode,
                                                showError
                                            }} />
                                        </div>
                                    </div>
                                    <div className="form-control w-full max-w-lg mt-10">
                                        <button
                                            className={isLoading ? 'btn' : 'btn bg-gradient-to-br from-pink-400 to-purple-600 text-white'}
                                            disabled={isLoading}
                                            type='submit'>
                                            {isLoading ?
                                                <>
                                                    <span className="loading loading-spinner"></span>
                                                    Creating...</>
                                                :
                                                <><LogIn />Login</>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
            {
                !isEmpty(error) &&
                <div className="toast toast-center toast-top">
                    <div className="alert alert-warning pl-10">
                        <ul style={{ "listStyleType": "circle" }}>
                            {
                                error.map(e =>
                                (
                                    <li>{e}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            }
        </form>
    )
}

export default SignIn