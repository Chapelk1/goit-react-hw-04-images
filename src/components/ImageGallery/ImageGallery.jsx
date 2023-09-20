import {ImageGalleryItem} from 'components/ImageGalleryItem/ImageGalleryItem'
import { useState, useEffect } from 'react'
import { requestToTheServer } from 'api-pixabay';
import { Button } from 'components/Button/Button';
import {Loader} from 'components/Loader/Loader'
import { List, Container } from './ImageGalery.styled';
import PropTypes from 'prop-types';

export function ImageGallery({ request }) {
  const [images, setImages] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [firstDownload, setFirstDownload] = useState(true);


  useEffect(() => {
    if (firstDownload) {
      setFirstDownload(false);
      return;
    }
    setLoader(true);
    requestToTheServer(request, 1).then(({ hits, totalHits }) => {
      if (totalHits === 0) {
        setTimeout(() => {
          alert('Sorry, no content found!');
        }, 1000);
        setImages([...hits]);
        setLoader(false);
        setVisibleBtn(false)
        return;
      }
      setImages([...hits]);
      setTotal(hits.length);
      setTotalItems(totalHits);
      setPage(1);
      setLoader(false);
    });
    
  }, [request]);

  useEffect(() => {
    if (firstDownload) {
      setFirstDownload(false);
      return;
    }
    
    if (page !== 1) {
      setLoader(true);
      setVisibleBtn(false);

      requestToTheServer(request, page).then(({ hits, totalHits }) => {
        setImages(state => [...state, ...hits]);
        setTotal(state => state + hits.length);
      });
    }
  }, [page]);



  useEffect(() => {
    if (firstDownload) {
      setFirstDownload(false);
      return;
    }
    if (totalItems <= total) {
      setLoader(false);
      setVisibleBtn(false);
      setTimeout(()=>{alert('Last page loaded.')}, 1000)
    } else {
      setLoader(false);
      setVisibleBtn(true);
    }
  }, [total, totalItems]);



  const loadNewImages = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      {images && (
        <List>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              img={webformatURL}
              secondImg={largeImageURL}
              tag={tags}
            />
          ))}
        </List>
      )}
      {visibleBtn && <Button onClick={loadNewImages} />}
      {loader && <Loader />}
    </Container>
  );
}


// export class OldImageGallery extends Component {
//   state = {
//     images: null,
//     total: 0,
//     page: 1,
//     totalItems: 0,
//     visibleBtn: false,
//     loader: false,
//   };

//   componentDidUpdate = (prevProps, prevState) => {
//     const { request } = this.props;
//     const { page, total, totalItems } = this.state;
//     if (prevProps.request !== request) {
//       this.setState({
//         loader: true,
//       });
//       requestToTheServer(request, 1).then(({ hits, totalHits }) => {
//         if (totalHits === 0) {
//           alert('Sorry, no content found!');
//           this.setState(prev => ({
//             images: [...hits],
//             loader: false,
//             visibleBtn: false,
//           }));
//           return 
//         }

//         this.setState(prev => ({
//           images: [...hits],
//           total: hits.length,
//           totalItems: totalHits,
//           page: 1,
//           loader: false,
//         }));
//       });
//       return;
//     }

//     if (prevState.page !== page && page !== 1) {
//       this.setState({
//         visibleBtn: false,
//         loader: true,
//       });
//       requestToTheServer(request, page).then(({ hits, totalHits }) => {
//         this.setState(prev => ({
//           images: [...prev.images, ...hits],
//           total: prev.total + hits.length,
//         }));
//       });
//     }

//     if (prevState.total !== total) {
//       if (totalItems <= total) {
//         this.setState({
//           visibleBtn: false,
//           loader: false,
//         });
//         alert('Last page loaded.');
//       } else {
//         this.setState({
//           visibleBtn: true,
//           loader: false,
//         });
//       }
//     }
//   };

//   togglVisible = () => {
//     this.setState(prev => ({
//       visibleBtn: !prev.visible,
//       loader: !prev.loader,
//     }));
//   };

//   loadNewImages = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { visibleBtn, images, loader } = this.state;
//     return (
//       <Container>
//         {images && (
//           <List>
//             {images.map(({ id, webformatURL, largeImageURL, tags }) => (
//               <ImageGalleryItem
//                 key={id}
//                 img={webformatURL}
//                 secondImg={largeImageURL}
//                 tag={ tags}
//               />
//             ))}
//           </List>
//         )}
//         {visibleBtn && <Button onClick={this.loadNewImages} />}
//         {loader && 
//           <Loader/>
//         }
//       </Container>
//     );
//   }
// };



ImageGallery.propTypes = {
  request: PropTypes.string.isRequired,
}