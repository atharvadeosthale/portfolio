export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Path under /public, e.g. "/testimonials/jane.jpg" */
  avatar?: string;
}

// The testimonials section on the home page stays hidden until this has entries.
export const testimonials: Testimonial[] = [];
