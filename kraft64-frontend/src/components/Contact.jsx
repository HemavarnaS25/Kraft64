import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzuvAbR6Z2IxvsdIrC8drJhVTndUSZquN9qb0899zMl4KAAreWaYUd66JWexovVRSPc/exec';

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      if (result.result === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error!', error.message);
      setStatus('error');
    }
  };
  return (
    <section id="contact" className="contact-section py-5">
      <Container>
        <h2 className="text-center mb-4">Get in Touch</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Send Message</Button>
          {status === 'success' && <Alert variant="success" className="mt-3">Message Sent Successfully!</Alert>}
          {status === 'error' && <Alert variant="danger" className="mt-3">Something went wrong. Please try again!</Alert>}
        </Form>
      </Container>
    </section>
  );
};

export default Contact;