import { Container, Row, Col, Card } from 'react-bootstrap';

const images = [
  { src: '/images/sangam-art-4.jpg', title: 'Bharatanatyam', desc: 'Classical Tamil Dance' },
  { src: '/images/sangam-art-3.jpg', title: 'Temple', desc: 'Ancient Tamil Temple' },
  { src: '/images/sangam-art-1.jpg', title: 'Tanjore sculptures', desc: 'Showcase of Royalty' },
];

const Gallery = () => {
  return (
    <section id="about" className="gallery-section py-5">
      <Container>
        <h2 className="text-center mb-5">Explore the 64 Kalai</h2>
        <Row>
          {images.map((img, idx) => (
            <Col md={4} key={idx} className="mb-4">
              <Card className="gallery-card shadow-sm">
                <Card.Img variant="top" src={img.src} />
                <Card.Body className="text-center">
                  <Card.Title>{img.title}</Card.Title>
                  <Card.Text>{img.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Gallery;
