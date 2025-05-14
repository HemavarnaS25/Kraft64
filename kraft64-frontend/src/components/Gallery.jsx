import { Container, Row, Col, Card } from 'react-bootstrap';

const images = [
  { src: '/images/sangam-art-4.jpg', title: 'Bharatanatyam', desc: 'Classical Tamil Dance' },
  { src: '/images/sangam-art-3.jpg', title: 'Temple', desc: 'Ancient Tamil Temple' },
  { src: '/images/sangam-art-1.jpg', title: 'Mahabalipuram sculptures', desc: 'Showcase of Single Stone work' },
  { src: 'https://i.pinimg.com/736x/60/33/93/603393c1a9ce398d819a658cc7e4e68a.jpg', title: 'Tanjore Paintings', desc: 'Showcase of Royalty' },
  { src: 'https://media-cdn.tripadvisor.com/media/photo-s/03/7f/6f/f1/aayiram-kaal-mandapam.jpg', title: 'Aayiram Kaal Mandapam', desc: 'architectural brilliance of the Tamil civilization' },
  { src: 'https://as2.ftcdn.net/v2/jpg/05/58/64/17/1000_F_558641735_r64vTIWibgjdz1CGMWssVo11jU8DaLvI.jpg', title: 'Tanjore sculptures', desc: 'Showcase of Royalty' },
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