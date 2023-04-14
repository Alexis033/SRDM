import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

/**
Creates a static modal with a title, content, and optional action button.
param {string} title - The title of the modal.
param {string} content - The content of the modal.
param {function} action - The function to be executed when the action button is clicked.
param {boolean} show - A boolean indicating whether the modal should be shown or not.
param {function} handleClose - The function to be executed when the modal is closed.
*/
export const ModalStatic = ({ title, content, action, show, handleClose }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          {action && (
            <Button variant='primary' onClick={action}>
              Acept
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}
