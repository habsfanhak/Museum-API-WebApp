import Nav from 'react-bootstrap/Nav';
import {useState, useEffect} from 'react'
import { Form } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

export default function MainNav()
{
    const [isExpanded, setExpanded] = useState(false)
    const router = useRouter()
    const { register, handleSubmit } = useForm({
        defaultValues: {
          searchField: '',
        },
      });

    function submitForm(data)
    {
        router.push(`/artwork?title=true&q=${data.searchField}`)
        setExpanded(false)
    }

    function inverseExpanded()
    {
        setExpanded(!isExpanded)
    }


    return (
        <>
            <Navbar bg="light" className="fixed-top" expand="lg" expanded={isExpanded}>
                <Navbar.Brand className="px-4">Hayat Khan</Navbar.Brand>
                <Link href="/" passHref legacyBehavior><Nav.Link>Home</Nav.Link></Link>
                <Link href="/search" passHref legacyBehavior><Nav.Link className="px-4">Advanced Search</Nav.Link></Link>
                <Navbar.Toggle aria-controls="navbar-nav" onClick={inverseExpanded}/>
                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    <Form onSubmit={handleSubmit(submitForm)} display="flex">
                        <InputGroup>
                            <Form.Control {...register('searchField')} />
                            <Button variant="primary" type="submit">Submit</Button>
                        </InputGroup>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        <br />
        <br />
        </>
    )
}