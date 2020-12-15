import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handlerKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerKeyDown);
  }

  handlerKeyDown = ({ code }) => {
    if (code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  onOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.onOverlayClick}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
