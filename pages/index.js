
/*************************************************************************
* BTI425 – Assignment 6
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Hayat Khan | Student ID: 124774209 | Date: April 8 2023
*
* Vercel app (deployed) Link: https://bti-425-a4-g1nl.vercel.app
*
*************************************************************************/ 

import Card from "react-bootstrap/Card"

export default function Home() {
  return (
    <>
      <Card>
          <Card.Img src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"/><br/>
          <Card.Text>This is the Metro Museum of Art, the most visited art museum in the western hemisphere. I don&apos;t know
            why I have to show this specifically, but you can read more about it <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">here.</a>

          </Card.Text>
          <br/>
      </Card>
    </>
  )
}
