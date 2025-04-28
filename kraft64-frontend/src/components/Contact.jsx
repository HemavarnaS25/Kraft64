import { Container, Form, Button } from 'react-bootstrap';

const Contact = () => {
  return (
    <section id="contact" className="contact-section py-5">
      <Container>
        <h2 className="text-center mb-4">Get in Touch</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Your Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Your Email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control as="textarea" rows={4} placeholder="Your Message" />
          </Form.Group>
          <Button variant="primary" type="submit">Send Message</Button>
        </Form>
      </Container>
    </section>
  );
};

export default Contact;
