import useSWR from 'swr'
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';

export default function ArtworkCard(props)
{

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);

    if (error)
    {
        return <Error statusCode={404} />
    }
    else if (data)
    {
        console.log(data.primaryImageSmall)
        if (!data.primaryImageSmall)
        {
            data.primaryImageSmall = "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        }
        if (!data.objectDate)
        {
            data.objectDate = "N/A"
        }
        if (!data.classification)
        {
            data.classification = "N/A"
        }
        return (
            <>
                <Card>
                    <Card.Img src={data.primaryImageSmall}/>
                    <br/><Card.Title style={{paddingLeft: '20px' }}>{data.title}</Card.Title>
                    <Card.Text style={{ paddingLeft: '20px' }}>
                        <br/><strong>Date: </strong> {data.objectDate} <br/>
                        <strong>Classification: </strong>{data.classification} <br/>
                        <strong>Medium: </strong>{data.medium}<br/>
                    </Card.Text>
                    <Link style={{ paddingLeft: '20px' }} href={`/artwork/${props.objectID}`} passHref><Button variant="primary">ID: {props.objectID}</Button></Link> <br/>
                </Card>
            </>
        )
    }
    else
    {
        return null
    }
}