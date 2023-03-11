import {useState, useEffect} from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router';
import Error from 'next/error';
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import ArtworkCard from '@/components/ArtworkCard';
import {Pagination, Accordion} from 'react-bootstrap'

const PER_PAGE = 12

export default function Artwork()
{
    const [page, setPage] = useState(1)
    const [artworkList, setArtworkList] = useState([])

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    function previousPage()
    {
        if (page > 1)
        {
            setPage(page => page - 1)
        }
    }

    function nextPage()
    {
        setPage(page => page + 1)
    }

    useEffect(() => {
        if (data) {
          var results = []
          for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
            const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
            results.push(chunk);
          }
          
          setArtworkList(results);          
        }
        else {
          console.log("Error")
        }
      }, [data]);
      

    if (error)
    {
        return <Error statusCode={404} />
    }

    if (artworkList)
    {
        return (
            <>

                <Row className="gy-4">
                {artworkList.length > 0 && artworkList[page-1].map((artwork) => (
                    <Col lg={4} key={artwork}><ArtworkCard objectID={artwork}/></Col>
                ))}
                {artworkList.length == 0 && (
                    <Card>
                        <Card.Title>
                            <h4>Nothing Here.</h4>
                        </Card.Title>
                    </Card>
                )}
                </Row>

                {artworkList.length > 0 && (
                    <Row>
                        <Col>
                            <Pagination>
                                <Pagination.Prev onClick={previousPage}></Pagination.Prev>
                                <Pagination.Item>{page}</Pagination.Item>
                                <Pagination.Next onClick={nextPage}></Pagination.Next>
                            </Pagination>
                        </Col>
                    </Row>
                )}
            </>
        )
    }
    else
    {
        return null;
    }
}