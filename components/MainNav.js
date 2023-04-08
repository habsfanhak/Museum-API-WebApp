import Nav from 'react-bootstrap/Nav';
import {useState, useEffect} from 'react'
import { Form } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { addToHistory } from '@/lib/userData';
import { removeToken, readToken } from '@/lib/authenticate';

export default function MainNav()
{
    const [isExpanded, setExpanded] = useState(false)
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    let token = readToken()
    const router = useRouter()
    const { register, handleSubmit } = useForm({
        defaultValues: {
          searchField: '',
        },
      });

    async function submitForm(data)
    {
        let queryString = `/artwork?title=true&q=${data.searchField}`
        router.push(queryString)
        setSearchHistory(await addToHistory(`title=true&q=${data.searchField}`)) 
        setExpanded(false)
    }

    function inverseExpanded()
    {
        setExpanded(!isExpanded)
    }

    function logout()
    {
        console.log("called")
        setExpanded(false)
        removeToken()
        router.push("/login")
    }


    return (
        <>
            <Navbar bg="light" className="fixed-top" expand="lg" expanded={isExpanded}>
                <Navbar.Brand className="px-4">Hayat Khan</Navbar.Brand>
                <Link href="/" passHref legacyBehavior>
                    <Nav.Link active={router.pathname === "/"} activeClassName="active-link">Home</Nav.Link>
                </Link>
                {token && <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} className="px-4">Advanced Search</Nav.Link></Link>}
                <Navbar.Toggle aria-controls="navbar-nav" onClick={inverseExpanded}/>
                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    {token && <Form onSubmit={handleSubmit(submitForm)} display="flex">
                        <InputGroup>
                            <Form.Control {...register('searchField')} />
                            <Button variant="primary" type="submit">Submit</Button>
                        </InputGroup>
                    </Form> }
                    {token && <Nav>
                        <NavDropdown title={token.userName} id="basic-nav-dropdown">
                            <Link href="/favourites" passHref legacyBehavior><NavDropdown.Item active={router.pathname === "/favourites"} onClick={inverseExpanded}>Favourites</NavDropdown.Item></Link>
                            <Link href="/history" passHref legacyBehavior><NavDropdown.Item active={router.pathname === "/history"} onClick={inverseExpanded}>Search History</NavDropdown.Item></Link>
                            <NavDropdown.Item  onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav> }
                    {!token && <Nav>
                        <Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === "/register"} className="px-4">Register</Nav.Link></Link>
                        <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"} className="px-4">Login</Nav.Link></Link>
                        
                        </Nav>}
                </Navbar.Collapse>
            </Navbar>
        <br />
        <br />
        </>
    )
}