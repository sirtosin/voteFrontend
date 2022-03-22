import React, { useState, useEffect } from 'react'
import { Typography, Input, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Vote.css'
import partyData from './partyData'
import VoteModal from './Modal';
import VoteCard from './Card';
import { logout } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Vote = () => {
    const user = useSelector((state) => state.user.user)
    const [loading, setLoading] = useState(false)
    const [isloading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [btn , setBtn] = useState(false)
    const [NIN, setNIN] = useState('')
    const [candidate, setCandidate] = useState('')
    const [party, setParty] = useState('')

    const { Title } = Typography;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const checkNIN = (e) => {
        setNIN(e.target.value)
        setBtn(false)
        setShow(false)
    }

    const handleCandidate = (value) => {
        console.log(`selected ${value}`);
        setCandidate(value)
    }

    const handleParty = (value) => {
        console.log(`selected ${value}`);
        setParty(value)
    }

    const onSearch = (val) => {
        console.log('search:', val);
    }

    const validate = () => {
        const checkNin = user && user.nin === NIN ? true : false
        console.log(checkNin)
        console.log(user)
        setIsLoading(true)
        setTimeout(() => {
            if (NIN.length !== 11 || NIN === '') {
                alert('Please enter a valid NIN')
                setIsLoading(false)
                setShow(false)
            }
            else if (checkNin) {

                setShow(prev => !prev)
                setIsLoading(prev => !prev)
                console.log('userProfile: ', user)
                setBtn(true)
            }
            else{
                setIsLoading(prev => !prev)
                alert('Please check your NIN')
            }
        
        }, 2000);
    }


    const voteNow = () => {
        if (candidate === '' || party === '') {
            alert('Please select a candidate and the corresponding party')
        }
        else if (user.hasVoted === true) {
            alert('You have already voted')
        }
        else {
            setIsLoading(true)
            setTimeout(() => {
                console.log(`you voted for ${candidate} in ${party}`)
                setIsLoading(false)
                setIsVisible(true)
                setShow(false)
                user.hasVoted = true
            }, 2000);
        }
    }


    const Logout = () => {
        dispatch(logout())
    }

    useEffect(() => {
        if (user === null) navigate('/')
    }, [user])

    useEffect(() => {
        setTimeout(() => {
            setLoading(prev => !prev)
            console.log('useEffect')
        }, 2000);
    }, [show])

    return (
        <div>
    
            <Title>Register your Vote</Title>

            <form>
                <Input style={{
                    width: '300px',
                }} size="large" placeholder="enter your NIN" prefix={<UserOutlined />} onChange={checkNIN}  />
                <br />
                <br />
                <Button type="primary" onClick={validate} disabled={btn} >{isloading ? <>checking...</> : <p>Check NIN</p>}</Button>
                <Button type="primary" style={{
                    marginLeft: '30px'
                }} onClick={Logout}  >logout</Button>

            </form>

            {show ? (<section>
                <VoteCard user={user} partyData={partyData}
                handleCandidate={handleCandidate}
                    handleParty={handleParty}
                    onSearch={onSearch}
                voteNow={voteNow} loading={loading} isloading={isloading} />
                
            </section>) : null}
            {isVisible ? < VoteModal candidate={candidate} party={party} /> : null}
        </div>

    )
}

export default Vote
