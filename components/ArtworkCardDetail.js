import useSWR from 'swr'
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Link from 'next/link'
import Button from 'react-bootstrap/Button';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import {useState, useEffect} from 'react'
import { addToFavourites, removeFromFavourites } from '@/lib/userData';


export default function ArtworkCardDetail(props)
{
    //const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);
    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [showAdded, setShowAdded] = useState(false)

    useEffect(()=>{
        setShowAdded(favouritesList?.includes(props.objectID))
    }, [favouritesList])
    

    async function favouritesClicked()
    {
        if (showAdded == true)
        {
            //setFavouritesList(current => current.filter(fav => fav != props.objectID));
            setFavouritesList(await removeFromFavourites(props.objectID)) 
            setShowAdded(false)
        }
        else
        {
            //setFavouritesList(current => [...current, props.objectID]);
            setFavouritesList(await addToFavourites(props.objectID)) 
            setShowAdded(true)
        }
    }

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
                        <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>
                            {showAdded ? "+ Favourite Added" : "+ Favourite"}
                        </Button>
                        <br />
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