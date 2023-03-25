import { favouritesAtom } from "@/store";
import {useState, useEffect} from 'react'
import { useAtom } from "jotai";
import { Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import { Pagination } from "react-bootstrap";
import Col from 'react-bootstrap/Col'

export default function Favourites()
{
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)

    if (favouritesList)
    {
        return (
            <>

                <Row className="gy-4">
                {favouritesList.length > 0 && favouritesList.map((artwork) => (
                    <Col lg={4} key={artwork}><ArtworkCard objectID={artwork}/></Col>
                ))}
                {favouritesList.length == 0 && (
                    <Card>
                        <Card.Title>
                            <h4>Nothing Here.</h4>
                        </Card.Title>
                    </Card>
                )}
                </Row>
            </>
        )
    }
    else
    {
        return null;
    }
}