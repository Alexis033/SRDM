import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, afterEach } from 'vitest'
import { Footer } from '../components/Footer'

describe('Footer', () => {
  afterEach(cleanup)

  it('should render name', () => {
    render(<Footer />)

    screen.getByRole('link', { name: 'Maikcol Guevara' })
  })
})
