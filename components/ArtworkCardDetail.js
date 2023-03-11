import useSWR from 'swr'
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';

export default function ArtworkCardDetail(props)
{

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);

    if (error)
    {
        return <Error statusCode={404} />
    }
    else if (data)
    {
        if (!data.objectDate)
        {
            data.objectDate = "N/A"
        }
        if (!data.classification)
        {
            data.classification = "N/A"
        }
        if (!data.artistDisplayName)
        {
            data.artistDisplayName = "N/A"
        }
        if (!data.creditLine)
        {
            data.creditLine = "N/A"
        }
        if (!data.dimensions)
        {
            data.dimensions = "N/A"
        }
        


        if (data.primaryImage)
        {
            return (
                <>
                    <Card>
                        <Card.Img src={data.primaryImage}/>
                        <br/><Card.Title style={{paddingLeft: '20px' }}>{data.title}</Card.Title>
                        <Card.Text style={{ paddingLeft: '20px' }}>
                            <br/><strong>Date: </strong> {data.objectDate} <br/>
                            <strong>Classification: </strong>{data.classification} <br/>
                            <strong>Medium: </strong>{data.medium}<br/><br/>
                            <strong>Artist Name: </strong>{data.artistDisplayName}<br/>
                            <strong>Credit Line: </strong>{data.creditLine}<br/>
                            <strong>Dimensions: </strong>{data.dimensions}<br/>
                        </Card.Text>
                        <Link style={{paddingLeft: '20px' }} href={`/artwork/${props.objectID}`} passHref><Button variant="primary">ID: {props.objectID}</Button></Link> <br/>
                    </Card>
                </>
            )
        }
        else
        {
            return (
                <>
                    <Card>
                        <br/><Card.Title style={{paddingLeft: '20px' }}>{data.title}</Card.Title>
                        <Card.Text style={{ paddingLeft: '20px' }}>
                            <br/><strong>Date: </strong> {data.objectDate} <br/>
                            <strong>Classification: </strong>{data.classification} <br/>
                            <strong>Medium: </strong>{data.medium}<br/><br/>
                            <strong>Artist Name: </strong>{data.artistDisplayName}<br/>
                            <strong>Credit Line: </strong>{data.creditLine}<br/>
                            <strong>Dimensions: </strong>{data.dimensions}<br/>
                        </Card.Text>
                        <Link style={{paddingLeft: '20px' }} href={`/artwork/${props.objectID}`} passHref><Button variant="primary">ID: {props.objectID}</Button></Link>
                    </Card>
                </>
            )
        }
    }
    else
    {
        return null
    }
}