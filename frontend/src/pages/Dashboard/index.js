import React, {useEffect, useState} from 'react';
import { Container, Button, ButtonGroup, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import api from '../../services/api'
import moment from 'moment'
import './dashboard.css'

export default function Dashboard(){
    const [events, setEvents] = useState([])
    const user_id = localStorage.getItem('user')
    const [cSelected, setCSelected] = useState([])
    const [rSelected, setRSelected] = useState(null)

    useEffect(()=>{
        getEvents()
    }, [])

    const filterHandler = (query) => {
        setRSelected(query)
        getEvents(query)
    }

    const getEvents = async (filter) => {
        const url = filter ? `/dashboard/${filter}` : '/dashboard'
        const response = await api.get(url, {headers: {user_id}})
        


        setEvents(response.data)
    }

    return(
        <>
            <div>Filter: 
                <ButtonGroup>
                    <Button color="primary" onClick={() => filterHandler(null)} active={rSelected == null}> All Sports </Button>
                    <Button color="primary" onClick={() => filterHandler("running")} active={rSelected == "running"}> Running </Button>
                    <Button color="primary" onClick={() => filterHandler("cycling")} active={rSelected == "cycling"}> Cycling </Button>
                    <Button color="primary" onClick={() => filterHandler("swimming")} active={rSelected == "swimming"}> Swimming </Button>
                </ButtonGroup>
            </div>
            
            <ul className="events-list">
                {events.map(event => (
                    <li key={event._id}>
                        <header style={{backgroundImage: `url(${event.thumbnail_url})`}} />
                        <strong>{event.title}</strong>
                        <span>Event date: {moment(event.date).format("l")}</span>
                        <span>Event price: £{parseFloat(event.price).toFixed(2)}</span>
                        <span>Event description: {event.description}</span>
                        <Button color="primary">Subscribe</Button>
                    </li>    
                ))}
            </ul>
        </>
    )
}