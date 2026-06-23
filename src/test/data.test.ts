import { describe, it, expect } from 'vitest';
import { SERVICE_AREAS, ACADEMY_COURSES, TESTIMONIALS } from '../data';

describe('data', () => {
  it('exports service areas', () => {
    expect(SERVICE_AREAS).toBeInstanceOf(Array);
    expect(SERVICE_AREAS.length).toBeGreaterThan(0);
  });

  it('exports academy courses', () => {
    expect(ACADEMY_COURSES).toBeInstanceOf(Array);
    expect(ACADEMY_COURSES.length).toBeGreaterThan(0);
  });

  it('exports testimonials', () => {
    expect(TESTIMONIALS).toBeInstanceOf(Array);
    expect(TESTIMONIALS.length).toBeGreaterThan(0);
  });
});
