import { useRef } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

/**
Generates a search bar component with a form that allows users to input a search query and submit it.
param {Function} handleSearch - The callback function that handles the search logic based on the user's input.
*/
export function SearchBar ({ handleSearch }) {
  const searchTextRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const searchText = searchTextRef.current.value
    handleSearch(searchText)
    searchTextRef.current.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          ref={searchTextRef}
          type='text'
          placeholder='Ingresa un correo'
        />
        <Button variant='outline-secondary' type='submit'>
          Search
        </Button>
      </InputGroup>
    </form>
  )
}
