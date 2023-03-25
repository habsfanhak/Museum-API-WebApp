import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { useRouter } from 'next/router';
import { Card } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import styles from '@/styles/History.module.css';
import Button from "react-bootstrap/Button";

export default function History()
{
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter()

    let parsedHistory = [];

    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });

    function historyClicked(e, index)
    {
        console.log(index)
        console.log(searchHistory[index])
        router.push(searchHistory[index])
    }

    function removeHistoryClicked(e, index)
    {
        e.stopPropagation(); // stop the event from trigging other events
        setSearchHistory(current => {
            let x = [...current];
            x.splice(index, 1)
            return x;
        });
    }

    return (
        <>
            {parsedHistory.length == 0 && (
                <Card>
                    <Card.Title>
                        <h4>Nothing Here.</h4>
                    </Card.Title>
                </Card>
            )}
            {parsedHistory.length > 0 && parsedHistory.map((historyItem, index) => (
                <ListGroup key={index}>
                    <ListGroup.Item key={index} onClick={e => historyClicked(e, index)} className={styles.historyListItem}>
                        {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                        <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                    </ListGroup.Item>
                </ListGroup>
            ))}
        </>
    )


}