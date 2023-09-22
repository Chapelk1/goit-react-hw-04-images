import { useState, useEffect } from 'react';
import {Searchbar} from 'components/Searchbar/Searchbar'
import {ImageGallery} from 'components/ImageGallery/ImageGallery'
import { requestToTheServer } from 'api-pixabay';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Container } from 'components/ImageGallery/ImageGalery.styled';

export function App() {
  const [request, setRequest] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [firstDownload, setFirstDownload] = useState(true);

  useEffect(() => {
    if (firstDownload) {
      setFirstDownload(false);
      return;
    }
    setLoader(true);
    setVisibleBtn(false);

    
    requestToTheServer(request, page).then(({ hits, totalHits }) => {
        if (page === 1) {
          if (totalHits === 0) {
            setTimeout(() => {
              alert('Sorry, no content found!');
            }, 1000);
            setLoader(false);
            setVisibleBtn(false);
            setImages([...hits]);
            return;
          }
          setImages([...hits]);

          if (hits.length === totalHits) {
            setLoader(false);
            setVisibleBtn(false);
            setTimeout(() => {
              alert('Last page loaded.');
            }, 1000);
          } else {
            setLoader(false);
            setVisibleBtn(true);
            addTotalValue(totalHits);
          }
          return;
      }
      if (page !== 1) {
        setImages(state => [...state, ...hits]);

        if (total === page) {
          setLoader(false);
          setVisibleBtn(false);
          setTimeout(() => {
            alert('Last page loaded.');
          }, 1000);
        } else {
          setLoader(false);
          setVisibleBtn(true);
        }
      }
      }); 
  }, [request, page]);

  function addTotalValue(value) {
    const result = Math.round(value / 12);
    setTotal(result);
    return;
  }
  
  const submitForm = state => {
    const request = state.trim();
    if (request !== '') {
      setRequest(state);
      setPage(1);
    }
  };
  const loadNewImages = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={submitForm} />
      <Container>
        <ImageGallery images={images} />
        {visibleBtn && <Button onClick={loadNewImages} />}
        {loader && <Loader />}
      </Container>
    </>
  );
}