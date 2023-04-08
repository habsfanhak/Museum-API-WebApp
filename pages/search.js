import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { addToHistory } from '@/lib/userData';

export default function Search()
{
    const router = useRouter()
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const { register, handleSubmit } = useForm({
        defaultValues: {
            q: '',
            searchBy: "title",   
            geolocation: '',
            medium: '',
            isHighlight: false,
            isOnView: false
          },
      });

    async function submitForm(data)
    {

        var queryString = `artwork?${data.searchBy}=true`

        if (data.geolocation)
        {
            queryString += `&geolocation=${data.geolocation}`
        }

        if (data.medium)
        {
            queryString += `&medium=${data.medium}`
        }

        queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`
        setSearchHistory(await addToHistory(queryString)) 
        
        router.push(queryString)
        
    }

    return <>
        <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control type="text" placeholder="" name="q" {...register('q')} required/>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                <Form.Label>Search By</Form.Label>
                <Form.Select name="searchBy" className="mb-3" {...register('searchBy')}>
                    <option value="title">Title</option>
                    <option value="tags">Tags</option>
                    <option value="artistOrCulture">Artist or Culture</option>
                </Form.Select>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Geo Location</Form.Label>
                    <Form.Control type="text" placeholder="" name="geoLocation" {...register('geolocation')}/>
                    <Form.Text className="text-muted">
                    Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Medium</Form.Label>
                    <Form.Control type="text" placeholder="" name="medium" {...register('medium')}/>
                    <Form.Text className="text-muted">
                    Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Check {...register('isHighlight')}
                    type="checkbox"
                    label="Highlighted"
                    name="isHighlight"
                />
                <Form.Check {...register('isOnView')}
                    type="checkbox"
                    label="Currently on View"
                    name="isOnView"
                />
                </Col>
            </Row>
            <Row>
                <Col>
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Col>
            </Row>
            </Form>
    </>
}