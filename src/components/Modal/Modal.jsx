import { createPortal } from "react-dom";
import { BackDrop, Mod } from 'components/Modal/Modal.styled';
import { useEffect } from "react";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root')
const body = document.querySelector('body');

export function Modal({onToggle, img, tag })  {

    useEffect(() => {
      window.addEventListener('keydown', onKeyDown);
      body.classList.add('hidden-scroll');

      return () => {
        window.removeEventListener('keydown', onKeyDown);
        body.classList.remove('hidden-scroll');
      };
    }, [onToggle]);
    

      const onKeyDown = (e) => {
        if (e.code === 'Escape') {
          onToggle();
        }
  }
  
      const onClickBackDrop = (e) => {
        if (e.target === e.currentTarget) {
            onToggle();
        }
      }

    
        
        return createPortal(
          <BackDrop onClick={onClickBackDrop}>
            <Mod>
              <img src={img} alt={tag} />
            </Mod>
          </BackDrop>,
          modalRoot
        );
    
    
}


Modal.propTypes = {
  tag: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};
