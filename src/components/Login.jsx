import React, { useState, useEffect } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Typography, Input, Button, Spin, Space } from 'antd';
import { login, register, reset, fetchUser } from "../features/userSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "./Login.css"

const Login = () => {
    const [reg, setReg] = useState(true)
    const [log, setLog] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        nin: '',
    })

    const { name, email, password, nin } = formData
    const { Title } = Typography;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.user
    )
    const onchange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const regBtn = () => {
        setReg(true)
        setLog(false)
    }

    const logBtn = () => {
        setReg(false)
        setLog(true)
    }


    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name,
            email,
            password,
            nin,
        }
        dispatch(register(userData))
        dispatch(fetchUser());

    }
    const onSubmitLogin = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
        dispatch(fetchUser());

    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/vote')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])
    if (isLoading) {
        return (
            <>
                <Space size="middle">

                    <Spin size="large" />
                </Space>,
            </>
        );
    }
    return (
        <div>
            <small style={{
                color: 'red'
            }}>Disclaimer do not put your real NIN number , put any random 11 digits.</small>
            <Title>Register / Login</Title>

            <Button onClick={regBtn}>Register</Button> || <Button onClick={logBtn}>Login</Button>
            <form className='form'>
                <Input style={{
                    width: '300px',
                    display: log ? 'none' : 'flex'
                }} size="large" placeholder="full name"
                    className='input'
                    prefix={<UserOutlined />}
                    onChange={onchange} id='name'
                    name='name' />

                <Input
                    style={{
                        width: '300px',
                        display: log ? 'none' : 'flex'
                    }} size="large" placeholder="enter nin" prefix={<UserOutlined />} onChange={onchange} id='nin'
                    name='nin' />


                <Input style={{
                    width: '300px',
                }} size="large"
                    className='input'
                    placeholder="email" prefix={<UserOutlined />} onChange={onchange} id='email'
                    name='email' />

                <Input style={{
                    width: '300px',
                }} size="large"
                    className='input'
                    placeholder="password" prefix={<UserOutlined />} onChange={onchange} id='password'
                    name='password' />
            </form>
            {reg ?

                <Button type="primary" danger style={{
                    marginLeft: '30px'
                }} onClick={onSubmit}>Register</Button> : null}
            {log ?
                <Button type="primary" style={{
                    marginLeft: '30px'
                }} onClick={onSubmitLogin}>Login</Button> : null}
        </div>
    )
}

export default Login
